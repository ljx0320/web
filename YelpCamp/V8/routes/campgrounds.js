var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");


// INDEX route
router.get("/",function (req,res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else {
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    })

    //res.render("campgrounds",{campgrounds:campgrounds});
});


// CREATE - add new campground to the DB
router.post("/", isLoggedIn, function (req, res) {
    // get data from form and

    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;


    var newCamp = {name:name, image:image, description:desc};

    //campgrounds.push(newCamp);

    Campground.create(newCamp, function(err,newlyCreated){
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/campgrounds");
        }
    })

    //res.redirect("/campgrounds");
});

// NEW - show form to create campground

router.get("/new", isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

// SHOW - show more info about a campground

router.get("/:id",function (req,res) {
    Campground.findById(req.params.id).populate("comments").exec(function (error,foundCampground) {
        if (error){
            console.log(error);
        }
        else {
            console.log(foundCampground);
            res.render("campgrounds/show",{campground:foundCampground});
        }
    })
});


// A user must sign in first to add campgrounds
// middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    else {
        res.redirect("/login");
    }
}
module.exports = router;