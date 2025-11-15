import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../context/authContextProvider'

function Input({ type, placeholder, value, onChange }) {
  return (
    <input
      className='p-2 w-full bg-purple-100 text-[16px] placeholder:text-gray-400 border border-purple-200 focus:outline-none focus:border-blue-600 text-gray shadow-2xs rounded-lg'
      type={type}
      placeholder={placeholder}
      autoComplete='off'
      value={value}
      onChange={onChange}
    />)
}

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (!email || !password) {
        setError("Please fill in all fields")
        return
      }

      if (!email.includes("@")) {
        setError("Please enter a valid email")
        return
      }

      const res = await login(email, password)
      if(res.success){
        navigate('/userDashboard')
      }else{
        setError(res.message)
      }

    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className='bg-background'>
      <div className='flex flex-col justify-center max-w-xl mx-auto p-10 h-screen gap-2'>
        <h1 className='font-bold text-3xl'>Welcome Back</h1>
        <p className='text-gray-600'>Start to your account</p>
        {error && <div className="p-4 text-red border-red rounded-lg text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className='space-y-4 mt-8'>
          <div>
            <label className='font-semibold text-gray'>Email </label>
            <Input
              type="email"
              placeholder='you@gmail.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className='font-semibold text-gray'>Password</label>
            <Input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' disabled={isLoading} className='bg-primary text-white rounded-lg w-full py-3 mt-2 font-medium cursor-pointer'>Sign In</button>
          <p className='text-gray-500 text-sm text-center'>Don't have an account?
            <Link to="/register" className='ml-2 text-decoration-none text-primary font-semibold'>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login