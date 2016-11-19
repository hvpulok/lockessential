var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    user = require("../models/user");

//=======Root Route Definitions============
router.get('/hello', function (req, res) {
    // res.render("index.html");
    res.render("server_views/hello.html");
});

//============= Auth Routes=======================================

// Handle registeration or sign up logic
router.post("/signup", function (req, res) {
    var newUser = new user({ username: req.body.username });
    user.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                title: 'Signup failed! Try again after some time',
                message: err.message,
                error: err
            });
        }
        passport.authenticate("local")(req, res, function () {
            return res.status(201).json({
                title: 'Signup Successful',
            });
        });
    });
})

// Handle user Log In logic
router.post("/login", passport.authenticate("local"), function (req, res) {
    res.status(200).json({
        title: 'Login Successful',
        currentUser: {
            username: req.user.username,
            emai: req.user.email,
            _id: req.user._id
        }
    });
});

// logout route logic
router.post("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
})

// Handle user Log In logic
router.get("/current_user", function (req, res) {
    if (req.user) {
        return res.status(200).json({
            username: req.user.username,
            emai: req.user.email,
            _id: req.user._id
        });
    } else {
        return res.status(404).json({
            title: "No user is loggedin"
        });
    }

});

module.exports = router;