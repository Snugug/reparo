'use strict';

const gulp = require('gulp');
const config = require('config');
const runner = require('punchcard-runner');
const forever = require('gulp-forever-monitor');
const chalk = require('chalk');
const browserSync = require('browser-sync').get('221B Baker Street');

runner(gulp, {
  server: {
    port: config.server.port,
    host: config.server.host,
  },
});

gulp.task('watch', ['browser-sync', 'sass:watch', 'imagemin:watch', 'js:watch']);

gulp.task('js', () => {
  return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.stream());
});

gulp.task('js:watch', ['js'], () => {
  gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task('browser-sync', ['forever'], () => {
  let url = config.server.host;

  if (config.server.port !== 80) {
    url += `:${config.server.port}`;
  }

  browserSync.init({
    'proxy': url,
  });
});

gulp.task('forever', () => {
  const options = {
    env: process.env,
    args: process.argv,
    watch: true,
  };

  forever('index.js', options)
    .on('watch:restart', (info) => {
      console.log(`Server was restarted due to ${chalk.cyan(info.file)} to ${chalk.magenta(info.stat)}`);

      setTimeout(() => {
        browserSync.reload();
      }, 500);
    })
    .on('exit', () => {
      console.log('Server was closed');
    });
});
