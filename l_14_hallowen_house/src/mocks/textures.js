import { LoadingManager, RepeatWrapping, TextureLoader } from "three";

// Load textures
const loaderManager = new LoadingManager();
const textureLoader = new TextureLoader(loaderManager);

const doorTexture = {
  color: textureLoader.load("/textures/door/color.jpg"),
  normal: textureLoader.load("/textures/door/normal.jpg"),
  height: textureLoader.load("/textures/door/height.jpg"),
  roughness: textureLoader.load("/textures/door/roughness.jpg"),
  metalness: textureLoader.load("/textures/door/metalness.jpg"),
  aoMap: textureLoader.load("/textures/door/ambientOcclusion.jpg"),
  alpha: textureLoader.load("/textures/door/alpha.jpg"),
};

const wallsTexture = {
  color: textureLoader.load("/textures/bricks/color.jpg"),
  normal: textureLoader.load("/textures/bricks/normal.jpg"),
  roughness: textureLoader.load("/textures/bricks/roughness.jpg"),
  aoMap: textureLoader.load("/textures/bricks/ambientOcclusion.jpg"),
};

const roofTexture = {
  color: textureLoader.load("/textures/roof/color.jpg"),
  normal: textureLoader.load("/textures/roof/normal.jpg"),
  height: textureLoader.load("/textures/roof/height.jpg"),
  alpha: textureLoader.load("/textures/roof/alpha.jpg"),
};

roofTexture.color.repeat.set(6, 6);
roofTexture.normal.repeat.set(6, 6);
roofTexture.height.repeat.set(6, 6);
roofTexture.alpha.repeat.set(6, 6);

roofTexture.color.wrapS = RepeatWrapping;
roofTexture.normal.wrapS = RepeatWrapping;
roofTexture.height.wrapS = RepeatWrapping;
roofTexture.alpha.wrapS = RepeatWrapping;

roofTexture.color.wrapT = RepeatWrapping;
roofTexture.normal.wrapT = RepeatWrapping;
roofTexture.height.wrapT = RepeatWrapping;
roofTexture.alpha.wrapT = RepeatWrapping;

const grassTexture = {
  color: textureLoader.load("/textures/grass/color.jpg"),
  normal: textureLoader.load("/textures/grass/normal.jpg"),
  roughness: textureLoader.load("/textures/grass/roughness.jpg"),
  aoMap: textureLoader.load("/textures/grass/ambientOcclusion.jpg"),
};

grassTexture.color.repeat.set(8, 8);
grassTexture.normal.repeat.set(8, 8);
grassTexture.roughness.repeat.set(8, 8);
grassTexture.aoMap.repeat.set(8, 8);

grassTexture.color.wrapS = RepeatWrapping;
grassTexture.normal.wrapS = RepeatWrapping;
grassTexture.roughness.wrapS = RepeatWrapping;
grassTexture.aoMap.wrapS = RepeatWrapping;

grassTexture.color.wrapT = RepeatWrapping;
grassTexture.normal.wrapT = RepeatWrapping;
grassTexture.roughness.wrapT = RepeatWrapping;
grassTexture.aoMap.wrapT = RepeatWrapping;

export { doorTexture, wallsTexture, grassTexture, roofTexture };
