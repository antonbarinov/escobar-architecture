function objectsToQueryString(obj) {
    return Object.keys(obj).map(function (key) {
        return encodeURIComponent(key) + '=' +
            encodeURIComponent(obj[key]);
    }).join('&');
}

const apiRequest = (method = 'GET', url, data = null) => new Promise((resolve, reject) => {
    try {
        method = method.toUpperCase();
        const xhr = new XMLHttpRequest();
        if (method == 'GET' && data && typeof data == 'object') {
            if (url.indexOf('?') == -1) url += '?';
            url += objectsToQueryString(data);
            data = null;
        }
        xhr.open(method.toUpperCase(), url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(data);

        let text = '';

        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                reject(xhr);
                text = JSON.stringify(JSON.parse(xhr.responseText), null, '  ');
            } else {
                let data;
                try {
                    data = JSON.parse(xhr.responseText);
                    text = JSON.stringify(data, null, '  ');
                    resolve({ data, xhr });
                }
                catch (e) {
                    reject(e);
                }
            }

            document.getElementById('output').innerText = `${method} ${url} response: \r\n`;
            document.getElementById('output').innerText += text;
        }
    }
    catch (e) {
        reject(e);
    }
});

const loginOk = async () => {
    try {
        await apiRequest('POST', '/login', JSON.stringify({
            userName: "admin",
            password: "admin"
        }));
    }
    catch (e) {
        console.error(e);
    }
};

const loginFail = async () => {
    try {
        await apiRequest('POST', '/login', JSON.stringify({
            userName: "admin",
            password: "adminasd"
        }));
    }
    catch (e) {
        console.error(e);
    }
};

const me = async () => {
    try {
        await apiRequest('GET', '/me');
    }
    catch (e) {
        console.error(e);
    }
};

const logout = async () => {
    try {
        await apiRequest('GET', '/logout');
    }
    catch (e) {
        console.error(e);
    }
};

const errorEndpoint = async () => {
    try {
        await apiRequest('GET', '/withError');
    }
    catch (e) {
        console.error(e);
    }
};

const invalidEndpoint= async () => {
    try {
        await apiRequest('GET', '/invalidEndpoint_asqweqwe');
    }
    catch (e) {
        console.error(e);
    }
};

