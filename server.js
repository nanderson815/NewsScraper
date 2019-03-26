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
});

app.get("/scrape", function(req, res){
    axios.get("https://www.bbc.com/news/topics/cxqvep8kqext/long-reads").then(function(response){
        var $ = cheerio.load(response.data);

        $("article").each(function(i, element){
            var results = {};

            results.title = $(this).children("header").text();
            results.summary = $(this).find("p").text();
            results.link = "https://www.bbc.com" + $(this).children("header").children("div").children("h3").children("a").attr("href");
           
            console.log(results);
        });
 
    });
});

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});