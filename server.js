const express = require ('express');
const bodyParser = require('body-parser');
const https = require('https');

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

require('./app/routes/task.routes.js')(app);


mongoose.Promise = global.Promise;

// Require tasks routes


// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
});


// home route
// app.get('/', (req, res) => {
//     const options = {
//       path: '/',
//       method: 'GET'
//     };
//
//     const getAllTasks = https.request(options, (r) => {
//       console.log('statusCode:', r.statusCode);
//       console.log('headers:', r.headers);
//
//       r.on('data', (tasks) => {
//         console.log(tasks);
//
//         res.render("/views/tasks/index", {tasks: tasks});
//       });
//     });
//
//     getAllTasks.on('error', (e) => {
//       console.error(e);
//     });
//
//     getAllTasks.end();
// });



//monitor requests

app.listen(3000, ()=>{

    console.log("server is listening on port 3000");
});
