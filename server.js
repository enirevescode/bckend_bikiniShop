const express = require('express')
const mongoose = require('mongoose')

const app = express()

/*****IMPORT DES MODULES DE ROUTAGE */
const user_router = require('./routes/users')

/*****MISE EN PLACE DU ROUTAGE */
app.get('/', (req, res) => res.send(`I'm online. TUTTI IS OKAY !`))
app.use('/users', user_router)

app.get('*', (req, res) => res.status(501).send(`hey ! La ressource n'existe pas (la fonctionnalité réclamée n’est pas supportée par le serveur)!`))

// START SERVEUR
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() =>{
        console.log("Database connection ok !");
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`This serveur is running on port ${process.env.SERVER_PORT}. Connected !`)
        })
})
.catch(error => console.log('Database Error', error))