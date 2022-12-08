import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";
import SceneKeys from "../consts/SceneKeys";
import AnimationKeys from "../consts/AnimsKeys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader);
  }

  preload() {
    this.load.image(TextureKeys.Background, "/house/1.png");
    this.load.image(TextureKeys.Floor, "/house/floor.png");

    this.load.image(TextureKeys.Building1, "/house/2.png");

    this.load.image(TextureKeys.Window1, "/house/3.png");

    this.load.image(TextureKeys.Window2, "/house/5.png");

    this.load.image(TextureKeys.Bookcase1, "/house/6.png");
    this.load.image(TextureKeys.Bookcase2, "/house/9.png");

    this.load.image(TextureKeys.Cloud1, "/house/Clouds1.png");
    this.load.image(TextureKeys.Cloud2, "/house/Clouds2.png");
    this.load.image(TextureKeys.Cloud3, "/house/Clouds3.png");

    this.load.image(TextureKeys.LaserMiddle, "/house/object_laser.png");
    this.load.image(TextureKeys.LaserEnd, "/house/object_laser_end.png");

    this.load.atlas(
      TextureKeys.Mouse,
      "characters/rocket-mouse.png",
      "characters/rocket-mouse.json"
    );

    this.load.spritesheet(TextureKeys.Cat, "/house/Cat.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet(TextureKeys.Star, "/house/stars.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet(TextureKeys.Coin, "/house/01coin.png", {
      frameWidth: 120,
      frameHeight: 120,
    });

    this.load.spritesheet(TextureKeys.Gem, "/house/Gem.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create() {
    this.anims.create({
      key: AnimationKeys.MouseRun,
      frames: this.anims.generateFrameNames(TextureKeys.Mouse, {
        start: 1,
        end: 4,
        prefix: "rocketmouse_run",
        zeroPad: 2,
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: AnimationKeys.MouseFall,
      frames: [{ key: TextureKeys.Mouse, frame: "rocketmouse_fall01.png" }],
    });

    this.anims.create({
      key: AnimationKeys.MouseFly,
      frames: [{ key: TextureKeys.Mouse, frame: "rocketmouse_flying.png" }],
    });

    this.anims.create({
      key: AnimationKeys.RocketFlamesOn,
      frames: this.anims.generateFrameNames(TextureKeys.Mouse, {
        start: 1,
        end: 2,
        prefix: "flame",
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: AnimationKeys.MouseDead,
      frames: this.anims.generateFrameNames(TextureKeys.Mouse, {
        start: 1,
        end: 2,
        prefix: "rocketmouse_dead",
        zeroPad: 2,
        suffix: ".png",
      }),
      frameRate: 10,
    });

    this.anims.create({
      key: AnimationKeys.Cat,
      frames: this.anims.generateFrameNumbers(TextureKeys.Cat, {
        start: 0,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: AnimationKeys.Star,
      frames: this.anims.generateFrameNumbers(TextureKeys.Star, {
        start: 0,
        end: 6,
      }),
      frameRate: 7,
      repeat: -1,
      yoyo: true,
    });

    this.anims.create({
      key: AnimationKeys.Coins,
      frames: this.anims.generateFrameNumbers(TextureKeys.Coin, {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: AnimationKeys.Gem,
      frames: this.anims.generateFrameNumbers(TextureKeys.Gem, {
        start: 0,
        end: 5,
      }),
      repeat: -1,
      yoyo: true,
      frameRate: 15,
    });

    this.scene.start(SceneKeys.Game);
  }
}
