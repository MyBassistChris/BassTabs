var express = require("express");
var router = express.Router();

//List of Bass Tabs/Artists
router.get("/", function(req,res) {
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
router.get("/:artist", function(req, res) {
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
router.get("/:artist/:song", function(req,res) {
    var fs = require('fs');
    var path = require('path');
    var artistUrl = req.params.artist
    var songName = req.params.song.slice(0, -9).replace(/-/g, " ");
    var filePath, directoryName, artistName;
    
    
    //Get Tab Path using artist URL with no spaces
    var artists = fs.readdirSync("views/bass-tabs/artists");
    for (var i=0; i < artists.length; i++) {
        directoryName = artists[i].replace(/ /g, "").toLowerCase();
        if (directoryName == artistUrl) {
            artistName = artists[i];
            var hyphenatedSong = songName.replace(/ /g, "-")
            filePath = "artists/" + artistName + "/" + hyphenatedSong + "-bass-tab.html";  //Path used to open file EX: artists/The 1975/Settle-Down-Bass-Tab.html
            break;
        };
    };
    //Load bass tab into HTML Template tab
    res.render("bass-tabs/tab", {artistName: artistName, filePath: filePath, songName, songName})
});

module.exports = router;