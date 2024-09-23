const AsyncFunctions = require('../Async.js')
const fs = require('fs');
const Utils = require('../Functions/Utils.js')

function GetAppointments(dirname){
    return new Promise(function(resolve,reject){    
        fs.readFile(dirname + "/db/" + "appointments.json","utf8",function(err,data){              
            let appointments = JSON.parse(data);        
            resolve(appointments);
        });
    })
}
async function GetAppointmentsByPet(dirname,idPet){
    return new Promise(function(resolve,reject){    
    fs.readFile(dirname + "/db/" + "appointments.json","utf8",function(err,data){              
        let appointments = JSON.parse(data);
        let data_filter = appointments.filter(element => element.idPet == idPet);
        resolve(data_filter);
    });
    })
}
async function GetAppointmentsByVet(dirname,idVet){
    return new Promise(function(resolve,reject){    
    fs.readFile(dirname + "/db/" + "appointments.json","utf8",function(err,data){              
        let appointments = JSON.parse(data);
        let currentDate = new Date()
        let currentDateShort = new Date(Utils.get_date_as_string_short(currentDate))
        //&& Date.parse(element.fullDate) > currentDateShort
        
        let data_filter = appointments.filter(element => element.idVet == idVet && Date.parse(element.fullDate) > currentDateShort);            
        resolve(data_filter);
    });
    })
}
async function GetAppointmentsByOwner(dirname,idOwner){
    return new Promise(function(resolve,reject){    
    fs.readFile(dirname + "/db/" + "appointments.json","utf8",function(err,data){              
        let appointments = JSON.parse(data);
        let data_filter = appointments.filter(element => element.idOwner == idOwner);        
        resolve(data_filter);
    });
    })
}
async function PutAppointments(dirname,NewAppointment,appointments){
    appointments.push(NewAppointment)
    fs.writeFileSync(dirname + "/db/" + "appointments.json",JSON.stringify(appointments)) //Por fin así ya puedo actualizar objetos
}
async function UpdateAppointment(dirname,appointment,appointments,id){
    let index = appointments.findIndex(appntmnt => appntmnt.idTransaction == id)
    appointments[index] = appointment
    fs.writeFileSync(dirname + "/db/" + "appointments.json",JSON.stringify(appointments)) //Por fin así ya puedo actualizar objetos
}
async function AcceptAppointment(dirname,id){    
    const promiseAppointments = AsyncFunctions.GetAppointmentsAsync(dirname)    
    promiseAppointments.then(appointments => {
        let index = appointments.findIndex(appntmnt => appntmnt.idTransaction == id)
        console.log(index)
        appointments[index].status = 'A'
        fs.writeFileSync(dirname + "/db/" + "appointments.json",JSON.stringify(appointments)) //Por fin así ya puedo actualizar objetos
    })
}

exports.PutAppointments = PutAppointments
exports.GetAppointmentsByPet = GetAppointmentsByPet
exports.GetAppointmentsByVet = GetAppointmentsByVet
exports.GetAppointmentsByOwner = GetAppointmentsByOwner
exports.GetAppointments = GetAppointments
exports.UpdateAppointment = UpdateAppointment
exports.AcceptAppointment = AcceptAppointment