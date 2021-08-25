class Enemy {
  constructor(ctx, canvasSize, positionX, positionY) {
    (this.ctx = ctx),
      (this.enemySize = { w: 80, h: 90 }),
      (this.canvasSize = canvasSize),
      (this.enemyPos = { x: positionX, y: positionY }),
      (this.enemyRight = true),
      (this.enemyImg = new Image()),
      (this.enemyImg.src = "./images/enemyLeft.png");
  }

  drawEnemy() {
    this.ctx.drawImage(
      this.enemyImg,
      this.enemyPos.x,
      this.enemyPos.y,
      this.enemySize.w,
      this.enemySize.h
    );
    this.enemyMovement();
  }

  enemyMovement() {
    this.enemyPos.x -= 1;
  }
}
