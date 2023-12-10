/* Modules necessaires*/
const express = require('express')
const mongoose = require('mongoose')

/* initialisation de l' api*/
const app = express()

/*****IMPORT DES MODULES DE ROUTAGE */
const user_router = require('./routes/users')

/*****MISE EN PLACE DU ROUTAGE */
app.get('/', (req, res) => res.send(`Serveur node et express sur port ${PORT}`))
app.use('/users', user_router)

app.get('*', (req, res) => res.status(501).send(`hey ! La ressource n'existe pas (la fonctionnalité réclamée n’est pas supportée par le serveur)!`))

// START SERVEUR
mongoose
    .connect(process.env.MONGO_DB_CONNECTIONSTRING)
    .then(() =>{
        console.log("Database mongodb is connected!");
        app.listen(process.env.PORT, () => {
            console.log(`This server is running on port ${process.env.SERVER_PORT}. Connected !`)
        })
})
.catch(error => console.log('Connection Database Error', error))