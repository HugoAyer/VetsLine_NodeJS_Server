const express = require('express');
const fs = require('fs');

function GetVets(dirname){    
    return new Promise(function(resolve,reject){            
        fs.readFile(dirname + "/" + "vets.json","utf8",function(err,data){                  
            let vets = JSON.parse(data);                            
            resolve(vets)       
        });
    })
} 

function UpdateVet(id,dirname,vetData){    
    return new Promise(function(resolve,reject){
        fs.readFile(dirname + "/" + "vets.json","utf8",function(err,data){                          
            let vets = JSON.parse(data);                 
            let vetIndex = vets.findIndex(element => element.idVet == id);
            vetData.registryComplete = (ValidationComplete(vetData)) ? 'Y' : 'N'
            vets[vetIndex] = vetData
    
            fs.writeFileSync(dirname + "/" + "vets.json",JSON.stringify(vets)) //Por fin así ya puedo actualizar objetos
            resolve(vetData)
        })
        }
    )
}

function GetVetsByMail(email,dirname) {
    return new Promise(function(resolve,reject){
        fs.readFile(dirname + "/" + "vets.json","utf8",function(err,data){              
            let vets = JSON.parse(data);        
            let data_filter = vets.filter(element => element.email.toUpperCase() == email.toUpperCase());
            resolve(data_filter)
        })
    })
}

function GetVetsById(id,dirname) {
    return new Promise(function(resolve,reject){
        fs.readFile(dirname + "/" + "vets.json","utf8",function(err,data){              
            let vets = JSON.parse(data);        
            let data_filter = vets.filter(element => element.idVet == id);
            resolve(data_filter)
        })
    })
}

const ValidationComplete = (vet) => {
    let validated = 'Y'
    if(vet.name == '' || vet.title == '' || vet.federalProffessionNumber == '') //Validación de la pestaña general
    {        
        return false
    }
    if(vet.specialties.length == 0)
    {        
        return false
    }
    if(vet.address.length == 0)
    {        
        return false
    }
    if(vet.education.length == 0)
    {        
        return false
    }
    if(vet.aboutYou == '')
    {        
        return false
    }
    return true
}

exports.GetVets = GetVets
exports.UpdateVet = UpdateVet
exports.GetVetsByMail = GetVetsByMail
exports.GetVetsById = GetVetsById