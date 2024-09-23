const express = require('express');
const fs = require('fs');

function GetBadges(dirname){
    return new Promise(function(resolve,reject){    
        fs.readFile(dirname + "/db/" + "Badges.json","utf8",function(err,data){
            let badges = JSON.parse(data);                            
            resolve(badges)        
        });
    })
}

exports.GetBadges = GetBadges