var express         = require("express"),
    app             = express(),
    http            = require("http"),
    path            = require("path"),
    favicon         = require('serve-favicon'),
    hostname        = '127.0.0.1',
    port            = 8000,
    bassTabRoute    = require("./routes/bassTabs");
    top10Route      = require("./routes/top-10-bass");
    gearRoute       = require("./routes/gear");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(__dirname + "/public"));
app.use(favicon(path.join(__dirname, 'public', 'img/favicon.ico')));

app.get("/", function(req, res) {
    res.render("home/home");
});

app.use("/bass-tabs", bassTabRoute);

app.use("/top-10-bass", top10Route);

app.use("/gear", gearRoute);

//app.listen(port, hostname, function(){
//  console.log("Bass tabs started");
//});

http.createServer(app).listen(process.env.PORT || 8000)