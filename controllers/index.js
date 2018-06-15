let express = require('express')
  , router = express.Router()

module.exports = router

router.use(require('./book'))

router.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home page'
  })
  res.end()
})
