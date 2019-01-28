const mongoose = require('mongoose')
const Action = require('./action')

const entrySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: String,
  activities: [],
})

module.exports = mongoose.model('Entry', entrySchema);
