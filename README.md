# job-assignment
# Job Assignment - Full Stack Application

A modern web application featuring user authentication, protected routes, and a dynamic dashboard interface.

## 🚀 Features

- User Authentication (Signup/Login)
- Protected Dashboard
- Profile Management
- Responsive Design
- JWT Token Authentication
- MongoDB Integration

## 🛠️ Tech Stack

### Frontend
- React.js with Vite
- React Router DOM
- Axios for API calls
- TailwindCSS for styling
- Session Storage for token management

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing
- CORS enabled
- Cookie Parser

## 📦 Installation & Setup

1. **Clone the Repository**
Here's your improved README.md file:

```markdown:README.md
# Job Assignment - Full Stack Application

A modern web application featuring user authentication, protected routes, and a dynamic dashboard interface built with React and Node.js.

## 🚀 Features

- User Authentication (Signup/Login)
- Protected Dashboard
- Profile Management
- Responsive Design
- JWT Token Authentication
- MongoDB Integration
- Real-time Session Management
- Secure Password Handling
- Form Validation
- Error Handling

## 🛠️ Tech Stack

### Frontend
- React.js 18 with Vite
- React Router DOM v6 for routing
- Axios for API integration
- TailwindCSS for modern UI
- Session Storage for token management
- Lazy Loading for optimized performance

### Backend
- Node.js & Express.js
- MongoDB with Mongoose ODM
- JWT for secure authentication
- Bcrypt for password hashing
- CORS for secure cross-origin requests
- Cookie Parser for session handling
- Express Validator for input validation

## 📦 Installation & Setup

1. **Clone the Repository**
```bash
git clone https://github.com/realVibhorGupta/job-assignment.git
cd job-assignment
```

2. **Backend Setup**
```bash
cd backend
npm install

# Create .env file with:
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development
REFRESH_SECRET=your_refresh_secret
```

3. **Frontend Setup**
```bash
cd frontend
npm install
```

4. **Start the Application**

Backend:
```bash
cd backend
npm start
```

Frontend:
```bash
cd frontend
npm run dev
```

## 🌐 Access Points
- Frontend: `http://localhost:5174`
- Backend API: `http://localhost:5000`

## 📝 API Endpoints

### Authentication Routes
```bash
POST /api/signup     # Register new user
POST /api/login      # User login
GET /api/logout      # User logout
GET /api/protected   # Protected route verification
```

## 📁 Project Structure
```
job-assignment/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── utils/
│   │   └── errorHandler.js
│   ├── .env
│   └── app.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Button.jsx
    │   │   ├── Label.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── SignupForm.jsx
    │   │   └── Textbox.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Login.jsx
    │   │   └── Signup.jsx
    │   └── App.jsx
    ├── .env
    └── package.json
```

## ⚙️ Environment Variables

### Backend `.env`
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
REFRESH_SECRET=your_refresh_token_secret
```

## 🔐 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Protected routes implementation
- CORS security configuration
- HTTP-only cookie handling for tokens
- Secure cookie configuration
- Input validation
- Error handling middleware
- Session management
- Secure cookie handling




## 📄 License

This project is licensed under the MIT License

## 👥 Contact

Vibhor Gupta - [vibhor.88.gupta@gmail.com]
Project Link: [https://github.com/realVibhorGupta/job-assignment]

## 🙏 Acknowledgments

- React.js Documentation
- Node.js Documentation
- MongoDB Documentation
- TailwindCSS Documentation
- JWT.io
