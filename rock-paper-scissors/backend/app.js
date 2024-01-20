const express = require('express');
const path = require('node:path');
const port = 5000;
const frontend = path.resolve(__dirname, '../frontend');
const views = path.resolve(__dirname, 'views');
const router = require('./router.js');
const nunjucks = require('nunjucks');

const app = express();
nunjucks.configure(views, {
    express: app,
    autoescape: true
});

app.use(router);
app.use(express.static(frontend));

app.listen(port, function () {
    console.log(`Server started! Url: http://localhost:${port}`);
});
