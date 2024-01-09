const mongoose = require('mongoose')

// Modèle user
const UserSchema = new mongoose.Schema({
    nom: {type: String, default: 'Nom'},
    prenom: {type: String, default: 'Prénom'},
    pseudo: {type: String, require: true, unique: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true, unique: true},
})

UserSchema.pre('save', async function() {
    console.log('dans le hook 2')
    //this.password = await bcrypt.hash(this.password, parseInt(process.env.BCRYPT_SALT_ROUND))
})
module.exports = mongoose.model('UserModel', UserSchema)