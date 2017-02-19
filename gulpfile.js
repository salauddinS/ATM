'use strict';
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({ lazy: true });
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
// var wiredep = require('wiredep');
var livereload = require('gulp-livereload');
var Server = require('karma').Server;
var protractor = require('gulp-protractor').protractor;

var paths = {
    appScripts: 'src/app/**/*.js'
};
var port = 8082;
gulp.task('scripts', function () {
    return gulp.src([paths.appScripts])
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter(require('jshint-stylish')))
        .pipe(plugins.size());
});
gulp.task('unit', function (done) {
    //log('Starting Unit testing');
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }).start();
});
gulp.task('watch', ['serve'], function () {
    livereload.listen();

    gulp.watch([
        'src/**/*.html',
        'src/**/*.js',
        'src/styles/*.css'
    ]).on('change', function (file) {
        console.log('File changed: ' + file.path);
        livereload.changed(file.path); //YES (by itself)
        //livereload.reload(); //YES (by itself)
    });

    gulp.watch(paths.appScripts, ['scripts']);
});
gulp.task('server', function () {
    console.log('Starting Server ');
    plugins.nodemon({
        script: './src/server/server.js', ext: 'js html', env: { 'NODE_ENV': 'development' }
    })
        .on('restart', function () {
            console.log('server restarted!');
        });
});

gulp.task('injectjs', function () {
    return gulp.src(config.index)
        .pipe(plugins.inject(gulp.src(config.js), { relative: true }))
        .pipe(gulp.dest('src/client'));

});

gulp.task('default',['injectjs'], function () {
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
        .on('restart', function (event) {
           console.log('nodemon restarted');
             console.log('files changed on restart:\n' + event);
            setTimeout(function () {
                browserSync.notify('reloading now ...');
                browserSync.reload({ stream: false });
            }, 1000);
        })
        .on('start', function () {
            console.log('nodemon started');
            startBrowserSync(isDev);
        })
        .on('crash', function (event) {
             console.log('nodemon crashed: script crashed for some reason');
             console.log('files changed on restart:\n' + event);
        })
        .on('exit', function () {
           console.log('nodemon exited cleanly');
        });
});

gulp.task('connect', function () {
    //     var app = connect()
    //         .use(serveStatic('src'));
    // 
    //     require('http').createServer(app)
    //         .listen(9000)
    //         .on('listening', function () {
    //             console.log('Started connect web server on http://localhost:9000');
    //         });
});


function startBrowserSync(isDev) {
    if (browserSync.active) {
        return;
    }
    log('Starting browser-sync on port ' + port);
    var options = {
        proxy: 'localhost:' + port,
        port: 9001,
        files: [config.js],
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


function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                plugins.util.log(plugins.util.colors.blue('*** ' + msg[item] + ' ***'));
            }
        }
    } else {
        plugins.util.log(plugins.util.colors.blue('*** ' + msg + ' ***'));
    }
}
