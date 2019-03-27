var express = require("express");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");
var PORT = 3000;

var exphbs = require("express-handlebars");

var app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));



mongoose.connect("mongodb://localhost/newsDB", { useNewUrlParser: true });


app.get("/", function(req, res){
    db.Article.find({}).then(function(dbArticle){
        res.render("index", {Articles: dbArticle});
    })
});

app.get("/scrape", function(req, res){
    axios.get("https://www.bbc.com/news/topics/cxqvep8kqext/long-reads").then(function(response){
        var $ = cheerio.load(response.data);

        $("article").each(function(i, element){
            var results = {};

            let linktest = $(this).find("div").find('a').attr("href");
            if (linktest.includes("uk")){
                results.link = linktest;
            } else {
                results.link = "https://www.bbc.com" + linktest
            };

            results.title = $(this).children("header").text();
            results.summary = $(this).find("p").text();
            // results.link = "https://www.bbc.com" + $(this).find("div").find('a').attr("href");
           
            db.Article.create(results).then(function(dbArticle){
                console.log(dbArticle);
            });
        });
 
    });
});

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});