const endpointNotFound = JSON.stringify({
    status: "FAIL",
    message: "Endpoint not found"
});

module.exports = async (requestData) => {
    // Don't exec server.onBeforeSendResponse
    // Because i don't want to waste CPU time for JSON.stringify every time
    requestData._execOnBeforeSendResponse = false;

    requestData._clientResponse = endpointNotFound;

    return true;
};