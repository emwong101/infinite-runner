import Phaser from "phaser";
import AnimationKeys from "../consts/AnimsKeys";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";

export default class StartGame extends Phaser.Scene {
  constructor() {
    super(SceneKeys.GameStart);
  }

  preload() {}

  create() {
    const { width, height } = this.scale;

    this.add
      .sprite(0, 0, TextureKeys.Start)
      .setOrigin(0, 0)
      .setDisplaySize(width, height)
      .play(AnimationKeys.Start);

    this.add.text(520, 610, "Fly using SPACE to collect coins and gems!");

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.stop(SceneKeys.GameStart);

      this.scene.stop(SceneKeys.Game);
      this.scene.start(SceneKeys.Game);
    });

    this.input.once("pointerdown", () => {
      this.scene.stop(SceneKeys.GameStart);

      this.scene.stop(SceneKeys.Game);
      this.scene.start(SceneKeys.Game);
    });
  }
}
