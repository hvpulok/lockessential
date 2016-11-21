// info routes
var express             = require("express"),
    router              = express.Router(),
    info                = require("../models/info"),
    middleware          = require("../middleware/index.js");;

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

// Route to show page of selected campground
router.get("/:id",middleware.isLoggedIn,function(req, res) {
     //get selected info from dB
    info.findById(req.params.id, function(err, foundInfo){
        if(err){
            console.log(err);
        }else {
            // res.json(foundInfo);
            res.send(foundInfo);
        }
    });
});

module.exports = router;