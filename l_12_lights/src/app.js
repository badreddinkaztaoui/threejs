import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// GUI
import * as dat from "dat.gui";
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

const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
// position and point the camera to the center
camera.position.x = 15;
camera.position.y = 16;
camera.position.z = 13;
camera.lookAt(scene.position);
scene.add(camera);

// Load textures
const loaderManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loaderManager);

// TODO Add lights
// Ambient light
const ambientLight = new THREE.AmbientLight(0x9c6fff, 0.5);
scene.add(ambientLight);
// Directional Light
const directionalLight = new THREE.DirectionalLight(0x9c6fff, 0.5);
scene.add(directionalLight);
// Hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
scene.add(hemisphereLight);
// Point light
const pointLight = new THREE.PointLight(0x4e00ff, 1);
scene.add(pointLight);
// Rect Area Light
const rectAreaLight = new THREE.RectAreaLight(0xff0000, 10, 2, 2);
// scene.add(rectAreaLight);
// Spot Light
const spotLight = new THREE.SpotLight(0xff0000, 2, 20, Math.PI * 0.1, 0.25, 1);
spotLight.position.set(0, 4, 10);
scene.add(spotLight);
scene.add(spotLight.target);

//* Mesh Standard Material
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.3;
material.roughness = 0;
// material.side = THREE.DoubleSide;

//? ADD DEBUGER GUI TO CONTROL THE MATERIAL
const gui = new dat.GUI();
// Metalness
gui.add(material, "metalness").min(0).max(1).step(0.001);
// Roughness
gui.add(material, "roughness").min(0).max(1).step(0.001);

// Create group
const group = new THREE.Group();

// Sphere
const sphereGeometry = new THREE.SphereBufferGeometry(1, 64, 32);
const sphere = new THREE.Mesh(sphereGeometry, material);
// Cube
const cubeGeometry = new THREE.BoxBufferGeometry(2, 2, 2);
const cube = new THREE.Mesh(cubeGeometry, material);
// Plane
const planGeometry = new THREE.PlaneBufferGeometry(10, 10, 100, 100);
const plane = new THREE.Mesh(planGeometry, material);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -2;
// plane.geometry.setAttribute(
//   "uv2",
//   new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
// );
// Torus
const torusGeometry = new THREE.TorusGeometry(1, 0.5, 16, 32);
const torus = new THREE.Mesh(torusGeometry, material);

group.add(cube, torus, plane, sphere);

sphere.position.x = -3;
torus.position.x = 3;

// Add group to the scene
scene.add(group);

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
  const fullscreenElement = document.fullscreenElement;
  if (!fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }

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

const clock = new THREE.Clock();

const gameLoop = () => {
  const elapsedTime = clock.getElapsedTime();

  // group.rotation.x = elapsedTime * 0.15;
  // group.rotation.y = elapsedTime * 0.15;

  // Update controls
  controls.update();
  // Render
  renderer.render(scene, camera);
  // Call it again on the next frame
  requestAnimationFrame(gameLoop);
};
gameLoop();
