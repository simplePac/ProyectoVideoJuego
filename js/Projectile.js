class Projectile {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.spellImg = new Image();
    this.spellImg.src = "./images/spell.png";
    this.id = Math.random(1 * 100) +1;

    this.shotVelocity = 4;
  }

  drawProjectile() {
    this.ctx.drawImage(this.spellImg, this.x + 20, this.y, 45, 45);
  }

  shot() {
    this.x += this.shotVelocity;
  }
}
