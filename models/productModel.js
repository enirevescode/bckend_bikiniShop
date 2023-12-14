const mongoose = require('mongoose')

// Modèle user
const ProductSchema = mongoose.Schema({
    productName: {type: String, require: 'Le nom du produit est obligatoire', unique: true},
    alt: {type: String, require: true},
    category: {type: String, require: true},
    color: {type: String, require: true},
    price: {type: Number, require: true},
    description: {type: String, require: true},
    composition: {type: String, require: true},
    photos: {type: String, require: true},
    avis: {type: String, default: ''},
    avis2: {type: String, default: ''}
})

ProductSchema.pre('save', async function() {
    console.log('dans le hook 2')
    this.password = await bcrypt.hash(this.password, parseInt(process.env.BCRYPT_SALT_ROUND))
})
module.exports = mongoose.model('ProductModel', ProductSchema)