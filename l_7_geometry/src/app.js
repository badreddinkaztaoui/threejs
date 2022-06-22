import * as THREE from "three";
import { BufferGeometry, Mesh } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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

const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100);
camera.position.set(0, 0, 3);
scene.add(camera);

// Create new Geometry
//! NOTE : We don't use Geometry class Anymore
//* Use BufferGeometry instad
//? So let's create a Buffer geometry
// We are going to use Float32Array
/**
 *   Float32Array
 *   ============
 * - Typed array
 * - Can only store floats
 * - Fixed length
 * - Easier to handle for the computer
 */

// const positionsArray = new Float32Array(9);
// // Vertex number 1
// positionsArray[0] = 0;
// positionsArray[1] = 0;
// positionsArray[2] = 0;
// // Vertex number 2
// positionsArray[3] = 0;
// positionsArray[4] = 1;
// positionsArray[5] = 0;
// // Vertex number 3
// positionsArray[6] = 1;
// positionsArray[7] = 0;
// positionsArray[8] = 0;
// //! You can directly use
// // positionsArray = [0,0,0,0,1,0,1,0,0]
// /**
//  * * So! Generaly, we are using this float32array to store all our needed vertices coordinates.
//  * * And because we are working on 3D space, then each vertex will take 3 cases in this float32array
//  * * it will be something like this [x1,y1,z1, x2,y2,z2, x3,y3,z3, ..., xn,yn,zn]
//  */
// // Convert this vertices array to a BufferAttribute
// /**
//  * ? Now that we already have all vertices and there position,
//  * ? we will convert them to a ThreeJs Buffer attribute, so we can see our object
//  * ? For that we will use the BufferAttribute class
//  * ? It takes at least 2 args:
//  *    - position array: our float32Array
//  *    - dimention     : in this case we are working 3D so it will be (3)
//  */
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);

// // Let's create the geometry and the material
const geometry = new THREE.BufferGeometry();
// geometry.setAttribute("position", positionsAttribute);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
// // Create a simple triangle
// const triangle = new THREE.Mesh(geometry, material);
// scene.add(triangle);

//TODO : Now, we know how to create an object using BufferGeometry.
//TODO : Let's create a lot of objects now.\

// We will create 50 triangle
let objectsCount = 50;
// For that every triangle need 3 vertices
let triangleVertices = 3;
// Each vertex need 3 points in the space, (we are working on 3D remember)
let triangleCoordinates = triangleVertices * 3;
// Total coordinates
let coordinates = objectsCount * triangleCoordinates;
// Now let's create the positions array
let positionsArray = new Float32Array(coordinates);
// Fill the positions array with random values
for (let i = 0; i < coordinates; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 4;
}
// Let's create a positions attribute
const positionsAttribute = new THREE.BufferAttribute(
  positionsArray,
  triangleVertices
);
geometry.setAttribute("position", positionsAttribute);
// Add our triangles to the scene
const triangles = new THREE.Mesh(geometry, material);
scene.add(triangles);

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
