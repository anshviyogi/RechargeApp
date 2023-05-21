import { DB_LINK } from "Constants/link";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

const Marketplace = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("")

  const [adharNumber, setAdharNumber] = useState("")
  const [panNumber, setPanNumber] = useState("")

  const localStorageItem = JSON.parse(localStorage.getItem("loggedInUser"))
  const history = useNavigate()

  function submitHandler(e) {
    e.preventDefault();
    if(firstName === "" || lastName === "" || city === "" || state === "" || phoneNumber === "" || role === "" || address === "" || password === "" || confirmPassword === "" || email === ""){
      return toast.warn("Please fill all the mandatory fields")
    }

    if(role === "PDO"){
      if(adharNumber === "" || panNumber === ""){
      return toast.warn("Kindly enter your adhar and pan number in the verify box")
      }
    }

    if(password !== confirmPassword){
      return toast.warn("Password and Confirm Password should be same")
    }
    const formData = {
      userId:uuidv4(),
      name: `${firstName} ${lastName}`,
      city,
      state,
      phoneNumber,
      role,
      address,
      password,
      email,
      adharNumber,
      panNumber,
      createdBy: localStorageItem.name,
      createdByRole: localStorageItem.role,
      createdById: localStorageItem.userId
    }

    axios.post(`${DB_LINK}/accountCreation`,formData)
    .then(response => {
      if(response.status === 200){
      toast.success(response.data.message);        
      history("/admin/view")
      } else {
        toast.warn(response.data.message)
      }
    })
    
  }
  return (
    <form className="mt-6 ml-5" onSubmit={submitHandler}>
      <div className="mb-1 flex justify-between">
        <div className="mr-5 grow basis-0">
          <label className="font-primary text-textlight text-left text-sm font-semibold">
            First Name*
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-600 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="mr-5 grow basis-0">
          <label className="font-primary text-textlight text-left text-sm font-semibold">
            Last Name*
          </label>

          <input
            type="text"
            className="bg-gray-50 border border-gray-600 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Zemba"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-1 mt-3 flex justify-between">
        <div className="mr-5 grow basis-0">
          <label className="font-primary text-textlight text-left text-sm font-semibold">
            City*
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-600 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Indore"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="mr-5 grow basis-0">
          <label className="font-primary text-textlight text-left text-sm font-semibold">
            State*
          </label>

          <input
            type="text"
            className="bg-gray-50 border border-gray-600 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Madhya Pradesh"
            onChange={(e) => setState(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-1 mt-3 flex justify-between">
        <div className="mr-5 grow basis-0">
          <label className="font-primary text-textlight text-left text-sm font-semibold">
            Phone Number*
          </label>

          <input
            type="number"
            className="bg-gray-50 border border-gray-600 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="9999 99 9999"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="mr-5 grow basis-0">
          <label className="font-primary text-textlight text-left text-sm font-semibold">
            Creating for*
          </label>
          <select
            className="bg-gray-50 border border-gray-600 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
            onChange={(e) => setRole(e.target.value)}
          >
            <option>Select Role</option>
            <option>User</option>
            <option>PDO</option>
            <option>Agent</option>
          </select>

          {role === "PDO" && (
            <>
              {/* The button to open modal */}
              <label htmlFor="my-modal-3" className="bg-gray-800 text-white p-1 px-5 rounded-full cursor-pointer">
                Verify
              </label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="my-modal-3" className="modal-toggle" />
              <div className="modal">
                <div className="modal-box relative">
                  <label
                    htmlFor="my-modal-3"
                    className="btn btn-circle btn-sm absolute right-2 top-2"
                  >
                    ✕
                  </label>
                  <h3 className="text-lg font-bold mb-2">
                    PDO's verification
                  </h3>
                  <div>
                  <label className="font-primary text-textlight text-left text-sm font-semibold">Name</label>
                  <input className="bg-gray-50 border border-gray-600 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="As per the name mentioned above" value={`${firstName} ${lastName}`} disabled/>
                  </div>

                  <div className="mt-2">
                  <label className="font-primary text-textlight text-left text-sm font-semibold">Adhar Card Number</label>
                  <input className="bg-gray-50 border border-gray-600 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold" placeholder="XXXX XXXX XXXX XXXX" value={adharNumber} onChange={e => setAdharNumber(e.target.value)} type="number"/>
                  </div>

                  <div className="mt-2">
                  <label className="font-primary text-textlight text-left text-sm font-semibold">Pan Card Number</label>
                  <input className="bg-gray-50 border border-gray-600 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold" value={panNumber} onChange={e => setPanNumber(e.target.value)} placeholder="XXXXX1234X" type="text"/>
                  </div>

                  <div className="float-right mt-4">
                  <label htmlFor="my-modal-3" className="bg-gray-800 text-white p-2 rounded-full px-6 mt-2">Save</label>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mb-1 mt-3 flex justify-between">
        <div className="mr-5 grow basis-0">
          <label className="font-primary text-textlight text-left text-sm font-semibold">
            Email Address*
          </label>

          <input
            type="email"
            className="bg-gray-50 border border-gray-600 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@outlook.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mr-5 grow basis-0">
          <label className="font-primary text-textlight text-left text-sm font-semibold">
            Password*
          </label>

          <input
            type="password"
            className="bg-gray-50 border border-gray-600 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Confirm Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-1 mt-3 flex justify-between">
        <div className="mr-5 grow basis-0">
        <label className="font-primary text-textlight text-left text-sm font-semibold">
        Confirm Password*
      </label>

      <input
        type="password"
        className="bg-gray-50 border border-gray-600 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
        </div>

        <div className="mr-5 grow basis-0">
          
        </div>
      </div>

      <div className="mt-2">
        <label className="font-primary text-textlight text-left text-sm font-semibold">
          Address*
        </label>
        <textarea
          className="bg-gray-50 border border-gray-600 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
          placeholder="Your Hometown Address"
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="float-right mr-7 mt-2 space-x-4">
        <button className="rounded-full border border-gray-700 p-2 px-7">
          Cancel
        </button>
        <button className="rounded-full border border-gray-700 bg-gray-800 p-2 px-7 text-white">
          Save
        </button>
      </div>

      <ToastContainer />
    </form>
  );
};

export default Marketplace;
