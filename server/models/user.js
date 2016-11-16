var mongoose = require("mongoose");

// define mongoose user schema for MongoDB
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: {type: String, default: "-"},  //userType can be admin, manager, reviewer, regular
    joinDate: {type: Date, default: Date.now}
});

// define mongoose user model based on schema
module.exports = mongoose.model("user", userSchema);