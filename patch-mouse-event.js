function patchMouseEvent (e, pixelRatio) {
  return {
    deltaX: -e.dx * 10 || 0,
    deltaY: -e.dy * 10 || 0,
    deltaZ: 0,
    deltaMode: 0,
    button: e.buttonNumber || 0,
    buttons: e.buttonNumber || 0,
    x: e.x / pixelRatio,
    y: e.y / pixelRatio,
    offsetX: e.x / pixelRatio,
    offsetY: e.y / pixelRatio,
    altKey: e.option,
    shiftKey: e.shift,
    ctrlKey: e.ctrl,
    metaKey: e.cmd,
    defaultPrevented: false,
    preventDefault: function () {
      this.defaultPrevented = true
    },
    stopPropagation: function () {
      this._cancelled = true
    },
    stopImmediatePropagation: function () {
      this._cancelled = true
    }
  }
}

module.exports = patchMouseEvent
