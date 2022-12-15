import Phaser from "phaser";
import axios from "axios";
import SceneKeys from "../consts/SceneKeys";

export default class Leaderboard extends Phaser.Scene {
  private scores: any;

  constructor() {
    super(SceneKeys.Leaderboard);
  }

  preload() {
    this.load.image("highscore", "assets/highscores.png");
  }

  async create() {
    const { width, height } = this.scale;
    this.add
      .image(0, 0, "highscore")
      .setOrigin(0, 0)
      .setDisplaySize(width, height);

    this.scores = await this.getScores();

    const x = 150;
    let y = 240;
    const size = 5;

    for (let i = 0; i < size; ++i) {
      const num = this.add
        .text(x, y, `${i + 1})`, {
          fontSize: "48px",
          strokeThickness: 2,
          color: "#FFFFFF",
          shadow: { fill: true, blur: 0, offsetY: 0 },
          padding: { left: 10, right: 10, top: 10, bottom: 10 },
        })
        .setOrigin(0, 0.5)
        .setVisible(false);

      if (i < this.scores.length) {
        const scoreItem = this.scores[i];
        const points = this.add
          .text(num.x + num.width + 120, y, scoreItem.score.toString(), {
            fontSize: "32px",
            strokeThickness: 2,
            color: "#FFFFFF",
            shadow: { fill: true, blur: 0, offsetY: 0 },
          })
          .setOrigin(0, 0.5);

        const nameWidth = 350;
        this.add
          .text(points.x + nameWidth, y, `${scoreItem.seconds.toString()}m`, {
            fontSize: "32px",
            strokeThickness: 2,
            color: "#FFFFFF",
            shadow: { fill: true, blur: 0, offsetY: 0 },
          })
          .setOrigin(0, 0.5);
      }

      y += 75;
    }

    this.add.text(10, 610, "ESC to return to title, SPACE to restart");

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.stop(SceneKeys.Leaderboard);

      this.scene.stop(SceneKeys.Game);
      this.scene.start(SceneKeys.Game);
    });

    this.input.keyboard.once("keydown-ESC", () => {
      this.scene.stop(SceneKeys.Leaderboard);

      this.scene.stop(SceneKeys.GameStart);
      this.scene.start(SceneKeys.GameStart);
    });
  }

  update() {}

  private getScores = async () => {
    try {
      const { data: scores } = await axios.get(
        "https://www.dreamlo.com/lb/6396e7a18f40bbd070ea1f8e/json"
      );
      const { dreamlo } = scores;
      const { leaderboard } = dreamlo;
      const { entry } = leaderboard;
      return entry;
    } catch {
      console.log("error");
    }
  };
}
