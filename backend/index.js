const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


const user = require('./Routes/userroute');


app.use('/api',user);




module.exports = app;
