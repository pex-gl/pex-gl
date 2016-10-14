var gl = require('..')(800, 600)
var regl = require('regl')(gl)

regl.frame(() => {
  regl.clear({
    color: [1, 0, 0, 1],
    depth: 1
  })
})
