'use strict'
const plask = require('plask')
const patchGL = require('./patch-gl')
const patchRaf = require('./patch-raf')
const patchWindow = require('./patch-window')
const patchMouseEvent = require('./patch-mouse-event')
const patchKeyEvent = require('./patch-key-event.js')
const EventEmitter = require('events')
const assert = require('assert')

let rafCallbacks = patchRaf()
const window = patchWindow()

function createGL (opts) {
  assert(!opts || (typeof opts === 'object'), 'pex-gl: createGL requires opts argument to be null or an object')

  const pixelRatio = opts.pixelRatio || 1
  const antialias = (opts.antialias === false) ? false : true

  let width = (opts ? opts.width : 0) || window.innerWidth
  let height = (opts ? opts.height : 0) || window.innerHeight
  window.innerWidth = width
  window.innerHeight = height

  const canvas = {
    events: new EventEmitter(),
    width: 0,
    height: 0,
    clientWidth: 0,
    clientHeight: 0,
    addEventListener: (e, cb) => {
      function callbackProxy (event) {
        if (!event._cancelled) {
          cb(event)
        }
      }
      cb._callbackProxy = callbackProxy
      window.events.addListener(e, callbackProxy)
    },
    removeEventListener: (e, cb) => {
      window.events.removeListener(e, cb._callbackProxy)
    },
    appendChild: () => { },
    removeChild: () => { },
    // window specific methods
    requestAnimationFrame: global.requestAnimationFrame,
    cancelAnimationFrame: global.cancelAnimationFrame,
    getComputedStyle: global.getComputedStyle
  }

  canvas.width = canvas.clientWidth = width * pixelRatio
  canvas.height = canvas.clientHeight = height * pixelRatio

  const win = plask.simpleWindow({
    settings: {
      width: canvas.width,
      height: canvas.height,
      multisample: antialias,
      type: '3d',
      highdpi: pixelRatio
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
