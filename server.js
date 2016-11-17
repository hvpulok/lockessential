// Express app definition
var express             = require("express"),
    app                 = express(),
    bodyParser          = require('body-parser'),
    mongoose            = require("mongoose");


// models
var InfoDB                = require("./server/models/info");
var UserDB                = require("./server/models/user");

app.use(express.static(__dirname + "/app")); //to automatically get files under public/ anyother folder
app.set('views', __dirname + '/app/');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded

//MongoDB - Mongoose setup
var url = process.env.DATABASEURL || "mongodb://localhost/my_manager"; // define environment variables to hide actual server address. In heroku env variables are defined in settings> config var
mongoose.connect(url); // connection mongoose to local MongoDB// in cmd write this code : export DATABASEURL=mongodb://localhost/yelp_camp

// ==========Routers====================
var infoRoutes          = require("./server/routes/info");
app.use("/info", infoRoutes);

app.get('/hello', function(req, res){
    // res.render("index.html");
    res.render("server_views/hello.html");
});

app.get('*', function(req, res){
    res.redirect('/');
});

app.listen(process.env.PORT||3000, 
            process.env.IP||'0.0.0.0', function(req, res){
    console.log("My Manager Server has Started at :");
    console.log("http://localhost:3000/");
});