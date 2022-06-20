import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Canvas (Root element - where our scene will append)
const canvas = document.getElementById("canvas");

// Scene dimension
const dimension = {
  width: 800,
  height: 600,
};

// Cordinates
const cordinates = {
  x: 0,
  y: 0,
};

// Calculate the aspect ration
const aspect = dimension.width / dimension.height;

// Create the scene
const scene = new THREE.Scene();

// Create the camera
// Types of cameras
//? 1 - Array camera
//  Render the scene from multiple cameras on specific areas of the render
//? 2 - Stereo camera
//  Render the scene through two cameras that mimic the eyes to creat parallex effect
//! Used with devices like VR headseats, red & blue glasses, cardboards...
//? 3 - Cube camera
// It create 6 renders, each one facing different direction
//? 4 - Orthographic camera
// Render the scene without perspective
//? 5 - Perspective camera

//TODO 99% of projects, we will use the Orthographic and Perspective cameras

//* Orthographic camera
// Orthographic camera takes 6 parameters

/**
 * 1. left   : Camera frustum left plane
 * 2. right  : Camera frustum right plane
 * 3. top    : Camera frustum top plane
 * 4. bottom : Camera frustum bottom plane
 * 5. near   : How close the camera ca see
 * 6. far    : How far away the camera can see
 * !Note: Don't use value like 0.00001 or 9999999 on far and near to prevent the (Z-Fighting problem)
 */
// const camera = new THREE.OrthographicCamera(
//   -1 * aspect,
//   1 * aspect,
//   1,
//   -1,
//   0.1,
//   100
// );
// camera.position.set(0, 0, 3);
// scene.add(camera);

//* Perspective camera
// Perspective camera takes 4 parameters
/**
 * 1. fov           : Field Of View
 * 2. Aspect ration : The width of render divided by the height of the render
 * 3. near          : How close the camera ca see
 * 4. far           : How far away the camera can see
 * !Note: Don't use value like 0.00001 or 9999999 on far and near to prevent the (Z-Fighting problem)
 */
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100);
camera.position.set(0, 0, 3);
scene.add(camera);

// Create a Box
const boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

// Create the renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(dimension.width, dimension.height);

// Clock
// const clock = new THREE.Clock();

// Cursor (Movement detection)
// window.addEventListener("mousemove", (e) => {
//   // Dimensions
//   const { width, height } = dimension;
//   // Detect cursor position
//   if (e.target === canvas) {
//     cordinates.x = e.clientX / width - 0.5;
//     cordinates.y = e.clientY / height - 0.5;
//   }
// });

//* Add controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const gameLoop = () => {
  // const elapsedTime = clock.getElapsedTime();
  // camera.position.x = Math.sin(cordinates.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cordinates.x * Math.PI * 2) * 3;
  // camera.position.y = cordinates.y * 5;
  // // Look at the object when rotating
  // camera.lookAt(box.position);

  // Update controls
  controls.update();
  // Render
  renderer.render(scene, camera);
  // Call it again on the next frame
  requestAnimationFrame(gameLoop);
};
gameLoop();
