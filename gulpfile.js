var gulp = require('gulp'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify');

gulp.task('misc', function() {
    return gulp.src(['app/js/misc/*.js'])
        .pipe(gp_concat('misc.concat.js'))
        .pipe(gulp.dest('app-prod'))
        .pipe(gp_rename('misc.uglify.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('app-prod'));
});

gulp.task('game', function() {
    return gulp.src(['app/js/game/core.js', 'app/js/game/hack.js',
            'app/js/game/hack-hackers.js', 'app/js/game/hack-places.js',
            'app/js/game/virus.js', 'app/js/game/virus-list.js',
            'app/js/game/kongregate.js', 'app/js/game/player.js',
            'app/js/game/servers.js', 'app/js/game/botnet.js',
            'app/js/game/console.js', 'app/js/game/console-commands.js',
            'app/js/game/options.js', 'app/js/game/save.js'])
        .pipe(gp_concat('game.concat.js'))
        .pipe(gulp.dest('app-prod'))
        .pipe(gp_rename('game.uglify.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('app-prod'));
});

gulp.task('default', ['misc', 'game'], function(){});