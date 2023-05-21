const mongoose = require('mongoose')

const accountSchema = mongoose.Schema({
    // name,city,state,phoneNumber,role,address,password
    userId:{
        type:"String"
    },
    name:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        default:"0"
    },
    balance:{
        type:String,
        default:"0"
    },
    adharNumber:{
        type:String
    },
    panNumber:{
        type:String
    },
    createdBy:{
        type:String,
    },
    createdByRole:{
        type:String
    },
    createdById:{
        type:String
    }
})

const Account = new mongoose.model("accounts",accountSchema)

module.exports = Account;