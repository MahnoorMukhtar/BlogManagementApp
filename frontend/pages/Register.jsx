import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../context/authContextProvider'

function Input({ type, placeholder, value, onChange }) {
    return (
        <input
            className='p-2 w-full bg-purple-100 text-[16px] placeholder:text-gray-400 border border-purple-200 focus:outline-none focus:border-primary text-gray shadow-2xs rounded-lg'
            type={type}
            placeholder={placeholder}
            autoComplete='false'
            value={value}
            onChange={onChange}
        />)
}

const Register = () => {


const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (!name || !email || !password || !confirmPassword) {
        setError("Please fill in all fields")
        return
      }

      if (!email.includes("@")) {
        setError("Please enter a valid email")
        return
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters")
        return
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match")
        return
      }

      const res = await register(name, email, password)
      if(res.success){
        navigate('/')
      }else{
        setError(res.message)
      }

    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }
    return (
        <div className='bg-background'>
            <div className='flex flex-col justify-center max-w-xl mx-auto p-10 h-screen gap-2'>
                <h1 className='font-bold text-3xl'>Create Account</h1>
                <p className='text-gray-600'>Join us to start blogging</p>
                {error && <div className="text-red border-red rounded-lg text-sm">{error}</div>}
                <form onSubmit={handleSubmit} className='space-y-4 mt-8'>
                    <div>
                        <label className='font-semibold text-gray'>Full Name</label>
                        <Input type="text" placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div>
                        <label className='font-semibold text-gray'>Email </label>
                        <Input type="email" placeholder='you@gmail.com' value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label className='font-semibold text-gray'>Password</label>
                        <Input type="password" placeholder='Password'  value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <div>
                        <label className='font-semibold text-gray'>Confirm Password  <br /></label>
                        <Input type="password" placeholder='Confirm Password'  value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                    </div>
                    <button disabled={isLoading} type='submit' className='bg-primary text-white rounded-lg w-full py-3 mt-2 font-medium cursor-pointer'>Create account</button>
                    <p className='text-gray-500 text-sm text-center'>Already have an account?
                        <Link to="/login" className='ml-2 text-decoration-none text-primary font-semibold'>
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register