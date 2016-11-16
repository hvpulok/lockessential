var express             = require("express"),
    router              = express.Router(),
    info                = require("../models/info");

//=============campground Routes=======================================
//show route
router.get("/", function(req, res){
    //get all campgrounds from dB
    info.find({}, function(err, allInfo){
        if(err){
                return res.status(404).json({
                    title: 'An error occurred',
                    error: err
                });
            }

            res.send(allInfo);
    });
});

module.exports = router;