import { SpotLight as SpotLightClass } from "three";

class SpotLight {
  constructor(color, intensity, gui) {
    this.gui = gui;
    this.color = color;
    this.intensity = intensity;
    // Create spot light
    this.light = new SpotLightClass(
      this.color,
      this.intensity,
      10,
      Math.PI * 0.3
    );
    this.light.castShadow = true;
    this.light.shadow.camera.fov = 30;
    this.light.shadow.camera.far = 10;
    this.light.shadow.mapSize.width = 1024;
    this.light.shadow.mapSize.height = 1024;
    this.light.position.set(2, 2, 2);
    // Create spot light target
    this.spotLightTarget = this.light.target;

    return {
      spotLight: this.light,
      spotLightTarget: this.spotLightTarget,
    };
  }
}

export default SpotLight;
