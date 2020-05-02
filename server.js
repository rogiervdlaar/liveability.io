//Load packages
var express = require("express");
var app = express();

var express = require('express');
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

console.log("There Express App will go here")

//ROUTING
// '/' => 'Home!'
app.get("/", function(req,res){
    
    res.render("home");
    
});

// '/' => 'Index!'
app.get("/index", function(req,res){
    
    res.render("index");
    
});

// // '/' => 'Home!'
// app.get("/fallinglovewith/:thing", function(req,res){
//     var thing = req.params.thing;
//     res.render("love", {thingVar: thing});
// });

app.get("/posts", function(req,res){
    var posts = [
        {title: "Wat is it called?", author: "me", source: "https://source.unsplash.com/Lml_PhRFbsk"},
        {title: "You didn't know this!", author: "you", source: "https://source.unsplash.com/0oPpbZVd-zY"},
        {title: "How to get stuff done", author: "someone else", source: "https://source.unsplash.com/ouZj1RPPiTU"}
    ];
    res.render("posts", {posts:posts});
});


app.get("*", function(req,res){
	res.send("catchall!") 
});

//SERVER
// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

