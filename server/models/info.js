var mongoose = require("mongoose");

// define mongoose info schema for MongoDB
var infoSchema = new mongoose.Schema({
    account: String,
    username: String,
    password: String,
    category: String,
    email: String,
    url: String,
    description: String
});

// define mongoose campground model based on schema
module.exports = mongoose.model("Info", infoSchema);