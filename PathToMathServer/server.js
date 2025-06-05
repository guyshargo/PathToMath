require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB Atlas
const mongoose = require('mongoose');
MONGODB_URI="mongodb+srv://yardennahum2:bhP7A.uhDcaTR7Y@cluster0.wik4fhp.mongodb.net/PathToMath?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Enable JSON parsing
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable CORS
const cors = require("cors");
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_ORIGIN || "http://localhost:5173");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Use routes
var users = require("./routes/users.route");
app.use("/api/users", users);

var api = require("./routes/api.route");
app.use("/api/", api);

// Start server
app.listen(PORT, (err) => {
  if (!err) console.log('Server is running on port', PORT);
  else console.log("Error, can't start server", err);
});
