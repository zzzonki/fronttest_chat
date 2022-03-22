var gulp = require('gulp')
    sass = require('gulp-sass')(require('sass'))

gulp.task('sass', function(done){
    return gulp.src(['sass/style.scss'])
        .pipe(sass({outputStyle: 'expanded'})
        .on('error', sass.logError))
        .pipe(gulp.dest('css'))

    done()
})

gulp.task('watch', function() {
    gulp.watch(['sass/**/*.sass', 'sass/**/*.scss'], gulp.series('sass'))
})

gulp.task('default', gulp.series('watch'))