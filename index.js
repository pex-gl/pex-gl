/** @module pex-gl */

/**
 * Context fallbacks map
 * @constant
 */
const FALLBACKS = {
  "2d": [],
  bitmaprenderer: [],
  webgl: ["experimental-webgl"],
  webgl2: ["webgl", "experimental-webgl"],
  webgpu: [],
};

/**
 * Creates a rendering context.
 * @alias module:pex-gl.default
 * @param {import("./types.js").PexGLOptions} [opts={}]
 * @returns {RenderingContext}
 */
function createRenderingContext(opts = {}) {
  // Get options and set defaults
  const {
    width = window.innerWidth,
    height = window.innerHeight,
    pixelRatio = 1,
    fullscreen = !opts.width && !opts.height,
    type = "webgl",
    element = document.body,
    ...contextAttributes
  } = {
    ...opts,
  };

  const canvas = opts.canvas || document.createElement("canvas");

  if (!opts.canvas) {
    if (fullscreen) {
      const meta = document.createElement("meta");
      meta.setAttribute("name", "viewport");
      meta.setAttribute(
        "content",
        "width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0, shrink-to-fit=0.0",
      );
      document.head.appendChild(meta);
    }

    const appendCanvas = () => {
      if (fullscreen) {
        Object.assign(document.body.style, {
          margin: 0,
          overflow: "hidden",
          backgroundColor: "#000",
        });
      }

      element.appendChild(canvas);
    };

    if (pixelRatio !== 1) {
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
    } else {
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
    }

    if (document.body) {
      appendCanvas();
    } else {
      document.addEventListener("DOMContentLoaded", appendCanvas);
    }
  }

  const contexts = [type, ...(FALLBACKS[type] || [])];

  for (let i = 0; i < contexts.length; i++) {
    try {
      const context = canvas.getContext(contexts[i], contextAttributes);
      if (!context) throw `canvas.getContext() returned "null".`;

      console.info(`pex-gl: ${contexts[i]} ✔`);
      return context;
    } catch (error) {
      console.warn(`pex-gl: ${contexts[i]} failed ⚠`, error);
    }
  }

  console.error(`pex-gl: ${type} failed ✖`);

  return null;
}

export { FALLBACKS };

export default createRenderingContext;
