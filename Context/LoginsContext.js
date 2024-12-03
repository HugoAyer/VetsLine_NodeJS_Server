const express = require('express');
const fs = require('fs');
const AsyncFunctions = require('../Async.js');

function GetLogins(dirname){    
    return new Promise(function(resolve,reject){            
        fs.readFile(dirname + "/db/" + "Logins.json","utf8",function(err,data){                  
            let vets = JSON.parse(data);                            
            resolve(vets)       
        });
    })
} 

function GetLoginByVet(dirname,idVet){        
    return new Promise(function(resolve,reject){            
        let promiseLogins = GetLogins(dirname)
        promiseLogins.then((logins) => {            
            let filtered = logins.filter(login => login.idVet == idVet)                              
            resolve(filtered)   
        })       
    })
} 

const PutLogin = (dirname,login) => {    
    let promiseLogins = GetLogins(dirname)
    promiseLogins.then((data) => {
        data.push(login)
        return new Promise(function(resolve,reject) {
            fs.writeFileSync(dirname + "/db/" + "Logins.json",JSON.stringify(data)) //Por fin así ya puedo actualizar objetos
            resolve(data)
        })
    })
    
}

exports.GetLoginByVet = GetLoginByVet
exports.PutLogin = PutLogin