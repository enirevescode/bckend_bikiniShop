/* Modules necessaires*/
const express = require("express")
const mongoose = require('mongoose')

/* initialisation de l' api*/
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

/*****IMPORT DES MODULES DE ROUTAGE */
const user_router = require('./routes/usersRoutes')
//const produit_router = require('./routes/produits')

/*****MISE EN PLACE DU ROUTAGE */
app.get('/', (req, res) => res.send(`Serveur node et express sur port ${SERVER_PORT}`))
app.use('/users', user_router)

app.get('*', (req, res) => res.status(501).send(`hey ! La ressource n'existe pas !`))

// START SERVEUR
mongoose
    .connect(process.env.MONGO_DB_CONNECTIONSTRING)
    .then(() =>{
        console.log("Database mongodb is connected!");
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`This server is running on port ${process.env.SERVER_PORT}. Connected !`)
        })
})
.catch(error => console.log('Connection Database Error', error))