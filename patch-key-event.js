// based on
// Browser key codes https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
var CocoaKeyCodeToBrowserKeyCode = {
  51: 8, // backspace
  48: 9, // tab
  36: 13, // enter
  // _: 16, // shift, doesn't fire
  // _: 17, // ctrl, doesn't fire
  // _: 18, // alt, doesn't fire
  // _: 19, // pause/break ?
  // _: 20, // caps lock, doesn't fire
  53: 27, // escape
  116: 33, // page up
  121: 34, // page down
  119: 35, // end
  115: 36, // home
  123: 37, // left arrow
  126: 38, // up arrow
  124: 39, // right arrow
  125: 40, // down arrow
  // _: 45, // insert, not sure how to simulate on mac
  117: 46, // delete
  29: 48, // 0
  18: 49, // 1
  19: 50, // 2
  20: 51, // 3
  21: 52, // 4
  23: 53, // 5
  22: 54, // 6
  26: 55, // 7
  28: 56, // 8
  25: 57, // 9
  0: 65, // a
  11: 66, // b
  8: 67, // c
  2: 68, // d
  14: 69, // e
  3: 70, // f
  5: 71, // g
  4: 72, // h
  34: 73, // i
  38: 74, // j
  40: 75, // k
  37: 76, // l
  46: 77, // m
  45: 78, // n
  31: 79, // o
  35: 80, // p
  12: 81, // q
  15: 82, // r
  1: 83, // s
  17: 84, // t
  32: 85, // u
  9: 86, // v
  13: 87, // w
  7: 88, // x
  16: 89, // y
  6: 90, // z
  // _: 91, // left window/cmd key, doesn't fire
  // _: 92, // right window/cmd key, doesn't fire
  // _: 93, // select key, not sure how to simulate on mac
  // _: 96, // numpad 0, not sure how to simulate on mac
  // _: 97, // numpad 1, not sure how to simulate on mac
  // _: 98, // numpad 2, not sure how to simulate on mac
  // _: 99, // numpad 3, not sure how to simulate on mac
  // _: 100, // numpad 4, not sure how to simulate on mac
  // _: 101, // numpad 5, not sure how to simulate on mac
  // _: 102, // numpad 6, not sure how to simulate on mac
  // _: 103, // numpad 7, not sure how to simulate on mac
  // _: 104, // numpad 8, not sure how to simulate on mac
  // _: 105, // numpad 9, not sure how to simulate on mac
  // _: 106, // multiply, same as 8
  24: 107, // add
  27: 109, // subtract
  // _: 110, // decimal point, not sure how to simulate on mac
  // _: 111, // divide, same as forward slash
  122: 112, // f1
  120: 113, // f2
  99: 114, // f3
  118: 115, // f4
  96: 116, // f5
  97: 117, // f6
  98: 118, // f7
  100: 119, // f8
  101: 120, // f9
  109: 121, // f10
  103: 122, // f11
  111: 123, // f12
  // _: 144, // num lock, not sure how to simulate on mac
  // _: 145, // scroll lock, not sure how to simulate on mac
  41: 186, // semi-colon
  // _: 187, // equal sign, same as +
  43: 188, // comma
  // _: 189, // dash, same as subtract
  47: 190, // period
  44: 191, // forward slash
  50: 192, // grave accent
  33: 219, // open bracket
  42: 220, // back slash
  30: 221, // close braket
  39: 222  // single quote
}

function wrapKeyEvent (e) {
  return {
    charCode: e.str.charCodeAt(0), // TODO: implement keyCode / key string
    keyCode: CocoaKeyCodeToBrowserKeyCode[e.keyCode] || -1,
    altKey: e.option,
    shiftKey: e.shift,
    ctrlKey: e.ctrl,
    metaKey: e.cmd
  }
}

module.exports = wrapKeyEvent
