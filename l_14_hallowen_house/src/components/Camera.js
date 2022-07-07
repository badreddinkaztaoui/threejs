import { PerspectiveCamera } from "three";

class Camera {
  constructor(aspect) {
    this.aspect = aspect;
    this.camera = new PerspectiveCamera(45, this.aspect, 0.1, 100);
    this.camera.position.y = 40;
    this.camera.position.z = 13;
    this.camera.position.x = 20;

    return this.camera;
  }
}

export default Camera;
