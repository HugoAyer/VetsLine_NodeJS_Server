const express = require('express');
const fs = require('fs');

function GetSpecialties(dirname){    
    return new Promise(function(resolve,reject){    
        fs.readFile(dirname + "/db/" + "Specialties.json","utf8",function(err,data){              
            let ProfesionalTitles = JSON.parse(data);                            
            resolve(ProfesionalTitles)
        });
    })
} 

exports.GetSpecialties = GetSpecialties