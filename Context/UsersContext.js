const express = require('express');
const fs = require('fs');
const AsyncFunctions = require('../Async.js')


function getUsers(dirname){    
    return new Promise(function(resolve,reject){    
        fs.readFile(dirname + "/" + "users.json","utf8",function(err,data){              
            let users = JSON.parse(data);                                        
            resolve(users)       
        });
    })
}
function getUserById(dirname,idOwner){    
    return new Promise(function(resolve,reject){    
        fs.readFile(dirname + "/" + "users.json","utf8",function(err,data){              
            let users = JSON.parse(data);    
            let data_filer = users.filter(element => element.id == idOwner)                                    
            resolve(data_filer)       
        });
    })
}

exports.getUsers = getUsers
exports.getUserById = getUserById