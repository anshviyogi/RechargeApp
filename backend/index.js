require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
const paymentRoutes = require("./controllers/payment.controllers")

app.use(cors())
app.use(express.json())
app.use(express.json({ extended: false }));

// Connecting DB
require("./model/db")

app.use("/",require('./controllers/account.controllers'))
app.use("/api/payment",paymentRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server started running at ${PORT}`)
})