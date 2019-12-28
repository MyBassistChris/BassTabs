var express = require("express");
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Admin:guitar66@basstabs-gf3pp.mongodb.net/test?retryWrites=true&w=majority";

//List of Bass Tabs/Artists
router.get("/", function(req,res) {  
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("BassTabs");
        dbo.collection("gear").find({current: 1}).toArray(function(err, current) {
            if (err) throw err;
                res.render("gear/gear", {currentGear: current});
                db.close();
        });
    });
});

module.exports = router;