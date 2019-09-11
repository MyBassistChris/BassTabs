var express = require("express");
var router  = express.Router();

router.get("/", function(req,res){
    var fs = require('fs');
    var path = require('path'); 
    
    fs.readdir("../artists", function (err, artists) {
        if(err){
            console.error("Could not list the directory.", err);
        }
        
        for(var i=0; i <artists.length; i++) {
            console.log(artists[i]);
        }
    });
});
