var express         = require("express"),
    app             = express(),
    http            = require("http"),
    hostname        = '127.0.0.1',
    port            = 8000,
    bassTabRoute    = require("./routes/bassTabs");
    top10Route      = require("./routes/top-10-bass");

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.render("home/home");
});

app.use("/bass-tabs", bassTabRoute);

app.use("/top-10-bass", top10Route);

app.get("/about", function(req,res) {
    res.render("about/about");
});

//app.listen(port, hostname, function(){
//  console.log("Bass tabs started");
//});

http.createServer(app).listen(process.env.PORT || 8000)