import Phaser from "phaser";
import AnimationKeys from "../consts/AnimsKeys";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";

enum SpriteState {
  Running,
  Killed,
  Dead,
}

export default class RocketSprite extends Phaser.GameObjects.Container {
  private flames: Phaser.GameObjects.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private sprite: Phaser.GameObjects.Sprite;
  private SpriteState = SpriteState.Running;

  enableJetpack(enabled: boolean) {
    this.flames.setVisible(enabled);
  }

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.sprite = scene.add
      .sprite(0, 0, TextureKeys.Sprite)
      .setOrigin(0.5, 1)
      .play(AnimationKeys.SpriteRun);

    this.flames = scene.add
      .sprite(-10, 40, TextureKeys.Sprite)
      .setScale(0.75, 0.75)
      .play(AnimationKeys.RocketFlamesOn);

    this.enableJetpack(false);

    this.add(this.flames);
    this.add(this.sprite);

    scene.physics.add.existing(this);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(this.sprite.width * 0.5, this.sprite.height * 0.5);
    body.setOffset(this.sprite.width * -0.2, -this.sprite.height + 35);

    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  preUpdate() {
    const body = this.body as Phaser.Physics.Arcade.Body;

    switch (this.SpriteState) {
      case SpriteState.Running: {
        if (this.cursors.space?.isDown) {
          this.sprite.play(AnimationKeys.SpriteFly, true);
          body.setAccelerationY(-600);
          this.enableJetpack(true);
        } else {
          body.setAccelerationY(400);
          this.enableJetpack(false);
        }

        if (body.blocked.down) {
          this.sprite.play(AnimationKeys.SpriteRun, true);
        } else if (body.velocity.y > 20) {
          this.sprite.play(AnimationKeys.SpriteFall, true);
        }
        break;
      }

      case SpriteState.Killed: {
        body.velocity.x *= 0.95;
        body.velocity.y = 200;

        if (body.velocity.x <= 5) {
          this.SpriteState = SpriteState.Dead;
        }
        break;
      }

      case SpriteState.Dead: {
        body.setVelocity(0, 0);

        this.scene.scene.start(SceneKeys.GameOver).isActive;
        break;
      }
    }
  }
  kill() {
    if (this.SpriteState != SpriteState.Running) {
      return;
    }

    this.SpriteState = SpriteState.Killed;

    this.sprite.play(AnimationKeys.SpriteDead);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setAccelerationY(0);
    body.setVelocity(1000, 0);
    this.enableJetpack(false);
  }
}
