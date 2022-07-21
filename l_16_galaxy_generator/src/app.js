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

const gui = new dat.GUI({ width: 400 });

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

// Create a galaxy parametters
const parametters = {
   count: 100000,
   size: 0.01,
   attenuation: true,
   radius: 5,
   branches: 3,
   spin: 2,
   randomness: 0.2,
   randomnessPower: 3,
   insideColor: 0xff6030,
   outsideColor: 0x1b3948,
};

// Add tweaks to generat you own galaxy
gui.add(parametters, "count").min(100).max(1000000).step(50).onFinishChange(generateGalaxy);
gui.add(parametters, "size").min(0.01).max(0.2).step(0.01).onFinishChange(generateGalaxy);
gui.add(parametters, "attenuation").onFinishChange(generateGalaxy);
gui.add(parametters, "radius").min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy);
gui.add(parametters, "branches").min(2).max(20).step(1).onFinishChange(generateGalaxy);
gui.add(parametters, "spin").min(-5).max(5).step(0.001).onFinishChange(generateGalaxy);
gui.add(parametters, "randomness").min(0).max(2).step(0.001).onFinishChange(generateGalaxy);
gui.add(parametters, "randomnessPower").min(1).max(10).step(0.001).onFinishChange(generateGalaxy);
gui.addColor(parametters, "insideColor").onFinishChange(generateGalaxy);
gui.addColor(parametters, "outsideColor").onFinishChange(generateGalaxy);

//TODO Add the generate galaxy function

let galaxyGeometry = null;
let galaxyMaterial = null;
let galaxy = null;

function generateGalaxy() {
   if (galaxy) {
      galaxyGeometry.dispose();
      galaxyMaterial.dispose();
      scene.remove(galaxy);
   }
   // Create geometry
   galaxyGeometry = new THREE.BufferGeometry();
   // Create material
   galaxyMaterial = new THREE.PointsMaterial();
   galaxyMaterial.size = parametters.size;
   galaxyMaterial.sizeAttenuation = parametters.attenuation;
   galaxyMaterial.depthWrite = false;
   galaxyMaterial.blending = THREE.AdditiveBlending;
   galaxyMaterial.vertexColors = true;
   // Create Galaxy stars positions array
   const positions = new Float32Array(parametters.count * 3);
   const colors = new Float32Array(parametters.count * 3);

   // Create base colors
   const insideColor = new THREE.Color(parametters.insideColor);
   const outsideColor = new THREE.Color(parametters.outsideColor);

   // Fill the position array with random values
   for (let i = 0; i < parametters.count; i++) {
      const i3 = i * 3;

      const radius = parametters.radius * Math.random();
      const spinAngle = radius * parametters.spin;
      const branchAngle = ((i % parametters.branches) / parametters.branches) * Math.PI * 2;

      const randomX = Math.pow(Math.random(), parametters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
      const randomY = Math.pow(Math.random(), parametters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
      const randomZ = Math.pow(Math.random(), parametters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = insideColor.clone();
      mixedColor.lerp(outsideColor, radius / parametters.radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
   }
   // Add positions attribute to the geometry
   const attributes = new THREE.BufferAttribute(positions, 3);
   galaxyGeometry.setAttribute("position", attributes);
   // Add colors attributes
   const colorsAttributes = new THREE.BufferAttribute(colors, 3);
   galaxyGeometry.setAttribute("color", colorsAttributes);
   // Create the galaxy
   galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
   scene.add(galaxy);
}

generateGalaxy();

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
