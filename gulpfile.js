"use strict";
/*
 * Gulp配置
 */

var gulp = require('gulp');

//加载所有 gulp 插件, 插件以 GP 的属性方式调用
//var GP = require('gulp-load-plugins')();

//逐个加载插件
var cache = require('gulp-cache'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    uglify = require('gulp-uglify'),
    webpack = require('gulp-webpack');


/*
 * gulp 任务流
 */

//less 样式文件压缩发布
gulp.task('less', function () {
    console.log('start less task');
    gulp.src('./src/styles/*.less')
        .pipe(less())                               //- less 文件预处理
        .pipe(cssnano())                            //- css 文件压缩
        .pipe(rev())                                //- 文件名加MD5后缀
        .pipe(gulp.dest('./dist/styles'))           //- 输出文件至发布路径
        .pipe(rev.manifest({
            merge: true
        }))                       //- 生成一个rev-manifest.json
        .pipe(gulp.dest('./src/rev'));              //- 将 rev-manifest.json 保存到 rev 目录内
});

//图片压缩发布
gulp.task('imagemin', function () {
    console.log('start imagemin task');
    gulp.src('./src/images/**/*.{png,jpg,gif,ico}')
        .pipe(cache(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        })))
        .pipe(gulp.dest('./dist/images'));
});

//js压缩合并发布
gulp.task('scripts', function () {
    console.log('start scripts task');
    gulp.src('./src/scripts/*.js')
        .pipe(jshint())
        .pipe(webpack(require('./webpack.js')))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./dist/scripts'))
        .pipe(rev.manifest({
            merge: true
        }))
        .pipe(gulp.dest('./src/rev'));
});