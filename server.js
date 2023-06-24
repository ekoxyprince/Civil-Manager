const server = require('./app')
const port = process.env.PORT || 5000
const User = require('./models/user')
const Material = require('./models/material')
const Record = require('./models/record')
const database = require('./utils/database')

Material.belongsTo(User)
User.hasMany(Material)
Record.belongsTo(Material)
Material.hasMany(Record)
database
.sync()
.then(synced=>{
    return User.findByPk(1)
})
.then(user=>{
    if(!user){
        return User.create({
           username:'chidi@futo.edu.ng',
           password:'$2a$08$IPV82pZjlQR1x3ATw7rzZ.s72Olo5q7bTdIR/7ohhInnzxAiCSdaG',
           role:'Administrator',
           lastlogin:Date.now()
        })
    }
    return user
})
.then(adminUser=>{
    server.listen(port,()=>{
        console.log(`Server is listening on port ${port}`)
    })
})

