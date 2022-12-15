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
      "assets/gameover/gameOverBackground.png",
      { frameWidth: 400, frameHeight: 320 }
    );
  }

  create(data: any) {
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

    this.add.text(width * 0.1, height * 0.51, `${data.score}`, {
      fontSize: "42px",
      strokeThickness: 2,
      color: "#FFFFFF",
      shadow: { fill: true, blur: 0, offsetY: 0 },
      padding: { left: 15, right: 15, top: 10, bottom: 10 },
    });

    this.add.text(width * 0.1, height * 0.7, `${data.distance}m`, {
      fontSize: "42px",
      strokeThickness: 2,
      color: "#FFFFFF",
      shadow: { fill: true, blur: 0, offsetY: 0 },
      padding: { left: 15, right: 15, top: 10, bottom: 10 },
    });

    this.add.text(
      width * 0.58,
      height * 0.51,
      `${localStorage.getItem("gameHighscore")}`,
      {
        fontSize: "42px",
        strokeThickness: 2,
        color: "#FFFFFF",
        shadow: { fill: true, blur: 0, offsetY: 0 },
        padding: { left: 15, right: 15, top: 10, bottom: 10 },
      }
    );

    this.add.text(
      width * 0.58,
      height * 0.7,
      `${localStorage.getItem("maxDistance")}m`,
      {
        fontSize: "42px",
        strokeThickness: 2,
        color: "#FFFFFF",
        shadow: { fill: true, blur: 0, offsetY: 0 },
        padding: { left: 15, right: 15, top: 10, bottom: 10 },
      }
    );

    const title = this.add.text(20, 610, "ESCAPE to return to Title Screen");
    this.add.text(
      title.x + title.width + 20,
      title.y,
      "ENTER for global leaderboard"
    );

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

    this.input.keyboard.once("keydown-ENTER", () => {
      this.scene.stop(SceneKeys.GameOver);
      this.scene.stop(SceneKeys.Game);

      this.scene.stop(SceneKeys.Leaderboard);
      this.scene.start(SceneKeys.Leaderboard);
    });
  }
}
