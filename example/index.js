'use strict'
const gl = require('..')()

const regl = require('regl')(gl)

let r = 0
let g = 0

gl.canvas.addEventListener('mousemove', (e) => {
  r = e.offsetX / gl.canvas.clientWidth
  g = e.offsetY / gl.canvas.clientHeight 
})

require('mouse-change')((buttons, x, y) => console.log('mouse-change', buttons, x, y))
require('mouse-wheel')((dx, dy) => console.log('mouse-wheel', dx, dy))

regl.frame(() => {
  regl.clear({
    color: [r, g, 0, 1],
    depth: 1
  })
})
