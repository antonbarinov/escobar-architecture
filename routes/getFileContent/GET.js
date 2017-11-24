const fs = require('fs');
module.exports = async (requestData) => {
    requestData._customResponse = true;
    requestData._execOnBeforeSendResponse = false;

    const r = fs.createReadStream(__ROOT + '/mimeTypes.json');
    r.pipe(requestData._response);
};