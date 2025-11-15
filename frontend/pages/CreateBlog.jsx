import React from "react"

import { useState } from "react"
import Header from "../components/Header"
import ProtectedRoutes from "../components/ProtectedRoutes"
import { Link, useNavigate } from "react-router"
import TextEditor from "../components/TextEditor"
import { useBlog } from "../context/BlogContextProvider"
import { useAuth } from "../context/authContextProvider"



export default function CreateBlog() {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

    const { addPost } = useBlog()
    const { user } = useAuth() 
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setIsSubmitting(true)

        try {
            if (!title.trim() || !content.trim()) {
                setError("Title and content are required")
                return
            }

            if (!user) {
                setError("You must be logged in to create a post")
                return
            }

            const newPost = {
                title: title.trim(),
                content: content.trim()
            }

            const post = await addPost(newPost)
            navigate(`/blogDetail/${post._id}`)
        } catch (err) {
            console.log("erro in creating post", err)
            setError("Failed to create post. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <ProtectedRoutes>
            <Header />
            <main className="min-h-screen bg-background">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className='mb-5'>
                        <h1 className='text-xl md:text-2xl font-bold capitalize'>
                            Create New Post
                        </h1>
                        <p className='text-gray text-base mt-2'>
                            Share your thoughts and ideas with our community
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && <div className="p-4 text-red border-red rounded-lg text-sm">{error}</div>}

                        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="title" className="block text-sm font-semibold">
                                    Post Title
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter an engaging title..."
                                    className='p-2 w-full bg-purple-100 text-[16px] placeholder:text-gray-400 border border-purple-200 focus:outline-none focus:border-blue-600 text-gray shadow-2xs rounded-lg'
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="content" className="block text-sm font-semibold">
                                    Content
                                </label>
                                <TextEditor
                                    value={content}
                                    onChange={setContent}
                                    placeholder="Write your content here. Use the formatting buttons above for styling."
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 bg-primary text-white hover:bg-primary rounded font-medium"
                            >
                                {isSubmitting ? "Publishing..." : "Publish Post"}
                            </button>

                            <Link to="/userDashboard" className="flex-1">
                                <button className="w-full bg-transparent border border-gray-300 rounded py-1 shadow-xs font-medium hover:bg-red text-sm hover:text-white transition-all duration-300">
                                    Cancel
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </main>
        </ProtectedRoutes>
    )
}
