function patchMouseEvent (e) {
  return {
    deltaX: -e.dx * 10 || 0,
    deltaY: -e.dy * 10 || 0,
    deltaZ: 0,
    deltaMode: 0,
    button: e.buttonNumber || 0,
    buttons: e.buttonNumber || 0,
    x: e.x,
    y: e.y,
    offsetX: e.x,
    offsetY: e.y,
    altKey: e.option,
    shiftKey: e.shift,
    ctrlKey: e.ctrl,
    metaKey: e.cmd,
    defaultPrevented: false,
    preventDefault: function () {
      this.defaultPrevented = true
    },
    stopPropagation: function () {
      // no effect in plask
    },
    stopImmediatePropagation: function () {
      // no effect in plask
    }
  }
}

module.exports = patchMouseEvent
