var express = require("express");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");

// var db = require("./models");

var PORT = 3000;

var app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://localhost/newsDB", { useNewUrlParser: true });


app.get("/", function(req, res){
    res.render("index");
})


// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});