var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var ArticleShema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true 
    },
    summary: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

ArticleShema.plugin(uniqueValidator);

var Article = mongoose.model("Article", ArticleShema);

module.exports = Article;
