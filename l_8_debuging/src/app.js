import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// GUI
import * as dat from "dat.gui";
// Animation
import gsap from "gsap";
// Styles
import "./global.css";

// GUI (Debug)
const gui = new dat.GUI({ closed: true, width: 300 });

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

const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100);
camera.position.set(0, 0, 3);
scene.add(camera);

// Create cube
let cube;

// Create a Useless object to help us in debuging
const params = {
  color: 0xff0000,
  methodes: {
    spin: () => {
      gsap.to(cube.rotation, { duration: 1, y: cube.rotation.y + Math.PI * 2 });
    },
  },
};

const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: params.color });
cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add debuging to cube
//* Position
gui.add(cube.position, "x").min(-3).max(3).step(0.01).name("Cube X position");
gui.add(cube.position, "y").min(-3).max(3).step(0.01).name("Cube Y position");
gui.add(cube.position, "z").min(-3).max(3).step(0.01).name("Cube Z position");
//* Visibility
gui.add(cube, "visible").name("Visibility");
//* Wireframe
gui.add(cube.material, "wireframe").name("Wireframe");
//* Color
gui.addColor(params, "color").onChange(() => {
  material.color.set(params.color);
});
//* (Functions)
gui.add(params.methodes, "spin");

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
