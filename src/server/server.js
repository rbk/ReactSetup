const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const compiler = webpack(require('../../webpack.config.js'));
const path = require('path');
const express = require('express');
const app = express();

app.use(
  middleware(compiler, {
    // (optional webpack-dev-middleware options)
  })
);
app.use(express.json());

app.get('/info', function(req, res) {
    const packageJson = require('../../package.json');
    res.send({
        name: packageJson.name,
        version: packageJson.version
    });
});

app.get('/', function(req, res) {
    const index = path.resolve('./src/public/index.html');
    res.sendFile(index);
});

app.listen(3001);
console.log('Listening on port 3001');



