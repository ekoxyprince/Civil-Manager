const express = require('express')
const router = express.Router()

const pageController = require('../controllers/pagescontroller')
const isAuth = require('../middlewares/auth')
const {Admin} = require('../middlewares/role')

router.get('/signin',pageController.getSignin)
router.get("/",[isAuth,Admin],pageController.getHome)
router.get('/add_material',[isAuth,Admin],pageController.getAddMaterial)
router.post('/add_material',[isAuth,Admin],pageController.postAddMaterial)
router.get('/add_records',[isAuth,Admin],pageController.getAddRecord)
router.post('/add_records',[isAuth,Admin],pageController.postAddRecord)
router.get('/view_records',[isAuth,Admin],pageController.getViewRecords)


module.exports = router