"use strict";

// Global variables
global.__ROOT = __dirname; // Project root folder

const EscobarServer = require('escobar'); // Application server
const server = new EscobarServer();

// Some helper global functions and variables
require('./globals/functions');
require('./globals/variables');


server.host = '0.0.0.0'; // Host
server.port = 8080; // Port


// Serve server events
require('./server_events/index')(server);


// Do some stuff and start server
(async () => {
    // await for some stuff (example database migrations scripts, start some services, etc.)

    // This wrapped in "async" because almost always we do to so some stuff before we can start handle connections
    await server.loadRoutes(__dirname + '/routes'); // Load routes from folder
    server.startServer(); // Start server
})();