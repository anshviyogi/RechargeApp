const express = require('express')
const router = express.Router();
const Account = require("../model/accountSchema.model")

// Is service up ??
router.get("/",(req,res)=>{
    res.write("This service is running")
    res.end()
})

router.post("/accountCreation",async (req,res)=>{
    const {userId,name,city,state,phoneNumber,role,address,password,email,adharNumber,panNumber,createdBy,createdByRole,createdById} = req.body;
    const account = new Account();

    const emailExistsCheck = await Account.findOne({email})
    const phoneExistsCheck = await Account.findOne({phoneNumber})

    if(emailExistsCheck){
        res.status(203)
        return res.json({
            message:"This email already exists"
        })
    }

    if(phoneExistsCheck){
        res.status(203)
        return res.json({
            message:"This Phone Number already exists"
        })
    }
    
    account.name = name;
    account.city = city;
    account.state = state;
    account.phoneNumber = phoneNumber;
    account.role = role;
    account.address = address;
    account.password = password;
    account.email = email;
    account.adharNumber = adharNumber;
    account.panNumber = panNumber;
    account.userId = userId;
    account.createdBy = createdBy;
    account.createdByRole = createdByRole;
    account.createdById = createdById;

    account.save()
    .then(response => {
        res.json({
            message:"Account created successfully"
        })
    })
    .catch(err => console.log(err))
})

router.post("/login",async (req,res)=>{
    const {email,password} = req.body;
    const checkIfAccountExists = await Account.findOne({email,password})

    if(checkIfAccountExists){
        res.status(200).json({
            message:"Logged in successfully",
            email: checkIfAccountExists.email,
            role: checkIfAccountExists.role,
            phoneNumber: checkIfAccountExists.phoneNumber,
            name: checkIfAccountExists.name,
            userId: checkIfAccountExists.userId
        })
    } else {
        res.status(203).json({
            message:"Invalid Credentials"
        })
    }
})

router.post("/getAgentPdo/:id",async (req,res)=>{
    const {id} = req.params;
    const data = await Account.find({createdById:id})

    console.log(data)
    console.log(id)

    res.status(200).json({data})
})

// For admin route
router.get("/getAllDetails",(req,res)=>{
    const allData = Account.find().then(response => {
        res.json({response})
    })
})

// Get all PDO's for admin
router.get("/getAllAccountData",async (req,res)=>{
    const pdoData = await Account.find({role:"PDO"})
    const agentData = await Account.find({role:"Agent"})
    const userData = await Account.find({role:"User"})

    return res.status(200).json({pdoData,agentData,userData})
})

router.post("/findByPhoneNumber", async (req,res)=>{
    const {phoneNumber} = req.body;
    
    const userData = await Account.findOne({phoneNumber})

    if(!userData){
        return res.status(203).json({
            message:"No Record Found"
        })
    } else {
        const {balance,name} = userData;
        return res.status(200).json({balance,name})
    }
})

router.patch("/updatePayment",async (req,res) => {
    const {phoneNumber,balance} = req.body;
    console.log(balance)
    const update = await Account.findOneAndUpdate({phoneNumber},{balance:balance},null)
    .then(response => {
        console.log(response)
        return res.status(200).json({message:"Recharge successfull"})
    })
    .catch(error => {
        return res.status(203).json({
            message:"Recharge Failed",
            error
        })
    })
})

module.exports = router;