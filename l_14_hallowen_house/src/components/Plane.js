import { Mesh, MeshStandardMaterial, PlaneBufferGeometry } from "three";
import { grassTexture } from "../mocks/textures";
import { createUv2 } from "../utils/createUv2";

class Plane {
  constructor() {
    this.material = new MeshStandardMaterial();
    this.material.map = grassTexture.color;
    this.material.aoMap = grassTexture.aoMap;
    this.material.roughness = grassTexture.roughness;
    this.material.normalMap = grassTexture.normal;
    // Plan geometry
    this.geometry = new PlaneBufferGeometry(80, 80, 100, 100);
    this.plane = new Mesh(this.geometry, this.material);
    this.plane.position.y = 0;
    this.plane.rotation.x = -Math.PI / 2;
    this.plane.receiveShadow = true;
    createUv2(this.plane);

    return this.plane;
  }
}

export default Plane;
