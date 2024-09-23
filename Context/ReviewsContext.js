const express = require('express');
const fs = require('fs');

function GetReviews(dirname){    
    return new Promise(function(resolve,reject){            
        fs.readFile(dirname + "/db/" + "Reviews.json","utf8",function(err,data){                  
            let reviews = JSON.parse(data);                            
            resolve(reviews)       
        });
    })
} 

function GetReviewsByOwner(idOwner,dirname) {
    return new Promise(function(resolve,reject){
        fs.readFile(dirname + "/db/" + "Reviews.json","utf8",function(err,data){              
            let reviews = JSON.parse(data);        
            let data_filter = reviews.filter(element => element.idOwner.toUpperCase() == idOwner.toUpperCase());
            resolve(data_filter)
        })
    })
}

function GetReviewsByVet(idVet,dirname) {
    return new Promise(function(resolve,reject){
        fs.readFile(dirname + "/db/" + "Reviews.json","utf8",function(err,data){              
            let reviews = JSON.parse(data);        
            let data_filter = reviews.filter(element => element.idVet.toUpperCase() == idVet.toUpperCase());
            resolve(data_filter)
        })
    })
}

function GetReviewsByTransaction(idTransaction,transactionType,dirname) {
    return new Promise(function(resolve,reject){
        fs.readFile(dirname + "/db/" + "Reviews.json","utf8",function(err,data){              
            let reviews = JSON.parse(data);        
            let data_filter = reviews.filter(element => element.idTransaction.toUpperCase() == idTransaction.toUpperCase() && element.transactionType.toUpperCase() == transactionType.toUpperCase());
            resolve(data_filter)
        })
    })
}

exports.GetReviews = GetReviews
exports.GetReviewsByOwner = GetReviewsByOwner
exports.GetReviewsByTransaction = GetReviewsByTransaction
exports.GetReviewsByVet = GetReviewsByVet