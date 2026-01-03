import React from 'react';
import { Link } from 'react-router';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContextProvider';

const Home = () => {
    const { user } = useAuth()
    return (
        <main className='bg-background h-screen'>
            <Header/>
            <section className='px-10 mt-30 max-w-7xl'>
                <div className='max-w-2xl flex flex-col gap-5 justify-center'>
                    <h1 className='text-5xl md:text-6xl font-bold capitalize'>
                        Share your ideas with the world
                    </h1>
                    <p className='text-gray text-lg'>
                        BlogHub is a platform where you can create, edit and share your thoughts with a thriving comunity of writers and readers.
                    </p>
                    <div className='flex gap-5 mt-3'>
                        <Link to='/register' className='bg-primary text-white text-center rounded-lg px-3 py-2 font-medium cursor-pointer text-[15px] w-full sm:w-auto'>Start Writing Today</Link>
                        <Link to='/blogs' className='text-gray-900 rounded-lg border text-center  border-gray-400 px-3 py-2 font-medium cursor-pointer text-[15px] w-full sm:w-auto'>Explore Stories</Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home