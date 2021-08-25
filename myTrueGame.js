const myTrueGame = {
  ctx: undefined,
  canvasSize: { w: undefined, h: undefined },
  isCoolDown: false,
  shots: [],
  enemies: [],
  gameOver: false,

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
        console.log(shot);
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
    this.IntervalId = setTimeout(() => {
      this.isCoolDown = false;
    }, 800);
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
    this.IntervalId = setTimeout(() => {
      this.createNewEnemy();
    }, 5000);
  },

  drawAll() {
    this.drawBackground();
    this.drawNewPj();
    this.drawProjectile();
    this.enemies.forEach((enemy) => enemy.drawEnemy());
  },

  checkIfCollision() {
    if (this.enemies.length) {
      this.enemies.forEach((enemy) => {
        let collision = false;
        if (!collision) {
          if (
            this.newPj.pjPosition.y < enemy.enemyPos.y + enemy.enemySize.h &&
            this.newPj.pjPosition.y + this.newPj.pjSize.h > enemy.enemyPos.y &&
            this.newPj.pjPosition.x + this.newPj.pjSize.w > enemy.enemyPos.x + 25
          ) {
            collision = true;
            console.log(collision)
          } else {
            collision = false;
            console.log(collision)
          }
        }
      });
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
      this.newPj.moveNewPj();
      this.checkIfCollision();

      requestAnimationFrame(() => this.updateCanvas());
    }
  },
};
