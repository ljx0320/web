var express = require("express");
var app = express();

// we need to tell node to load the files in the dir public
// Notice that "views" is loaded automatic
app.use(express.static("public"));

// This tells the node to look for files with the post-fix ejs
// so that we only need to render home rather than home.ejs
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/:thing", function (req, res) {
    res.render("thing", {thingVar:req.params.thing});
});

app.listen(process.env.PORT || 3000, process.env.IP, function () {
   console.log("Server has started");
});