var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");



seedDB();


app.use(require("express-session")({
    secret: "Once again JOJO is the best!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+ "/public"));

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});
/*
var campgrounds = [
    {name:"Salmon Creek", image:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526310304&di=590a9f8c599bde2d84d28fd835450cd2&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.sinaimg.cn%2Fty%2Foutdoor%2Fidx%2F2014%2F0708%2FU10877P6T1024D12737F30636DT20140708115032.jpg"},
    {name:"Granite Hill", image:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525715616480&di=9b199ceda2ad4a324b5487984e5929a2&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170804%2Fc4045b5a164a438e84d7baa2f42497f7_th.png"},
    {name:"Moutain Goat's Rest", image:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525715643304&di=2203456393034ed3f1fe701a161de370&imgtype=0&src=http%3A%2F%2Fimg10.fblife.com%2Fattachments%2F20130606%2F13704864095189.jpg"}
];
*/



/*
Campground.create(
    {
        name:"Granite Hill",
        image:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526310304&di=590a9f8c599bde2d84d28fd835450cd2&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.sinaimg.cn%2Fty%2Foutdoor%2Fidx%2F2014%2F0708%2FU10877P6T1024D12737F30636DT20140708115032.jpg"
    },
    function(error, campground) {
        if(error) {
            console.log("FAILED");
        }
        else{
            console.log("SUCCEED");
            console.log(campground);
        }
    }
);
*/



app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds",function (req,res) {
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



app.post("/campgrounds",function (req, res) {
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



app.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds/new");
});


app.get("/campgrounds/:id",function (req,res) {
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





// ==========================
// comments routes
// ==========================



app.get("/campgrounds/:id/comments/new", isLoggedIn, function (req,res) {
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
})



app.post("/campgrounds/:id/comments", function (req, res) {
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
                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            })


        }


    });

   // Create new comment
    // Connect new comment to the campground
    // redirect campground show page
});


// ======================
// Auth Routes
// ======================

// show sign up form
app.get("/register", function (req, res) {
    res.render("register");
});

// handle sign up logic
app.post("/register", function (req, res) {
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
app.get("/login", function (req, res) {
    res.render("login");
});

// handling login logic
app.post("/login", passport.authenticate("local",
    {successRedirect:"/campgrounds",
    failureRedirect:"/login"
    }), function (req, res) {
});

// handling the logout logic
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

// A user must sign in first to add comments
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    else {
        res.redirect("/login");
    }
};

app.listen(process.env.PORT || 3000, process.env.IP, function () {
   console.log("YelpCamp has started!");
});
