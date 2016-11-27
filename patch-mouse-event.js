function patchMouseEvent (e) {
  return {
    deltaX: e.dx || 0,
    deltaY: e.dy || 0,
    deltaZ: 0,
    deltaMode: 0,
    x: e.x,
    y: e.y,
    offsetX: e.x,
    offsetY: e.y,
    altKey: e.option,
    shiftKey: e.shift,
    ctrlKey: e.ctrl,
    metaKey: e.cmd
  }
}

module.exports = patchMouseEvent
