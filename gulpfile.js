// Initialize modules
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();
const webpack = require('webpack-stream');

//Sass Task
function scssTask() {
    return src('src/scss/style.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest('dist', { sourcemaps: '.' }));
}

//Javascript Task
function jsTask() {
    return src('src/js/script.js', { sourcemaps: true })
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        //.pipe(terser())
		.pipe(webpack({
			mode: 'development',
			output: {
				filename: 'script.js',
			  },
		}))
        .pipe(dest('dist', { sourcemaps: '.' }));
}

//Browsersync
function browserSyncServe(cb) {
	browsersync.init({
		server: {
			baseDir: '.',
		},
		notify: {
			styles: {
				top: 'auto',
				bottom: '0',
			},
		},
	});
	cb();
}
function browserSyncReload(cb) {
	browsersync.reload();
	cb();
}

//Watch Task
function watchTask() {
    watch('*.html', browserSyncReload);
    watch(
        ['src/scss/**/*.scss', 'src/**/*.js'],
        series(scssTask, jsTask, browserSyncReload)
    );
}

//Default Gulp Task
exports.default = series(scssTask, jsTask, browserSyncServe, browserSyncReload, watchTask);