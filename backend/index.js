const express = require('express')
const mongodb=require('mongodb').MongoClient;
const app = express()
var cors = require('cors')
const bodyParser = require('body-parser');
var config = require('./config');

const url = config.url
app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = process.env.PORT||1007

app.use('/login', require('./Routes/login'));
app.use('/RequestedList', require('./Routes/RequestedList'));
app.use('/Suggestfrds', require('./Routes/Suggestfrds'));

app.listen(port, () => {
    console.log('Server started @' +port)
})