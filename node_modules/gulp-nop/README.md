# gulp-nop [![Build Status](https://travis-ci.org/hoho/gulp-nop.svg?branch=master)](https://travis-ci.org/hoho/gulp-nop)

«No operation». Useful when you want primitive conditional execution in a long
pipeline.

This plugin happened to exist just because `gulp` and `gulp-util` are two
different packages in different repositories and I've overlooked `noop()` from
`gulp-util` package. You probably should use `gulp-util`.

From the other side, it is a bit lighter than `gulp-util` package and if you
need just «no operation» from there, here it is.


Install:

```sh
npm install gulp-nop --save-dev
```


Example:

```js
var nop = require('gulp-nop');

gulp.task('some-task', function() {
    return gulp.src(['some files'])
        .pipe(some())
        .pipe(tasks())
        .pipe(along())
        .pipe(minify ? minified() : nop())
        .pipe(pipeline())
        .pipe(gulp.dest('./build'));
});
```
