const {validationResult} = require('express-validator')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const tryCatch = require('../utils/trycatch')

exports.postSignin = (req,res,next)=>{
    console.log(req.body)
    const {email,password} = req.body 
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res
        .status(422)
        .json({status:"Error",
              message:errors.array()[0].msg})
    }
    User
    .findOne({where:{username:email}})
    .then(user=>{
        if(!user){
            return res
            .status(422)
            .json({status:"Error",
                  message:'No user found with this email address'})
        }
        return bcrypt.compare(password,user.password)
        .then(doMatch=>{
            if(!doMatch){
                return res
                .status(422)
                .json({status:"Error",
                      message:'Please verify the password you entered'})
            }
            req.session.user = user
            req.session.isLoggedIn = true
            return res.status(200)
            .json({status:"Success",message:`Welcome ${user.username}`})
        })
    })
    .catch(error=>{
        console.log(error)
    })
}

exports.postLogout = (req,res,next)=>{
   req.session.destroy((error)=>{
    if (error) throw new Error(error)
    res.redirect('/signin')
   })
}