import * as THREE from "three";

class Plane {
  constructor(material) {
    this.material = material;
    this.geometry = new THREE.PlaneBufferGeometry(10, 10, 100, 100);
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.plane.rotation.x = -Math.PI / 2;
    this.plane.position.y = -1;
    this.plane.receiveShadow = true;

    return this.plane;
  }
}

export default Plane;
