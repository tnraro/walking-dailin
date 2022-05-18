import * as dailin from "./dailin.mjs";

function update() {
  dailin.update();
  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);