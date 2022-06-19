import * as THREE from "three";
import gsap, { Power4 } from "gsap";
import Cube from "./components/Box";

// Canvas (Root element - where our scene will append)
const canvas = document.getElementById("canvas");

// Scene dimension
const dimension = {
  width: 800,
  height: 600,
};

// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(
  75,
  dimension.width / dimension.height
);
camera.position.set(0, 0, 3);
scene.add(camera);

// Create a Box
const box = new Cube(1, 1, 1, 0xff0000).create();
scene.add(box);

// Create the renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(dimension.width, dimension.height);

// Time
//* Vanilla JS
// let time = Date.now();

const clock = new THREE.Clock();

// Use GSAP for animate objects
gsap.to(box.position, { x: 2, duration: 1, ease: Power4.easeIn });

// Animation
const gameLoop = () => {
  //* Vanilla JS
  //  const currentTime = Date.now();
  //  const deltaTime = currentTime - time;
  //  time = currentTime;

  const elapsedTime = clock.getElapsedTime();

  // Update objects position (animate)
  // box.rotation.y = elapsedTime;

  renderer.render(scene, camera);

  window.requestAnimationFrame(gameLoop);
};

gameLoop();
