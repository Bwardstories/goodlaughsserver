const express = require('express')
const axios = require('axios')

require('dotenv').config()

const router = express.Router()

router.post('/addmember', async (req, res) => {
  const { firstname, lastname, email } = req.body

  if (!firstname || !lastname || !email) {
    return res.status(422).json({
      error: 'Please enter a first name, last name, and email address',
    })
  }

  try {
    axios
      .post(
        `https://us3.api.mailchimp.com/3.0/lists/${process.env.REACT_APP_AUDIENCE_ID}/members/`,
        {
          'email_address': email,
          'merge_fields': {
            'FNAME': firstname,
            'LNAME': lastname,
          },
          'status': 'subscribed',
        },
        {
          headers: {
            'Authorization': `Basic ${process.env.REACT_APP_MAILCHIMP_API_KEY}`,
          },
        }
      )
      .then(() =>
        res.json({ message: 'Successfully subscribed to mailing list' })
      )
    return res.json({ message: 'Email account subscribed successfully' })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
