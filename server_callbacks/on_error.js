module.exports = async (requestData, err) => {
    requestData._http.setCode(500);

    requestData._clientResponse = {
        status: 'FAIL',
        message: __getErrorMsg(err)
    };

    return true;
};