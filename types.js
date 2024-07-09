/**
 * @typedef {object} PexGLOptions Options for context creation. All optional.
 * @property {number} [width=window.innerWidth] Request an initial canvas width.
 * @property {number} [height=window.innerHeight] Request an initial canvas height.
 * @property {boolean} [pixelRatio=1] Multiply canvas dimensions with a given ratio.
 * @property {boolean} [fullscreen=!opts.width && !opts.height] Make the canvas fullscreen.
 * @property {"2d" | "bitmaprenderer" | "webgl" | "webgl2" | "webgpu"} [type="webgl"] A "contextType" for getContext.
 * @property {HTMLElement} [element=document.body] Element to append the canvas to.
 * @property {...(CanvasRenderingContext2DSettings | WebGLContextAttributes)} [contextAttributes={}] Attributes to be passed to getContext.
 */

export {};
