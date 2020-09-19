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
		vendor: project_folder + '/assets/vendor/'
	},
	src: {
		html: [source__folder + '/*.html', '!' + source__folder + '/_*.html'],
		scss: source__folder + '/assets/scss/**/*.scss',
		js: source__folder + '/assets/js/main.js',
		img: source__folder + '/assets/images/**/*',
		fonts: source__folder + '/assets/fonts/**/*',
		vendor: 'node_modules/'
	}
}

gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: project_folder + '/'
		},
		notify: false,
		online: false,
		open: true,
		cors: true,
		ui: false
	});
});

gulp.task('html', function () {
	return gulp.src(path.src.html)
		.pipe(include({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest(project_folder))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('js', function () {
	return gulp.src(path.src.js)
		.pipe(gulp.dest(path.build.js))
		.pipe(browserSync.stream());
});

gulp.task('images', function () {
	return gulp.src(path.src.img)
		.pipe(gulp.dest(path.build.img))
		.pipe(browserSync.reload({
			stream: true
		}));
});


gulp.task('fonts', function () {
	return gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
})

gulp.task('vendor', function () {
	// jquery
	var jquery = gulp.src(path.src.vendor + 'jquery/dist/jquery.min.js')
		.pipe(gulp.dest(path.build.vendor + 'jquery/'));
	// fontawesome fonts
	var fontAwesomeWebfonts = gulp.src(path.src.vendor + '@fortawesome/fontawesome-free/webfonts/**/*')
		.pipe(gulp.dest(path.build.vendor + 'fontawesome/webfonts/'));
	// Font Awesome CSS
	var fontAwesomeCSS = gulp.src(path.src.vendor + '@fortawesome/fontawesome-free/css/all.min.css')
		.pipe(gulp.dest(path.build.vendor + 'fontawesome/css/'));

	// Slick carousel css
	var slickCarouselCss = gulp.src(path.src.vendor + 'slick-carousel/slick/*.css')
		.pipe(gulp.dest(path.build.vendor + 'slick-carousel/'));

	// Slick carousel 
	var slickCarousel = gulp.src([path.src.vendor + 'slick-carousel/slick/slick.min.js', path.src.vendor + 'slick-carousel/slick/*.gif'])
		.pipe(gulp.dest(path.build.vendor + 'slick-carousel/'));

	// Slick carousel fonts
	var slickCarouselFonts = gulp.src(path.src.vendor +  'slick-carousel/slick/fonts/*')
		.pipe(gulp.dest(path.build.vendor + 'slick-carousel/fonts/'));

	// Vendor css
	var vendorCss = gulp.src(path.src.vendor + 'normalize.css/normalize.css')
		.pipe(gulp.dest(path.build.vendor + 'css/'));
});

gulp.task('clean', function () {
	return del.sync(project_folder);
})

gulp.task('sass', function () {
	return gulp.src(path.src.scss)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', notify.onError()))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.css))
		.pipe(browserSync.stream());
});

gulp.task('watch', function () {
	gulp.watch(source__folder + '/**/*.html', gulp.parallel('html'));
	gulp.watch(path.src.scss, gulp.parallel('sass'));
	gulp.watch(path.src.js, gulp.parallel('js'));
	gulp.watch(path.src.img, gulp.parallel('images'));
	gulp.watch(path.src.fonts, gulp.parallel('fonts'));
});

gulp.task('default', gulp.parallel('sass', 'html', 'js', 'vendor', 'images', 'fonts', 'watch', 'browser-sync'));