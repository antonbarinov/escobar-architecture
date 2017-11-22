const { spawn } = require('child_process');
const api = spawn('node', ['index.js']);

api.stdout.on('data', (data) => {
    console.log(`api process stdout:\r\n${data}`);
});

api.stderr.on('data', (data) => {
    console.log(`api process stderr:\r\n${data}`);
});

api.on('close', (code) => {
    console.log(`api child process exited with code ${code}`);
});