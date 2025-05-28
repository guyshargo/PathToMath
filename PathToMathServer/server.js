// Import Express
const express = require('express');
const app = express();
const PORT = 3000;
//connect to DB
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/PathToMath/Users').then(() => console.log('Connected!'));
//enable working with json
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//enable working with request from client port (5173)
const cors = require("cors");
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin",  "http://localhost:5173");
    res.header("Access-Control-Allow-Headers",  
              "Origin,X-Requested-With, Content-Type, Accept");
    next();
});
//use users route
var users = require("./routes/users.route");
app.use("/api/users",users);
// Start the server
app.listen(PORT, (err) => {
    if(!err) console.log('Server is running on port',PORT);
    else console.log("Error, can't start server", err)
});
