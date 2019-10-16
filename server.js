const express = require ('express');
const bodyParser = require('body-parser');

//express app

const app = express();



// parse request

app.use(bodyParser.urlencoded({ extended: true}));



//parse request

app.use(bodyParser.json());



// home route
app.get('/', (req, res) => {
    res.json({"message": "hello."});
});


//monitor requests

app.listen(3000, ()=>{

    console.log("server is listening on port 3000");
});
