// Express app definition
var express             = require("express"),
    app                 = express(),
    bodyParser          = require('body-parser'),
    mongoose            = require("mongoose"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local");

// models
var InfoDB                  = require("./server/models/info");
var user                    = require("./server/models/user");
var CommentDB               = require("./server/models/comment");

app.use(express.static(__dirname + "/app")); //to automatically get files under public/ anyother folder
app.set('views', __dirname + '/app/');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded

//MongoDB - Mongoose setup
var url = process.env.DATABASEURL || "mongodb://localhost/my_manager"; // define environment variables to hide actual server address. In heroku env variables are defined in settings> config var
mongoose.Promise = global.Promise;
mongoose.connect(url); // connection mongoose to local MongoDB// in cmd write this code : export DATABASEURL=mongodb://localhost/yelp_camp

//=======Passport Configurations============
app.use(require("express-session")({
    secret: "This world is @m@zingly beautiful",
    resave: false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

// define middleware to make available user information in all pages
app.use(function(req,res,next){
   res.locals.currentUser = req.user;
   next();
});

// ==========Routers====================

var indexRoutes         = require("./server/routes/index"),
    infoRoutes          = require("./server/routes/info");

app.use(indexRoutes);
app.use("/info", infoRoutes);


app.get('*', function(req, res){
    res.redirect('/');
});

app.listen(process.env.PORT||3000, 
            process.env.IP||'0.0.0.0', function(req, res){
    console.log("My Manager Server has Started at :");
    console.log("http://localhost:3000/");
});