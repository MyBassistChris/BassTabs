var express         = require("express"),
    app             = express(),
    bassTabRoute    = require("./routes/bassTabs");

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

//requiring routes
//var home    = require("./routes/comments"),
//var router  = express.Router();

app.get("/", function(req, res) {
    res.render("Home/home");
});

app.use("/bass-tabs", bassTabRoute);

//Top 10 Bass
app.get("/top-10-bass", function(req,res) {
    res.render("Top 10 Bass/top-10-bass")
})

//Gear Page
app.get("/gear", function(req,res) {
    res.render("Gear/gear");
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Bass tabs started");
});