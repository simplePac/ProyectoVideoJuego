class Personaje {
  constructor(ctx, width, height, canvasSize) {
    (this.ctx = ctx), (this.pjSize = { w: width, h: height });
    (this.canvasSize = canvasSize),
      (this.pjImage = undefined),
      (this.pjPosition = {
        x: this.pjSize.w / 2,
        y: this.canvasSize.h / 2 + 100,
      });

    (this.aim = undefined),
      (this.moveDown = false),
      (this.moveUp = false),
      (this.pjImage = new Image()),
      (this.pjImage.src = "./images/pj.png");
  }

  drawNewPj() {
    this.ctx.drawImage(
      this.pjImage,
      this.pjPosition.x,
      this.pjPosition.y,
      this.pjSize.w,
      this.pjSize.h
    );
  }

  moveNewPj() {
    this.pjPosition.y > 350 && this.moveUp
      ? (this.pjPosition.y -= 4)
      : null;
    this.pjPosition.y < 620 && this.moveDown ? (this.pjPosition.y += 4) : null;
  }

}
