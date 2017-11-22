module.exports = async (requestData) => {
    // You can modify requestData._clientResponse here and it will be sent to client modified

    try {
        requestData._clientResponse = JSON.stringify(requestData._clientResponse);
    } catch (e) {
        requestData._clientResponse = JSON.stringify({
            status: "FAIL",
            message: __getErrorMsg(e)
        })
    }
};