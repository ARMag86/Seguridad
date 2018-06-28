const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const crypto = require("crypto");
var CryptoJS = require("crypto-js");
const md5 = require("md5")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.methods.encryptData = function (text, key) {
    return enc = CryptoJS.TripleDES.encrypt(text, key)

}

/*userSchema.methods.decryptData = function (text, key) {
    return new Promise(resolve => {
        var bytes = CryptoJS.TripleDES.decrypt(text, key)
        resolve(bytes.toString(CryptoJS.enc.Utf8))
    })
}*/

userSchema.methods.decryptData = function (text, key) {
    return new Promise(function (resolve, reject) {
        try {
            var decryptedData = CryptoJS.TripleDES.decrypt(text, key).toString(CryptoJS.enc.Utf8)
            console.log('aqui deberia mostrar el password')
            console.log(decryptedData)
            resolve(decryptedData)
        } catch (e) {
            reject(e)
        }
    })

}
/*
userSchema.methods.encryptData = function (key, text) {
    var enc = crypto.createCipher("des-ede3-ofb", key).update(text, "utf8", "hex")
    return enc
}
 
userSchema.methods.validateData = function (key, enc) {
    return crypto.createDecipher("des-ede3-ofb", key).update(enc, "hex", "utf8")
}
 
userSchema.methods.Sign = function (text) {
    return md5(text)
}
 
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}
 
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password)
}*/

module.exports = mongoose.model('User', userSchema)