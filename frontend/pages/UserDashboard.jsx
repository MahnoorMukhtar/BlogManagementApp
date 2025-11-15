import { Link } from "react-router"
import { useAuth } from "../context/authContextProvider"
import { useBlog } from "../context/BlogContextProvider"
import React from "react"
import Header from "../components/Header"
import ProtectedRoute from "../components/ProtectedRoutes"

export default function UserDashboard() {
  const { user } = useAuth()
  const { posts, deletePost } = useBlog()

  const userPosts = posts.filter((post) => post.authorId?._id === user?._id)
  console.log("posts", posts)
  console.log("user", user)
  console.log("my posts", userPosts)

  const handleDeletpost = async (id) => {
    await deletePost(id)
  }

  return (
    <ProtectedRoute>
      <>
        <Header />
        <div className="bg-background">

          <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12">
              <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}</h1>
              <p className="text-lg text-gray">Manage your blog posts and grow your audience</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="border border-gray rounded-lg p-6">
                <div className="text-4xl font-bold text-primary mb-2">{userPosts.length}</div>
                <p className="text-gray">Published posts</p>
              </div>
              <div className="border border-gray rounded-lg p-6">
                <div className="text-4xl font-bold text-accent mb-2">{posts.length}</div>
                <p className="text-gray">Total community posts</p>
              </div>
            </div>

            <div className="border border-gray rounded-lg p-8 mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Your Posts</h2>
                  <p className="text-muted-foreground mt-1">Manage and edit your published stories</p>
                </div>
                <Link to="/create">
                  <button className="bg-primary text-white text-center rounded-lg px-3 py-2 font-medium cursor-pointer text-[15px]">Create New Post</button>
                </Link>
              </div>

              {userPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray mb-6">
                    You haven't published any posts yet. Start creating to share your stories!
                  </p>
                  <Link to="/create">
                    <button className="bg-primary text-white text-center rounded-lg px-3 py-2 font-medium cursor-pointer text-[15px]">Write First Post</button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {userPosts.map((post) => {
                    const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })

                    return (
                      <div
                        key={post._id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/blogDetail/${post._id}`}
                            className="font-semibold text-foreground hover:text-primary transition-colors"
                          >
                            {post.title}
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">{formattedDate}</p>
                        </div>
                        <div className="flex gap-3 sm:mt-0 justify-start">
                          <Link to={`/blogDetail/${post._id}`}>
                            <button className="flex items-center border rounded py-1 text-gray px-4 font-medium cursor-pointer text-sm">
                              View
                            </button>
                          </Link>
                          <Link to={`/edit/${post._id}`}>
                            <button className="flex items-center border rounded  py-1 text-gray px-4 font-medium cursor-pointer text-sm">
                              Edit
                            </button>
                          </Link>
                          <button onClick={() => handleDeletpost(post._id)} className="flex items-center border rounded bg-red py-1 text-white px-4 font-medium cursor-pointer text-sm">
                            Delete
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

      </>
    </ProtectedRoute>

  )
}
