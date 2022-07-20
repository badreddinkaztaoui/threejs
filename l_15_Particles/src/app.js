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

// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Load Textures
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

const particleTexture = textureLoader.load("/textures/particles/2.png");

// Create particles
// //TODO Create particles geometry
// const particlesGeometry = new THREE.SphereBufferGeometry(1, 32, 32);

// //TODO Create particles Material
// const particlesMaterial = new THREE.PointsMaterial({ color: 0xff00ff });
// particlesMaterial.size = 0.02;
// particlesMaterial.sizeAttenuation = true;

// //TODO Create particles
// const particles = new THREE.Points(particlesGeometry, particlesMaterial);
// scene.add(particles);
const count = 10000;

const particlesGeometry = new THREE.BufferGeometry();

const positions = new Float32Array(count * 3);
const colorsPositions = new Float32Array(count * 3);

for (let i = 0; i < count; i++) {
  const radius = Math.random() * 50;

  const i3 = i * 3;
  positions[i3 + 0] = (Math.random() - 0.5) * radius;
  positions[i3 + 1] = (Math.random() - 0.5) * radius;
  positions[i3 + 2] = (Math.random() - 0.5) * radius;

  colorsPositions[i3 + 0] = Math.random();
  colorsPositions[i3 + 1] = Math.random();
  colorsPositions[i3 + 2] = Math.random();
}

const attributes = new THREE.BufferAttribute(positions, 3);
const colors = new THREE.BufferAttribute(colorsPositions, 3);

particlesGeometry.setAttribute("position", attributes);
particlesGeometry.setAttribute("color", colors);

const particlesMaterial = new THREE.PointsMaterial();
// particlesMaterial.color = new THREE.Color(0x00ffff); //! Don't use it when using vertex colors
particlesMaterial.size = 0.1;
particlesMaterial.sizeAttenuation = true;
particlesMaterial.transparent = true;
particlesMaterial.alphaMap = particleTexture;
// particlesMaterial.alphaTest = 0.001;
// particlesMaterial.depthTest = false;
particlesMaterial.depthWrite = false;
particlesMaterial.blending = THREE.AdditiveBlending;
particlesMaterial.vertexColors = true;

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Create the renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(dimension.width, dimension.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
// renderer.setClearColor(0xeeeeee);

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

  // Update controls
  controls.update();
  // Render
  renderer.render(scene, camera);
  // Call it again on the next frame
  requestAnimationFrame(gameLoop);
};
gameLoop();
