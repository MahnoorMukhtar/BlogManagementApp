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

**Backend:**

```bash
git clone https://github.com/MahnoorMukhtar/BlogManagementApp.git
cd BlogManagementApp
```

**Frontend:**

```bash
cd frontend
npm install
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




