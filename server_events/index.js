module.exports = (server) => {
    /**
     * Application server events in lifecycle order
     */
    // Got new request, we can do some stuff here.
    server.on('request', require('./on_request'));

    // Do some stuff before execute routing function
    server.on('before_endpoint', require('./on_before_endpoint'));

    // Customize executing route function
    server.on('exec_route', require('./on_exec_route'));

    // On this step we have response that we want to send client
    // If you want to modify responses before they will sent, you can use this hook
    server.on('before_send_response', require('./on_before_send_response'));


    /**
     * Other application server events
     */
    // We don't find any route for request
    server.on('not_found', require('./on_endpoint_not_found'));

    // We got error
    server.on('error', require('./on_error'));
};