var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/index");
// ==========================
// comments routes
// ==========================


// Comments New
router.get("/new", middleware.isLoggedIn, function (req,res) {
    // Find campground by id
    Campground.findById(req.params.id, function (error, foundCampground) {
        if (error) {
            console.log(error);
        }
        else {
            console.log(foundCampground);
            res.render("comments/new", {campground:foundCampground});

        }
    })
});


// Comments Create
router.post("/", function (req, res) {
    // look up campground using ID

    Campground.findById(req.params.id, function(error, foundCampground){
        if (error) {
            console.log(error);
            res.redirect("/campgrounds");
        }
        else {
            Comment.create(req.body.comment, function (error, comment) {
                if (error) {
                    console.log(error);

                }
                else {
                    // add id and username
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            })


        }


    });

});

// EDIT COMMENT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err) {
            res.redirect("back");
        }
        else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

// UPDATE COMMENT ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
        if (err) {
            res.redirect("back");
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY COMMENT ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            res.redirect("back");
        }
        else {
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});




module.exports = router;