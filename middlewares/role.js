
const Admin = (req,res,next)=>{
    if(req.user.role !== 'Administrator'){
        return res.redirect('/signin')
    }
    next()
}

module.exports = {Admin}