const express = require('express');
const fs = require('fs');

async function GetPayments(dirname){
    return new Promise(function(resolve,reject){    
        fs.readFile(dirname + "/db/" + "Payments.json","utf8",function(err,data){              
            let payments = JSON.parse(data);        
            resolve(payments);
        });
    })
}

async function PutPayments(dirname,NewPayment,Payments){
    Payments.push(NewPayment)
    fs.writeFileSync(dirname + "/db/" + "Payments.json",JSON.stringify(Payments)) //Por fin así ya puedo actualizar objetos
}

exports.GetPayments = GetPayments
exports.PutPayments = PutPayments