const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const del = require('del');
const $ = gulpLoadPlugins();
var gp_concat = require('gulp-concat-util'),
    gp_rename = require('gulp-rename'),
    htmlreplace = require('gulp-html-replace'),
    replace = require('gulp-replace-task'),
    remove = require('gulp-html-remove'),
    deleteLines = require('gulp-delete-lines'),
    runSequence = require('run-sequence'),
    removeEmptyLines = require('gulp-remove-empty-lines'),
    fs = require('fs');

gulp.task('remove', function () {
    gulp.src('desk/*.liquid')
        .pipe(replace({
            patterns: [{
                match: /{{desk:body}}/g,
                replacement: '{!v.body}'
            }]
        }))
        .pipe(deleteLines({
            'filters': [
                /{%/i
            ]
        }))
        .pipe(remove('#search'))
        .pipe(remove('#breadcrumbs'))
        .pipe(remove('#mobileHeader'))
        .pipe(gulp.dest('dist'))
        
});
gulp.task('transmute', function (done) {
    runSequence('remove', function () {
        console.log('Transmute Complete....');
    });
});