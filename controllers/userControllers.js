// import des modules necessaires (express, le modèle, bcrypt)
// import mongoose from 'mongoose'
// import { userSchema } from '../models/userModel'
// const userModel = mongoose.Model( 'userModel', userSchema)

//const bcrypt = require('bcrypt')
const UserModel = require('../models/userModel')

/**********************************/
/*** Routage de la ressource User */

exports.getAllUsers = (req, res, next) => {
    UserModel.find()
        .then(users => res.json({ data: users }))
        .catch(err => next(err))
}

exports.getUser = async (req, res, next) => {
    try {
        let userId = req.params.id

        // Vérification si le champ id est présent et cohérent
        if (!userId) {
            throw new RequestError('Missing parameter')
        }

        // Récupération de l'utilisateur et vérification
        let user = await UserModel.findById(userId)

        // Test si résultat
        if (user === null) {
            throw new UserError('This user does not exist !', 0)
        }

        // Renvoi de l'Utilisateur trouvé
        return res.json({ data: user })
    } catch (err) {
        next(err)
    }
}

exports.addUser = async (req, res, next) => {
    
        const { nom, prenom, pseudo, email, password } = req.body

        // Validation des données reçues
        if (!nom || !prenom || !pseudo || !email || !password) {
            return res.status(400).json({ message: 'Missing data'})
        }
        try {
        // Hashage du mot de passe utilisateur
        //let hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
        //req.body.password = hash

        //Création de l'utilisateur
        const user = new UserModel({
            ...req.body
        })
        //Ajout de l'utilisateur
        let userc = await user.save()
        return res.json({ message: 'User Created', data: userc })

    } catch (err) {
        next(err)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        let userId = req.params.id

        // Vérification si le champ id est présent et cohérent
        if (!userId) {
            throw new RequestError('Missing parameter')
        }

        // Mise à jour de l'utilisateur
        await UserModel.findByIdAndUpdate(
            userId,
            { ...req.body }
        )
        return res.json({ message: 'User Updated' })
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

exports.deleteUser = async (req, res, next) => {
    try {
        let userId = req.params.id

        // Vérification si le champ id est présent et cohérent
        if (!userId) {
            throw new RequestError('Missing parameter')
        }

        // Suppression de l'utilisateur
        await UserModel.findByIdAndDelete(userId)
        return res.status(204).json({})            
    } catch (err) {
        next(err)
    }
}