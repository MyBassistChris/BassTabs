var express     = require("express"),
    //path        = require('path'),
    app         = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

//requiring routes
//var home    = require("./routes/comments"),
//var router  = express.Router();

app.get("/", function(req, res) {
    res.render("Home/home");
});

//List of Bass Tabs/Artists
app.get("/bass-tabs", function(req,res) {
    var fs = require('fs');
    var path = require('path'); 
    
    //Return list of artists to load on the artists page
    fs.readdir("views/bass-tabs/artists", function (err, artists) {
        if(err){
            console.error("Could not list the directory.", err);
        }
        res.render("bass-tabs/artists", {artists: artists});
    });
});

//Artist Page Route (List of Songs)
app.get("/bass-tabs/:artist", function(req, res) {
    var fs = require('fs');
    var path = require('path');
    var directoryName;
    var artistPath;
    var artistName = req.params.artist;

    //Find artist using path name
    fs.readdir("views/bass-tabs/artists", function (err, artists) {
        if(err){
            res.redirect("/bass-tabs");
        }
        for (var i=0; i < artists.length; i++) {
            directoryName = artists[i];
            if (directoryName.replace(/ /g, "").toLowerCase() == artistName.toString()) {
                artistPath = "views/bass-tabs/artists/" + directoryName;

                //Return list of songs from the artist
                fs.readdir(artistPath, function(err, songs) {
                    if(err){
                        //console.log("Could not find songs", err);
                        res.redirect("/bass-tabs");
                    }
                    res.render("bass-tabs/songs", {artist: directoryName, songs: songs});
                });
                break;
            };
        };
    });
});

//Tab Route
app.get("/bass-tabs/:artist/:song", function(req,res) {
    var fs = require('fs');
    var path = require('path');
    var artistName = req.params.artist
    var songName = req.params.song.slice(0, -9).replace(/-/g, " ");
    var songPath;
    var directoryName;
    var artistPath;
    
    
    //Get Tab Path using artist URL with no spaces
    var artists = fs.readdirSync("views/bass-tabs/artists");
    for (var i=0; i < artists.length; i++) {
        directoryName = artists[i];
        if (directoryName.replace(/ /g, "") == artistName) {
            var hyphenatedSong = songName.replace(/ /g, "-")
            songPath = "artists/" + directoryName + "/" + hyphenatedSong + "-bass-tab.html";   //EX: artists/The 1975/Settle-Down-Bass-Tab.html
            break;
        };
    };
    
    songName = songName + " Bass Tab";
    
    //Load bass tab into HTML Template tab
    res.render("bass-tabs/tab", {artistName: directoryName, songPath: songPath, songName, songName})
});

//Gear Page
app.get("/gear", function(req,res) {
    res.render("gear/gear");
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Bass tabs started");
});