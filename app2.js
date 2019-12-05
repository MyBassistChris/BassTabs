var express         = require("express"),
    app             = express(),
    http            = require("http"),
    hostname        = '127.0.0.1',
    port            = 3000,
    bassTabRoute    = require("./routes/bassTabs");

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.render("Home/home");
});

app.use("/bass-tabs", bassTabRoute);

//Gear Page
app.get("/gear", function(req,res) {
    res.render("gear/gear");
});

app.listen(port, hostname, function(){
  console.log("Bass tabs started");
});