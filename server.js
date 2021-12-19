const express = require('express');
const app = express();
require('dotenv').config();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

const {connectDB, routesConnectDB} = require('./config/configDB');

const admimRouter = require('./router/admin');
const svRouter = require('./router/sinhvien');
const mhRouter = require('./router/monhoc');
const lRouter = require('./router/lop');
const kRouter = require('./router/khoa');
const dRouter = require('./router/diem');



app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
const corsOptions = {
    origin: process.env.URL_CLIENT,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_CLIENT);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/admin',admimRouter);
app.use('/sv',svRouter);
app.use('/mh',mhRouter);
app.use('/lop',lRouter);
app.use('/khoa',kRouter);
app.use('/diem',dRouter);

app.get('/', routesConnectDB);

app.use((req, res, next) => {
    const error = new Error("Route not found.");
    error.status = 404;
    next(error)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

connectDB();

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})