const express = require('express')
const router = express.Router()
const {email,password} = require('../middlewares/validation')
const authController = require('../controllers/authcontroller')

router.post('/signin',[email(),password()],authController.postSignin)

module.exports = router