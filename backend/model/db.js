const mongoose = require("mongoose")

mongoose.connect(process.env.DB_URL)
.then(res => {
    console.log('Database connected successfully')
}).catch(error => {
    console.log(error)
    console.log('Some error occured while connecting the DB')
})

module.exports = mongoose;