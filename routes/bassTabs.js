var express = require("express");
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Admin:guitar66@basstabs-gf3pp.mongodb.net/test?retryWrites=true&w=majority";

//List of Bass Tabs/Artists
router.get("/", function(req,res) {  
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("BassTabs");
        dbo.collection("artists").find({}).sort({artist: 1}).toArray(function(err, result) {
        if (err) throw err;
            res.render("bass-tabs/artists", {artists: result});
            db.close();
        });
    });
});

//Artist Page Route (List of Songs)
router.get("/:artist", function(req, res) {
    var artistUrl = req.params.artist;
    var artistName;

    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("BassTabs");
        dbo.collection("artists").findOne({artistUrl: artistUrl}, function(err, result) {
            if (err) throw err;
            artistName = result.artist;
            dbo.collection("songs").find({artist: artistName}).sort({songTitle: 1}).toArray(function(err, result) {
                if (err) throw err;
                res.render("bass-tabs/songs", {artist: artistName, artistUrl: artistUrl, songs: result})
                db.close();
            });
        });
    });
});

//Tab Route
router.get("/:artist/:song", function(req,res) {
    var artistUrl = req.params.artist
    var songUrl = req.params.song
    var filePath;

    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("BassTabs");
        dbo.collection("artists").findOne({artistUrl: artistUrl}, function(err, result) {
            if (err) throw err;
            artistName = result.artist;
            dbo.collection("songs").findOne({songUrl: songUrl, artist: artistName}, function(err, song) {
                if (err) throw err;

                //Load bass tab into HTML Template tab
                filePath = "artists/" + song.artist + "/" + songUrl + ".html";
                res.render("bass-tabs/tab", {song: song, filePath: filePath}, function(err, html) {
                    if(err) {
                        res.render("bass-tabs/failed"); // File doesn't exist
                    } else {
                        res.send(html);
                    }
                });
                db.close();
             });
        });
    });
});

module.exports = router;