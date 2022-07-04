export const onResizeHandler = (camera, dimentions, renderer) => {
  // Update sizes
  dimentions.width = window.innerWidth;
  dimentions.height = window.innerHeight;

  // Update camera
  camera.aspect = dimentions.width / dimentions.height;
  camera.updateProjectionMatrix();

  // Update the renderer
  renderer.setSize(dimentions.width, dimentions.height);
  // Set the device pixel ration to be always (1)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
};
