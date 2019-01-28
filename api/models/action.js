const mongoose = require('mongoose')

const actionSchema = mongoose.Schema({
  category: Number,
  activities: [String]
})

module.exports = mongoose.model('Action', actionSchema);
