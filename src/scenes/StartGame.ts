import Phaser from "phaser";
import SceneKeys from "../consts/SceneKeys";

export default class StartGame extends Phaser.Scene {
  constructor() {
    super(SceneKeys.GameStart);
  }

  preload() {
    this.load.spritesheet("gameStart", "assets/gamestart/GameStart.png", {
      frameWidth: 576,
      frameHeight: 324,
    });
  }

  create() {
    const { width, height } = this.scale;

    this.anims.create({
      key: "start",
      frames: this.anims.generateFrameNumbers("gameStart", {
        start: 0,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.add
      .sprite(0, 0, "gameStart")
      .setOrigin(0, 0)
      .setDisplaySize(width, height)
      .play("start");

    this.add.text(520, 610, "Fly using SPACE to collect coins and gems!");

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.stop(SceneKeys.GameStart);

      this.scene.stop(SceneKeys.Game);
      this.scene.start(SceneKeys.Game);
    });
  }
}
