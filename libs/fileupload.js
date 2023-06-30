const  multer = require('multer')
const fileStorageEngine = multer.diskStorage({
    destination: function(req,file,cb){
       return cb(null,'./public/uploads/')
    },
    filename: function(req,file,cb){
        return cb(null,Date.now()+'--'+file.originalname)
    }
})
const fileFilter = function(req,file,cb){
  if(file.mimetype === 'image/png'|| file.mimetype === 'image/jpeg'){
    return cb(null,true)
  }else{
    return cb(null,false)
  }
}
module.exports = multer({storage:fileStorageEngine,fileFilter:fileFilter})