const express = require('express');
const bodyParser = require('body-parser') //Tengo qué instalar esto para recibir objetos en el body de los requests
const fs = require('fs');
const cors = require('cors');
const Utils = require('./Functions/Utils.js')
const SlotsAvailable = require('./Models/Availability.js')
const AsyncFunctions = require('./Async.js')
const AppointmentsContext = require('./Context/AppointmentsContext.js')
const PriceContext = require('./Context/PriceContext.js')
const PaymentsContext = require('./Context/PaymentsContext.js')
const UserReviews = require('./Models/UserReview.js')

const app = express();

const dayOfWeekEng = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]

var urlencodedParser = bodyParser.urlencoded({ extended: false}) //Sin esto, no puedo recibir objetos en el body

app.use(cors());

app.use(bodyParser.json());   //Sin esto, no puedo recibir objetos en el body

app.get('/getUsers',function(req,res){
    fs.readFile(__dirname + "/" + "users.json","utf8",function(err,data){        
        res.end(data);
    })
});
app.get('/getCards',function(req,res){
    const promisegetCards = AsyncFunctions.GetCardsAsync(__dirname)    
    promisegetCards.then(data => res.send(data))
});
app.get('/getUserById/:idOwner',function(req,res){
    const promiseGetUserById = AsyncFunctions.getUserByIdAsync(__dirname,req.params.idOwner)
    promiseGetUserById.then(data => res.send(data))
})
app.get('/getUserByMail/:email',function(req,res){    
    const promiseUsers = AsyncFunctions.getUsersAsync(__dirname)
    const promiseCards = AsyncFunctions.GetCardsAsync(__dirname)

    Promise.all([promiseUsers, promiseCards])
    .then(([resUser, resCards]) => {
        const users = resUser.filter(user => user.email.toUpperCase() == req.params.email.toUpperCase()) //Filtro los usuarios para encontrar el del Email                    
        if(users.length == 0)
        {
            res.send([])
        }
        if(users.length > 0)
        {
            let user = users[0]
            user.cards.forEach(user_card => {                                
                let card_filtered = resCards.filter(card => card.bank.toUpperCase() == user_card.bank.toUpperCase() && card.supplier.toUpperCase() == user_card.supplier.toUpperCase() && card.card.toUpperCase() == user_card.name.toUpperCase()) //Busco la tarjeta de acuerdo a varios criterios
                if(card_filtered.length > 0) user_card.img = card_filtered[0].img                    
            })
            res.send(user)
        }        
    }
)    

});

// USERS ****************************************************************

app.get('/getPets',function(req,res){
    fs.readFile(__dirname + "/" + "pets.json","utf8",function(err,data){        
        res.end(data);
    })
});

app.get('/getPetsById/:idOwner',function(req,res){
    const promisePets = AsyncFunctions.GetPetsByOwnerAsync(__dirname,req.params.idOwner);
    const promiseSpecies = AsyncFunctions.GetSpeciesAsync(__dirname)
    const promiseSynthoms = AsyncFunctions.GetSynthomsAsync(__dirname)
    const promiseMoods = AsyncFunctions.GetMoodsAsync(__dirname)

    Promise.all([promisePets,promiseSpecies,promiseSynthoms,promiseMoods])
    .then(([r1,r2,r3,moodData]) => {
        r1.forEach(pet => {
            let species_filtered = r2.filter(species => species.idSpecies == pet.idSpecies)
            if(species_filtered.length > 0) {                
                pet.species = species_filtered[0]
                pet.species.Synthoms.forEach(item => {
                    let synthom_filters = r3.filter(synthom => synthom.idSynthom == item.idSynthom)
                    item.Synthom = synthom_filters[0]
                })                

            }
            let mood_filtered = moodData.filter(mood => mood.idMood == pet.current_mood)
            if(mood_filtered.length > 0) pet.mood = mood_filtered[0]
        })
        res.send(r1)
    }
)
});

app.get('/getSpecies',function(req,res){
    res.writeHead(200, {
        // 'Content-Type': 'image/jpg',
        // 'Content-Type': 'image/png',
        // 'Content-Type': 'application/json',
        // 'Content-Type': 'text/event-stream',
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        // 'Access-Control-Allow-Origin': "*",
        // 'CharacterEncoding': 'UTF-8',
        // 'Accept-Encoding': 'UTF-8',
      }); 
    const promiseGetSpecies = AsyncFunctions.GetSpeciesAsync(__dirname)
    promiseGetSpecies.then(data => {        
        res.end(JSON.stringify(data))
    })
});

app.get('/getPetsSynthomsById/:idOwner',function(req,res){
    const promisePets = AsyncFunctions.GetPetsByOwnerAsync(__dirname,req.params.idOwner);
    const promiseSpecies = AsyncFunctions.GetSpeciesAsync(__dirname)
    const promiseSynthoms = AsyncFunctions.GetSynthomsAsync()

    Promise.all([promisePets,promiseSpecies,promiseSynthoms])
    .then(([r1,r2,r3]) => {
        r1.forEach(pet => {
            let species_filtered = r2.filter(species => species.idSpecies == pet.idSpecies)
            if(species_filtered.length > 0)  {
                pet.species = species_filtered[0]
                
                pet.species.Synthoms.forEach(item => {
                    let synthom_filters = r3.filter(synthom => synthom.idSynthom == item.idSynthom)
                    item.Synthom = synthom_filters                    
                })                
                
            }

        })
        res.send(r1)
    }
)
});

app.get('/getBadges',function(req,res){
    res.writeHead(200, {
        // 'Content-Type': 'image/jpg',
        // 'Content-Type': 'image/png',
        // 'Content-Type': 'application/json',
        // 'Content-Type': 'text/event-stream',
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        // 'Access-Control-Allow-Origin': "*",
        // 'CharacterEncoding': 'UTF-8',
        // 'Accept-Encoding': 'UTF-8',
      }); 
    const promiseGetBadges = AsyncFunctions.GetBadgesAsync(__dirname)
    promiseGetBadges.then(data => {        
        res.end(JSON.stringify(data))
    })
});

//PETS **********************************************

app.get('/getAppointments',function(req,res){
    fs.readFile(__dirname + "/" + "appointments.json","utf8",function(err,data){        
        res.end(data);
    })
});

app.get('/getAppointmentsByOwner/:idOwner',function(req,res){
    const promise1 = AsyncFunctions.GetVetsAsync(__dirname);
    const promise2 = AsyncFunctions.GetPetsAsync(__dirname);
    const promise3 = AsyncFunctions.GetAppointmentsByOwnerAsync(__dirname,req.params.idOwner);
    const promise4 = AsyncFunctions.GetPaymentsAsync(__dirname);

    Promise.all([promise1,promise2,promise3,promise4]) //Promise all permite ejecutar un array de promesas, esperando a que cada una de ellas termine para iniciar la siguiente
        .then(([r1,r2,r3,r4]) => {
            r3.forEach(appointment => {
                let vet_filtered = r1.filter(vet => vet.idVet == appointment.idVet);
                let pet_filtered = r2.filter(pet => pet.idPet == appointment.idPet);
                let payment_filtered = r4.filter(payment => payment.idTransaction === appointment.idTransaction)
                appointment.vet = vet_filtered[0];
                appointment.pet = pet_filtered[0];
                if(payment_filtered.length > 0) appointment.payment = payment_filtered[0]
            })
            res.send(r3)
        }
    )
});

app.get('/getAppointmentsByOwnerByPet/:idOwner/:idPet',function(req,res){
    const promiseVets = AsyncFunctions.GetVetsAsync(__dirname);
    const promisePets = AsyncFunctions.GetPetsAsync(__dirname);
    const promiseOwners = AsyncFunctions.GetOwnersAsync(__dirname);
    const promiseAppointments = AsyncFunctions.GetAppointmentsByPetAsync(__dirname,req.params.idPet);

    Promise.all([promiseVets,promisePets,promiseOwners,promiseAppointments])
        .then(([r1,r2,r3,r4]) => {
            r4.forEach(appointment => {
                let vet_filtered = r1.filter(vet => vet.idVet == appointment.idVet);
                let pet_filtered = r2.filter(pet => pet.idPet == appointment.idPet);
                let owner_filtered = r2.filter(owner => owner.idOwner == appointment.idOwner);
                appointment.vet = vet_filtered[0];
                appointment.pet = pet_filtered[0];
                appointment.owner = owner_filtered[0];
            })
            res.send(r4)
        }
    )
});

app.get('/getAppointmentsByVet/:idVet',function(req,res){    
    res.writeHead(200, {
        // 'Content-Type': 'image/jpg',
        // 'Content-Type': 'image/png',
        // 'Content-Type': 'application/json',
        // 'Content-Type': 'text/event-stream',
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        // 'Access-Control-Allow-Origin': "*",
        // 'CharacterEncoding': 'UTF-8',
        // 'Accept-Encoding': 'UTF-8',
      });   
    const promiseGetVetsById = AsyncFunctions.GetVetsByIdAsync(req.params.idVet,__dirname) //Obtengo el promise de los datos del Vet
    const promiseGetAppointments = AsyncFunctions.GetAppointmentsByVetAsync(__dirname,req.params.idVet);
    Promise.all([promiseGetVetsById,promiseGetAppointments])
    .then(([datapromiseGetVetsById,datapromiseGetAppointments]) => {        
            if(datapromiseGetVetsById.length > 0)
            {
                datapromiseGetAppointments.forEach(data => {
                    data.vet = datapromiseGetVetsById[0]
                })
                res.end(JSON.stringify(datapromiseGetAppointments));
            }
            else 
            {
                res.send('Not found');
            }
        }
    )    
});
app.put('/putAppointment',(req,res) => {
    const promiseAppointments = AsyncFunctions.GetAppointmentsAsync(__dirname)    
    promiseAppointments.then((appointments) => {                      
        AppointmentsContext.PutAppointments(__dirname,req.body,appointments)
        res.sendStatus(200)
    })
});
// app.post('/updateAppointment/:idTransaction',function(req,res){    
//     const appointment = req.body
//     const promiseAppointments = AsyncFunctions.GetAppointmentsAsync(__dirname)    
//     promiseAppointments.then((appointments) => {                      
//         AppointmentsContext.UpdateAppointment(__dirname,req.body,appointments,req.params.idTransaction)
//         res.sendStatus(200)
//     })
// });

app.put('/acceptAppointment',function(req,res){    
    const appointment = req.body
    //const appointment = JSON.parse(req.body)    
    AppointmentsContext.AcceptAppointment(__dirname,appointment[0].idTransaction)
    res.sendStatus(200)
});

//APPOINTMENTS

app.put('/putPayment',function(req,res){
    const promisePayments = AsyncFunctions.GetPaymentsAsync(__dirname)
    promisePayments.then((payments) => {        
        PaymentsContext.PutPayments(__dirname,req.body,payments)
        res.sendStatus(200)
    })
})
//Payment

function GetOwners(){    
    return new Promise(function(resolve,reject){    
        fs.readFile(__dirname + "/" + "users.json","utf8",function(err,data){              
            let users = JSON.parse(data);                            
            resolve(users)        
        });
    })
}

//Owner ******************************************

app.get('/getCustomers',function(req,res){
    fs.readFile(__dirname + "/" + "customers.json","utf8",function(err,data){        
        res.end(data);
    })
});

app.get('/getCustomerById/:id',function(req,res){
    const promisCards = GetCardsAsync()

    fs.readFile(__dirname + "/" + "customers.json","utf8",function(err,data){              
        let customers = JSON.parse(data);
        let data_filter = customers.filter(element => element.id == req.params.id);
        res.end(JSON.stringify(data_filter));    
    })
});

app.get('/getCustomerByCode/:code',function(req,res){
    fs.readFile(__dirname + "/" + "customers.json","utf8",function(err,data){              
        let customers = JSON.parse(data);        
        let data_filter = customers.filter(element => element.cstmrCode == req.params.code);
        res.end(JSON.stringify(data_filter));    
    })
});

//CUSTOMERS *************************************************

app.get('/getItems',function(req,res){
    fs.readFile(__dirname + "/" + "items.json","utf8",function(err,data){        
        res.end(data);
    })
});

//ITEMS **********************************************************

app.get('/getVets',function(req,res){
    res.writeHead(200, {
        // 'Content-Type': 'image/jpg',
        // 'Content-Type': 'image/png',
        // 'Content-Type': 'application/json',
        // 'Content-Type': 'text/event-stream',
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        // 'Access-Control-Allow-Origin': "*",
        // 'CharacterEncoding': 'UTF-8',
        // 'Accept-Encoding': 'UTF-8',
      });     
    let promiseGetVets = AsyncFunctions.GetVetsAsync(__dirname) //Obtengo el promise de los datos del Vet
    let promiseGetProfesionalTitles = AsyncFunctions.GetProfesionalTitlesAsync(__dirname) //Obtengo el promise del catálogo de títulos
    Promise.all([promiseGetVets,promiseGetProfesionalTitles]) 
        .then(([dataGetVets,dataGetProfesionalTitles]) => {              
            dataGetVets.forEach(dataGetVet => {
                let professional_filtered = dataGetProfesionalTitles.filter(element => element.id == dataGetVet.title) //Filtro del catálogo de profesiones para obtener la descripción
                if(professional_filtered.length > 0) dataGetVet.titleDesc = professional_filtered[0].name //Agrego la descripción a los datos del vet
            })
            
            res.end(JSON.stringify(dataGetVets));
        }
      )

    // fs.readFile(__dirname + "/" + "vets.json","utf8",function(err,data){        
    //     res.end(data);
    // })
});

app.get('/getVetById/:id',function(req,res){
    res.writeHead(200, {
        // 'Content-Type': 'image/jpg',
        // 'Content-Type': 'image/png',
        // 'Content-Type': 'application/json',
        // 'Content-Type': 'text/event-stream',
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        // 'Access-Control-Allow-Origin': "*",
        // 'CharacterEncoding': 'UTF-8',
        // 'Accept-Encoding': 'UTF-8',
      });      
      let promiseGetVetsById = AsyncFunctions.GetVetsByIdAsync(req.params.id,__dirname) //Obtengo el promise de los datos del Vet
      let promiseGetProfesionalTitles = AsyncFunctions.GetProfesionalTitlesAsync(__dirname) //Obtengo el promise del catálogo de títulos
      Promise.all([promiseGetVetsById,promiseGetProfesionalTitles]) 
        .then(([dataGetVetsById,dataGetProfesionalTitles]) => {              
            let professional_filtered = dataGetProfesionalTitles.filter(element => element.id == dataGetVetsById[0].title) //Filtro del catálogo de profesiones para obtener la descripción
            if(professional_filtered.length > 0) dataGetVetsById[0].titleDesc = professional_filtered[0].name //Agrego la descripción a los datos del vet
            res.end(JSON.stringify(dataGetVetsById));
        }
      )
    // fs.readFile(__dirname + "/" + "vets.json","utf8",function(err,data){              
    //     let vets = JSON.parse(data);        
    //     let data_filter = vets.filter(element => element.idVet == req.params.id);
    //     res.end(JSON.stringify(data_filter));    
    // })
});

app.get('/getVetsByMail/:email',function(req,res){
    res.writeHead(200, {
        // 'Content-Type': 'image/jpg',
        // 'Content-Type': 'image/png',
        // 'Content-Type': 'application/json',
        // 'Content-Type': 'text/event-stream',
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        // 'Access-Control-Allow-Origin': "*",
        // 'CharacterEncoding': 'UTF-8',
        // 'Accept-Encoding': 'UTF-8',
      });
      let promiseGetVetsByMail = AsyncFunctions.GetVetsByMailAsync(req.params.email.toUpperCase(),__dirname) //Obtengo el promise de los datos del Vet
      let promiseGetProfesionalTitles = AsyncFunctions.GetProfesionalTitlesAsync(__dirname) //Obtengo el promise del catálogo de títulos
      Promise.all([promiseGetVetsByMail,promiseGetProfesionalTitles]) 
        .then(([dataGetVetsByMail,dataGetProfesionalTitles]) => {        
            let professional_filtered = dataGetProfesionalTitles.filter(element => element.id == dataGetVetsByMail[0].title) //Filtro del catálogo de profesiones para obtener la descripción
            dataGetVetsByMail[0].titleDesc = professional_filtered[0].name //Agrego la descripción a los datos del vet
            res.end(JSON.stringify(dataGetVetsByMail));
        }
      )
});

app.put('/putVetsById/:idVet',(req,res) => {
    // res.writeHead(200, {
    //     // 'Content-Type': 'image/jpg',
    //     // 'Content-Type': 'image/png',
    //     // 'Content-Type': 'application/json',
    //     // 'Content-Type': 'text/event-stream', 
    //     'Content-Type': 'text/event-stream; charset=utf-8',
    //     'Cache-Control': 'no-cache',
    //     'Connection': 'keep-alive',
    //     // 'Access-Control-Allow-Origin': "*",
    //     // 'CharacterEncoding': 'UTF-8',
    //     // 'Accept-Encoding': 'UTF-8',
    //   });

    let promiseUpdateVet = AsyncFunctions.UpdateVetAsync(req.params.idVet,__dirname,req.body)
    promiseUpdateVet.then(data => {
        res.sendStatus(200)
    })
});

app.put('/putVet', (req, res) => {
    // res.writeHead(200, {        
    //     'Content-Type': 'text/event-stream; charset=utf-8',
    //     'Cache-Control': 'no-cache',
    //     'Connection': 'keep-alive',       
    //   });      
      let new_vet = req.body

      let promiseVets = AsyncFunctions.GetVetsAsync(__dirname)
      promiseVets.then(data => {
        let Vets = data
        
        Vets.push(new_vet)
        fs.writeFileSync(__dirname + "/" + "vets.json",JSON.stringify(Vets)) //Por fin así ya puedo actualizar objetos
        setTimeout(() => {
            res.sendStatus(200)
        }, 500);        
      })
})

app.get('/getVetAvailabilityById/:id',function(req,res){
    

    fs.readFile(__dirname + "/" + "vets.json","utf8",function(err,data){              
        let vets = JSON.parse(data);        
        let data_filter = vets.filter(element => element.idVet == req.params.id);
        if(data_filter.length == 0) {
            res.sendStatus(400)
        }
        else {                    
            let availability = data_filter[0].availability               
            res.end(JSON.stringify(availability));    
        }
    })
});

app.get('/getVetAvailabilitySlotsById/:id',function(req,res){
    fs.readFile(__dirname + "/" + "vets.json","utf8",function(err,data){              
        let vets = JSON.parse(data);        
        let vet_array = vets.filter(element => element.idVet == req.params.id); //Filtro para obtener los datos del vet
        if(vet_array.length == 0) res.sendStatus(400)
        let vet = vet_array[0]
        let availability = vet.availability
        let d = new Date()        
        let days = []
        for(let i = 0; i < 7; i++) {//Se repetirá el proceso por cada día de la semana            
            let date_string = `${Utils.get_date_as_string_short(d)} 00:00:00` //Define la fecha con hora cero. Es importante que la hora quede como 0 para que después se inicialice a partir del primer horario de cada día            
            let thisDate = new Date(date_string)
            thisDate.setDate(d.getDate() + i) //Añade un día a la fecha            
            let availabilityToday = availability[dayOfWeekEng[thisDate.getDay()]] //Obtiene la disponibilidad del día de la semana                    
            if(availabilityToday.length > 0)//Valida que el día tenga horarios disponibles
                {                    
                    let slots = []//Inicializa el array que recogerá todos los horaros disponibles

                    availabilityToday.forEach((item) => { //Inicia un ciclo por todos los horarios disponibles del día                        
                        let dateStart = new Date(thisDate) 
                        dateStart.setHours(item.start / 100) //Agrega la hora inicial a la fecha
                        dateStart.setMinutes(item.start - (parseInt((item.start / 100))* 100)) //Agrega los minutos a la fecha
                        let times = (item.end - item.start) / 50                        
                        
                        for (let m = 0; m < times; m++){      //Con este ciclo, voy agregando en espacios de media hora, un slot por cada turno configurado
                            let dateEnd = new Date(dateStart)
                            dateEnd.setMinutes(dateEnd.getMinutes() + 30)                            
                            let slot = new SlotsAvailable.Slot(
                                thisDate,
                                item.videocall, 
                                item.present, 
                                item.onSite, 
                                Utils.get_timeInt_from_datetime(dateStart), 
                                Utils.get_timeInt_from_datetime(dateEnd), 
                                item.idPrice_videocall,
                                PriceContext.getPriceFromId(vet,item.idPrice_videocall),
                                item.idPrice_present,
                                PriceContext.getPriceFromId(vet,item.idPrice_present),
                                item.idPrice_onSite,
                                PriceContext.getPriceFromId(vet,item.idPrice_onSite))

                                slots.push(slot)

                                dateStart.setMinutes(dateStart.getMinutes() + 30)
                              
                        }                        
                    })  
                    let newDay = {"date":Utils.get_date_as_string_short(thisDate),"data":slots}
                    days.push(newDay)                                      
                }                    
        }
       
        res.end(JSON.stringify(days));    
    })
});

//VETS *************************************************************

app.get('/getPriceTypes',function(req,res){    
    const promisePriceTypes = AsyncFunctions.GetPriceTypesAsync(__dirname)
    promisePriceTypes.then((PriceTypes) => {        
        res.end(JSON.stringify(PriceTypes));
    })    
});

app.get('/getProfesionalTitles',function(req,res){    
    res.writeHead(200, {
        // 'Content-Type': 'image/jpg',
        // 'Content-Type': 'image/png',
        // 'Content-Type': 'application/json',
        // 'Content-Type': 'text/event-stream',
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        // 'Access-Control-Allow-Origin': "*",
        // 'CharacterEncoding': 'UTF-8',
        // 'Accept-Encoding': 'UTF-8',
      });
    const promiseProfesionalTitles = AsyncFunctions.GetProfesionalTitlesAsync(__dirname)
    promiseProfesionalTitles.then((ProfesionalTitles) => {        
        res.end(JSON.stringify(ProfesionalTitles));
    })    
});
app.get('/getSpecialties',function(req,res){    

    res.writeHead(200, {
        // 'Content-Type': 'image/jpg',
        // 'Content-Type': 'image/png',
        // 'Content-Type': 'application/json',
        // 'Content-Type': 'text/event-stream',
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        // 'Access-Control-Allow-Origin': "*",
        // 'CharacterEncoding': 'UTF-8',
        // 'Accept-Encoding': 'UTF-8',
      });

    const promiseSpecialties = AsyncFunctions.GetSpecialtiesAsync(__dirname)
    promiseSpecialties.then((Specialties) => {            
        res.end(JSON.stringify(Specialties));
    })    
});

//REVIEWS ****************************************************************************

app.get('/getReviews',function(req,res){    
    const promiseGetReviews = AsyncFunctions.GetReviewsAsync(__dirname)
    promiseGetReviews.then(data => {                
            res.send(data)
        }
    )    
});
app.get('/GetReviewsByOwner/:idOwner',function(req,res){    
    const promiseGetReviewsByOwner = AsyncFunctions.GetReviewsByOwnerAsync(req.params.idOwner,__dirname)
    promiseGetReviewsByOwner.then(data => {                        
            res.send(data)
        }
    )    
});
app.get('/GetReviewsByVet/:idVet',function(req,res){    
    const promiseGetReviewsByVet = AsyncFunctions.GetReviewsByVetAsync(req.params.idVet,__dirname)
    const promiseGetUsers = AsyncFunctions.getUsersAsync(__dirname)
    
    Promise.all([promiseGetReviewsByVet,promiseGetUsers])
    .then(([dataReviews,dataUsers]) => {
        dataReviews.forEach(element => {
            let user = dataUsers.filter(userElement => userElement.id == element.idOwner)
            if(user.length > 0) {                
                let _userReview = new UserReviews.UserReview(user[0].username,user[0].img)                
                element.user = _userReview
            }
                
        })
        res.send(dataReviews)
    })   
});
app.get('/GetReviewsByTransaction/:idTransaction/:transactionType',function(req,res){    
    const promiseGetReviewsByTransaction = AsyncFunctions.GetReviewsByTransactionAsync(req.params.idTransaction,req.params.transactionType,__dirname)
    promiseGetReviewsByTransaction.then(data => {  
            res.send(data)
        }
    )    
});


var server = app.listen(7195, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Rest API running at http://%s:%s",host,port)
})


// //Species
// app.get('/getSpecies',function(req,res){
//     fs.readFile(__dirname + "/db/" + "Species_Catalog.json","utf8",function(err,data){    
//         res.end(data);
//     })
// });

//PriceTypes


//node index.js para iniciar el servidor
//npm i body-parser