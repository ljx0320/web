var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");
// USER - email, name

var userSchema = new mongoose.Schema({
   email: String,
   name: String
});

var User = mongoose.model("User", userSchema);

// POST - title, content

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post",postSchema);

/*
var newUser = new User({
    email:"lijiaxin@umich.edu",
    name: "Jiaxin LI"
})

newUser.save(function (error, user) {
   if (error) {
       console.log(error);
   }
   else {
       console.log(user);
   }
});
*/

var newPost = new Post({
   title: "abc",
   content: "DEF"
});

newPost.save(function (err,post) {
   if (err) {
       console.log(err);
   }
   else {
       console.log(post);
   }
});