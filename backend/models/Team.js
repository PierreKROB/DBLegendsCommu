const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character', max: 6 }],
});

module.exports = mongoose.model('Team', teamSchema);
