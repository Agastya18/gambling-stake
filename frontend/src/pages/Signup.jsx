import axios from 'axios'
import { useState } from 'react'
import { useStore } from '../zustand/store'
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const {setAuthUser} = useStore()
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
         if(!username || !password){
      alert("All fields are required")
         }
         try {
            const {data} = await axios.post('/api/signup', {username, password})
            localStorage.setItem('userInfo', JSON.stringify(data))
            setAuthUser(data)
            navigate('/')
           // console.log(data)
          
         } catch (error) {
           console.log(error)
          
         }
    

  }
  return (
    <div className="min-h-screen bg-gray-900 py-6 flex flex-col justify-center sm:py-12">
  <div className="relative py-3 sm:max-w-xl sm:mx-auto">
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
      <div className="max-w-md mx-auto">
        <div>
          <h1 className="text-2xl font-semibold">Stake Signup</h1>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <div className="relative">
              <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
                id="username"
                name="username"
                type="text"
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                placeholder="username"
              />
              <label
                htmlFor="username"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                username
              </label>
            </div>
            <div className="relative">
              <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                id="password"
                name="password"
                type="password"
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Password
              </label>
            </div>
            <div className="relative">
              <button onClick={handleSubmit} className="bg-cyan-500 text-white w-full rounded-md px-2 py-1">
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className=' text-gray-900 flex justify-center items-center mb-2  font-bold'>or</p>
      <div className="w-full flex justify-center">
        <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          
          <Link to={'/login'}>Login</Link>
        </button>
      </div>
    </div>
  </div>
</div>

  )
}

export default Signup