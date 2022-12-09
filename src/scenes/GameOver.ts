import Phaser from "phaser";
import SceneKeys from "../consts/SceneKeys";

export default class GameOver extends Phaser.Scene {
  screenText!: Phaser.GameObjects.Text;
  constructor() {
    super(SceneKeys.GameOver);
  }

  preload() {
    this.load.spritesheet(
      "gameOverBackground",
      "/assets/gameover/gameOverBackground.png",
      { frameWidth: 400, frameHeight: 320 }
    );
  }

  create() {
    const { width, height } = this.scale;

    this.anims.create({
      key: "flash",
      frames: this.anims.generateFrameNumbers("gameOverBackground", {
        start: 0,
        end: 3,
      }),
      frameRate: 2,
      repeat: -1,
    });

    this.add
      .sprite(0, 0, "gameOverBackground")
      .setOrigin(0, 0)
      .setDisplaySize(width, height)
      .play("flash");

    this.add.text(520, 610, "Press ESCAPE to return to Title Screen");

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.stop(SceneKeys.GameOver);

      this.scene.stop(SceneKeys.Game);
      this.scene.start(SceneKeys.Game);
    });

    this.input.keyboard.once("keydown-ESC", () => {
      this.scene.stop(SceneKeys.GameOver);

      this.scene.stop(SceneKeys.GameStart);
      this.scene.start(SceneKeys.GameStart);
    });
  }
}
