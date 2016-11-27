'use strict'
const plask = require('plask')
const patchGL = require('./patch-gl')
const patchRaf = require('./patch-raf')
const patchMouseEvent = require('./patch-mouse-event')
const patchKeyEvent = require('./patch-key-event.js')
const EventEmitter = require('events')

let rafCallbacks = patchRaf()

function createGL (width, height) {
  global.getComputedStyle = () => {
    return {
      getPropertyValue: (prop) => 0
    }
  }

  const canvas = {
    events: new EventEmitter(),
    width: width,
    height: height,
    clientWidth: width,
    clientHeight: height,
    innerWidth: width,
    innerHeight: height,
    addEventListener: (e, cb) => { canvas.events.addListener(e, cb) },
    removeEventListener: (e, cb) => { canvas.events.removeListener(e, cb) },
    appendChild: () => { },
    removeChild: () => { },
    // window specific methods
    requestAnimationFrame: global.requestAnimationFrame,
    cancelAnimationFrame: global.cancelAnimationFrame,
    getComputedStyle: global.getComputedStyle
  }

  // expose commonly accessed root DOM elements for compatibility
  global.window = canvas
  global.document = {
    body: canvas,
    createElement: (name) => {
      return {
        style: { }
      }
    }
  }

  const win = plask.simpleWindow({
    settings: {
      width: width,
      height: height,
      type: '3d'
    },
    init: function () {
      this.framerate(60)

      this.on('mouseDown', (e) => { canvas.events.emit('mousedown', patchMouseEvent(e)) })
      this.on('mouseMoved', (e) => { canvas.events.emit('mousemove', patchMouseEvent(e)) })
      this.on('mouseDragged', (e) => { canvas.events.emit('mousemove', patchMouseEvent(e)) })
      this.on('mouseUp', (e) => { canvas.events.emit('mouseup', patchMouseEvent(e)) })
      this.on('mouseUp', (e) => { canvas.events.emit('click', patchMouseEvent(e)) })
      this.on('scrollWheel', (e) => { canvas.events.emit('wheel', patchMouseEvent(e)) })
      this.on('keyDown', (e) => { canvas.events.emit('keydown', patchKeyEvent(e)) })
      this.on('keyDown', (e) => { canvas.events.emit('keypress', patchKeyEvent(e)) })
      this.on('keyUp', (e) => { canvas.events.emit('keyup', patchKeyEvent(e)) })
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
