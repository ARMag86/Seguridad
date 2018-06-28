const express = require('express')
const app = express()//inicia con app el framework express
const path = require('path')
const mongoose = require('mongoose')//conectarse a MongoDB
const passport = require('passport')//configurar la manera de como me voy a autenticar
const flash = require('connect-flash')
const morgan = require('morgan')//definir los métodos HTTP que llegan al servidor
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')//Convertir el cuerpo de la información que me llega del navegador al servidor y procesarla
const session = require('express-session')

const { url } = require('./config/database.js')
mongoose.connect(url, {

})

require('./config/passport')(passport)

//settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//middlewares
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    secret: 'ARMag',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//routes
require('./app/routes.js')(app, passport)//express y passport para poder usar autenticación dentro de las rutas
//static files
app.use(express.static(path.join(__dirname, 'public')))
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'))

})