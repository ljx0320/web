var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


// Root route
router.get("/", function (req, res) {
    res.render("landing");
});


// ======================
// Auth Routes
// ======================

// show sign up form
router.get("/register", function (req, res) {
    res.render("register");
});

// handle sign up logic
router.post("/register", function (req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/campgrounds");
            });
        }

    });
});

// show the login form
router.get("/login", function (req, res) {
    res.render("login");
});

// handling login logic
router.post("/login", passport.authenticate("local",
    {successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }), function (req, res) {
});

// handling the logout logic
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

module.exports = router;