import * as THREE from "three";
// Components
import Plane from "./components/Plane";
import Camera from "./components/Camera";
import DirectionalLight from "./components/lights/DirectionalLight";
// Utils
import { onFullScreenHandler } from "./utils/onFullScreenHandler";
import { onResizeHandler } from "./utils/onResizeHandler";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// GUI
import * as dat from "dat.gui";
// Animation
import gsap, { Power4 } from "gsap";
// Styles
import "./global.css";
import House from "./components/house";
import Bushe from "./components/bushe";
import PointLight from "./components/lights/PointLight";

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

// Ambient light
const ambientLight = new THREE.AmbientLight("#553772", 0.2);
scene.add(ambientLight);

// Moon Light
const moonLight = new DirectionalLight(0xffffff, 0.5, gui);
scene.add(moonLight);

// Door light
const doorLight = new PointLight("red", 1);
doorLight.position.set(0, 2.9, 3);
scene.add(doorLight);

// Plane
const plane = new Plane();
scene.add(plane);

// Create a house
const house = new House();
scene.add(house);

// Create bushes
const bushe1 = new Bushe(0.5);
bushe1.position.set(1.2, 0.2, 2.1);
const bushe2 = new Bushe(0.3);
bushe2.position.set(1.8, 0.2, 2);
const bushe3 = new Bushe(0.34);
bushe3.position.set(-1.3, 0.2, 2.1);
const bushe4 = new Bushe(0.25);
bushe4.position.set(-1.7, 0.2, 2);
// Add bushes to the scene
scene.add(bushe1, bushe2, bushe3, bushe4);

// Create graves
//* Create graves group
const graves = new THREE.Group();

const graveMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
const graveGeometry = new THREE.BoxBufferGeometry(0.4, 0.8, 0.2);

for (let i = 0; i < 50; i++) {
  const angle = Math.PI * 2 * Math.random();
  const radius = 4 + Math.random() * 7;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.rotation.z = Math.random() - 0.5;
  grave.position.set(x, 0.2, z);
  grave.castShadow = true;
  graves.add(grave);
}

scene.add(graves);

// Create FOG
const fog = new THREE.Fog("#262837", 2, 80);
scene.fog = fog;

// Create the renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(dimension.width, dimension.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
renderer.setClearColor("#262837");

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
controls.maxPolarAngle = Math.PI / 2.2;
controls.maxDistance = 50;
controls.minDistance = 4;

const clock = new THREE.Clock();

gsap.to(camera.position, {
  y: 5,
  x: 2,
  duration: 6,
  ease: Power4.easeInOut,
});

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
