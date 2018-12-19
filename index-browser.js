const assert = require('assert')

function createGL (opts) {
  assert(!opts || (typeof opts === 'object'), 'pex-gl: createGL requires opts argument to be null or an object')
  if (!opts) opts = {}

  let canvas = opts.canvas
  const pixelRatio = opts.pixelRatio || 1
  const fullscreen = !opts.width && !opts.height

  if (!canvas) {
    canvas = document.createElement('canvas')

    if (fullscreen) {
      const meta = document.createElement('meta')
      meta.setAttribute('name', 'viewport')
      meta.setAttribute('content', 'width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0, shrink-to-fit=0.0')
      document.head.appendChild(meta)
    }
    const appendCanvas = () => {
      if (fullscreen) {
        document.body.style.margin = '0px'
        document.body.style.overflow = 'hidden'
        document.body.style.background = '#000'
      }
      document.body.appendChild(canvas)
    }

    const W = opts.width || window.innerWidth
    const H = opts.height || window.innerHeight

    if (pixelRatio !== 1) {
      canvas.style.width = W + 'px'
      canvas.style.height = H + 'px'
      canvas.width = W * pixelRatio
      canvas.height = H * pixelRatio
    } else {
      canvas.width = W * pixelRatio
      canvas.height = H * pixelRatio
    }

    if (document.body) {
      appendCanvas()
    } else {
      // just in case our script is included above <body>
      document.addEventListener('DOMContentLoaded', appendCanvas)
    }
  }
  const contexts = ['webgl', 'experimental-webgl']
  for (var i = 0; i < contexts.length; i++) {
    try {
      const gl = canvas.getContext(contexts[i], opts)
      if (!gl) {
        throw new Error('Canvas.getContext returned null');
      }
      console.info('pex-gl', 'Creating', contexts[i], 'succeeded')
      return gl
    } catch (e) {
      console.warn('pex-gl', 'Creating', contexts[i], 'failed', e)
    }
  }
}

module.exports = createGL
