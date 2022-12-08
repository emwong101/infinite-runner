import Phaser from "phaser";
import AnimationKeys from "../consts/AnimsKeys";
import SceneKeys from "../consts/SceneKeys";
import TextureKeys from "../consts/TextureKeys";
import LaserObstacle from "../game/LaserObstacle";
import RocketMouse from "../game/RocketMouse";

export default class Game extends Phaser.Scene {
  private background!: Phaser.GameObjects.TileSprite;
  private floor!: Phaser.GameObjects.TileSprite;
  private building1!: Phaser.GameObjects.Image;
  private window1!: Phaser.GameObjects.Image;
  private window2!: Phaser.GameObjects.Image;
  private bookcase1!: Phaser.GameObjects.Image;
  private bookcase2!: Phaser.GameObjects.Image;
  private cloud1!: Phaser.GameObjects.Image;
  private cloud2!: Phaser.GameObjects.Image;
  private cloud3!: Phaser.GameObjects.Image;
  private cat!: Phaser.GameObjects.Sprite;
  private coins!: Phaser.Physics.Arcade.StaticGroup;

  private laserObstacle!: LaserObstacle;
  private mouse!: RocketMouse;

  private bookcases: Phaser.GameObjects.Image[] = [];
  private windows: Phaser.GameObjects.Image[] = [];
  private clouds: Phaser.GameObjects.Image[] = [];

  private scoreLabel!: Phaser.GameObjects.Text;
  private score = 0;

  constructor() {
    super(SceneKeys.Game);
  }

  init() {
    this.score = 0;
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    //add background gradient
    this.background = this.add
      .tileSprite(0, 0, width, height, TextureKeys.Background)
      .setOrigin(0, 0)
      .setScrollFactor(0, 0);

    //add background decorations
    this.building1 = this.add
      .image(Phaser.Math.Between(900, 1500), 605, TextureKeys.Building1)
      .setOrigin(0.5, 1);

    this.window1 = this.add
      .image(Phaser.Math.Between(900, 1300), 605, TextureKeys.Window1)
      .setOrigin(0.5, 1);
    this.window2 = this.add
      .image(Phaser.Math.Between(1600, 2000), 605, TextureKeys.Window2)
      .setOrigin(0.5, 1);

    this.windows = [this.window1, this.window2];

    this.bookcase1 = this.add
      .image(Phaser.Math.Between(2200, 2700), 605, TextureKeys.Bookcase1)
      .setOrigin(0.5, 1);
    this.bookcase2 = this.add
      .image(Phaser.Math.Between(2900, 3200), 605, TextureKeys.Bookcase2)
      .setOrigin(0.5, 1);

    this.bookcases = [this.bookcase1, this.bookcase2];

    this.floor = this.add
      .tileSprite(0, 0, width, height, TextureKeys.Floor)
      .setOrigin(0, 0)
      .setScrollFactor(0, 0);

    this.cat = this.add
      .sprite(Phaser.Math.Between(200, 700), 567, TextureKeys.Cat)
      .play(AnimationKeys.Cat)
      .setOrigin(0, 0)
      .setScale(2, 2);

    //add background animated stars
    this.add
      .sprite(Phaser.Math.Between(50, 100), 100, TextureKeys.Star)
      .playReverse(AnimationKeys.Star)
      .setScrollFactor(0, 0)
      .setScale(3, 3);
    this.add
      .sprite(Phaser.Math.Between(200, 300), 50, TextureKeys.Star)
      .playAfterDelay(AnimationKeys.Star, 500)
      .setScrollFactor(0, 0)
      .setScale(1.5, 1.5);
    this.add
      .sprite(Phaser.Math.Between(600, 750), 75, TextureKeys.Star)
      .play(AnimationKeys.Star)
      .setScrollFactor(0, 0)
      .setScale(1.5, 1.5);
    this.add
      .sprite(Phaser.Math.Between(400, 600), 120, TextureKeys.Star)
      .playReverse(AnimationKeys.Star)
      .setScrollFactor(0, 0)
      .setScale(2, 2);

    //add clouds + delay scroll speed
    this.cloud1 = this.add
      .image(Phaser.Math.Between(1100, 1300), 200, TextureKeys.Cloud1)
      .setScrollFactor(0.5, 0);
    this.cloud2 = this.add
      .image(Phaser.Math.Between(200, 1000), 150, TextureKeys.Cloud2)
      .setScrollFactor(0.5, 0);
    this.cloud3 = this.add
      .image(Phaser.Math.Between(1000, 1500), 95, TextureKeys.Cloud3)
      .setScrollFactor(0.55, 0);

    this.clouds = [this.cloud1, this.cloud2, this.cloud3];

    //add obstacles
    this.laserObstacle = new LaserObstacle(this, 900, 100);
    this.add.existing(this.laserObstacle);
    this.laserObstacle.setVisible(false);

    //add collectibles
    this.coins = this.physics.add.staticGroup();

    //add player sprite
    this.mouse = new RocketMouse(this, width * 0.3, height - 30);
    this.add.existing(this.mouse);
    this.mouse.setVisible(false);

    const body = this.mouse.body as Phaser.Physics.Arcade.Body;
    body.setCollideWorldBounds(true);
    body.setVelocityX(200);

    //detect overlap between player and interactive objects
    this.physics.add.overlap(
      this.laserObstacle,
      this.mouse,
      this.handleOverlapLaser,
      undefined,
      this
    );
    this.physics.add.overlap(
      this.coins,
      this.mouse,
      this.handleCollectCoin,
      undefined,
      this
    );

    this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 55);

    this.cameras.main.startFollow(this.mouse);
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height);

    this.scoreLabel = this.add
      .text(10, 10, `Score: ${this.score}`, {
        fontSize: "24px",
        color: "#080808",
        backgroundColor: "#F8E71C",
        shadow: { fill: true, blur: 0, offsetY: 0 },
        padding: { left: 15, right: 15, top: 10, bottom: 10 },
      })
      .setScrollFactor(0);
  }

  update(_t: number, _dt: number) {
    this.background.setTilePosition(this.cameras.main.scrollX);
    this.floor.setTilePosition(this.cameras.main.scrollX);
    this.wrapWindows();
    this.wrapBuilding1();
    this.wrapBookcases();
    this.wrapClouds();
    this.wrapCat();
    this.wrapLaserObstacle();

    // this.teleportBackwards();
  }

  private wrapBuilding1() {
    const scrollX = this.cameras.main.scrollX;
    const rightEdge = scrollX + this.scale.width;

    if (this.building1.x + this.building1.width < scrollX) {
      this.building1.x = Phaser.Math.Between(rightEdge + 300, rightEdge + 1000);

      const overlapBookcase = this.bookcases.find((bc) => {
        return Math.abs(this.building1.x - bc.x) <= this.building1.width;
      });

      const overlapWindow = this.windows.find((win) => {
        return Math.abs(this.building1.x - win.x) <= this.building1.width;
      });

      this.building1.visible = !overlapBookcase;
      this.building1.visible = !overlapWindow;
    }
  }

  private wrapWindows() {
    const scrollX = this.cameras.main.scrollX;
    const rightEdge = scrollX + this.scale.width;

    let width = this.window1.width * 2;
    if (this.window1.x + width < scrollX) {
      this.window1.x = Phaser.Math.Between(
        rightEdge + width,
        rightEdge + width + 500
      );

      const overlap = this.bookcases.find((bc) => {
        return Math.abs(this.window1.x - bc.x) <= this.window1.width;
      });

      this.window1.visible = !overlap;
    }

    width = this.window2.width;
    if (this.window2.x + width < scrollX) {
      this.window2.x = Phaser.Math.Between(
        this.window1.x + width,
        this.window1.x + width + 800
      );

      const overlap = this.bookcases.find((bc) => {
        return Math.abs(this.window2.x - bc.x) <= this.window2.width;
      });

      this.window2.visible = !overlap;
    }
  }

  private wrapBookcases() {
    const scrollX = this.cameras.main.scrollX;
    const rightEdge = scrollX + this.scale.width;

    let width = this.bookcase1.width * 2;
    if (this.bookcase1.x + width < scrollX) {
      this.bookcase1.x = Phaser.Math.Between(
        rightEdge + width,
        rightEdge + width + 800
      );

      const overlap = this.windows.find((win) => {
        return Math.abs(this.bookcase1.x - win.x) <= this.bookcase1.width;
      });

      this.bookcase1.visible = !overlap;
    }

    width = this.bookcase2.width;
    if (this.bookcase2.x + width < scrollX) {
      this.bookcase2.x = Phaser.Math.Between(
        this.bookcase1.x + width,
        this.bookcase1.x + width + 800
      );
      const overlap = this.windows.find((win) => {
        return Math.abs(this.bookcase2.x - win.x) <= this.bookcase2.width;
      });

      this.bookcase2.visible = !overlap;
    }
  }

  private wrapClouds() {
    const scrollX = this.cameras.main.scrollX * 0.5;
    const rightEdge = scrollX + this.scale.width;

    let width = this.cloud1.width;
    if (this.cloud1.x + width < scrollX) {
      this.cloud1.x = Phaser.Math.Between(rightEdge + 100, rightEdge + 200);
    }

    width = this.cloud2.width;
    if (this.cloud2.x + width < scrollX) {
      this.cloud2.x = Phaser.Math.Between(rightEdge + 200, rightEdge + 400);
    }

    width = this.cloud3.width;
    if (this.cloud3.x + width < scrollX) {
      this.cloud3.x = Phaser.Math.Between(rightEdge + 400, rightEdge + 600);
    }
  }

  private wrapCat() {
    let scrollX = this.cameras.main.scrollX;
    let rightEdge = scrollX + this.scale.width;

    let width = this.cat.width;
    if (this.cat.x + width < scrollX) {
      this.cat.x = Phaser.Math.Between(rightEdge + 700, rightEdge + 1000);
      this.spawnCoins();
    }
  }

  private wrapLaserObstacle() {
    const scrollX = this.cameras.main.scrollX;
    const rightEdge = scrollX + this.scale.width;

    const body = this.laserObstacle.body as Phaser.Physics.Arcade.StaticBody;

    const width = body.width;

    if (this.laserObstacle.x + width < scrollX) {
      this.laserObstacle.x = Phaser.Math.Between(
        rightEdge + width,
        rightEdge + width + 1000
      );
      this.laserObstacle.y = Phaser.Math.Between(0, 300);

      body.position.x = this.laserObstacle.x + body.offset.x;
      body.position.y = this.laserObstacle.y + body.offset.y;
    }
  }

  private handleOverlapLaser(
    _obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject
  ) {
    const mouse = obj2 as RocketMouse;

    mouse.kill();
  }

  private spawnCoins() {
    this.coins.children.each((child) => {
      const coin = child as Phaser.Physics.Arcade.Sprite;
      this.coins.killAndHide(coin);
      coin.body.enable = false;
    });

    const scrollX = this.cameras.main.scrollX;
    const rightEdge = scrollX + this.scale.width;

    let x = rightEdge + 100;

    const numCoins = Phaser.Math.Between(1, 15);

    for (let i = 0; i < numCoins; i++) {
      const coin = this.coins.get(
        x,
        // Phaser.Math.Between(100, this.scale.height - 100),
        300,
        TextureKeys.Coin
      ) as Phaser.Physics.Arcade.Sprite;

      coin.setVisible(true);
      coin.setActive(true);
      coin.setScale(1.5, 1.5);

      const body = coin.body as Phaser.Physics.Arcade.StaticBody;
      body.setCircle(body.width * 0.5);
      body.enable = true;
      body.updateFromGameObject();

      x += coin.width * 3.5;
    }
  }

  private handleCollectCoin(
    _obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject
  ) {
    const coin = obj2 as Phaser.Physics.Arcade.Sprite;

    this.score += 1;

    this.scoreLabel.text = `Score: ${this.score}`;

    this.coins.killAndHide(coin);

    coin.body.enable = false;
  }

  private teleportBackwards() {
    const scrollX = this.cameras.main.scrollX;
    const maxX = 6800;

    if (scrollX > maxX) {
      this.mouse.x -= maxX;
      this.building1.x -= maxX;

      this.windows.forEach((win) => {
        win.x -= maxX;
      });

      this.bookcases.forEach((bc) => {
        bc.x -= maxX;
      });

      this.cat.x -= maxX;

      this.clouds.forEach((cloud) => {
        cloud.x -= maxX * 1.25;
      });
    }

    this.laserObstacle.x -= maxX;
    const laserBody = this.laserObstacle
      .body as Phaser.Physics.Arcade.StaticBody;

    laserBody.x -= maxX;

    this.spawnCoins();
    this.coins.children.each((child) => {
      const coin = child as Phaser.Physics.Arcade.Sprite;

      if (!coin.active) {
        return;
      }

      coin.x -= maxX;
      const body = coin.body as Phaser.Physics.Arcade.StaticBody;

      body.updateFromGameObject();
    });
  }
}
