var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_reference");

var Post = require("./models/post");


var User = require("./models/user");



// User.create({
//    email:"bob@gmail.com",
//     name: "Bob"
//
// });


// Post.create({
//    title:"How to cook part 4",
//    content: "whatghost"
// },function (error, post) {
//     User.findOne({email:"bob@gmail.com"}, function (err, foundUser) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             foundUser.posts.push(post);
//             foundUser.save(function(err,data){
//                 if (err) {
//                     console.log(err);
//                 }
//                 else {
//                     console.log(data);
//                 }
//             });
//         }
//     })
// });


// Find user
// Find all posts made by that user, but not just IDs of posts

// User.findOne({email:"bob@gmail.com"}).populate("posts").exec(function(err,user){
//     if (err){
//         console.log(err);
//     }
//     else {
//         console.log(user);
//     }
// });