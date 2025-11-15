const Post = require("../models/postModel")

const allPost = async (req, res) => {
    try {
        const posts = await Post.find({}).populate("authorId", "name email")
        if (posts.length==0) {
            return res.json({ message: 'No posts to display', posts })
        }

        console.log("all posts", posts)
        return res.status(200).json({ posts })
    } catch (error) {
        console.log("error in getting all post", error.message)
        return res.status(400).json({ message: "Error in getting All posts" })
    }
}

const getPost = async (req, res, next) => {
    try {
        const id = req.params.id
        const post = await Post.findById(id).populate("authorId", "name email")
        if (!post) {
            return res.status(404).json({ message: "Post with id could not found" })
        }

        return res.status(200).json({ post })
    } catch (error) {
        console.error("error in getitng post with id", error.message)
        return res.status(404).json({ message: "Post with current id could not found" })
    }
}


const createPost = async (req, res, next) => {
    try {
        const { title, content } = req.body
        const user = req.user
        const newPost = await Post.create({
            title,
            content,
            authorId: user._id
        })
        console.log("new post", newPost )

        if (!newPost) {
            return res.status(400).json({ message: "Error in creating new Post" })
        }
        (await newPost.populate("authorId", "name email"))
        return res.status(201).json({ message: "New post created successfully", post: newPost });
    } catch (error) {
        console.error("error in creating post", error.message)
        return res.status(404).json({ message: "Error in creating new Post" })
    }
}


const editPost = async (req, res) => {
    try {
        const postId = req.params.id
        const { title, content } = req.body

        const post = await Post.findOne({ _id: postId })
        if (!post) {
            return res.status(400).json({ message: 'Post does not exist' })
        }
        console.log("post", post)
        if (post.authorId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to perform this action" })
        }

        const updatedPost = await Post.findOneAndUpdate(
            { _id: postId },
            {
                $set: {
                    title: title,
                    content: content
                }
            },
            { new: true }
        ).populate("authorId", "name email")


        return res.status(200).json({ message: "Post updated successfully", post: updatedPost })

    } catch (error) {
        console.error("error in editing post", error.message)
        return res.status(400).json({ message: "Error in Editing user Post" })
    }
}


const deletePost = async (req, res) => {
    try {
        const postId = req.params.id
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(400).json({ message: 'Post does not exist' })
        }

        if (post.authorId.toString() !== req.user._id.toString()) {
            return res.status(403).json({success: false, message: "You are not authorized to perform this action" })
        }

        const response = await Post.findOneAndDelete({ _id: postId })
        return res.status(200).json({success: true, message: "Post Deleted successfully" })

    } catch (error) {
        console.error("error in deleting post", error.message)
        return res.status(400).json({success: false,  message: "Error in Deleting user Post" })
    }
}


module.exports = {
    createPost,
    getPost,
    deletePost,
    editPost,
    allPost
}

