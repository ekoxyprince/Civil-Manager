const User = require("../models/user")


const isAuth = (req,res,next)=>{
    if(!req.session.user || req.session.isLoggedIn !== true){
        return res.redirect('/signin')
    }else{
        User.findOne({where:{id:req.session.user.id}})
        .then(user=>{
        if(!user){
           return res.redirect('/signin')
        }else{
           req.user = user
           return next()
        }
        })
        .catch(error=>{
            res.redirect('/signin')
        })
    }
}

module.exports = isAuth