import { state } from "./input.mjs";
import raroNumber from "https://esm.sh/raro-number@0.5.3";

const dailin = {
  pos: {
    x: 0,
    y: 0,
  },
  forward: true,
};

const $dailin = document.createElement("img");
$dailin.style.position = "fixed";
$dailin.width = raroNumber;
$dailin.height = raroNumber;

document.querySelector("#foreground").append($dailin);

let lastForward = false;
let lastIdle = true;
export function update() {
  const isXMoving = state.ls.x !== 0;
  const isYMoving = state.ls.y !== 0;
  const isIdle = !(isXMoving || isYMoving);
  const isForwardChanged = dailin.forward !== lastForward;
  const isIdleChanged = isIdle !== lastIdle;
  if (isXMoving) {
    dailin.forward = state.ls.x >= 0;
  }
  dailin.pos.x += state.ls.x;
  dailin.pos.y += -state.ls.y;
  $dailin.style.left = dailin.pos.x + "px";
  $dailin.style.top = dailin.pos.y + "px";
  const shouldUpdateImage = isIdleChanged || isForwardChanged;
  if (shouldUpdateImage) {
    $dailin.src = `./public/dailin-${dailin.forward ? "right" : "left"}${isIdle ? "-static" : ""}.webp`;
    lastForward = dailin.forward;
    lastIdle = isIdle;
    document.querySelector("body").style.backgroundColor = dailin.forward ? "black" : "white";
  }
}