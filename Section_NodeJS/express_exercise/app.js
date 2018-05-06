var app = require("express")();


app.get("/",function(req, res){
    res.send("Welcome to assignment!")
});

app.get("/speak/:animal", function(req, res){
   if(req.params.animal == "pink") {
       res.send("Oink!");
   }
   if (req.params.animal == "cow") {
       res.send("Mow!");
   }
   if (req.params.animal == "dog") {
       res.send("woof!");
   }
   //console.log(req.params.animal);
   //res.send(req.params.animal);

});

app.get("/repeat/:blah/:times", function(req, res) {
   var times = parseInt(req.params.times);
   var message = "";
   for (var i = 0; i < times; i++) {
       message = message + req.params.blah + " ";
   }
   res.send(message);
});

app.get("*", function (req,res) {
    res.send("This is destiny!");
});


app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("Server has started!");
});
