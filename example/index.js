'use strict'
const gl = require('..')(window.innerWidth * 0.75, window.innerHeight * 0.75)

const regl = require('regl')(gl)

let r = 0
let g = 0

gl.canvas.addEventListener('mousemove', (e) => {
  r = e.offsetX / gl.canvas.clientWidth
  g = e.offsetY / gl.canvas.clientHeight 
})

regl.frame(() => {
  regl.clear({
    color: [r, g, 0, 1],
    depth: 1
  })
})
