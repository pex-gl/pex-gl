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
  pixelRatio: plask.Window.screensInfo()[0].highdpi,
  innerWidth: plask.Window.screensInfo()[0].width,
  innerHeight: plask.Window.screensInfo()[0].height,
  addEventListener: (e, cb) => { window.events.addListener(e, cb) },
  removeEventListener: (e, cb) => { window.events.removeListener(e, cb) },
  appendChild: () => { },
  removeChild: () => { },
  // window specific methods
  requestAnimationFrame: global.requestAnimationFrame,
  cancelAnimationFrame: global.cancelAnimationFrame,
  getComputedStyle: global.getComputedStyle
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
