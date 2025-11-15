import React from 'react'
import { Link } from 'react-router'
import { useAuth } from '../context/authContextProvider'

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className='flex justify-between h-20 p-3 bg-white sticky top-0 z-50'>
      <Link to='/' className='flex justify-center items-center gap-1'>
        <div className='h-8 w-8 rounded-lg bg-primary'></div>
        <h3 className='font-bold text-lg'>BlogHub</h3>
      </Link>

    <div className='hidden sm:flex gap-3 mt-3 items-center'>
      {
        user && (
          <>
          <Link
              to='/userDashboard'
              className='flex items-center rounded-lg text-gray px-4 font-medium cursor-pointer text-[15px]'
              >
              My Dashboard
            </Link>
            <Link
              to='/blogs'
              className='bg-primary text-white rounded-lg px-5 py-2 font-medium cursor-pointer text-[15px]'
            >
              Explore
            </Link>
          </>
        )
      }
    </div>


      <nav className='hidden sm:flex gap-5 mt-3 items-center'>
        {user ? (
          <>
            <span className='text-primary font-medium'>Welcome {user.name}!</span>
            <button
              onClick={logout}
              className='bg-transparent border border-gray-300 rounded px-4 py-2 shadow-xs font-medium hover:bg-red text-sm hover:text-white transition-all duration-300 '
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to='/login'
              className='text-gray rounded-lg border border-gray-400 px-5 py-1 font-medium cursor-pointer text-[15px]'
            >
              Sign In
            </Link>
            <Link
              to='/register'
              className='bg-primary text-white rounded-lg px-5 py-2 font-medium cursor-pointer text-[15px]'
            >
              Get Started
            </Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
