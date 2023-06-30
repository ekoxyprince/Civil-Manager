const express = require('express')
const router = express.Router()
const pageController = require('../controllers/pagescontroller')
const isAuth = require('../middlewares/auth')
const {Admin} = require('../middlewares/role')
const upload = require('../libs/fileupload')

router.get('/signin',pageController.getSignin)
router.get("/",[isAuth,Admin],pageController.getHome)
router.get('/add_material',[isAuth,Admin],pageController.getAddMaterial)
router.post('/add_material',[isAuth,Admin],upload.single('image'),pageController.postAddMaterial)
router.get('/add_records',[isAuth,Admin],pageController.getAddRecord)
router.post('/add_records',[isAuth,Admin],upload.single('image'),pageController.postAddRecord)
router.get('/view_records',[isAuth,Admin],pageController.getViewRecords)
router.get('/calc_cubicmeter',[isAuth,Admin],pageController.getCalculations)
router.delete('/delete_material',[isAuth,Admin],pageController.deleteMaterial)


module.exports = router