'use strict'
const gl = require('..')()

const ctx = require('pex-context')()

const clearColor = [1, 0, 0, 1]

ctx.gl.canvas.addEventListener('mousemove', (e) => {
  clearColor[0] = e.offsetX / gl.canvas.clientWidth
  clearColor[1] = e.offsetY / gl.canvas.clientHeight
})

const clearCmd = {
  pass: ctx.pass({
    clearColor: clearColor
  })
}

ctx.frame(() => {
  ctx.submit(clearCmd)
})
