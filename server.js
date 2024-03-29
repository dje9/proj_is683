/**
 * Module dependencies.
 */
var express = require('express')
var routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('port', 3000);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function () {
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

app.configure('test', function () {
    app.set('port', 3001);
    app.use(express.errorHandler());
});


// Routes

app.get('/', routes.index);

app.listen(app.settings.port, function () {
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
