function patch (gl) {
  function getEnumName (e) {
    for (var name in gl) {
      if (gl[name] === e) return name
    }
    return 'UNDEFINED-' + e
  }

  if (!gl.getContextAttributes) {
    gl.getSupportedExtensions = function () {
      return [
        'EXT_blend_minmax,EXT_sRGB,EXT_frag_depth',
        'OES_texture_float,OES_texture_float_linear',
        'OES_texture_half_float,OES_texture_half_float_linear',
        'OES_standard_derivatives,EXT_shader_texture_lod',
        'EXT_texture_filter_anisotropic,OES_vertex_array_object',
        'OES_element_index_uint',
        'WEBGL_depth_texture,WEBGL_draw_buffers,ANGLE_instanced_arrays',
        'WEBGL_debug_renderer_info',
        'EXT_shader_texture_lod'
      ].map(function (s) { return s.toLowerCase() })
    }
    var glPixelStorei = gl.pixelStorei
    var premultAlphaWarnings = 0;
    gl.pixelStorei = function () {
      // this is not supported in Plask so let's print the warning once
      if (arguments[0] === gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL) {
        if (premultAlphaWarnings++ > 0) return
      }
      try {
        glPixelStorei.apply(gl, arguments)
      } catch (e) {
        // console.log(e)
      }
    }
    gl.getExtension = function (name) {
      name = name.toLowerCase()
      if (name === 'angle_instanced_arrays') {
        return {
          vertexAttribDivisorANGLE: function () { gl.vertexAttribDivisor.apply(gl, arguments) },
          drawElementsInstancedANGLE: function () { gl.drawElementsInstanced.apply(gl, arguments) }
        }
      }
      if (name === 'oes_texture_float') return {}
      if (name === 'oes_texture_float_linear') return {}
      if (name === 'oes_texture_half_float') {
        return {
          HALF_FLOAT_OES: isBrowser ? 0x8D61 : gl.HALF_FLOAT
        }
      }
      if (name === 'oes_texture_half_float_linear') return {}
      if (name === 'webgl_depth_texture') return {}
      if (name === 'webgl_draw_buffers') {
        return {
          drawBuffersWEBGL: function () {
            // FIXME: first call is throwing error for some reason
            try {
              gl.drawBuffers.apply(gl, arguments)
            } catch (e) {
            }
          }
        }
      }
      if (name === 'ext_shader_texture_lod') return {}
    }
    var GL_COMPRESSED_TEXTURE_FORMATS = 0x86A3
    var glGetParameter = gl.getParameter
    gl.getParameter = function (name) {
      if (name === GL_COMPRESSED_TEXTURE_FORMATS) return []
      if (name === gl.MAX_TEXTURE_SIZE) return 16384
      if (name === gl.MAX_CUBE_MAP_TEXTURE_SIZE) return 16384
      if (name === gl.MAX_DRAW_BUFFERS) return 4
      if (name === gl.RED_BITS) return 8
      if (name === gl.GREEN_BITS) return 8
      if (name === gl.BLUE_BITS) return 8
      if (name === gl.ALPHA_BITS) return 8
      if (name === gl.DEPTH_BITS) return 24
      if (name === gl.STENCIL_BITS) return 8
      if (name === gl.MAX_COLOR_ATTACHMENTS) return 4
      if (name === gl.MAX_RENDERBUFFER_SIZE) return 4096
      if (name === gl.SUBPIXEL_BITS) return 8
      if (name === gl.ALIASED_POINT_SIZE_RANGE) return 0
      if (name === gl.ALIASED_LINE_WIDTH_RANGE) return [1, 1]
      if (name === gl.MAX_VIEWPORT_DIMS) return [ 16384, 16384]
      if (name === gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS) return 16
      if (name === gl.MAX_TEXTURE_IMAGE_UNITS) return 16
      if (name === gl.MAX_VERTEX_ATTRIBS) return 16
      if (name === gl.MAX_VERTEX_UNIFORM_VECTORS) return 16
      if (name === gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS) return 16
      if (name === gl.MAX_VARYING_VECTORS) return 16
      if (name === gl.MAX_FRAGMENT_UNIFORM_VECTORS) return 16
      if (name === gl.VENDOR) return 'Plask'
      if (name === gl.RENDERER) return 'Plask GL Bindings'
      if (name === gl.VERSION) return 'WebGL 1.0'
      if (name === gl.SHADING_LANGUAGE_VERSION) return 'WebGL 1.0'
      console.log(getEnumName(name) + ' not supported')
      return glGetParameter.apply(gl, arguments)
    }
    gl.getContextAttributes = function () {
      return {
        alpha: true,
        antialias: true,
        depth: true,
        failIfMajorPerformanceCaveat: false,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false,
        stencil: false
      }
    }
    gl.isContextLost = function () {
      return false
    }
  }

  gl.getEnumName = getEnumName
  return gl
}

module.exports = patch
