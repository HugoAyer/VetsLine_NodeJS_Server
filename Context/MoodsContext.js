const AsyncFunctions = require('../Async.js')
const fs = require('fs');
const Utils = require('../Functions/Utils.js')

function GetMoods(dirname){
    return new Promise(function(resolve,reject){            
        fs.readFile(dirname + "/db/" + "Mood.json","utf8",function(err,data){                  
            let moods = JSON.parse(data);                            
            resolve(moods)       
        });
    })
}

exports.GetMoods = GetMoods