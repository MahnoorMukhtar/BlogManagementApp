import React from 'react'
import { Link } from 'react-router'
import BlogCard from '../components/BlogCard'
import Header from '../components/Header'
import { useBlog } from '../context/BlogContextProvider'

const Blogs = () => {
    const { posts } = useBlog()

    return (
        <main className='bg-background min-h-screen'>
            <Header />
            <div className='px-15'>
                <section className=' mt-10 max-w-7xl'>
                    <div className='max-w-2xl flex flex-col gap-5 justify-center'>
                        <h1 className='text-3xl md:text-4xl font-bold capitalize'>
                            Discover Stories
                        </h1>
                        <p className='text-gray text-base'>
                            Explore insightful blog posts from our community of writers
                        </p>
                    </div>
                </section>
                {posts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray text-lg mb-6">
                            No blog posts available yet. Be the first to create one!
                        </p>
                        <Link to="/create">
                            <button className="bg-primary text-white text-center rounded-lg px-3 py-2 font-medium cursor-pointer text-[15px]">Create First Post</button>
                        </Link>
                    </div>
                ) : (
                    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10'>
                        {posts.map((post) => (
                            <BlogCard 
                                key={post._id} 
                                id={post._id} 
                                title={post.title} 
                                content={post.content} 
                                author={post.authorId} 
                                createdAt={post.createdAt}
                            />
                        ))}
                    </section>
                )}

            </div>

        </main>
    )
}

export default Blogs