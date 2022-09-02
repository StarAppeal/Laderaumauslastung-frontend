const express = require('express');
const app = express();
const path = require('node:path');

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (_req, res) =>
    res.sendFile('public/views/index.html', {
        root: path.dirname(__dirname)
    }));

app.listen(8081, () => console.log("Started server!"));