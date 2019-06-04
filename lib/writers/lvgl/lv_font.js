'use strict';


const path = require('path');

const Font = require('../../font/font');
const Head = require('./lv_table_head');
const Cmap = require('./lv_table_cmap');
const Glyf = require('./lv_table_glyf');
const Kern = require('./lv_table_kern');


class LvFont extends Font {
  constructor(fontData, options) {
    super(fontData, options);

    const ext = path.extname(options.output);
    this.font_name = path.basename(options.output, ext);
    this.guard_name =  this.font_name.toUpperCase();
  }

  init_tables() {
    this.head = new Head(this);
    this.glyf = new Glyf(this);
    this.cmap = new Cmap(this);
    this.kern = new Kern(this);
  }


  toLVGL() {
    return `#include "lvgl/lvgl.h"

/*******************************************************************************
 * Size: ${this.src.size} px
 * Bpp: ${this.opts.bpp}
 * Opts: ${process.argv.slice(2).join(' ')}
 ******************************************************************************/

#ifndef ${this.guard_name}
#define ${this.guard_name} 1
#endif

#if ${this.guard_name}

${this.glyf.toLVGL()}

${this.cmap.toLVGL()}

${this.kern.toLVGL()}

${this.head.toLVGL()}

#endif /*#if ${this.guard_name}*/

`;
  }
}


module.exports = LvFont;
