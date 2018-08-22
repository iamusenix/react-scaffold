var debug = require('debug')('xtsite:server');
var http = require('http');
var app = require('./app-main');

module.exports = function () {
    var port = process.env.G_HA_NODE_PORT || process.env.HA_NODE_PORT;

    if (!port) {
        console.error("No server port is provided! Please set env HA_NODE_PORT");
        return false;
    }

    app.set('port', port);

    var server = http.createServer(app);

    server.on('error', function (error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        switch (error.code) {
            case 'EACCES':
                console.error('Port ' + port + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error('Port ' + port + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    });

    server.on('listening', function () {
        debug('Listening on port ' + server.address().port);
    });

    server.listen(port);
};
