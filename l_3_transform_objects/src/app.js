import * as THREE from "three";
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
// const boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
// const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const box = new THREE.Mesh(boxGeometry, boxMaterial);
// scene.add(box);

//* Transform objects (Position)
//  You can use the set() methode to set the axes (x,y,z) in one place
// box.position.set(1, 1, -1);
//  Also you can set them separatly
// box.position.x = 1.5;
// box.position.y = 1
// box.position.z = -2

//* Transform objects (Scale)
//  You can use the set() methode to set the axes (x,y,z) in one place
// box.scale.set(2, 1, 1);
//  Also you can set them separatly
// box.scale.x = 2;
// box.scale.y = 1
// box.scale.z = 1

//* Transform objects (Rotation)
//  Rotation has also (x,y,z) properties but it's a Euler
//  You can use the set() methode to set the axes (x,y,z) in one place
//! Be careful, when you rotate on an axis, you might also rotate the other axis (gimbal lock)
// box.rotation.set(0, Math.PI / 4, 0);
//  Also you can set them separatly
// box.rotate.x = 0;
// box.rotate.y = 0
// box.rotate.z = 0
//? You can set your custom axis order by using the reorder() methode
// box.rotation.reorder("YXZ");

// // You can set the transform properties of an object In any order you want

//* length()
//  The distance between the object and the center of the scene (0,0,0)
// console.log(box.position.length());

//* distanceTo
//  The distance between the object and another Vector3, it can be a custom one or just existing one ex (camera ...)
// console.log(box.position.distanceTo(camera.position));

//* Axes Helper
// The axes helper is used to help you positioned your objects in the exact position you want
// It's just a repair with the axis (x,y,z)
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

//* lookAt
//  You can use the lookAt() methode the make the camera look at a specfic object
//  The object can be a Vector3() or an existing one exp: (the box object)
// camera.lookAt(box.position); //! make sure the box is defined

// Create a group
// The group is just a combination of multiple object
// bBy using them as a group you can manage all of them at the same time
const group = new THREE.Group();
// Create the cubes
const cube1 = new Cube(1, 1, 1, 0xff0000).create();
const cube2 = new Cube(1, 1, 1, 0x00ff00).create();
const cube3 = new Cube(1, 1, 1, 0x0000ff).create();
// Positioned the cubes
cube2.position.set(1.5, 0, 0);
cube3.position.set(-1.5, 0, 0);
// Add the cubes to the group
group.add(cube1, cube2, cube3);
// Add the group to the scene
scene.add(group);

// Create the renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(dimension.width, dimension.height);
renderer.render(scene, camera);
