import React from 'react'
import { useNavigate } from 'react-router'

const BlogCard = ({ id, title, content, author, createdAt }) => {

    const navigate = useNavigate()

    const handleBlogNavigation = () => {
        navigate(`/blogDetail/${id}`)
    }

    const stripHtml = (html) => {
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    };


    const getSlicedContent = (text, maxLength = 150) => {
        if (text.length <= maxLength) return text
        return text.slice(0, maxLength).trim() + '...'
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    return (
        <div
            onClick={handleBlogNavigation}
            className='bg-white shadow-xs rounded-lg border border-gray-200 p-5 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer'>
            <div className='mb-5'>
                <h1 className='text-xl md:text-2xl font-bold capitalize line-clamp-2'>
                    {title}
                </h1>
                <p className='text-gray text-base mt-2 line-clamp-3'>
                    {getSlicedContent(stripHtml(content))}
                </p>

            </div>
            <hr className="border-gray-200" />
            <div className='mt-5'>
                <p className='text-sm font-normal text-gray-900'>
                    {author.name}
                </p>
                <p className='text-xs text-gray'>
                    {createdAt ? formatDate(createdAt) : 'November 6, 2025'}
                </p>
            </div>
        </div>
    )
}

export default BlogCard