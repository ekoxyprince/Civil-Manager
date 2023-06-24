const Sequelize = require('sequelize')

const sequelize = require('../utils/database')

const materialSchema = {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    material:{
        type:Sequelize.STRING,
        allowNull:false
    },
    unit:{
        type:Sequelize.STRING,
        allowNull:false
    },
    totalAmount:{
        type:Sequelize.FLOAT,
        allowNull:false
    },
    amountRemaining:{
        type:Sequelize.FLOAT,
        allowNull:false
    },
    date:{
        type:Sequelize.STRING,
        allowNull:false
    }
}
module.exports = sequelize.define('Material',materialSchema)