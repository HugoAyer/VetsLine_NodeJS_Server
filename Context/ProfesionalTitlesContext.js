const express = require('express');
const fs = require('fs');

function GetProfesionalTitles(dirname){    
    return new Promise(function(resolve,reject){    
        fs.readFile(dirname + "/db/" + "ProfesionalTitle.json","utf8",function(err,data){              
            let ProfesionalTitles = JSON.parse(data);                            
            resolve(ProfesionalTitles)
        });
    })
} 

exports.GetProfesionalTitles = GetProfesionalTitles