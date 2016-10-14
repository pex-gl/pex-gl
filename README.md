# pex-gl

Create WebGL context in [Plask](http://plask.org) or in a web browser (via [browserify](https://www.npmjs.com/package/browserify).

## Usage

[![NPM](https://nodei.co/npm/pex-gl.png)](https://www.npmjs.com/package/pex-gl)

To create new WebGL context via Plask window (in Plask) or HTMLCanvas (in a browser):

```javascript
var createGl = require('pex-gl')
var gl = createGL(width, height)
```

or 

```javascript
var gl = require('pex-gl')(width, height)
```

## API

### createGL(width, height)

Creates gl context from canvas/window with given width and height in pixels.

## License

MIT, see [LICENSE.md](http://github.com/vorg/pex-gl/blob/master/LICENSE.md) for details.
