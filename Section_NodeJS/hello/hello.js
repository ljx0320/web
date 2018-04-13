var express = require("express");
var app = express();

app.get("/", function(req,res){
    res.send("hello");
});

app.get("/jojo", function(req,res){
   res.send("This is JOJO!")
});

app.get("/dio", function (req,res) {
   res.send("This is DIO!");
});

// It is quite insane to actually store every stand.
// Thus we make a pattern! Notice the /:info
app.get("/stand/:info", function (req,res) {
    // Try searching /stand/starplatinum or /stand/world
    res.send("This is " + req.params.info + "!");
});

// Rule is, add : to any variable!


// Anything else will be responded with "destiny"
app.get("*", function (req,res) {
    res.send("This is destiny!");
});

app.listen(3000, process.env.IP, function () {
    console.log("Server has started!");
});
