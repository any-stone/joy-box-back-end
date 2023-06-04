// npm packages
require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const formData = require('express-form-data')
const bodyParser = require('body-parser')
const Pusher = require('pusher')

// import routes
const profilesRouter = require('./routes/profiles.js')
const authRouter = require('./routes/auth.js')
const playgroundsRouter = require('./routes/playgrounds.js')

// create the express app
const app = express()

// basic middleware
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(formData.parse())

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// initialize Pusher
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true
})

// mount imported routes
app.use('/api/profiles', profilesRouter)
app.use('/api/auth', authRouter)
app.use('/api/playgrounds', playgroundsRouter)

// handle 404 errors
app.use(function (req, res, next) {
  res.status(404).json({ err: 'Not found' })
})

// handle all other errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ err: err.message })
})

// pusher route
app.post('/update-editor', (req, res) => {
  pusher.trigger('editor', 'text-update', {
    ...req.body,
  })

  res.status(200).send('OK')
})

module.exports = app
