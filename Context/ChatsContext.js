const express = require('express');
const fs = require('fs');

function GetChat(dirname){
    return new Promise(function(resolve,reject){
            fs.readFile(dirname + "/db/" + "Chats.json","utf8",function(err,data){
                let chats = JSON.parse(data)                
                resolve(chats)
            })
        }
    )
}

exports.GetChat = GetChat