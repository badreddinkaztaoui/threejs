import { SphereBufferGeometry, Mesh } from "three";

class Sphere {
  constructor(material, radius, vertices, segments) {
    this.material = material;
    this.radius = radius;
    this.vertices = vertices;
    this.segments = segments;
    this.geometry = new SphereBufferGeometry(
      this.radius,
      this.vertices,
      this.segments
    );
    this.sphere = new Mesh(this.geometry, this.material);
    this.sphere.castShadow = true;

    return this.sphere;
  }
}

export default Sphere;
