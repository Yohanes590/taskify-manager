const mongoose = require('mongoose')
const SaveUserInfo = mongoose.Schema({
    user_name:{
        type:String,
        required:true,
    },
    user_email:{
        type:String,
        required:true,
    },
    user_password:{
        type:String,
        required:true,
    },
    user_task:{
        type:Array,
        required:true,
    }
})
const userInformation = mongoose.model("user-informations" , SaveUserInfo)
module.exports = userInformation