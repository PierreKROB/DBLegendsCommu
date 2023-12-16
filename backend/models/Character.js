const mongoose = require('mongoose')

const characterSchema = mongoose.Schema({
    name: String,
    type: String,
    passif:String,
    imgUrl:String
});

module.exports = mongoose.model('Character', characterSchema)