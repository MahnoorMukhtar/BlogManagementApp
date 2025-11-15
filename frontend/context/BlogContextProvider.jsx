import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./authContextProvider";

const BlogContext = createContext();

export function BlogProvider({ children }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const { user } = useAuth

  const getAllPosts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/posts/`, {
        withCredentials: true,
      });
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const addPost = async (postData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts/`,
        postData,
        { withCredentials: true }
      );
      console.log("reponse add post", response.data)
      const newPost = {
        ...response.data.post,
        authorId: response.data.post.authorId || user,
      };
      setPosts([newPost, ...posts]);
      return response.data.post
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const updatePost = async (id, updates) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}`,
        updates,
        { withCredentials: true }
      )
      const updatedPost = response.data.post
    
      setPosts((prevPosts)=>(prevPosts.map(post=>post._id === id ? updatedPost : post)));
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const deletePost = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}`,
        { withCredentials: true }
      );

      console.log("res", res.data)
      if (res.data.success) {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const getPostById = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}`,
        { withCredentials: true }
      );
      return response.data.post;
    } catch (error) {
      console.error("Error fetching post:", error);
      return null;
    }
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        addPost,
        updatePost,
        deletePost,
        getPostById,
        getAllPosts,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
}
