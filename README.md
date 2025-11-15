# Blog Management App

A full-featured **MERN stack blog platform** that allows users to create, edit, and share blog posts, and provides a dashboard to manage posts.

---

## 📦 Tech Stack

**Frontend:** React.js, Tailwind CSS, Tiptap Editor  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Authentication:** JWT + Cookies  
**Other Libraries:** Axios, React Router, dotenv  

---

## ⚡ Features

- User authentication (login, register, logout)  
- Create, edit, delete blog posts  
- Rich text editor with formatting (Tiptap)  
- User dashboard with statistics  
- Public blogs listing  
- Responsive design for mobile and desktop  

---

## 🛠 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/MahnoorMukhtar/BlogManagementApp.git
cd BlogManagementApp
```

### 2. Install dependencies

```bash
cd backend && npm install
cd frontend && npm install
```

### 3. Confgiure Env Variables

**Backend .env:**

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

**Frontend .env:**

```bash
VITE_BACKEND_URL=http://localhost:5000
```


### 4. Run the app

**Backend:**

```bash
cd backend
npm start
```

**Frontend:**

```bash
cd frontend
npm run dev
```

Then open http://localhost:5173 in your browser.


## Architecture Explanation

### Project Structure

```
Frontend (React)
|   App
|   index.css
│
├─ components
│   ├─ BlogCard
│   ├─ Header
│   └─ TextEditor (Tiptap)
│   └─ ProtectedRoutes

│
├─ Pages
│   ├─ Home
│   ├─ CreateBlog
│   ├─ EditBlog
│   ├─ BlogDetail
|   ├─ Blogs
|   ├─ Login
|   ├─ Register
|   ├─ UserDashboard

│
└─ context
    ├─ AuthContextProvider
    └─ BlogContextProvider

Backend (Node.js + Express)
│
├─ models
│   └─ User, Post
├─ Controllers
│   └─ AuthController, PostController
├─ Routes
│   └─ auth.js, posts.js
├─ Middleware
│   └─ authMiddleware (JWT verification)
└─ Server.js (App entry point)

Database
└─ MongoDB (Stores users and posts)
```

---

## API Documentation

### Base URL
```bash
http://localhost:5000/api
```

### Authentication Headers
```
    Authorization: Bearer [JWT_TOKEN]
    Content-Type: application/json
```

### Endpoints

| Method | Endpoint | Description | Auth Required | Request Body |
|--------|----------|-------------|---------------|--------------|
| POST   | `/api/auth/register` | Register a new user | No | `{ name, email, password }` |
| POST   | `/api/auth/login` | Login user | No | `{ email, password }` |
| POST   | `/api/auth/logout` | Logout user | Yes | - |
| GET    | `/api/auth/me` | Get current logged-in user | Yes | - |
| POST   | `/api/posts` | Create a new blog post | Yes | `{ title, content }` |
| GET    | `/api/posts` | Get all blog posts | No | - |
| GET    | `/api/posts/:id` | Get a single blog post by ID | No | - |
| PUT    | `/api/posts/:id` | Update a blog post | Yes | `{ title, content }` |
| DELETE | `/api/posts/:id` | Delete a blog post | Yes | - |


### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
    "success": true,
    "token": "[jwt_token]",
    "user": {
        "_id": "[user_id]",
        "name": "[User Name]",
        "email": "[user@example.com]"
    }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
    "email": "[user@example.com]",
    "password": "[password123]"
}
```

**Response (200):**
```json
{
    "success": true,
    "token": "[jwt_token]",
    "user": {
        "_id": "[user_id]",
        "name": "[User Name]",
        "email": "[user@example.com]"
    }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer [jwt_token]
```

**Response (200):**
```json
{
    "success": true,
    "user": {
        "_id": "[user_id]",
        "name": "[User Name]",
        "email": "[user@example.com]",
        "createdAt": "[timestamp]"
    }
}
```

### CRUD Endpoints

#### Create a Post
```http
POST /api/posts
Authorization: Bearer [jwt_token]
Content-Type: application/json

{
    "title": "[post Title]",
    "content": "[post content]",
}
```

**Response (201):**
```json
{
    "message": "New post created successfully",
    "post": {
        "_id": "[post._id]",
        "title": "[post Title]",
        "content": "[post content]",
        "authorId": {
            "_id": "64f0c7d2e7a1f23abc654321",
            "name": "John Doe",
            "email": "john@example.com"
        }
        "createdAt": "[timestamp]",
        "updatedAt": "[timestamp]"
    }
}
```

#### Get All Resources
```http
GET /api/posts/
```

**Response (200):**
```json
{
    "posts": [
        {
            "_id": "[post._id]",
            "title": "[post Title]",
            "content": "[post content]",
            "authorId": {
                "_id": "64f0c7d2e7a1f23abc654321",
                "name": "John Doe",
                "email": "john@example.com"
            }
            "createdAt": "[timestamp]",
            "updatedAt": "[timestamp]"
        },
        //...more posts
    ]
}
```

#### Get Post by ID
```http
GET /api/posts/[post._id]
Authorization: Bearer [jwt_token]
```

**Response (200):**
```json
{
    "post": {
        "_id": "[postId]",
        "title": "[Post Title]",
        "content": "[Post Content]",
        "createdAt": "[timestamp]",
        "updatedAt": "[timestamp]"
    }
}
```

#### Update Post
```http
PUT /api/posts/[post_.id]
Authorization: Bearer [jwt_token]
Content-Type: application/json

{
    "title": "[Updated Title]",
    "content": "[Updated content]"
}
```

**Response (200):**
```json
{
    "message": "Post updated successfully",
    "data": {
        "_id": "[post_id]",
        "title": "[Updated Title]",
        "content": "[Updated content]",
        "updatedAt": "[timestamp]",
        "createdAt": "[timestamp]",
    }
}
```

#### Delete Post
```http
DELETE /api/posts/[post_id]
Authorization: Bearer [jwt_token]
```

**Response (200):**
```json
{
    "success": true,
    "message": "Post deleted successfully"
}
```

---

## API Testing

### Using Postman

1. **Import Collection:**
   - Open Postman
   - Click "Import" → Select `[postman_collection_file].json`
   - Environment variables will be pre-configured

2. **Set Environment Variables:**
   - Create a new environment named "Blog Management App"
   - Add variables:
     - `base_url`: `http://localhost:5000/api`
     - `token`: `[your_jwt_token]`
     - `user_id`: `[your_user_id]`

3. **Run Requests:**
   - Use {{base_url}} and {{token}} in request URLs and headers






