module.exports = async (requestData) => {
    console.log('Application server event: before_send_response');

    // You can modify requestData._clientResponse here and it will be sent to client modified
    try {
        if (typeof requestData._clientResponse === 'object') {
            requestData._clientResponse = JSON.stringify(requestData._clientResponse);
        }
    } catch (e) {
        requestData._clientResponse = JSON.stringify({
            status: "FAIL",
            message: __getErrorMsg(e)
        })
    }
};