var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    commentTime: {
        type: Date,
        default: Date.now
    }
})

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;