export const state = {
  raw: new Map(),
  ls: {
    get x() {
      const gamepadLsx = navigator.getGamepads().reduce((a, b) => {
        if (b == null) return a;
        return a + b.axes[0];
      }, 0);
      if (gamepadLsx !== 0) {
        return gamepadLsx;
      }

      const d = state.raw.get("d") ?? 0;
      const arrowRight = state.raw.get("ArrowRight") ?? 0;
      const a = state.raw.get("a") ?? 0;
      const arrowLeft = state.raw.get("ArrowLeft") ?? 0;

      const right = Math.min(1, d + arrowRight);
      const left = Math.min(1, a + arrowLeft);
      return right - left;
    },
    get y() {
      const gamepadLsy = navigator.getGamepads().reduce((a, b) => {
        if (b == null) return a;
        return a + b.axes[1];
      }, 0);
      if (gamepadLsy !== 0) {
        return -gamepadLsy;
      }
      const w = state.raw.get("w") ?? 0;
      const arrowUp = state.raw.get("ArrowUp") ?? 0;
      const s = state.raw.get("s") ?? 0;
      const arrowDown = state.raw.get("ArrowDown") ?? 0;

      const up = Math.min(1, w + arrowUp);
      const down = Math.min(1, s + arrowDown);
      return up - down;
    }
  }
};

window.addEventListener("keydown", (event) => {
  state.raw.set(event.key, 1);
});
window.addEventListener("keyup", (event) => {
  state.raw.set(event.key, 0);
});
window.addEventListener("gamepadconnected", (event) => {
  console.log(event.gamepad);
});
window.addEventListener("gamepaddisconnected", (event) => {
  console.log(event.gamepad);
});