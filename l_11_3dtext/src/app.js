import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
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
// camera.position.x = 15;
// camera.position.y = 16;
// camera.position.z = 13;
// camera.lookAt(scene.position);
camera.position.z = 9;
// camera.position.z = 3;
scene.add(camera);

// TODO Add lights
// Ambient light
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// Load textures
const loaderManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loaderManager);
const matcapTexture = textureLoader.load("/textures/matcaps/6.png");
matcapTexture.magFilter = THREE.NearestFilter;
matcapTexture.minFilter = THREE.NearestFilter;
matcapTexture.generateMipmaps = false;

const material = new THREE.MeshNormalMaterial();
const matMaterial = new THREE.MeshMatcapMaterial();
matMaterial.matcap = matcapTexture;

//* Add Font Loader
const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  console.log("Font loaded ✅");
  const textGeometry = new TextGeometry("Badr.\nEddin\nKaztaoui", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  //* First way to center text geometry
  // textGeometry.computeBoundingBox();
  // textGeometry.translate(
  //   -((textGeometry.boundingBox.max.x - 0.02) / 2),
  //   -((textGeometry.boundingBox.max.y - 0.02) / 2),
  //   -((textGeometry.boundingBox.max.z - 0.03) / 2)
  // );
  //* Seconde way (Easiest)
  textGeometry.center();

  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);
});

// Create donuts geometry
const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);

console.time("Donut");

for (let i = 0; i < 100; i++) {
  const donut = new THREE.Mesh(donutGeometry, matMaterial);

  donut.position.x = (Math.random() * 2 - 1) * 10;
  donut.position.y = (Math.random() * 2 - 1) * 10;
  donut.position.z = (Math.random() * 2 - 1) * 10;

  donut.rotation.x = Math.random() * Math.PI;
  donut.rotation.y = Math.random() * Math.PI;

  const scale = Math.random();
  donut.scale.set(scale, scale, scale);

  scene.add(donut);
}

console.timeEnd("Donut");

// Create the renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(dimension.width, dimension.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
renderer.setClearColor(0xeeeeee);

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
controls.maxDistance = 15;
controls.minDistance = 3;
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
