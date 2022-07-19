import { PointLight as PointLightClass } from "three";

class PointLight {
  constructor(color, intensity, gui) {
    this.gui = gui;
    this.color = color;
    this.intensity = intensity;
    // Create point light
    this.light = new PointLightClass(this.color, this.intensity, 7);
    this.light.castShadow = true;
    this.light.shadow.camera.fov = 60;
    this.light.shadow.camera.far = 10;
    this.light.shadow.mapSize.width = 1024;
    this.light.shadow.mapSize.height = 1024;

    return this.light;
  }
}

export default PointLight;
