// BASE SETUP
// =============================================================================

// call the packages we need
let express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , port = process.env.HTTP_PORT || 3000
  , morgan     = require('morgan')
  , sassMiddleware = require('node-sass-middleware')

// configure app
app.use(morgan('dev')) // log requests to the console

// VIEW SETUP
// =============================================================================
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

// FILES SETUP
// =============================================================================
app.use('/public', sassMiddleware({
  src: __dirname + '/public',
  dest: __dirname + '/public',
  debug: true,
  force: true,
  outputStyle: 'expanded'
}))
app.use('/uploads', express.static('uploads'))
app.use('/public', express.static('public'))

// ROUTING + MIDDLEWARE SETUP
// =============================================================================
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// load the cookie-parsing middleware
app.use(cookieParser())
app.use(require('./middlewares'))
app.use(require('./controllers'))

// DATABASE SETUP
// =============================================================================
let mongoose   = require('mongoose')
  , dbHost = process.env.DB_HOST || '127.0.0.1'
  , dbUser = process.env.DB_USER || 'root'
  , dbPwd = process.env.DB_PWD || ''
  , dbPort = process.env.DB_PORT || 27017
  , dbName = process.env.DB_NAME || 'presentation'

mongoose.connect('mongodb://' + dbUser + ':' + dbPwd + '@' + dbHost + ':' + dbPort + '/' + dbName, {
  authSource: 'admin',
  authMechanism: 'SCRAM-SHA-1'
}) // connect to our database

// Handle the connection event
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', () => {
  console.log("Connected to database", dbName)
  console.log("DB connection alive")
})


// START THE SERVER
// =============================================================================
app.listen(port, () => {
  console.log('Listening on port ' + port)
})
