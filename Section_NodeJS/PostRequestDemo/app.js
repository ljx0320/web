var express = require("express");

var app = express();


var bodyParser = require("body-parser");

//no explanation: just use the body parser!
app.use(bodyParser.urlencoded({extended: true}));

var friends = ["Jonathan", "Joseph", "Johnny", "Joline"];


app.set("view engine", "ejs");


app.get("/", function (req, res) {
    res.render("home");
});

app.get("/friends",function (req, res) {
    res.render("friends", {friends:friends});
});


app.post("/addFriend", function (req,res) {
    // Get the new friend from the request since this is a post request!

    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
});



app.listen(process.env.PORT || 3000, process.env.IP, function () {
   console.log("Server has started!");
});