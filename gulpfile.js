let gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify-es').default,
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache');

gulp.task('scss', function() {
    return gulp.src(['app/scss/**/*.scss',
                     'app/scss/*.scss'])
               .pipe(sass())
               .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
               .pipe(gulp.dest('app/css/'))
               .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*')
        .pipe(imagemin(cache({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('scripts', function() {
    return gulp.src(['app/js/utils.js', 'app/js/index.js'])
               .pipe(concat('index.min.js'))
               .pipe(uglify())
               .pipe(gulp.dest('app/js'));
});

gulp.task('watch', ['browser-sync', 'scss', 'scripts'], function() {
    gulp.watch('app/scss/**/*.scss', ['scss']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/data/*.json', browserSync.reload);
    gulp.watch('app/js/*.js', ['scripts']);
    gulp.watch('app/js/*.js', browserSync.reload);
});

gulp.task('clean', function() {
    return del.sync(['dist', '!dist/deploy.php']);
});

gulp.task('build', ['clean', 'img', 'scss'], function() {

    gulp.src(['app/css/*.css'])
        .pipe(gulp.dest('dist/css/'));

    gulp.src(['app/data/*.json'])
        .pipe(gulp.dest('dist/data/'));

    gulp.src(['app/js/index.min.js', 'app/js/seeder.js'])
        .pipe(gulp.dest('dist/js/'));

    gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
});