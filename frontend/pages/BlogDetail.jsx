import React from 'react'
import { useParams, Link } from 'react-router'
import { useBlog } from '../context/BlogContextProvider'
import Header from '../components/Header'

const BlogDetail = () => {
  const { id } = useParams()
  const { posts } = useBlog() 

  // Find the specific post by ID
  const post = posts.find(post => post._id === id)

  if (!post) {
    return (
      <div>
        <Header />
        <main className="min-h-screen bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center py-12">
              <p className="text-gray-500">Post not found or loading...</p>
              <Link to="/blogs">
                <button className="mt-4 bg-transparent border border-gray rounded py-1 shadow-xs font-medium hover:bg-red hover:text-white text-gray transition-all duration-300">
                  Back to All Posts
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Format the date
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div>
      <Header />
      <main className="min-h-screen bg-background">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-black mb-4 capitalize">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-8">
              <div>
                <p className='text-lg font-normal text-gray-900'>
                  {post.authorId?.name || 'Unknown Author'}
                </p>
                <p className='text-sm text-gray'>
                  {formattedDate}
                </p>
              </div>
            </div>
            <hr style={{ color: 'lightgray' }} />
          </div>

          <div 
            className="max-w-none text-gray leading-relaxed space-y-4 mb-8 prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <hr style={{ color: 'lightgray' }} />
          <div className="mt-12 pt-8">
            <Link to="/blogs">
              <button className="w-full bg-transparent border border-gray-400 rounded py-1 shadow-xs font-medium hover:bg-red hover:text-white text-gray transition-all duration-300">
                Back to All Posts
              </button>
            </Link>
          </div>
        </article>
      </main>
    </div>
  )
}

export default BlogDetail