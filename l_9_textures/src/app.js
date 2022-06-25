import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// Animation
import gsap from "gsap";
// Styles
import "./global.css";

// Canvas (Root element - where our scene will append)
const canvas = document.getElementById("canvas");

// Scene dimension
const dimension = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Calculate the aspect ration
const aspect = dimension.width / dimension.height;

// Create the scene
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
// position and point the camera to the center
camera.position.x = 15;
camera.position.y = 16;
camera.position.z = 13;
camera.lookAt(scene.position);
scene.add(camera);

//TODO: Let's use a loading manager
const loadingManager = new THREE.LoadingManager();

// Load texture
//* First methode: using native javascript (Image class)
// const image = new Image();
// const texture = new THREE.Texture(image);

// image.onload = () => {
//   console.log("Image is loaded ✅");
//   texture.needsUpdate = true;
//   console.log("Texture is loaded ✅");
// };

// image.src = "/textures/door/color.jpg";
//* Seconde methode (Recommended): using threejs (TextureLoader class)
const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load("/textures/minecraft.png");
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const ambientTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

// Let's keep track and watch all our loaded items (Loading manager)
loadingManager.onStart = () => {
  console.log("Start");
};
loadingManager.onLoad = () => {
  console.log("Loading");
};
loadingManager.onProgress = () => {
  console.log("Progress");
};
loadingManager.onError = (error) => {
  console.log(error);
};

// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;
// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;
// colorTexture.rotation = Math.PI / 4;
// colorTexture.center.set(0.5, 0.5);
colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;
colorTexture.generateMipmaps = false;

const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Create the renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(dimension.width, dimension.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));

function onResizeHandler() {
  // Update sizes
  dimension.width = window.innerWidth;
  dimension.height = window.innerHeight;

  // Update camera
  camera.aspect = dimension.width / dimension.height;
  camera.updateProjectionMatrix();

  // Update the renderer
  renderer.setSize(dimension.width, dimension.height);
  // Set the device pixel ration to be always (1)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
}

function toggleFullScreen() {
  //* For most and new browsers
  const fullscreenElement = document.fullscreenElement;
  if (!fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }

  //! This is for browser support (Safari older versions doesn't support fullScreen() methodes)
  const webkitFullScreenElement = document.webkitFullScreenElement;
  if (!webkitFullScreenElement) {
    canvas.webkitRequestFullscreen();
  } else {
    document.webkitExitFullscreen();
  }
}

// Listen to resize event
window.addEventListener("resize", onResizeHandler);
// Listen to dblclikc event
window.addEventListener("dblclick", toggleFullScreen);

//* Add controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const gameLoop = () => {
  // Update controls
  controls.update();
  // Render
  renderer.render(scene, camera);
  // Call it again on the next frame
  requestAnimationFrame(gameLoop);
};
gameLoop();
