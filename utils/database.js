const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS,{
    dialect:'mysql',
    host:process.env.DB_HOST
})

sequelize.authenticate()
.then(connected=>{
    console.log("connnected to database")
})
.catch(error=>console.log(error))



module.exports = sequelize
