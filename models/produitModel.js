const mongoose = require('mongoose')

// Modèle user
const ProduitSchema = mongoose.Schema({
    productName: {type: String, require: true, unique: true},
    category: {type: String, require: true},
    price: {type: String, require: true},
    description: {type: String, require: true},
    composition: {type: String, require: true},
    photos: {type: String, require: true},
    avis: {type: String, default: ''}
})

ProduitSchema.pre('save', async function() {
    console.log('dans le hook 2')
    this.password = await bcrypt.hash(this.password, parseInt(process.env.BCRYPT_SALT_ROUND))
})
module.exports = mongoose.model('ProduitModel', ProduitSchema)