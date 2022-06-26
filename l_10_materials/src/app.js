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
// camera.position.z = 3;
scene.add(camera);

// Load textures
const loaderManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loaderManager);
const matcapTexture = textureLoader.load("/textures/matcaps/8.png");
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const colorTexture = textureLoader.load("/textures/door/color.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const gradientTexture = textureLoader.load("/textures/gradients/5.jpg");
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const ambientTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);

//* ADD ENVIRENMENT MAPS
const cubeTexturesLoader = new THREE.CubeTextureLoader();
const envMapTexture = cubeTexturesLoader
  .setPath("/textures/environmentMaps/1/")
  .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);

// TODO Add lights
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
// Point light
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);
//

// Create new material
//* Mesh Basic Material
// const material = new THREE.MeshBasicMaterial();
// material.map = colorTexture;
// material.side = THREE.DoubleSide;
// material.transparent = true;
// material.alphaMap = alphaTexture;

//* Mesh Normal Material
// const material = new THREE.MeshNormalMaterial();
// material.side = THREE.DoubleSide;
// material.flatShading = true;

//* Mesh Matcap Material
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

//* Mesh Depth Material
// const material = new THREE.MeshDepthMaterial();

//* Mesh Lambert Material
// const material = new THREE.MeshLambertMaterial();

//* Mesh Phong Material
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0x00ff00);

//* Mesh Toon Material
// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture;

//* Mesh Standard Material
const material = new THREE.MeshStandardMaterial();
material.envMap = envMapTexture;
// material.side = THREE.DoubleSide;
// material.map = colorTexture;
// material.aoMap = ambientTexture;
// material.displacementMap = heightTexture;
// material.displacementScale = 0.05;
// material.metalnessMap = metalnessTexture;
// material.roughnessMap = roughnessTexture;
// material.normalMap = normalTexture;
// material.alphaMap = alphaTexture;
// material.transparent = true;

//? ADD DEBUGER GUI TO CONTROL THE MATERIAL
const gui = new dat.GUI();
// Metalness
gui.add(material, "metalness").min(0).max(1).step(0.001);
// Roughness
gui.add(material, "roughness").min(0).max(1).step(0.001);
// Ambient Occlusion Intensity
gui.add(material, "aoMapIntensity").min(0).max(5).step(0.001);
// Displacement scale
gui.add(material, "displacementScale").min(0).max(0.2).step(0.001);

// Sphere
const sphereGeometry = new THREE.SphereBufferGeometry(1, 64, 32);
const sphere = new THREE.Mesh(sphereGeometry, material);
// Plan
const planGeometry = new THREE.PlaneBufferGeometry(1, 1, 100, 100);
const plane = new THREE.Mesh(planGeometry, material);
plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);
// Torus
const torusGeometry = new THREE.TorusGeometry(2, 1, 16, 100);
const torus = new THREE.Mesh(torusGeometry, material);

const group = new THREE.Group();
group.add(torus, sphere);

sphere.position.x = -5;
torus.position.x = 5;

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
