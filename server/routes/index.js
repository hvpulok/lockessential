var express             = require("express"),
    router              = express.Router(),
    passport            = require("passport"),
    user                = require("../models/user");

//=======Root Route Definitions============
router.get('/hello', function(req, res){
    // res.render("index.html");
    res.render("server_views/hello.html");
});

//============= Auth Routes=======================================

// Handle registeration or sign up logic
router.post("/signup", function(req, res) {
    var newUser = new user({username: req.body.username});
    user.register(newUser, req.body.password, function(err, user){
       if(err){
           console.log(err);
           return res.send("Error to Signup");
       } 
       passport.authenticate("local")(req, res, function(){
            res.redirect("/");
       });
    });
})

// Handle user Log In logic
router.post("/login",passport.authenticate("local",
    {successRedirect: "/",
    failureRedirect: "/#!/login"}
),function(req, res) {});

// logout route logic
router.post("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
})



module.exports = router;