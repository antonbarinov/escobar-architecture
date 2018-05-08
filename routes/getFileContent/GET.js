const fs = require('fs');

module.exports = {
    authOnly: false,
    exec: async (requestData) => {
        requestData._customResponse = true;
        requestData._execOnBeforeSendResponse = false;

        const r = fs.createReadStream(__ROOT + '/mimeTypes.json');
        r.pipe(requestData._response);
    }
};