const assert = require('assert')

function createGL (opts) {
  assert(!opts || (typeof opts === 'object'), 'pex-gl: createGL requires opts argument to be null or an object')
  if (!opts) opts = {}

  let canvas = opts.canvas

  if (!canvas) {
    canvas = document.createElement('canvas')
    canvas.width = opts.width || window.innerWidth
    canvas.height = opts.height || window.innerHeight

    const appendCanvas = () => {
      if (!opts.width && !opts.height) {
        // fullscreen
        document.body.style.margin = '0px'
      }
      document.body.appendChild(canvas)
    }

    if (document.body) {
      appendCanvas()
    } else {
      // just in case our script is included above <body>
      document.addEventListener('DOMContentLoaded', appendCanvas)
    }
  }
  const gl = canvas.getContext('webgl', opts)
  return gl
}

module.exports = createGL
