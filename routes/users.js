// import des modules necessaires (express, le modèle, bcrypt)
const express = require('express')
const userCtrl = require('../controllers/userControllers')

// Récupération du routeur d'express
let router = express.Router()

// Middleware pour logger dates de requêtes(sur tte les routes d'1 fichier)
router.use( (req, res, next) => {
    const event = new Date()
    console.log('User Time:', event.toString())
    next()
})

//Routage de la ressource User

router.get('/', userCtrl.getAllUsers)

router.get('/:id', userCtrl.getUser)

router.put('', userCtrl.addUser)

router.patch('/:id', userCtrl.updateUser)

// router.post('/untrash/:id', userCtrl.untrashUser)

// router.delete('/trash/:id', userCtrl.trashUser)

router.delete('/:id', userCtrl.deleteUser)

module.exports = router