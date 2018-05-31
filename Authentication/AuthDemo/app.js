var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");



mongoose.connect("mongodb://localhost/auth_demo_app");
var app = express();


app.use(require("express-session")({
    secret: "JOJO is the best!",
    resave: false,
    saveUninitialized: false
}));


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);




// ======================
// ROUTES
// ======================


app.get("/", function (req,res) {
   res.render("home");
});


app.get("/secret", function (req, res) {
   res.render("secret");
});

// Auth routes
// Show sign up form

app.get("/register", function (req, res) {
   res.render("register");
});


// Handling user sign up
app.post("/register", function (req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
       if (err) {
           console.log(err);
           return res.render("register");
       }
       passport.authenticate("local")(req,res,function () {
          res.redirect("/secret");
       });
    });
});


app.get("/login", function (req, res) {
   res.render("login");
});



app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("YelpCamp has started!");

});



