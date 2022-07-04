import * as THREE from "three";
// Components
import Plane from "./components/Plane";
import Sphere from "./components/Sphere";
import Camera from "./components/Camera";
import SpotLight from "./components/SpotLight";
import PointLight from "./components/PointLight";
import DirectionalLight from "./components/DirectionalLight";
// Utils
import { onFullScreenHandler } from "./utils/onFullScreenHandler";
import { onResizeHandler } from "./utils/onResizeHandler";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// GUI
import * as dat from "dat.gui";
// Styles
import "./global.css";

const gui = new dat.GUI();
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
// Camera
const camera = new Camera(aspect);
scene.add(camera);
// Load textures
const loaderManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loaderManager);
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);
//? Directional Light
const dirLight = new DirectionalLight(0xffffff, 0.3, gui);
scene.add(dirLight);
//! Directional light shadow camera helper
// const dirLightCameraHelper = new THREE.CameraHelper(dirLight.shadow.camera);
// scene.add(dirLightCameraHelper);
//? Spot Light
const { spotLight, spotLightTarget } = new SpotLight(0xffffff, 0.3, gui);
scene.add(spotLight);
//! Spot light shadow camera helper
// const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
// scene.add(spotLightCameraHelper);
//? Point Light
const pointLight = new PointLight(0xffffff, 0.3);
scene.add(pointLight);
//! Point light shadow camera helper
// const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
// scene.add(pointLightCameraHelper);
//* ADD SHADOW BY USING BAKING
const bakedShadow = textureLoader.load("/textures/simpleShadow.jpg");

//* Mesh Standard Material
const material = new THREE.MeshStandardMaterial();
material.metalness = 0;
material.roughness = 1;

// Sphere
const sphere = new Sphere(material, 1, 64, 32);
scene.add(sphere);
// Sphere shadow
const sphereShadow = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(3, 3),
  new THREE.MeshBasicMaterial({
    color: 0x000000,
    alphaMap: bakedShadow,
    transparent: true,
  })
);
sphereShadow.rotation.x = -Math.PI / 2;
sphereShadow.position.y = -0.999;
scene.add(sphereShadow);

// Plane
const plane = new Plane(material);
scene.add(plane);

// Create the renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.shadowMap.enabled = false;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(dimension.width, dimension.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));

function onResize() {
  onResizeHandler(camera, dimension, renderer);
}
// Listen to resize event
window.addEventListener("resize", onResize);

function toggleFullScreen() {
  onFullScreenHandler(canvas);
}
// Listen to dblclikc event
window.addEventListener("dblclick", toggleFullScreen);

//* Add controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const clock = new THREE.Clock();

const gameLoop = () => {
  const elapsedTime = clock.getElapsedTime();
  // Update the sphere
  sphere.position.x = Math.cos(elapsedTime) * 3;
  sphere.position.z = Math.sin(elapsedTime) * 3;
  sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));
  // Update shadow
  sphereShadow.position.x = sphere.position.x;
  sphereShadow.position.z = sphere.position.z;
  sphereShadow.material.opacity = (1 - sphere.position.y) * 0.4;

  // Update controls
  controls.update();
  // Render
  renderer.render(scene, camera);
  // Call it again on the next frame
  requestAnimationFrame(gameLoop);
};
gameLoop();
