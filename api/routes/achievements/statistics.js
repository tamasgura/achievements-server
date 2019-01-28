const express = require('express')
const router = express.Router()

const categories = {
  0: {
    name: 'Software Development',
    subjects: ['Achievements App'],
  },
  1: {
    name: 'Graphic Design',
    subjects: ['Photoshop', 'Blender'],
  },
  2: {
    name: 'Art',
    subjects: ['Origami'],
  }
}


const entries = [
  {}
]

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Statistics data'
  })
})

router.get('/categories/:categoryId', (req, res, next) => {
  
  const id = req.params.categoryId
  
  let categoryEntries = []
  if (id !== undefined) {
    categoryEntries = categories[id]
  }
  res.status(200).json({
    message: 'Statistics categories',
    categoryEntries,
  })
})

module.exports = router
