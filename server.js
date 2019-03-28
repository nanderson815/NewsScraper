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


app.get("/", function (req, res) {
    db.Article.find({}).then(function (dbArticle) {
        res.render("index", { Articles: dbArticle });
    })
});

app.get("/articles/:id", function (req, res) {

    db.Article.findOne({ _id: req.params.id })
        .populate("comments")
        .then(function (dbArticle) {
            res.render("comment", { Article: dbArticle, layout: 'single' });
            console.log(dbArticle);
        });
});


app.post("/articles/:id", function (req, res) {
    db.Comment.create(req.body).then(function (dbComment) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push:{ comments: dbComment.id }}, { new: true })
            .populate("comments")
            .then(function (dbArticle) {
                res.json(dbArticle);
            });
    });
});

app.get("/api/scrape", function (req, res) {
    axios.get("https://www.bbc.com/news/topics/cxqvep8kqext/long-reads").then(function (response) {
        var $ = cheerio.load(response.data);

        $("article").each(function (i, element) {
            var results = {};

            // fix to add bbc url to USA links. USA are relative, UK are absolute. 
            let linktest = $(this).find("div").find('a').attr("href");
            if (linktest.includes("uk")) {
                results.link = linktest;
            } else {
                results.link = "https://www.bbc.com" + linktest
            };

            results.title = $(this).children("header").text();
            results.summary = $(this).find("p").text();



            db.Article.create(results).then(function (dbArticle) {
                console.log(dbArticle);
            });
        }).then(res.sendStatus(200));

    });
});

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});