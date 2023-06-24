const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const userSchema = {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    username:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    role:{
       type:Sequelize.TEXT,
       allowNull:false
    },
    lastlogin:{
        type:Sequelize.DATE,
        allowNull:false
    }
}

module.exports = sequelize.define('User',userSchema)