const router = require("express").Router()
const Razorpay = require("razorpay")
const crypto = require("crypto")

// ORDER API
router.post("/orders",async (req,res)=>{
    try{
        const instance = new Razorpay({
            key_id:process.env.RAZORPAY_API_KEY,
            key_secret:process.env.RAZORPAY_API_SECRET
        })

        const options = {
            amount: Number(req.body.amount*100),
            currency:"INR",
            receipt: crypto.randomBytes(10).toString("hex")
        }

        instance.orders.create(options, (error,order)=>{
            if(error){
                console.log(error)
                return res.status(500).json({message:"Something went wrong"})
            }
            res.status(200).json({data:order})
        })
    } catch(error){
        console.log(error)
        res.send(500).json({message:"Internal Server Error"})
    }
})

// PAYMENT VERIFY API
router.post("/verify",async(req,res)=>{
    try {
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
        const sign = razorpay_order_id + "" + razorpay_payment_id;
        // const expectedSign = crypto.createHmac("sha256",process.env.RAZORPAY_API_SECRET).update(sign.toString()).digest("hex")
        // console.log("Expected Sign >>> ",expectedSign)
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        let generatedSignature = hmac.digest('hex');
        
        if(generatedSignature === razorpay_signature){
            return res.status(200).json({message:"Payment Verified Successfully"})
        } else {
            return res.status(400).json({message:"Invalid Signature sent!"})
        }
    } catch (error) {
        console.log("Verify Error >>> ",error)
        res.status(500).json({message:"Internal Server Error"})
    }
})


module.exports = router;