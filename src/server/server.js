var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var port = process.env.PORT || 9001;
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, '../client')));
app.use('/node_modules', express.static(__dirname + '/../../node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

require('./api/api')(app);
require('./admin/adminApi')(app);

app.get('/', function (req, res) {
    res.render('index.html');
});

var server = app.listen(port, function () {
    var host = 'localhost';
    console.log('App listening at http://%s:%s', host, server.address().port);
});
