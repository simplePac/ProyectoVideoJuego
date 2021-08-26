const myTrueGame = {
  ctx: undefined,
  canvasSize: { w: undefined, h: undefined },
  isCoolDown: false,
  shots: [],
  successedShots: [],
  enemies: [],
  gameOver: false,
  finish: false,
  score: 0,

  init(canvas) {
    this.setContext(canvas);
    this.setCanvasSize(canvas);
    this.setBackGround();
    this.setNewPj();
    this.createNewEnemy();
    this.drawAll();
    this.setListeners();
    this.updateCanvas();
  },

  setContext() {
    this.ctx = canvas.getContext("2d");
    document.getElementById("music").play();
    document.getElementById("music").volume = 0.3;
    document.getElementById("music2").pause();
  },

  setCanvasSize(canvas) {
    this.canvasSize.w = 800;
    this.canvasSize.h = 700;
    canvas.setAttribute("width", this.canvasSize.w);
    canvas.setAttribute("height", this.canvasSize.h);
  },
  

  setBackGround() {
    this.backGroundImg = new Image();
    this.backGroundImg.src = "./images/background.png";
    this.backGroundImgWidth = this.canvasSize.w;
    this.backGroundImgHeight = this.canvasSize.h;
  },

  setAudio() {
    if(this.score === 10){
      document.getElementById('notPass').play()
      document.getElementById('notPass').volume = 0.3
    }
  },

  drawBackground() {
    this.ctx.drawImage(
      this.backGroundImg,
      0,
      0,
      this.backGroundImgWidth,
      this.backGroundImgHeight
    );
  },

  setNewPj() {
    this.newPj = new Personaje(this.ctx, 50, 60, this.canvasSize);
  },

  drawNewPj() {
    this.newPj.drawNewPj();
  },

  drawProjectile() {
    if (this.shots.length !== 0) {
      this.shots.forEach((shot) => {
        // console.log(shot);
        shot.shot();
        shot.drawProjectile();
      });
    }
  },

  createNewProjectile() {
    this.isCoolDown = true;
    this.shots.push(
      (this.newProjectile = new Projectile(
        this.ctx,
        this.newPj.pjPosition.x,
        this.newPj.pjPosition.y
      ))
    );
    if (this.score < 5) {
      this.IntervalId = setTimeout(() => {
        this.isCoolDown = false;
      }, 1000);
    } else if (this.score >= 5) {
      this.IntervalId = setTimeout(() => {
        this.isCoolDown = false;
      }, 800);
    }
  },

  createNewEnemy() {
    const yRandomPosition = Math.trunc(
      Math.random() * (this.canvasSize.h - 420) + 320
    );

    const newEnemy = new Enemy(
      this.ctx,
      this.canvasSize,
      this.canvasSize.w,
      yRandomPosition
    );

    this.enemies.push(newEnemy);
    if (this.score < 5) {
      this.IntervalId = setTimeout(() => {
        this.createNewEnemy();
      }, 1500);
    } else if (this.score >= 5) {
      for (let i = 0; i < this.enemies.length; i++) {
        e = this.enemies[i];
      }
      e.enemyLives = 2;
      this.IntervalId = setTimeout(() => {
        this.createNewEnemy();
      }, 1500);
    }
  },

  lose() {
    if (this.gameOver && !this.finish) {
      this.loseImg = new Image();
      this.loseImg.src = "./images/lose.png";

      this.finish = true;
      setTimeout(() => {
        this.ctx.drawImage(this.loseImg, 0, 0, 800, 700);
        this.ctx.font = "70px Verdana";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("DEFEAT", 250, 350);
        document.getElementById("music").pause();
        document.getElementById("music2").play();
        document.getElementById("music").volume = 0.4;
      }, 700);
    }
  },

  drawAll() {
    this.drawBackground();
    this.drawNewPj();
    this.drawProjectile();
    this.enemies.forEach((enemy) => enemy.drawEnemy());
    this.showScore();
  },

  showScore() {
    this.ctx.font = "25px Verdana";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Score: " + this.score, 650, 30);
  },

  checkPlayerCollision() {
    if (this.enemies.length) {
      this.enemies.forEach((enemy) => {
        let collision = false;
        if (!collision) {
          if (enemy.enemyPos.x === -80) {
            this.gameOver = true;
          }
          if (this.newPj.pjPosition.x === enemy.enemyPos.x) {
            if (
              (this.newPj.pjPosition.y >= enemy.enemyPos.y &&
                this.newPj.pjPosition.y <=
                  enemy.enemyPos.y + enemy.enemySize.h) ||
              (this.newPj.pjPosition.y + this.newPj.pjSize.h >=
                enemy.enemyPos.y &&
                this.newPj.pjPosition.y + this.newPj.pjSize.h <=
                  enemy.enemyPos.y + enemy.enemySize.h)
            ) {
              this.gameOver = true;
            }
          }
        }
      });
    }
  },

  checkProjectileCollision() {
    for (let i = 0; i < this.enemies.length; i++) {
      let e = this.enemies[i];
      for (let j = 0; j < this.shots.length; j++) {
        let s = this.shots[j];
        if (
          s.x + 45 >= e.enemyPos.x &&
          s.x <= e.enemyPos.x + e.enemySize.w &&
          s.y >= e.enemyPos.y &&
          s.y <= e.enemyPos.y + e.enemySize.h
        ) {
          this.shots.splice(this.shots[j], 1); // quita las balas
          e.enemyLives = e.enemyLives - 1;
          if (e.enemyLives === 0) {
            this.enemies.splice(i, 1); // quita los enemigos muertos
            this.score = this.score + 1;
          }
          // document.querySelector(".barra").innerHTML = e.id + " " + "APLASTADA"; //METER AQUI EL SCORE
        }
      }
    }
  },

  setListeners() {
    document.addEventListener("keydown", (e) => {
      e.key === "ArrowDown" ? (this.newPj.moveDown = true) : null;
      e.key === "ArrowUp" ? (this.newPj.moveUp = true) : null;
      e.keyCode === 32 && this.isCoolDown === false
        ? this.createNewProjectile()
        : null;
    });

    document.addEventListener("keyup", (e) => {
      e.key === "ArrowDown" ? (this.newPj.moveDown = false) : null;
      e.key === "ArrowUp" ? (this.newPj.moveUp = false) : null;
    });
  },

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
  },

  updateCanvas() {
    if (!this.gameOver) {
      this.clearCanvas();
      this.drawAll();
      this.setAudio()
      this.newPj.moveNewPj();
      this.checkPlayerCollision();
      this.checkProjectileCollision();
      // this.removeShots();
    } else {
      this.lose();
    }

    requestAnimationFrame(() => this.updateCanvas());
  },
};
