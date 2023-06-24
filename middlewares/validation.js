const {check,body} = require('express-validator/')


const email = ()=>{
    return check('email')
    .isEmail()
    .normalizeEmail()
    .withMessage("Please enter a valid email")
}
const password = ()=>{
    return body('password',"Password should be more than 8 and less than 15 and most contain numbers and alphabet")
    .isLength({min:8,max:15})
    .isAlphanumeric() 
}

module.exports = {email,password}
