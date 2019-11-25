/*!
 * gulp-nop, https://github.com/hoho/gulp-nop
 * (c) 2014 Marat Abdullin, MIT license
 */

'use strict';

var through = require('through');


module.exports = function() {
    return through();
};
