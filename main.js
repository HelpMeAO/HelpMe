// Add Express & API Router
var express = require("express");
var router = require("./api")

// Start express
var app = express();

// Redirect to default index page
app.get("/", function(req,res) {
  res.sendFile(__dirname + "/pages/index.html");
})

// Redirect to default index page
app.get("/wachtrij", function(req,res) {
  res.sendFile(__dirname + "/pages/Queue.html");
})

// Add the API
app.use('/api', router);

// Make the CSS/JS folder available
app.use("/css", express.static("css"));
app.use("/js",express.static("js"));


// The app is now running on port 80
app.listen(80);
console.log("Server is running on port 80!");
