var gulp = require('gulp');
var del = require('del');

var runSequence = require('run-sequence');

var webpack = require('webpack');

var src_dir = "./src";
var dist_dir = "./dist/app-monitor-static";


gulp.task('clean', function(cb) {
    return del([dist_dir + "/**"], cb);
});

gulp.task('clean:webpack', function(cb) {
    return del([dist_dir + "/*.js", dist_dir + "/*.css", dist_dir + "/*.map"], cb);
});

// gulp.task('index', function() {
//     return gulp.src([src_dir + "/*.html"])
//         .pipe(gulp.dest(dist_dir));
// });

gulp.task('images', function() {
    return gulp.src(src_dir + "/images/**")
        .pipe(gulp.dest(dist_dir + "/images"));
});

gulp.task('mock', function() {
    return gulp.src(src_dir + "/mock/**")
        .pipe(gulp.dest(dist_dir + "/mock"));
});

gulp.task('lib', function() {
    return gulp.src(src_dir + "/lib/**")
        .pipe(gulp.dest(dist_dir + "/lib"));
});

gulp.task('assets', function(cb) {
    runSequence('images', 'lib', 'mock', cb);
});

gulp.task('webpack:dev', ['clean:webpack'], function(cb) {
    var config = require('./webpack/webpack.config.dev.js');
    webpack(config, function(err, stats) {
        // console.log(err);
        //console.log(stats);
        cb();
    });
});

gulp.task('webpack:prd', ['clean:webpack'], function(cb) {
    webpack(require('./webpack/webpack.config.prd.js'), function(err, stats) {
        cb();
    });
});

gulp.task('dev', function(cb) {
    process.env.ENV = process.env.NODE_ENV = 'development';
    runSequence('clean', 'assets', 'webpack:dev', cb);
});
gulp.task('prd', function(cb) {
    process.env.ENV = process.env.NODE_ENV = 'production';
    runSequence('clean', 'assets', 'webpack:prd', cb);
});
gulp.task('default', function(cb) {
    runSequence('prd', cb);
});