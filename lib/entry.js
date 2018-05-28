'use strict';

try {
  require('es5-shim/es5-shim.min.js');
  require('es5-shim/es5-sham.min.js');
} catch (error) {
  // ExtendScriptはすべてのグローバル変数を次回実行時も記憶している。
  // es5-shimでグローバルのDateオブジェクトをprototype拡張するが、次回実行時も保持したままになっている。
  // その関係で、2度目の読み込みで一部関数が例外を投げる。既にグローバルに読み込めてはいるので使える。
  // $.writeln('Caught an error:', error);
}

$.global.JSON = require('JSON2');
$.global._ = require('lodash');
require('../src/main.js');
