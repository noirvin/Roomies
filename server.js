const express = require ('express');
const bodyParser = require('body-parser');
const https = require('https');
require('dotenv').config()

//express app
const app = express();

// parse request
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/roomies-as', { useNewUrlParser: true });

require('./app/routes/task.routes.js')(app);


mongoose.Promise = global.Promise;

// Require tasks routes


// // Connecting to the database
// mongoose.connect(dbConfig.url, {
//     useNewUrlParser: true
// }).then(() => {
//     console.log("Successfully connected to the database");
// });





// const port = process.env.PORT || 3000;
// app.listen(port);
//
//
// //monitor requests
//
// app.listen(3000, ()=>{
//
//     console.log("server is listening on port 3000");
// });

app.listen(process.env.PORT || 3000 (req, res) => {
    console.log("Listening at port 3000")
})
