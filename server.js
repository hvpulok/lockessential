// Express app definition
var express             = require("express"),
    app                 = express();

app.use(express.static(__dirname + "/app")); //to automatically get files under public/ anyother folder
app.set('views', __dirname + '/app/');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// ==========Routers====================

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