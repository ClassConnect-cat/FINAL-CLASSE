const express = require('express');
const app = express();
const path = require('node:path');
const logger = require('morgan');
const cors = require('cors');

app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
	  res.setHeader("Access-Control-Allow-Origin", "*");
	  res.setHeader('Access-Control-Allow-Methods', '*');
	  res.setHeader("Access-Control-Allow-Headers", "*");
	  next();
});

const fs = require('node:fs');

const routerFiles = fs.readdirSync(path.resolve(__dirname, './routers'));
for(const file of routerFiles) {
    console.log(file);
    const name = `/${file.replace(/\.js$/, '').replace(/index/, '')}`;
    if (name === '/register')
    {
        const registerRouter = require(path.resolve(__dirname, 'routers', file));
        app.use(name, registerRouter);
    }
    else
    {
        app.use(name, require(path.resolve(__dirname, 'routers', file)));
    }
    console.log('Loaded router', name, 'from', file);
}

module.exports = app;
