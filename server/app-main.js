var fs = require('fs');
var path = require('path');
var express = require('express');
var compression = require('compression');
var favicon = require('serve-favicon');

// -----------------------------------------------------------------------
var base_dir = path.join(__dirname, '../dist');

var app = express();
app.enable('trust proxy');
app.use(compression());

// static resources
app.use(favicon(path.join(base_dir, '/app-monitor-static/images/favicon.ico')));
app.use(express.static(base_dir));

// routers
app.all('/*', (req, res, next) => {
    res.sendFile('app-monitor-static/index.html', {
        root: base_dir
    });
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    //next(err);
    res.redirect("/error/404")
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
