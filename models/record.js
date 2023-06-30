const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const recordSchema = {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    recordAmount:{
        type:Sequelize.DECIMAL(10,3),
        allowNull:false
    },
    date:{
        type:Sequelize.STRING,
        allowNull:false,
        defaultValue:((new Date()).toDateString() + (new Date()).toLocaleTimeString()).slice(0,24)
    },
    day:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    image:{
        type:Sequelize.STRING,
        allowNull:false
    }
}

module.exports = sequelize.define('Record',recordSchema)