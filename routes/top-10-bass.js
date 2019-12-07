var express = require("express");
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Admin:guitar66@basstabs-gf3pp.mongodb.net/test?retryWrites=true&w=majority";

//List of Bass Tabs/Artists
router.get("/", function(req,res) {  
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("BassTabs");
        dbo.collection("artists").find({}).toArray(function(err, artists) {
            if (err) throw err;
            dbo.collection("songs").find({songTitle: /Top 10 Bass/}).sort({songTitle: 1}).toArray(function(err, songs) {
            if (err) throw err;
                res.render("top-10-bass/top-10-bass", {artists: artists, songs: songs});
                db.close();
            });
        });
    });
});

module.exports = router;