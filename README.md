# pex-gl

[![npm version](https://img.shields.io/npm/v/pex-gl)](https://www.npmjs.com/package/pex-gl)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://www.npmjs.com/package/pex-gl)
[![npm minzipped size](https://img.shields.io/bundlephobia/minzip/pex-gl)](https://bundlephobia.com/package/pex-gl)
[![dependencies](https://img.shields.io/librariesio/release/npm/pex-gl)](https://github.com/pex-gl/pex-gl/blob/main/package.json)
[![types](https://img.shields.io/npm/types/pex-gl)](https://github.com/microsoft/TypeScript)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-fa6673.svg)](https://conventionalcommits.org)
[![styled with prettier](https://img.shields.io/badge/styled_with-Prettier-f8bc45.svg?logo=prettier)](https://github.com/prettier/prettier)
[![linted with eslint](https://img.shields.io/badge/linted_with-ES_Lint-4B32C3.svg?logo=eslint)](https://github.com/eslint/eslint)
[![license](https://img.shields.io/github/license/pex-gl/pex-gl)](https://github.com/pex-gl/pex-gl/blob/main/LICENSE.md)

Create a RenderingContext (2d, webgl, webgl2, bitmaprenderer, webgpu) for use in [PEX](https://pex.gl).

## Installation

```bash
npm install pex-gl
```

## Usage

```js
import createRenderingContext, { FALLBACKS } from "pex-gl";

// Creates a webgl context filling the window
const context = createRenderingContext();

// Creates a webgl context from an existing canvas and keeps its size
const context = createRenderingContext({ canvas });

// Creates a webgl context on a new canvas with given width and height
const context = createRenderingContext({ width, height });

// Creates a new canvas of type "webgpu"
const context = createRenderingContext({ type: "webgpu" });

// Creates a new canvas of type "webgl" or fallback to experimental-webgl in case it fails
const context = createRenderingContext({ type: "webgl" });

// Disable fallbacks for "webgl2"
FALLBACKS.webgl2 = [];
// Creates a new canvas of type "webgl2" and return null in case it fails
const context = createRenderingContext({ type: "webgl2" });
```

## API

<!-- api-start -->

## Constants

<dl>
<dt><a href="#FALLBACKS">FALLBACKS</a></dt>
<dd><p>Context fallbacks map</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#createRenderingContext">createRenderingContext([opts])</a> ⇒ <code>RenderingContext</code></dt>
<dd><p>Creates a rendering context.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Options">Options</a> : <code>object</code></dt>
<dd><p>Options for context creation. All optional.</p>
</dd>
</dl>

<a name="FALLBACKS"></a>

## FALLBACKS

Context fallbacks map

**Kind**: global constant
<a name="createRenderingContext"></a>

## createRenderingContext([opts]) ⇒ <code>RenderingContext</code>

Creates a rendering context.

**Kind**: global function

| Param  | Type                             | Default         |
| ------ | -------------------------------- | --------------- |
| [opts] | [<code>Options</code>](#Options) | <code>{}</code> |

<a name="Options"></a>

## Options : <code>object</code>

Options for context creation. All optional.

**Kind**: global typedef
**Properties**

| Name                   | Type                                                                                                                                                                           | Default                                          | Description                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ | ---------------------------------------------- |
| [width]                | <code>number</code>                                                                                                                                                            | <code>window.innerWidth</code>                   | Request an initial canvas width.               |
| [height]               | <code>number</code>                                                                                                                                                            | <code>window.innerHeight</code>                  | Request an initial canvas height.              |
| [pixelRatio]           | <code>boolean</code>                                                                                                                                                           | <code>1</code>                                   | Multiply canvas dimensions with a given ratio. |
| [fullscreen]           | <code>boolean</code>                                                                                                                                                           | <code>!opts.width &amp;&amp; !opts.height</code> | Make the canvas fullscreen.                    |
| [type]                 | <code>&quot;2d&quot;</code> \| <code>&quot;bitmaprenderer&quot;</code> \| <code>&quot;webgl&quot;</code> \| <code>&quot;webgl2&quot;</code> \| <code>&quot;webgpu&quot;</code> | <code>&quot;webgl&quot;</code>                   | A "contextType" for getContext.                |
| [element]              | <code>HTMLElement</code>                                                                                                                                                       | <code>document.body</code>                       | Element to append the canvas to.               |
| [...contextAttributes] | <code>CanvasRenderingContext2DSettings</code> \| <code>WebGLContextAttributes</code>                                                                                           | <code>{}</code>                                  | Attributes to be passed to getContext.         |

<!-- api-end -->

## License

MIT. See [license file](https://github.com/pex-gl/pex-gl/blob/main/LICENSE.md).
