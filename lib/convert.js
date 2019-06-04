// Indernal API to convert input data into output font data
// Used by both CLI and Web wrappers.
'use strict';

const collect_font_data = require('./collect_font_data');

let writers = {
  dump: require('./writers/dump'),
  bin: require('./writers/bin'),
  lvgl: require('./writers/lvgl')
};


//
// Input:
// - args like from CLI (optionally extended with binary content of files)
// - ceateCanvas() helper (for platform transparency)
//
// Output:
// - { name1: bin_data1, name2: bin_data2, ... }
//
// returns hash with files to write
//
module.exports = function convert(args, createCanvas) {
  console.log(args);
  let font_data = collect_font_data(args, createCanvas);
  let files = writers[args.format](args, font_data);

  return files;
};

module.exports.formats = Object.keys(writers);
