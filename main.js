import { Tokens } from "./tokens.js";

window.addEventListener(`load`, function () {
  const canvas = document.getElementById(`canvas1`);
  const ctx = canvas.getContext(`2d`);
  canvas.width = 1200;
  canvas.height = 700;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
    }
    update() {}
    draw() {}
  }
  const game = new Game(canvas.width, canvas.height);
});

let popUp = document.getElementById("popUp");

document.getElementById("popUpBtn").addEventListener("click", hide);

function hide() {
  let pop = popUp.style.display;
  popUp.style.display = (pop === "none") ? "block" : "none";
}



