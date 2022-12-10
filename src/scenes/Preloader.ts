import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";
import SceneKeys from "../consts/SceneKeys";
import AnimationKeys from "../consts/AnimsKeys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader);
  }

  preload() {
    this.load.image(TextureKeys.Background, "assets/background/background.png");
    this.load.image(TextureKeys.Floor, "assets/background/floor.png");

    this.load.image(TextureKeys.Building1, "assets/background/building1.png");

    this.load.image(TextureKeys.Window1, "assets/background/building2.png");

    this.load.image(TextureKeys.Window2, "assets/background/building3.png");

    this.load.image(TextureKeys.Bookcase1, "assets/background/building4.png");
    this.load.image(TextureKeys.Bookcase2, "assets/background/building5.png");

    this.load.image(TextureKeys.Cloud1, "assets/background/Clouds1.png");
    this.load.image(TextureKeys.Cloud2, "assets/background/Clouds2.png");
    this.load.image(TextureKeys.Cloud3, "assets/background/Clouds3.png");

    this.load.spritesheet(TextureKeys.Cat, "assets/background/Cat.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet(TextureKeys.Star, "assets/background/stars.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet(TextureKeys.Coin, "assets/collectibles/coin.png", {
      frameWidth: 120,
      frameHeight: 120,
    });

    this.load.spritesheet(TextureKeys.Gem, "assets/collectibles/Gem.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet(
      TextureKeys.Sprite,
      "characters/Owlet_Monster_Run_6.png",
      {
        frameWidth: 128,
        frameHeight: 128,
      }
    );

    this.load.spritesheet(
      TextureKeys.SpriteJump,
      "characters/Owlet_Monster_Jump_8.png",
      { frameWidth: 128, frameHeight: 128 }
    );

    this.load.spritesheet(
      TextureKeys.SpriteDie,
      "characters/Owlet_Monster_Death_8.png",
      { frameWidth: 128, frameHeight: 128 }
    );

    this.load.spritesheet(TextureKeys.Flames, "assets/burning_loop_1 (2).png", {
      frameWidth: 100,
      frameHeight: 133,
    });

    this.load.spritesheet(
      "gameOverBackground",
      "assets/gameover/gameOverBackground.png",
      { frameWidth: 400, frameHeight: 320 }
    );

    this.load.atlas(
      TextureKeys.AnimLaser,
      "assets/obstacles/lightning.png",
      "assets/obstacles/lightning.json"
    );

    this.load.atlas(
      TextureKeys.AnimLaserEnds,
      "assets/obstacles/lightning-ends.png",
      "assets/obstacles/lightning-ends.json"
    );
  }

  create() {
    this.anims.create({
      key: AnimationKeys.SpriteFall,
      frames: [{ key: TextureKeys.SpriteJump, frame: 6 }],
    });

    this.anims.create({
      key: AnimationKeys.SpriteFly,
      frames: [{ key: TextureKeys.SpriteJump, frame: 3 }],
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

    this.anims.create({
      key: AnimationKeys.SpriteRun,
      frames: this.anims.generateFrameNumbers(TextureKeys.Sprite, {
        start: 0,
        end: 5,
      }),
      repeat: -1,
      frameRate: 10,
    });

    this.anims.create({
      key: AnimationKeys.SpriteDead,
      frames: this.anims.generateFrameNumbers(TextureKeys.SpriteDie, {
        start: 0,
        end: 7,
      }),
      frameRate: 3,
    });

    this.anims.create({
      key: AnimationKeys.RocketFlamesOn,
      frames: this.anims.generateFrameNumbers(TextureKeys.Flames, {
        start: 0,
        end: 7,
      }),
      frameRate: 5,
      repeat: -1,
      yoyo: true,
    });

    this.anims.create({
      key: AnimationKeys.Laser,
      frames: this.anims.generateFrameNames(TextureKeys.AnimLaser, {
        start: 1,
        end: 6,
        prefix: "Explosion_2_",
        suffix: ".png",
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: AnimationKeys.LaserEnds,
      frames: this.anims.generateFrameNames(TextureKeys.AnimLaserEnds, {
        start: 1,
        end: 4,
        prefix: "Explosion_3_",
        suffix: ".png",
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.start(SceneKeys.GameStart);
  }
}
