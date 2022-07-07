import * as THREE from "three";

class DirectionalLight {
  constructor(color, intensity, gui) {
    this.gui = gui;
    this.color = color;
    this.intensity = intensity;
    // Create light
    this.light = new THREE.DirectionalLight(this.color, this.intensity);
    this.light.position.set(-1.2, 2, -0.8);
    this.light.castShadow = true;
    this.light.shadow.mapSize.width = 1024;
    this.light.shadow.mapSize.height = 1024;
    this.light.shadow.camera.top = 5;
    this.light.shadow.camera.right = 5;
    this.light.shadow.camera.bottom = -5;
    this.light.shadow.camera.left = -5;
    this.light.shadow.camera.near = 2;
    this.light.shadow.camera.far = 8;
    // Create light controls
    this.folder = this.gui.addFolder("Directional Light");
    this.folder.add(this.light, "intensity").min(0).max(1).step(0.001);
    this.folder.add(this.light.position, "x").min(-5).max(5).step(0.001);
    this.folder.add(this.light.position, "y").min(-5).max(5).step(0.001);
    this.folder.add(this.light.position, "z").min(-5).max(5).step(0.001);

    return this.light;
  }
}

export default DirectionalLight;
