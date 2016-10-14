'use strict'
const plask = require('plask')
const patchGL = require('./patch-gl')
const patchRaf = require('./patch-raf')

let rafCallbacks = patchRaf()

function createGL (width, height) {
  const canvas = {
    width: width,
    height: height,
    clientWidth: width,
    clientHeight: height,
    addEventListener: () => {}
  }

  const win = plask.simpleWindow({
    settings: {
      width: width,
      height: height,
      type: '3d'
    },
    init: function () {
      this.framerate(60)
    },
    draw: function () {
      const numCallbacks = rafCallbacks.length
      for (let i = 0; i < numCallbacks; i++) {
        const cb = rafCallbacks.shift()
        cb()
      }
    }
  })
  const gl = patchGL(win.gl)
  gl.canvas = canvas
  return gl
}

module.exports = createGL
