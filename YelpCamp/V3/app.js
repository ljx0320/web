var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground");
    seedDB = require("./seeds");

seedDB();

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

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
            res.render("index",{campgrounds:allCampgrounds});
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
    res.render("new");
});


app.get("/campgrounds/:id",function (req,res) {
    Campground.findById(req.params.id, function (error,foundCampground) {
        if (error){
            console.log(error);
        }
        else {
            res.render("show",{campground:foundCampground});
        }
    })
});

app.listen(process.env.PORT || 3000, process.env.IP, function () {
   console.log("YelpCamp has started!");
});
