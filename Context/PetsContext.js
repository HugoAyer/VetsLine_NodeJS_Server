const express = require('express');
const fs = require('fs');

const GetPets = (dirname) => {    
    return new Promise(function(resolve,reject){    
        fs.readFile(dirname + "/db/" + "pets.json","utf8",function(err,data){              
            let pets = JSON.parse(data);                            
            resolve(pets)        
        });
    })
}
const GetSynthoms = (dirname) => {    
    return new Promise(function(resolve,reject){        
        console.log(dirname)    
        fs.readFile(dirname + "/db/" + "Synthoms.json","utf8",function(err,data){              
            let synthoms = JSON.parse(data);                            
            resolve(synthoms)        
        });
    })
}
const GetPetsByOwner = (dirname,idOwner) => {
    return new Promise(function(resolve,reject){            
        fs.readFile(dirname + "/db/" + "pets.json","utf8",function(err,data){                         
            let pets = JSON.parse(data);          
            let pets_filtered = pets.filter(element => element.idOwner == idOwner)                  
            resolve(pets_filtered)        
        });
    })
}
const GetSpecies = (dirname) =>{    
    return new Promise(function(resolve,reject){    
        fs.readFile(dirname + "/db/" + "Species_Catalog.json","utf8",function(err,data){       
            console.log()       
            let species = JSON.parse(data);                            
            resolve(species)        
        });
    })
}

exports.GetPets = GetPets
exports.GetSynthoms = GetSynthoms
exports.GetPetsByOwner = GetPetsByOwner
exports.GetSpecies = GetSpecies