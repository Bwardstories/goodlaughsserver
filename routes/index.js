const express = require('express')
const authRouter = require('./auth')
const eventRouter = require('./events')
const mailchimpRouter = require('./mailchimp')

const router = express.Router()

router.use('/auth', authRouter)
router.use('/events', eventRouter)
router.use('/mailchimp', mailchimpRouter)
router.get('/', (req, res) => {
  res.send('hello World')
})

module.exports = router
