# Blogging Platform

A full-stack blogging platform where users can register, login, create blog posts, update and delete their posts, and interact with other users through comments.

This project demonstrates full-stack development using RESTful APIs, authentication, database integration, and frontend-backend communication.

---

## Features

### User Authentication

- User registration
- User login
- JWT-based authentication
- Protected API routes
- Secure user sessions
- Logout functionality


### Blog Management

- Create new blog posts
- View all blog posts
- View user-specific posts
- Update existing posts
- Delete posts


### Comment System

- Add comments to blog posts
- Display comments under posts
- User-based comment display
- Real-time comment refresh after adding


### User Interface

- Responsive dashboard layout
- Separate pages for:
  - Login
  - Register
  - Dashboard
  - Create/View posts

- Styled components:
  - Gradient background
  - Blog cards
  - Comment sections
  - Action buttons


---

## Tech Stack

### Frontend

- HTML
- CSS
- JavaScript


### Backend

- Node.js
- Express.js


### Database

- PostgreSQL


### Authentication

- JSON Web Token (JWT)


---

## Project Structure

```
Blogging-Platform/

│
├── frontend/
│
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── create-post.html
│   ├── view-posts.html
│   └── style.css
│
│
├── backend/
│
│   ├── server.js
│   │
│   ├── routes/
│   │
│   ├── controllers/
│   │
│   ├── middleware/
│   │
│   └── database/
│
│
└── README.md

```

---

## Installation and Setup

### Clone Repository

```
git clone <repository-url>
```

Move into the project folder:

```
cd Blogging-Platform
```

---

## Backend Setup

Navigate to backend:

```
cd backend
```

Install dependencies:

```
npm install
```

Create environment configuration:

```
.env
```

Add required values:

```
PORT=5000
JWT_SECRET=your_secret_key
DATABASE_URL=your_database_url
```

Start backend server:

```
npm start
```

Server runs on:

```
http://localhost:5000
```

---

## Frontend Setup

Open the frontend folder:

```
cd frontend
```

Run the application using Live Server or any local server.

---

## API Endpoints

### Authentication

Register User

```
POST /api/auth/register
```

Login User

```
POST /api/auth/login
```

---

### Posts

Create Post

```
POST /api/posts
```

Get User Posts

```
GET /api/posts/user/:id
```

Get Other Users Posts

```
GET /api/posts/others/:id
```

Update Post

```
PUT /api/posts/:id
```

Delete Post

```
DELETE /api/posts/:id
```

---

### Comments

Add Comment

```
POST /api/comments
```

Get Comments

```
GET /api/comments/:postId
```

---

## Authentication Flow

1. User registers an account
2. User logs in
3. Server generates JWT token
4. Token is stored on frontend
5. Protected requests send token in headers
6. Backend verifies token before allowing access


---

## Security

Implemented:

- Password protection
- JWT authentication
- Protected API routes
- User authorization


---

## Future Improvements

- User profile pages
- Like and share posts
- Image upload support
- Post categories
- Search functionality
- Rich text editor
- Pagination


---

## Learning Outcomes

Through this project:

- Learned full-stack application development
- Built REST APIs
- Connected frontend with backend
- Implemented authentication
- Worked with database operations
- Created interactive UI components


---

## Author

Developed as a full-stack development project.
