import { SphereBufferGeometry, Mesh, MeshStandardMaterial, Color } from "three";

class Bushe {
  constructor(scale) {
    this.scale = scale;
    this.material = new MeshStandardMaterial();
    this.material.color = new Color(0x009900);

    // Bushe geometry
    this.geometry = new SphereBufferGeometry(1, 16, 16);
    this.sphere = new Mesh(this.geometry, this.material);
    this.sphere.scale.set(this.scale, this.scale, this.scale);
    this.sphere.castShadow = true;

    return this.sphere;
  }
}

export default Bushe;
