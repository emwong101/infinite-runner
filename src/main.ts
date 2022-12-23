import Phaser from "phaser";

import Preloader from "./scenes/Preloader";
import StartGame from "./scenes/StartGame";
import Game from "./scenes/Game";
import GameOver from "./scenes/GameOver";
import Leaderboard from "./scenes/Leaderboard";

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
    },
  },
  scale: {
    parent: "app",
    mode: Phaser.Scale.FIT,
    width: 940,
    height: 640,
    autoCenter: Phaser.Scale.NO_CENTER,
  },

  scene: [Preloader, StartGame, Game, Leaderboard, GameOver],
};

const game = new Phaser.Game(config);

game.scene.add("startGame", startGame);
game.scene.add("game", gameScene);
game.scene.add("gameOver", gameEnd);
game.scale.autoCenter;

export default game;
