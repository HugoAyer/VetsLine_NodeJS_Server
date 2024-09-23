const express = require('express');
const fs = require('fs');

async function GetPriceTypes(dirname) {
    return new Promise(function(resolve,reject){   
        let dbName = 'PriceTypes.json' 
        fs.readFile(`${dirname}/db/${dbName}`,"utf8",function(err,data){              
            let payments = JSON.parse(data);        
            resolve(payments);
        });
    })
}

exports.GetPriceTypes = GetPriceTypes