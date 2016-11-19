var mongoose = require("mongoose");

// define mongoose user schema for MongoDB
var userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, default: "-"}, 
    joinDate: {type: Date, default: Date.now},
    infos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Info'}]
});

// define mongoose user model based on schema
module.exports = mongoose.model("User", userSchema);