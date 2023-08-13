const mongoose=require('mongoose')
const UserModel=mongoose.Schema({
    nom: String,
    email: String,
    mot_passe: String,
    created_at: {
    type: Date,
    default: Date.now()}
})
module.exports=mongoose.model('users',UserModel)