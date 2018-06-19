let express = require('express')
  , router = express.Router()
  , fs = require('fs')
  , Book = require('../models/book')
  , multer = require('multer')
  , storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync('uploads/')) {
        fs.mkdirSync('uploads')
      }

      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
  , upload = multer({ storage: storage })

module.exports = router

router.route('/books')
  .get((req, res) => {
    new Promise((resolve, reject) => {
      Book.find({}, (err, books) => {
        if (err) reject(err)

        resolve(books)
      })
    }).then(books => {
      res.render('books', {
        pageTitle: 'List of Books',
        books: books
      })
    }).catch(err => {
      res.send(err)
    }).finally(() => {
      res.end()
    })
  })

router.route('/book/new')
  .get((req, res) => {
    res.render('bookNew')
    res.end()
  })

  .post(upload.fields([
    {
      name: 'thumbnail',
      maxCount: 1
    },
    {
      name: 'file',
      maxCount: 1
    }
  ]), (req, res) => {
    let book = new Book({
      thumbnail: req.files['thumbnail'][0].path,
      title: req.body.title,
      author: req.body.author,
      file: req.files['file'][0].path
    })
    new Promise((resolve, reject) => {
      book.save((err, book) => {
        if (err) reject(err)

        resolve(book)
      })
    }).then(book => {
      res.json(book)
    }).catch(err => {
      res.status(500).json({ err: err })
    }).finally(() => {
      res.end()
    })
  })


router.route('/book/:title')
  .get((req, res) => {
    new Promise((resolve, reject) => {
      Book.findOne({
        title: req.params.title
      }, (err, book) => {
        if (err) reject(err)

        resolve(book)
      })
    }).then(book => {
      res.render('book', {
        pageTitle: book.title,
        book: book
      })
    }).catch(err => {
      res.status(500).json({ err: err })
    }).finally(() => {
      res.end()
    })
  })