var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index");

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
router.post("/", middleware.isLoggedIn, function (req, res) {
    // get data from form and

    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };


    var newCamp = {name:name, image:image, description:desc, author: author};

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

router.get("/new", middleware.isLoggedIn, function (req, res) {
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

// EDIT campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            res.redirect("/campgrounds");
        }
        else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});


// UPDATE campground route
router.put("/:id/", middleware.checkCampgroundOwnership, function (req, res) {
    // find and update
    // redirect show page
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/campgrounds");
        }
        else {
            res.redirect("/campgrounds");
        }
    });
});





module.exports = router;