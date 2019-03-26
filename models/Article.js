var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleShema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
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

var Article = mongoose.model("Article", ArticleShema);

module.exports = Article;
