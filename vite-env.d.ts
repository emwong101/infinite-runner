/// <reference types= "vite/client" />

declare namespace Phaser {
  interface Scene {
    firebase: import("./src/consts/FirebasePlugin").default;
  }
}
