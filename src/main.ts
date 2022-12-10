import Phaser from "phaser";

import Preloader from "./scenes/Preloader";
import StartGame from "./scenes/StartGame";
import Game from "./scenes/Game";
import GameOver from "./scenes/GameOver";

const startGame = new StartGame();
const gameScene = new Game();
const gameEnd = new GameOver();

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "app",
  width: 940,
  height: 640,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      // debug: true,
    },
  },

  scene: [Preloader, StartGame, Game, GameOver],
};

const game = new Phaser.Game(config);

game.scene.add("startGame", startGame);
game.scene.add("game", gameScene);
game.scene.add("gameOver", gameEnd);

export default game;
