const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config');

gulp.task('build', () => {
  return gulp.src('src/app/page.tsx')
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', () => {
  gulp.watch('src/**/*.jsx', gulp.series('build'));
});

gulp.task('default', gulp.series('build', 'watch'));
