const endpointNotFound = JSON.stringify({
    status: "FAIL",
    message: "Endpoint not found"
});

module.exports = async (requestData) => {
    console.log('Application server event: not_found');

    // Don't exec server event 'before_send_response'
    // Because i don't want to waste CPU time for JSON.stringify every time
    requestData._execOnBeforeSendResponse = false;

    requestData._clientResponse = endpointNotFound;

    return true;
};