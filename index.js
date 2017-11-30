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


/**
 * Got new request, we can do some stuff here.
 * This function must ba async
 */
server.onRequest = require('./server_callbacks/on_request');

/**
 * We got error
 * This function must ba async
 */
server.onError = require('./server_callbacks/on_error');

/**
 * Do some stuff before execute routing function
 * This function must ba async
 */
server.onBeforeEndpoint = require('./server_callbacks/on_before_endpoint');

/**
 * On this step we have response that we want to send client
 * If you want to modify responses before they will sent, you can use this hook
 * This function must ba async
 */
server.onBeforeSendResponse = require('./server_callbacks/on_before_send_response');

/**
 * We don't find any route for request
 * This function must ba async
 */
server.onEndpointNotFound = require('./server_callbacks/on_endpoint_not_found');

/**
 * Customize executing route function
 * This function must ba async
 */
server.onExecRoute = require('./server_callbacks/on_exec_route');


/**
 * Do some stuff and start server
 */
(async () => {
    // await for some stuff (example database migrations scripts, start some services, etc.)

    // This wrapped in "async" because almost always we do to so some stuff before we can start handle connections
    await server.loadRoutes(__dirname + '/routes'); // Load routes from folder
    server.startServer(); // Start server

    require('./ws_index');
})();