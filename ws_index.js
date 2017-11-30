"use strict";

const EscobarServer = require('escobar/WebSocketServer'); // Application server
const server = new EscobarServer(require('uws').Server);


server.host = '0.0.0.0'; // Host
server.port = 3003; // Port


/**
 * Got new request, we can do some stuff here.
 * This function must ba async
 */
server.onConnect = async (requestData) => {
    console.log('onConnect');
    return true;
};

server.onMessage = async (requestData) => {
    console.log('onMessage');
    return true;
};



/**
 * Do some stuff and start server
 */
(async () => {
    // await for some stuff (example database migrations scripts, start some services, etc.)

    // This wrapped in "async" because almost always we do to so some stuff before we can start handle connections
    await server.loadRoutes(__dirname + '/ws_routes'); // Load routes from folder
    server.startServer(); // Start server
})();