import { useState } from 'react';
import logo from '../../assets/img/logo.jpeg'
import axios from 'axios';
import apiCaller from 'components/apiCaller';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useNavigate();

    function loginHandler(e){
        e.preventDefault()
        const obj = {email,password}
        // axios.post("http://localhost:5000/login",obj)
        apiCaller.post("/login",obj)
        .then(response => {
            if(response.status === 200){
                const obj = {
                    email: response.data.email,
                    name: response.data.name,
                    phoneNumber: response.data.phoneNumber,
                    role: response.data.role,
                    userId: response.data.userId
                }

                localStorage.setItem("loggedInUser",JSON.stringify(obj))
                if(response.data.role === "Admin"){
                    history("/admin")
                } else if (response.data.role === "Agent"){
                    history("/agent")
                } else if (response.data.role === "User"){
                    history("/user")
                } else if (response.data.role === "PDO"){
                    history("/pdo")
                }

                toast.success(response.data.message)
            } else {
                return toast.warn(response.data.message)
            }
        })
    }

    return(
        <section class="bg-gray-200 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-24 h-20 mr-2" src={logo} alt="logo"/>
          J-KIT
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={loginHandler}>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@outlook.com" required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <button type="submit" class="w-full text-white bg-gray-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  
              </form>
          </div>
      </div>
  </div>
</section>
    )
}

export default Login;