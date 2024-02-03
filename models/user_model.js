const mongoose = require('mongoose')
const AuthModel = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,


        //ab role ke paas teen hi roles hai iske alawa jo bhi aayega wo nhi chalega
        enum:["student","Admin","visitor"]
    }
})
module.exports = mongoose.model("AuthKaModel",AuthModel)