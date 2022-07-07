import { Float32BufferAttribute } from "three";

export const createUv2 = (mesh) => {
  mesh.geometry.setAttribute(
    "uv2",
    new Float32BufferAttribute(mesh.geometry.attributes.uv.array, 2)
  );
};
