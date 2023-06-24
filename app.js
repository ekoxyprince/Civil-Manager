const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const ejs = require('ejs')
const dotenv = require('dotenv').config()
const pagesRoute = require('./routes/pages')
const authRoute = require('./routes/auth')
const database = require('./utils/database')
const session = require('express-session')
const flash  = require('connect-flash')
const helmet = require('helmet')
const logger = require('morgan')
const compression = require('compression')
const permissionPolicy = require('permissions-policy')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const myStore = new SequelizeStore({
    db:database
})

app.engine('ejs',ejs.renderFile)
app.set('views','views')
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    store:myStore
}))
myStore.sync()
app.use(flash());
app.use(compression())
app.use(helmet())
app.use(permissionPolicy(
    {
        features: {
            fullscreen: ['self'],
            vibration: ['none']
        }
    }
))
app.use(logger('dev'))

app.use('/',pagesRoute)
app.use('/auth',authRoute)

module.exports = app
