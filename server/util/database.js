require('dotenv').config()
const {CONNETION_STRING}= process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNETION_STRING,{
    dialect: 'postgres',
    dialectOptions: {
        ssl:{
            rejectUnauthorized: false
        }
    }

})

module.exports = {
    sequelize
}