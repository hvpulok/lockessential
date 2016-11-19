var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");     //for mongoose local auth

// define mongoose user schema for MongoDB
var userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String},
    email: {type: String, default: "-"}, 
    joinDate: {type: Date, default: Date.now},
    infos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Info'}]
});

userSchema.plugin(passportLocalMongoose);   // mongoose local user auth plugins add

// define mongoose user model based on schema
module.exports = mongoose.model("User", userSchema);