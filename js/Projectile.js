class Projectile {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.spellImg = new Image();
    this.spellImg.src = "./images/spell.png";
    this.spellImg2 = new Image()
    this.spellImg2.src = './images/spell2.png'
    this.spellImg3 = new Image()
    this.spellImg3.src = './images/spell3.png'
    this.id = Math.random(1 * 100) +1;

    this.shotVelocity = 4;
  }

  drawProjectile() {
    this.ctx.drawImage(this.spellImg, this.x + 20, this.y, 45, 45);
  }

  drawProjectile2() {
    this.ctx.drawImage(
      this.spellImg2, this.x + 20, this.y, 45, 45
    )
  }

  drawProjectile3() {
    this.ctx.drawImage(
      this.spellImg3, this.x + 20, this.y, 45, 45
    )
  }

  shot() {
    this.x += this.shotVelocity;
  }
}
