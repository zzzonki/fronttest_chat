var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var svgSprite = require('gulp-svg-sprite');
var clean = require('gulp-clean');

gulp.task('sсss', function (done) {
    return gulp
        .src(['src/sсss/style.scss'])
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest('build/css'));

    done();
});

gulp.task('js', function(){
    return gulp.src(['src/js/*.js']).pipe(gulp.dest('build/js'))
})

gulp.task('html', function(){
    return gulp.src(['src/index.html']).pipe(gulp.dest('build'))
})

gulp.task('svgSprite', function () {
    return gulp.src('src/icons/*.svg') // svg files for sprite
        .pipe(svgSprite({
                mode: {
                    symbol:{
                        sprite: "../sprite.svg"  //sprite file name
                    }
                },
            }
        ))
        .pipe(gulp.dest('build/icons'));
});

gulp.task('clean', function(){
    return gulp.src(['build/*']).pipe(clean());
})

gulp.task('watch', function () {
    gulp.watch(['src/sсss/**/*.sсss', ''], gulp.series('sсss'));
    gulp.watch(['src/js/**/*.js', ''], gulp.series('js'));
    gulp.watch(['src/icons/**/*.svg', ''], gulp.series('svgSprite'));
    gulp.watch(['src/index.html', ''], gulp.series('html'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('html', 'sсss', 'js', 'svgSprite')));

gulp.task('default', gulp.series('build', 'watch'));
