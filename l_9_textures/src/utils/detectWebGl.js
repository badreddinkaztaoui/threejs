export const isWebGlExist = () => {
  const canvas = document.createElement("canvas");

  const hasWebGl = canvas.getContext("webgl");
  const hasWebGl2 = canvas.getContext("webgl2");

  return hasWebGl || hasWebGl2;
};
