module.exports = function () {
    var app = './src/client/app/';
    var server = './src/server/';

    var config = {
        index: 'src/client/index.html',
        appJs: app + '/',

        js: [
            app + '**/*.js',
            'src/client/assets/css/*.css'
        ],
        server: server,
        /**
       *  Node settings
       */
        defaultPort: 9001,
        nodeServer: './src/server/server.js',
    };
    return config;
};