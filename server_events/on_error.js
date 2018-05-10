module.exports = async (requestData, err) => {
    console.log('Application server event: error');

    requestData._http.setCode(500);

    let errorMsg = __getErrorMsg(err);
    if (process.env.NODE_ENV == 'production') errorMsg = 'Internal server error';

    requestData._clientResponse = {
        status: 'FAIL',
        method: requestData._request.method,
        route: requestData._route,
        message: errorMsg
    };

    return true;
};