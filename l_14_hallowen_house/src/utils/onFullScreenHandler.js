export const onFullScreenHandler = (canvas) => {
  const fullscreenElement = document.fullscreenElement;
  if (!fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
