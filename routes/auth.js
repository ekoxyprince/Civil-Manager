const express = require('express')
const router = express.Router()
const {email,password} = require('../middlewares/validation')
const isAuth = require('../middlewares/auth')
const {Admin} = require('../middlewares/role')
const authController = require('../controllers/authcontroller')

router.post('/signin',[email(),password()],authController.postSignin)
router.post('/logout',[isAuth,Admin],authController.postLogout)

module.exports = router