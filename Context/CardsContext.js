const express = require('express');
const fs = require('fs');

function GetCards(dirname){    
    return new Promise(function(resolve,reject){    
        fs.readFile(dirname + "/db/" + "Cards.json","utf8",function(err,data){
            let cards = JSON.parse(data);                            
            resolve(cards)        
        });
    })
} 

exports.GetCards = GetCards