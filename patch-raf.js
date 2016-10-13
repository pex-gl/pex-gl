const rafCallbacks = []

global.requestAnimationFrame = function (cb) {
  rafCallbacks.push(cb)
}

global.cancelAnimationFrame = function (cb) {
  const idx = rafCallbacks.indexOf(cb)
  if (idx !== -1) {
    rafCallbacks.splice(idx, 1)
  }
}

function patchRaf () {
  return rafCallbacks
}

module.exports = patchRaf
