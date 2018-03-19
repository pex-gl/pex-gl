'use strict'
const plask = require('plask')
const EventEmitter = require('events')

global.getComputedStyle = () => {
  return {
    getPropertyValue: (prop) => 0
  }
}

global.window = {
  events: new EventEmitter(),
  width: 0,
  height: 0,
  clientWidth: 0,
  clientHeight: 0,
  innerWidth: 1280,
  innerHeight: 720,
  devicePixelRatio: plask.Window.screensInfo()[0].highdpi,
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

global.screen = {
  width: plask.Window.screensInfo()[0].width,
  height: plask.Window.screensInfo()[0].height
}

global.document = {
  body: global.window,
  createElement: (name) => {
    return {
      style: { }
    }
  }
}

function patchWindow () {
  return global.window
}

module.exports = patchWindow
