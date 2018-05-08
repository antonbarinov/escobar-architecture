const fs = require('fs');

module.exports = {
    authOnly: false,
    exec: async (requestData) => {
        requestData._customResponse = true;
        requestData._execOnBeforeSendResponse = false;

        const res = requestData._response;
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment; filename="black_hole.jpg"');


        const r = fs.createReadStream(__dirname + '/black_hole_detail.jpg');
        r.pipe(requestData._response);
    }
};