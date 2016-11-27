'use strict'
const plask = require('plask')
const patchGL = require('./patch-gl')
const patchRaf = require('./patch-raf')
const patchWindow = require('./patch-window')
const patchMouseEvent = require('./patch-mouse-event')
const patchKeyEvent = require('./patch-key-event.js')
const EventEmitter = require('events')

let rafCallbacks = patchRaf()
const window = patchWindow()

function createGL (width, height) {
  const canvas = {
    events: new EventEmitter(),
    width: 0,
    height: 0,
    clientWidth: 0,
    clientHeight: 0,
    addEventListener: (e, cb) => { canvas.events.addListener(e, cb) },
    removeEventListener: (e, cb) => { canvas.events.removeListener(e, cb) },
    appendChild: () => { },
    removeChild: () => { },
    // window specific methods
    requestAnimationFrame: global.requestAnimationFrame,
    cancelAnimationFrame: global.cancelAnimationFrame,
    getComputedStyle: global.getComputedStyle
  }

  canvas.width = canvas.clientWidth = width
  canvas.height = canvas.clientHeight = height

  const win = plask.simpleWindow({
    settings: {
      width: width,
      height: height,
      type: '3d'
    },
    init: function () {
      this.framerate(60)

      ;[canvas, window].forEach((elem) => {
        this.on('mouseDown', (e) => { elem.events.emit('mousedown', patchMouseEvent(e)) })
        this.on('mouseMoved', (e) => { elem.events.emit('mousemove', patchMouseEvent(e)) })
        this.on('mouseDragged', (e) => { elem.events.emit('mousemove', patchMouseEvent(e)) })
        this.on('mouseUp', (e) => { elem.events.emit('mouseup', patchMouseEvent(e)) })
        this.on('mouseUp', (e) => { elem.events.emit('click', patchMouseEvent(e)) })
        this.on('scrollWheel', (e) => { elem.events.emit('wheel', patchMouseEvent(e)) })
        this.on('keyDown', (e) => { elem.events.emit('keydown', patchKeyEvent(e)) })
        this.on('keyDown', (e) => { elem.events.emit('keypress', patchKeyEvent(e)) })
        this.on('keyUp', (e) => { elem.events.emit('keyup', patchKeyEvent(e)) })
      })
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
