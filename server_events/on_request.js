module.exports = async (requestData) => {
    console.log('Application server event: request');

    const res = requestData._response;
    const req = requestData._request;

    // Set response headers (default)
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // Headers for cross domain requests
    if (req.method == 'OPTIONS') {
        res.setHeader('Allow', 'GET,POST,PUT,DELETE,OPTIONS');

        requestData._execRouting = false;
        requestData._execOnBeforeSendResponse = false;
    }

    if (req.headers.origin) res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, sessionId');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    requestData._user = false;

    // Or some stuff
    // req.on('data', (chunk) => { console.log('request body chunk: ' + chunk) });
    // req.on('end', () => {console.log("client request is complete. Let's send him response!")});

    // If you set server.useJsonParser or server.useMultipartParser or server.useUrlencodedParser to false
    // You can use your tools to parse this data

    return true;
};