var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var del = require('del');
var include = require('gulp-file-include');

var project_folder = 'dist';
var source__folder = 'src';

var path = {
	build: {
		html: project_folder + '/',
		css: project_folder + '/assets/css/',
		js: project_folder + '/assets/js/',
		img: project_folder + '/assets/images/',
		fonts: project_folder + '/assets/fonts/',
		icons: project_folder + '/assets/icons/',
		vendor: project_folder + '/assets/vendor/'
	},
	src: {
		html: [source__folder + '/*.html', '!' + source__folder + '/_*.html'],
		css: source__folder + '/assets/css',
		scss: source__folder + '/assets/scss/**/*.scss',
		js: source__folder + '/assets/js/scripts.js',
		img: source__folder + '/assets/images/**/*',
		fonts: source__folder + '/assets/fonts/**/*',
		icons: source__folder + '/assets/icons/*',
		vendor: source__folder + '/assets/vendor/'
	}
}