import * as THREE from "three";

class Cube {
  constructor(width, height, depth, color) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.color = color;
  }

  create = () => {
    const geometry = new THREE.BoxBufferGeometry(
      this.width,
      this.height,
      this.depth
    );
    const material = new THREE.MeshBasicMaterial({ color: this.color });
    const cube = new THREE.Mesh(geometry, material);

    return cube;
  };
}

export default Cube;
