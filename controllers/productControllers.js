// import des modules necessaires (express, le modèle, bcrypt)
const bcrypt = require('bcrypt')
const ProductModel = require('../models/productModel')

/**********************************/
/*** Routage de la ressource Product */

exports.getAllProducts = (req, res, next) => {
    ProductModel.find()
        .then(products => res.json({ data: products }))
        .catch(err => next(err))
}

exports.getProduct = async (req, res, next) => {
    try {
        let userId = req.params.id

        // Vérification si le champ id est présent et cohérent
        if (!userId) {
            throw new RequestError('Missing parameter')
        }

        // Récupération de l'utilisateur et vérification
        let product = await ProductModel.findById(userId)

        // Test si résultat
        if (product === null) {
            throw new ProductError('This product does not exist !', 0)
        }

        // Renvoi du produit trouvé
        return res.json({ data: product })
    } catch (err) {
        next(err)
    }
}

exports.addProduct = async (req, res, next) => {
    try {
        const { productName, category, price, description, composition, photos, avis } = req.body

        // Validation des données reçues
        if (!productName || !category || !price || !description || !composition || !photos || !avis ) {
            throw new RequestError('Missing parameter')
        }

        // Hashage du mot de passe utilisateur
        // let hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
        // req.body.password = hash

        //Création de l'utilisateur
        const product = new UserModel({
            ...req.body
        })
        // Ajout de produit
        product = await product.save()
        return res.json({ message: 'Product Created', data: product })

    } catch (err) {
        next(err)
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        let userId = req.params.id

        // Vérification si le champ id est présent et cohérent
        if (!userId) {
            throw new RequestError('Missing parameter')
        }

        // Mise à jour de l'utilisateur
        await ProductModel.findByIdAndUpdate(
            userId,
            { ...req.body }
        )
        return res.json({ message: 'Product Updated' })
    } catch (err) {
        next(err)
    }
}

// exports.untrashUser = async (req, res, next) => {
//     try {
//         let userId = parseInt(req.params.id)

//         // Vérification si le champ id est présent et cohérent
//         if (!userId) {
//             throw new RequestError('Missing parameter')
//         }

//         await User.restore({ where: { id: userId } })

//         // Réponse de la sortie de poubelle
//         return res.status(204).json({})
//     } catch (err) {
//         next(err)
//     }
// }

// exports.trashUser = async (req, res, next) => {
//     try {
//         let userId = parseInt(req.params.id)

//         // Vérification si le champ id est présent et cohérent
//         if (!userId) {
//             throw new RequestError('Missing parameter')
//         }

//         // Suppression de l'utilisateur
//         await User.destroy({ where: { id: userId } })

//         // Réponse de la mise en poubelle
//         return res.status(204).json({})
//     } catch (err) {
//         next(err)
//     }
// }

exports.deleteProduct = async (req, res, next) => {
    try {
        let userId = req.params.id

        // Vérification si le champ id est présent et cohérent
        if (!userId) {
            throw new RequestError('Missing parameter')
        }

        // Suppression de l'utilisateur
        await ProductModel.findByIdAndDelete(userId)
        return res.status(204).json({})            
    } catch (err) {
        next(err)
    }
}