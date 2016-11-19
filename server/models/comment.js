var mongoose = require("mongoose");

// define mongoose comment schema for MongoDB
var commentSchema = new mongoose.Schema({
    text: String,
    author: {
                id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User"
                    },
                username: String
            },
    commentDate: {type: Date, default: Date.now}
});

// define mongoose campground model based on schema
module.exports = mongoose.model("Comment", commentSchema);