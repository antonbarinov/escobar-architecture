const crypto = require('crypto');


global.__getUserHash = (userName, password) => {
    const secret = 'abcdefg';
    return crypto.createHmac('sha256', secret)
        .update(userName + password)
        .digest('hex');
};

global.__getRandomHash = () => {
    const secret = Math.random().toString();
    return crypto.createHmac('sha256', secret)
        .update(new Date().getTime().toString())
        .digest('hex');
};

global.__successResponse = (data) => {
    return {
        status: 'OK',
        ...data
    }
};

global.__badRequest = (requestData, message) => {
    requestData._http.setCode(400);

    return {
        status: 'FAIL',
        message: message || 'Bad request'
    }
};

global.__unauthorized = (requestData, message) => {
    requestData._http.setCode(401);

    return {
        status: 'FAIL',
        message: message || 'Unauthorized'
    }
};

global.__getErrorMsg = (e) => {
    let msg = 'Internal Server Error';
    if (typeof e == 'string') msg = e;
    if (typeof e == 'object') {
        if (e.msg) msg = e.msg;
        if (e.message) msg = e.message;
    }

    return msg;
};

global.__validateRequiredFields = (fields, dataToValidate) => {
    let isOk = true;
    let errors = [];

    for (let fieldName in fields) {
        const fieldValue = fields[fieldName].toLowerCase();
        const isInt = fieldValue == 'int' || fieldValue == 'integer';
        const isFloat = fieldValue == 'float';
        const isString = fieldValue == 'string' || fieldValue == 'str';

        const validateValue = dataToValidate[fieldName];
        if (validateValue === undefined) {
            isOk = false;
            errors.push(`Field '${fieldName}' is required.`);
            continue;
        }

        if (isInt) {
            if (validateValue !== parseInt(validateValue)) {
                isOk = false;
                errors.push(`Field '${fieldName}' must be integer`);
            }
        } else if (isFloat) {
            if (validateValue !== parseFloat(validateValue)) {
                isOk = false;
                errors.push(`Field '${fieldName}' must be float`);
            }
        } else if (isString) {
            if (typeof validateValue != 'string') {
                isOk = false;
                errors.push(`Field '${fieldName}' must be string`);
            }
        }
    }

    if (isOk) return true;

    return "You got following errors: " + errors.join("; ");
};