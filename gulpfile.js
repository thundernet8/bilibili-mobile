"use strict";
/*
 * Gulp配置
 */

var gulp = require('gulp');
var pkg = require('./package.json');

//加载所有 gulp 插件, 插件以 GP 的属性方式调用
//var GP = require('gulp-load-plugins')();

//逐个加载插件
var cache = require('gulp-cache'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    header = require('gulp-header'),
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
 * 构建文件的注释头
 */
var banner = ['/**',
    ' * Generated on <%= (new Date()).toString()%> by <%= pkg.author %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %> LICENSE',
    ' */',
    ' ',
    ''].join('\n');


/*
 * gulp 任务流
 */

//less 样式文件压缩发布
gulp.task('less', function () {
    console.log('start less task');
    gulp.src('./dist/styles')
        .pipe(clean());
    gulp.src('./src/styles/*.less')
        .pipe(less())                               //- less 文件预处理
        .pipe(cssmin())                             //- css 文件压缩
        .pipe(rev())                                //- 文件名加MD5后缀
        .pipe(header(banner, {pkg: pkg}))           //- 文档添加注释头
        .pipe(gulp.dest('./dist/styles'))           //- 输出文件至发布路径
        .pipe(rev.manifest('src/rev/rev-manifest.json', {
            base: process.cwd() + '/src/rev',
            merge: true
        }))                                         //- 生成一个rev-manifest.json
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
    gulp.src('./dist/scripts')
        .pipe(clean());
    //gulp.src(['./src/scripts/*.js', './src/components/*.{js,jsx}'])
    gulp.src(['./src/scripts/*.js', './src/components/*.js'])
        .pipe(jshint())                             //- js代码检查
        .pipe(jshint.reporter())                    //- 错误报告
        .pipe(webpack(require('./webpack.js')))     //- webpack打包模块
        .pipe(uglify())                             //- js压缩
        .pipe(rev())                                //- 文件名加MD5后缀
        .pipe(header(banner, {pkg: pkg}))           //- 文档添加注释头
        .pipe(gulp.dest('./dist/scripts'))          //- 输出文件至发布路径
        .pipe(rev.manifest('src/rev/rev-manifest.json', {
            base: process.cwd() + '/src/rev',
            merge: true
        }))                                         //- 生成一个rev-manifest.json
        .pipe(gulp.dest('./src/rev'));              //- 将 rev-manifest.json 保存到 rev 目录内
});

//html文件内资源文件引用路径替换
gulp.task('rev', function () {
    console.log('start rev task');
    gulp.src(['./src/rev/*.json', './src/html/*.html'])
        .pipe(revCollector())                       //- 收集rev-manifest.json文件内需要替换版本的文件信息并替换html模板内引用
        .pipe(htmlmin())                            //- 压缩html
        .pipe(gulp.dest('./'));                     //- 输出html文件至视图目录
});

//监控
gulp.task('watch', function () {
   console.log('execute watch and auto-combine task');
    gulp.watch('./src/styles/*.less', ['less', 'rev']);
    gulp.watch('./src/scripts/*.{js,jsx}', ['scripts', 'rev']);
    gulp.watch('./src/components/**/*.{js,jsx}', ['scripts', 'rev']);
    gulp.watch('./src/images/**/*.{png,jpg,gif,ico}', ['imagemin']);
});

//构建
gulp.task('build', ['less', 'scripts', 'imagemin'], function () {
   console.log('start build task');
    gulp.src(['./src/rev/*.json', './src/html/*.html'])
        .pipe(revCollector())
        .pipe(htmlmin())
        .pipe(gulp.dest('./'));
});

//清理发布目录
gulp.task('cleanDist', function () {
    console.log('start clean dist directory');
    gulp.src('./dist/**/*.*')
        .pipe(clean());
});

//默认任务
gulp.task('default', ['watch'], function () {
    console.log('start monitor task');
});