import Phaser from "phaser";
import AnimationKeys from "../consts/AnimsKeys";
import TextureKeys from "../consts/TextureKeys";

export default class LaserObstacle extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    const top = scene.add
      .sprite(0, 0, TextureKeys.AnimLaserEnds)
      .play(AnimationKeys.LaserEnds)
      .setOrigin(0.5, 0);

    const middle = scene.add
      .sprite(0, top.y + top.displayHeight - 55, TextureKeys.AnimLaser)
      .play(AnimationKeys.Laser)
      .setOrigin(0.5, 0);

    middle.setDisplaySize(middle.width, 250);

    const bottom = scene.add
      .sprite(
        0,
        middle.y + middle.displayHeight - 60,
        TextureKeys.AnimLaserEnds
      )
      .play(AnimationKeys.LaserEnds)
      .setOrigin(0.5, 0)
      .setFlipY(true);

    this.add(middle);
    this.add(top);
    this.add(bottom);

    scene.physics.add.existing(this, true);

    const body = this.body as Phaser.Physics.Arcade.StaticBody;
    const width = top.displayWidth;
    const height =
      top.displayHeight + middle.displayHeight + bottom.displayHeight;

    body.setSize(width * 0.2, height * 0.45);
    body.setOffset(-width * 0.1, 90);

    body.position.x = this.x + body.offset.x;
    body.position.y = this.y + body.offset.y;
  }
}
