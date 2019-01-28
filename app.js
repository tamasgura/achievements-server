const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser= require('body-parser')
const mongoose = require('mongoose')



const entriesRoutes = require('./api/routes/achievements/entries')
const statisticsRoutes = require('./api/routes/achievements/statistics')

mongoose.connect('mongodb+srv://admin:' + process.env.MONGO_ATLAS_PW + '@test-ikauu.gcp.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })

// Log requrests
app.use(morgan('dev'))

// Parse request bodies easily
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Handle CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // or limit access from * to http://www.mySite.com
  res.header(
    'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET POST PUT, PATCH')
    return res.status(200).json({ })
  }
  next()
})

// Handle routes
app.use('/achievements/entries', entriesRoutes)
app.use('/achievements/statistics', statisticsRoutes)


// E R R O R S

// Handle 404
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

// Handle errors
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message
  })
})

module.exports = app
