import axios from "axios"

// baseURL:"https://recharge-app.onrender.com/",
const apiCaller = axios.create({
    baseURL:"http://localhost:5000/",
    responseType:"json"
})

export default apiCaller