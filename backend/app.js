require('dotenv').config()
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(cors()) //Let this for the developpement

const userRoutes = require('./routes/user')
const charactersRoutes = require('./routes/character')
const teamRoutes = require('./routes/team')
const imageRoutes = require('./routes/image')

mongoose.connect(process.env.DB_CONNECTION)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !\n' + error));

app.use(express.json());

app.use('/api/user', userRoutes)
app.use('/api/character', charactersRoutes)
app.use('/api/team', teamRoutes)
app.use('/api/image', imageRoutes)

module.exports = app ;