const LocalStrategy = require('passport-local').Strategy
const User = require('../app/models/users')
const key = "TheKeyisHer"
module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user)
        })
    })
    //Método que me permite Registrar
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, username, password, done) {
            User.findOne({ 'username': username }, function (err, user) {
                if (err) {
                    return done(err)
                }
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'El usuario ingresado ya existe.'))
                }
                else {
                    asyncCall(username, password, done)
                }
            })
        }
    ))


    async function asyncCall(username, password, done) {
        var newUser = new User()
        newUser.username = username
        newUser.password = password
        newUser.save(function (err) {
            if (err) { throw err }
            return done(null, newUser)
        })
    }





    /*Método que me permite Login
    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, username, password, done) {
            User.findOne({ 'username': username }, function (err, user) {
                if (err) { return done(err) }
                if (!user) {
                    return done(null, false, req.flash('logginMessage', 'El usuario no ha sido encontrado.'))
                }
                if (!user.validateData(key, password)) {
                    return done(null, false, req.flash('loginMessage', 'Contraseña incorrecta'))
                }
                return done(null, user)
            })
        }
    ))*/


}