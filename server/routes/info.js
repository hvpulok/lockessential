var express = require("express"),
    router = express.Router(),
    info = require("../models/info");

//=============campground Routes=======================================
//show route
router.get("/", function (req, res) {
    //get all info from dB
    info.find({}, function (err, allInfo) {
        if (err) {
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }

        res.send(allInfo);
    });
});

router.post('/', function (req, res, next) {
    var post = req.body;
    // store in MongoDB
    info.create(post, function(err, post){
        if(err){
            console.log(err);
        } else {
            res.json(post);
        }
    });
});


module.exports = router;