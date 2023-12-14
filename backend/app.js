require('dotenv').config()
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(cors()) //Let this for the developpement

const userRoutes = require('./routes/user')

mongoose.connect(process.env.DB_CONNECTION)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !\n' + error));

app.use(express.json());

app.use('/api/user', userRoutes)

module.exports = app ;