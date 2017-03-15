const assert = require('assert')

function createGL (opts) {
  assert(!opts || (typeof opts === 'object'), 'pex-gl: createGL requires opts argument to be null or an object')
  if (!opts) opts = {}

  let canvas = opts.canvas
  if (!canvas) {
    canvas = document.createElement('canvas')
    canvas.width = opts.width || window.innerWidth
    canvas.height = opts.height || window.innerHeight
    if (!opts.width && !opts.height) {
      // fullscreen
      document.body.style.margin = '0px'
    }
  }
  if (document.body) {
    document.body.appendChild(canvas)
  } else {
    // just in case our script is included above <body>
    document.addEventListener('DOMContentLoaded', () => {
      document.body.appendChild(canvas)
    })
  }
  const gl = canvas.getContext('webgl')
  return gl
}

module.exports = createGL
