import Phaser from "phaser";
import AnimationKeys from "../consts/AnimsKeys";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";

enum MouseState {
  Running,
  Killed,
  Dead,
}

export default class RocketMouse extends Phaser.GameObjects.Container {
  private flames: Phaser.GameObjects.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private mouse: Phaser.GameObjects.Sprite;
  private mouseState = MouseState.Running;

  enableJetpack(enabled: boolean) {
    this.flames.setVisible(enabled);
  }

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.mouse = scene.add
      .sprite(0, 0, TextureKeys.Mouse)
      .setOrigin(0.5, 1)
      .play(AnimationKeys.MouseRun);

    this.flames = scene.add
      .sprite(-63, -15, TextureKeys.Mouse)
      .play(AnimationKeys.RocketFlamesOn);

    this.enableJetpack(false);

    this.add(this.flames);
    this.add(this.mouse);

    scene.physics.add.existing(this);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(this.mouse.width * 0.5, this.mouse.height * 0.7);
    body.setOffset(this.mouse.width * -0.3, -this.mouse.height + 15);

    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  preUpdate() {
    const body = this.body as Phaser.Physics.Arcade.Body;

    switch (this.mouseState) {
      case MouseState.Running: {
        if (this.cursors.space?.isDown) {
          body.setAccelerationY(-600);
          this.enableJetpack(true);

          this.mouse.play(AnimationKeys.MouseFly, true);
        } else {
          body.setAccelerationY(600);
          this.enableJetpack(false);
        }

        if (body.blocked.down) {
          this.mouse.play(AnimationKeys.MouseRun, true);
        } else if (body.velocity.y > 0) {
          this.mouse.play(AnimationKeys.MouseFall, true);
        }
        break;
      }

      case MouseState.Killed: {
        body.velocity.x *= 0.95;
        body.velocity.y = 200;

        if (body.velocity.x <= 5) {
          this.mouseState = MouseState.Dead;
        }
        break;
      }

      case MouseState.Dead: {
        body.setVelocity(0, 0);

        this.scene.scene.run(SceneKeys.GameOver);
        break;
      }
    }
  }
  kill() {
    if (this.mouseState != MouseState.Running) {
      return;
    }

    this.mouseState = MouseState.Killed;

    this.mouse.play(AnimationKeys.MouseDead);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setAccelerationY(0);
    body.setVelocity(1000, 0);
    this.enableJetpack(false);
  }
}
