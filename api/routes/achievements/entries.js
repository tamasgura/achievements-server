const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Entry = require('../../models/entry')
const Action = require('../../models/action')

const util = require('../../../util')


router.post('/', (req, res, next) => {
  const actionsPassed = req.body.actions
  let activitiesArray = []
  actionsPassed.forEach(a => {
    activitiesArray.push(new Action({category: a.category, activities: a.activities}))
  })
  
  // TODO need to check for previous entries
  const entry = new Entry({
    _id: new mongoose.Types.ObjectId(),
    date: util.getDateString(),
    activities: activitiesArray
  })
  entry.save()
    .then(result => { console.log(result) })
    .catch(err => { console.log(err) })
  res.status(201).json({
    message: 'Handling POST requests to /achievements/entries',
    entry,
  })
})

router.get('/:id?', (req, res, next) => {
  const id = req.params.id
  if (id !== undefined) {
    Entry.findById(id)
      .exec()
      .then(entry => {
        console.log(entry)
        res.status(200).json(entry)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
      })
  } else {
    Entry.find()
      .exec()
      .then(entry => {
        console.log(entry)
        res.status(200).json(entry)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
      })
  }
})

router.patch('/:achievementId', (req, res, next) => {
  const id = req.params.achievementId
  const entry = req.body.entry
  res.status(200).json({
    message: 'Updated entry successfully'
  })
})

router.delete('/:achievementId', (req, res, next) => {
  const id = req.params.achievementId
  res.status(200).json({
    message: 'Deleted entry successfully'
  })
})

module.exports = router
