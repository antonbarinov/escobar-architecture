const http = require('http');
const path = require('path');
const fs = require('fs');
const mimeTypes = JSON.parse(fs.readFileSync(__dirname + '/mimeTypes.json').toString());

require('./spawn_api');

const host = '0.0.0.0';
const port = 3001;

const server = http.createServer(async (request, response) => {
    // Server static files
    if (request.url.indexOf('.') != -1) {
        const path_to_file = __dirname + '/static_files' + request.url;
        fs.stat(path_to_file, (err, stat) => {
            if (err || !stat.isFile()) {
                response.statusCode = 404;
                response.statusMessage = http.STATUS_CODES[404];
                response.end();
            } else {
                const ext = path.extname(request.url).substr(1);
                response.setHeader('Content-Type', mimeTypes[ext] || 'text/plain');
                const r = fs.createReadStream(path_to_file);
                r.pipe(response);
            }
        });
    }
    // Proxy to backend
    else {
        const proxyRequest = http.request({
            port: 8080,
            method: request.method,
            path: request.url,
            headers: request.headers
        }, (proxyReq) => {
            response.writeHead(proxyReq.statusCode, proxyReq.headers);

            proxyReq.on('data', (chunk) => {
                response.write(chunk);
            });
            proxyReq.on('end', () => {
                response.end();
            });
        });

        proxyRequest.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
        });

        request.on('data', (chunk) => {
            proxyRequest.write(chunk);
        });

        request.on('end', () => {
            proxyRequest.end();
        });
    }
});

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(port, host, 65535, () => {
    console.log(`Server running at http://${host}:${port}/`);
});