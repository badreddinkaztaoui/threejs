import {
  BoxBufferGeometry,
  ConeBufferGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneBufferGeometry,
} from "three";
import { doorTexture, roofTexture, wallsTexture } from "../../mocks/textures";
import { createUv2 } from "../../utils/createUv2";

class House {
  constructor() {
    // Create the house group
    this.house = new Group();

    // Create the walls
    this.wallsMaterial = new MeshStandardMaterial();
    this.wallsMaterial.map = wallsTexture.color;
    this.wallsMaterial.normalMap = wallsTexture.normal;
    this.wallsMaterial.metalnessMap = wallsTexture.metalness;
    this.wallsMaterial.aoMap = wallsTexture.aoMap;
    this.wallsMaterial.transparent = true;
    // Walls geometry
    this.wallsGeometry = new BoxBufferGeometry(4, 3, 4);
    this.walls = new Mesh(this.wallsGeometry, this.wallsMaterial);
    this.walls.position.y = 3 / 2;
    this.walls.castShadow = true;
    this.walls.receiveShadow = true;
    createUv2(this.walls);

    // Add the walls to the house
    this.house.add(this.walls);
    // Create the roof
    this.roofMaterial = new MeshStandardMaterial({ color: "tomato" });
    this.roofMaterial.map = roofTexture.color;
    this.roofMaterial.alphaMap = roofTexture.alpha;
    // Roof geometry
    this.roofGeometry = new ConeBufferGeometry(3.5, 1, 4);
    this.roof = new Mesh(this.roofGeometry, this.roofMaterial);
    this.roof.position.y = 3 + 1 / 2;
    this.roof.rotation.y = Math.PI / 4;
    this.roof.castShadow = true;
    createUv2(this.roof);
    // Create the Door\
    this.doorMaterial = new MeshStandardMaterial();
    this.doorMaterial.map = doorTexture.color;
    this.doorMaterial.aoMap = doorTexture.aoMap;
    this.doorMaterial.alphaMap = doorTexture.alpha;
    this.doorMaterial.normalMap = doorTexture.normal;
    this.doorMaterial.displacementMap = doorTexture.height;
    this.doorMaterial.metalnessMap = doorTexture.metalness;
    this.doorMaterial.roughnessMap = doorTexture.roughness;
    this.doorMaterial.displacementScale = 0.12;
    this.doorMaterial.transparent = true;
    // Door Geometry
    this.doorGeometry = new PlaneBufferGeometry(2, 2, 80, 80);
    this.door = new Mesh(this.doorGeometry, this.doorMaterial);
    this.door.position.y = 2 / 2;
    this.door.position.z = 4 / 2 + 0.005;
    this.door.castShadow = true;
    createUv2(this.door);
    // Add the door to the house
    this.house.add(this.door);

    // Add the roof to the house
    this.house.add(this.roof);

    return this.house;
  }
}

export default House;
