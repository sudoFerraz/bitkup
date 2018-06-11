var gulp = require('gulp');
var pug = require('gulp-pug');
var less = require('gulp-less');
var exec = require('child_process').exec;
var install = require("gulp-install");
var liveServer = require('gulp-server-livereload');

var paths = {
  pug: ['./src/**/*.pug'],
  less: ['./src/**/*.less'],
  js: ['./src/**/*.js'],
  assets: ['./src/assets/**/**'],
  dependencies: ['./bower.json', './package.json'],
  dest: 'dist',
  contractsBuild: './build/contracts/*.json'
};

gulp.task('serve', ['buildHTML', 'buildCSS', 'buildJS', 'buildAssets', 'buildDepencendies', 'CopyContractsBuild', 'watch', 'live-server']);

gulp.task('build', ['buildHTML', 'buildCSS', 'buildJS', 'buildAssets', 'buildDepencendies', 'CopyContractsBuild']);

gulp.task('buildHTML', function() {

  return gulp.src(paths.pug)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(paths.dest));

});

gulp.task('buildCSS', function() {

  return gulp.src(paths.less)
    .pipe(less())
    .pipe(gulp.dest(paths.dest));

});

gulp.task('buildJS', function() {

  return gulp.src(paths.js)
    .pipe(gulp.dest(paths.dest));

});

gulp.task('buildAssets', function() {

  return gulp.src(paths.assets)
    .pipe(gulp.dest(paths.dest+'/assets/'));

});

gulp.task('buildDepencendies', function() {

  return gulp.src(paths.dependencies)
    .pipe(install());

});

gulp.task('watch', function() {

  gulp.watch(paths.pug, ['buildHTML']);
  gulp.watch(paths.less, ['buildCSS']);
  gulp.watch(paths.js, ['buildJS']);
  gulp.watch(paths.assets, ['buildAssets']);

});

gulp.task('live-server', function() {
	gulp.src(paths.dest)
		.pipe(liveServer({
			livereload: true,
			open: true,
			port: 8081,
			fallback: 'index.html',
			defaultFile: 'index.html'
		}));
});

gulp.task('CopyContractsBuild', function() {
  return gulp.src(paths.contractsBuild).pipe(gulp.dest(paths.dest+'/build/contracts/'))
})