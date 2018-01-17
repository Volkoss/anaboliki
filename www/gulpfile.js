"use strict"

var gulp = require('gulp');

var wiredep = require('wiredep').stream,			// подлючение пакетов к проету
	sass = require('gulp-sass'),					// компилятор sass
	notify = require("gulp-notify"),				// сообщении о завершении задачи
	autoprefixer = require('gulp-autoprefixer'),	// добавление префиксов
	connect = require('gulp-connect'),				// виртуальный сервер
	livereload = require('gulp-livereload'),		// обновляем страницу
	spritesmith = require("gulp.spritesmith");		// гунуратор css спрайтов
 
// CSS
gulp.task('css', function() {
	return gulp.src('app/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
	.pipe(sass())
	.pipe(autoprefixer({ browsers: ['last 5 versions'], cascade: false }))
	.pipe(livereload())
	.pipe(gulp.dest('app/css'))
    .pipe(notify('Done!'))
    .pipe(connect.reload());
})

// HTML
gulp.task('html', function(){
	gulp.src('app/index.html')
	.pipe(connect.reload())
    .pipe(notify('Done!'))
})

// SERVER CONNECT
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

// BOWER ( автоматически подключаем js/css в index.html )
gulp.task('bower', function() {
  gulp.src('./app/index.html')
    .pipe(wiredep({
      directory : 'app/bower_components'
    }))
    .pipe(gulp.dest('./app'));
});

// CSS CPRITE
gulp.task('sprite', function() {
    var spriteData = 
        gulp.src('./app/image/sprite/*.*') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.scss',
                cssFormat: 'scss',
                imgPath: '../image/sprite.png',
                algorithm: 'binary-tree',
                cssVarMap: function(sprite) {
                    sprite.name = 's-' + sprite.name
                }
            }));
    spriteData.img.pipe(gulp.dest('./app/image/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('./app/scss/')); // путь, куда сохраняем стили
});

// Проверяем изменения в файлах
gulp.task('watch', function(){
	gulp.watch('bower.json', ['bower'])
	gulp.watch('app/scss/*.scss',['css'])
	gulp.watch('app/index.html',['html'])
	// gulp.watch('app/image/sprite/*.*',['sprite'])
})

gulp.task('default', ['connect', 'css', 'html', 'bower', 'sprite', 'watch']);