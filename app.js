const express = require("express");
const app = express();
const morgan = require("morgan");
const BodyParser = require("body-parser");
const Mongoose = require("mongoose");

const db = "mongodb://dev:dewale005@ds151533.mlab.com:51533/vouchersdb"

Mongoose.connect(db,{useNewUrlParser: true})
const voucherRoutes = require('./api/routes/vouchers')
const orderRoutes = require('./api/routes/orders')

app.use(morgan('dev'));
app.use(BodyParser.urlencoded({extended: false}));
app.use(BodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

// Routes which should handle request
app.use('/vouchers', voucherRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;