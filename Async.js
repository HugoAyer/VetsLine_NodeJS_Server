const UsersContext = require('./Context/UsersContext.js')
const CardsContext = require('./Context/CardsContext.js')
const VetsContext = require('./Context/VetsContext.js')
const PetsContext = require('./Context/PetsContext.js')
const PriceContext = require('./Context/PriceContext.js')
const AppointmentsContext = require('./Context/AppointmentsContext.js')
const PaymentsContext = require('./Context/PaymentsContext.js')
const PriceTypesContext = require('./Context/PriceTypesContext.js')
const ProfesionalTitlesContext = require('./Context/ProfesionalTitlesContext.js')
const SpecialtiesContext = require('./Context/SpecialtiesContext.js')
const ReviewsContext = require('./Context/ReviewsContext.js')
const MoodsContext = require('./Context/MoodsContext.js')
const BadgesContext = require('./Context/BadgesContext.js')
const ChatsContext = require('./Context/ChatsContext.js')

//Users
async function getUsersAsync(dirname){
    return await UsersContext.getUsers(dirname);        
}
async function GetCardsAsync(dirname){
    return await CardsContext.GetCards(dirname)
}
async function GetOwnersAsync(dirname){
    return await UsersContext.getUsers(dirname);        
}
async function getUserByIdAsync(dirname,idOwner){
    return await UsersContext.getUserById(dirname,idOwner);        
}

//Vets
async function GetVetsAsync(dirname){
    return await VetsContext.GetVets(dirname);        
}
async function UpdateVetAsync(id,dirname,data){
    return await VetsContext.UpdateVet(id,dirname,data)
}
async function GetVetsByMailAsync(email,dirname){
    return await VetsContext.GetVetsByMail(email,dirname)
}
async function GetVetsByIdAsync(id,dirname){
    return await VetsContext.GetVetsById(id,dirname)
}

//Pets
async function GetPetsAsync(dirname){
    return await PetsContext.GetPets(dirname);
}

async function GetSpeciesAsync(dirname){
    return await PetsContext.GetSpecies(dirname);        
}

async function GetSynthomsAsync(){
    return await PetsContext.GetSynthoms(__dirname);        
}

async function GetPetsByOwnerAsync(dirname,idOwner){
    return await PetsContext.GetPetsByOwner(dirname,idOwner);        
}

async function GetMoodsAsync(dirname){
    return await MoodsContext.GetMoods(dirname)
}

async function GetBadgesAsync(dirname){
    return await BadgesContext.GetBadges(dirname)
}

//Appointments
async function GetAppointmentsByOwnerAsync(dirname,idOwner){
    return await AppointmentsContext.GetAppointmentsByOwner(dirname,idOwner);        
}
async function GetAppointmentsByPetAsync(dirname,idPet){
    return await AppointmentsContext.GetAppointmentsByPet(dirname,idPet);        
}
async function GetAppointmentsByVetAsync(dirname,idVet){
    return await AppointmentsContext.GetAppointmentsByVet(dirname,idVet);        
}
async function GetCardAsync(){
    return await CardsContext.GetCards(__dirname);        
}
async function GetAppointmentsAsync(dirname){
    return await AppointmentsContext.GetAppointments(dirname)
}
async function GetPaymentsAsync(dirname){
    return await PaymentsContext.GetPayments(dirname)
}
//Payments
async function GetPriceTypesAsync(dirname){
    return await PriceTypesContext.GetPriceTypes(dirname)
}
//ProfesionalTitle
async function GetProfesionalTitlesAsync(dirname){
    return await ProfesionalTitlesContext.GetProfesionalTitles(dirname)
}
async function GetSpecialtiesAsync(dirname){
    return await SpecialtiesContext.GetSpecialties(dirname)
}
//Reviews
async function GetReviewsAsync(dirname){
    return await ReviewsContext.GetReviews(dirname)
}
async function GetReviewsByOwnerAsync(idOwner,dirname){
    return await ReviewsContext.GetReviewsByOwner(idOwner,dirname)
}
async function GetReviewsByVetAsync(idVet,dirname){
    return await ReviewsContext.GetReviewsByVet(idVet,dirname)
}
async function GetReviewsByTransactionAsync(idTransaction,transactionType,dirname){
    return await ReviewsContext.GetReviewsByTransaction(idTransaction,transactionType,dirname)
}
//Chats
async function GetChatAsync(dirname){
    return await ChatsContext.GetChat(dirname)
}

exports.getUsersAsync = getUsersAsync
exports.GetCardsAsync = GetCardsAsync
exports.GetVetsAsync = GetVetsAsync
exports.GetPetsAsync = GetPetsAsync
exports.GetAppointmentsByOwnerAsync = GetAppointmentsByOwnerAsync
exports.GetPetsByOwnerAsync = GetPetsByOwnerAsync
exports.GetSpeciesAsync = GetSpeciesAsync
exports.GetSynthomsAsync = GetSynthomsAsync
exports.GetAppointmentsAsync = GetAppointmentsAsync
exports.GetPaymentsAsync = GetPaymentsAsync
exports.GetAppointmentsByVetAsync = GetAppointmentsByVetAsync
exports.GetPriceTypesAsync = GetPriceTypesAsync
exports.GetProfesionalTitlesAsync = GetProfesionalTitlesAsync
exports.GetSpecialtiesAsync = GetSpecialtiesAsync
exports.UpdateVetAsync = UpdateVetAsync
exports.GetVetsByMailAsync = GetVetsByMailAsync
exports.GetVetsByIdAsync = GetVetsByIdAsync
exports.GetOwnersAsync = GetOwnersAsync
exports.GetAppointmentsByPetAsync = GetAppointmentsByPetAsync
exports.GetReviewsAsync = GetReviewsAsync
exports.GetReviewsByOwnerAsync = GetReviewsByOwnerAsync
exports.GetReviewsByTransactionAsync = GetReviewsByTransactionAsync
exports.GetReviewsByVetAsync = GetReviewsByVetAsync
exports.getUserByIdAsync = getUserByIdAsync
exports.GetMoodsAsync = GetMoodsAsync
exports.GetBadgesAsync = GetBadgesAsync
exports.GetChatAsync = GetChatAsync