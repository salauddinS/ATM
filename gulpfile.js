'use strict';
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({ lazy: true });
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var livereload = require('gulp-livereload');
var Server = require('karma').Server;
var protractor = require('gulp-protractor').protractor;

var paths = {
    appScripts: 'src/app/**/*.js'
};
var port = process.env.PORT || config.defaultPort;

gulp.task('unit', function (done) {
    console.log('Starting Unit testing');
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }).start();
});
gulp.task('injectjs', function () {
    return gulp.src(config.index)
        .pipe(plugins.inject(gulp.src(config.js), { relative: true }))
        .pipe(gulp.dest('src/client'));

});

gulp.task('default', ['injectjs'], function () {
    // require('opn')('http://localhost:9000');
    var isDev = true
    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'development' : 'production'
        },
        watch: [config.server]
    };

    return plugins.nodemon(nodeOptions)
        .on('restart', function (ev) {
            console.log('*** nodemon restarted');
            console.log('files changed on restart:\n' + ev);
            setTimeout(function () {
                browserSync.notify('reloading now ...');
                browserSync.reload({ stream: false });
            }, config.browserReloadDelay);
        })
        .on('start', function () {
            console.log('*** nodemon started');
            startBrowserSync();
        })
        .on('crash', function () {
            console.log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function () {
            console.log('*** nodemon exited cleanly');
        });
});

function startBrowserSync(isDev) {
    if (browserSync.active) {
        return;
    }
    console.log('Starting browser-sync on port ' + port);
    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: ['src/client/**/*.*','src/client/assets/css/*.css'],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 1000
    };
    browserSync(options);
}


