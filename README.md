# Student Feedback Review System - MERN Stack

A comprehensive full-stack web application for managing student feedback with authentication, feedback submission, review, and analytics.

## 🎯 Features

### Backend (Node.js + Express)
- **User Authentication**: Secure JWT-based authentication
- **Student Management**: Create, read, update, delete student profiles
- **Feedback Management**: Submit, review, and manage feedback
- **Comments System**: Add comments to feedback for collaboration
- **Analytics**: View feedback statistics and trends
- **Database**: MongoDB Atlas integration for scalability

### Frontend (React)
- **Authentication Pages**: Login and Registration
- **Dashboard**: View feedback statistics and analytics
- **Feedback Form**: Submit feedback with multiple types and metadata
- **Feedback List**: Browse all feedback with filtering and search
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Automatic refresh after submissions

## 🛠️ Tech Stack

### Backend
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: Express Validator
- **CORS**: Cross-Origin Resource Sharing

### Frontend
- **Library**: React 18
- **Router**: React Router v6
- **HTTP Client**: Axios
- **State Management**: Context API
- **Styling**: CSS3

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas Account (Free tier available at https://www.mongodb.com/cloud/atlas)
- Git

## 🚀 Setup & Installation

### 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)
5. Copy this connection string - you'll need it for the backend

### 2. Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB Atlas URI:
```
MONGODB_ATLAS_URI=mongodb+srv://username:password@cluster.mongodb.net/student-feedback?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your_secret_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

5. Start the backend server:
```bash
npm run dev
```

The backend will be available at `http://localhost:5000`

### 3. Frontend Setup

1. Navigate to frontend directory (in a new terminal):
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm start
```

The frontend will open at `http://localhost:3000`

## 📁 Project Structure

```
student-feedback-system/
├── backend/
│   ├── models/
│   │   ├── Student.js
│   │   └── Feedback.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── studentController.js
│   │   └── feedbackController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── studentRoutes.js
│   │   └── feedbackRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── FeedbackForm.js
│   │   │   ├── FeedbackList.js
│   │   │   ├── Dashboard.js
│   │   │   └── Navbar.js
│   │   ├── pages/
│   │   │   ├── AuthPage.js
│   │   │   └── Home.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── authContext.js
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   ├── App.css
│   │   │   ├── Navbar.css
│   │   │   ├── Auth.css
│   │   │   ├── Home.css
│   │   │   ├── Feedback.css
│   │   │   └── Dashboard.css
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env
└── README.md
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new student
- `POST /api/auth/login` - Login student
- `GET /api/auth/me` - Get current user (Protected)

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `PUT /api/students/:id` - Update student profile (Protected)
- `DELETE /api/students/:id` - Delete student (Protected)
- `GET /api/students/department/:department` - Get students by department

### Feedback
- `POST /api/feedback` - Create feedback (Protected)
- `GET /api/feedback` - Get all feedback
- `GET /api/feedback/:id` - Get feedback by ID
- `GET /api/feedback/user/my-feedback` - Get user's feedback (Protected)
- `PUT /api/feedback/:id` - Update feedback (Protected)
- `DELETE /api/feedback/:id` - Delete feedback (Protected)
- `POST /api/feedback/:id/comment` - Add comment to feedback (Protected)
- `GET /api/feedback/stats` - Get feedback statistics

## 🔐 Authentication Flow

1. User registers with email, password, roll number, and other details
2. Password is hashed using bcryptjs
3. JWT token is generated and stored in localStorage
4. Token is sent with every protected API request
5. Backend verifies token and grants access to protected routes
6. User can logout to clear the token

## 📊 Data Models

### Student Schema
- name (String)
- email (String, unique)
- rollNumber (String, unique)
- password (String, hashed)
- department (String)
- semester (Number)
- phone (String)
- isTeacher (Boolean)
- createdAt, updatedAt (Timestamps)

### Feedback Schema
- student (Reference to Student)
- subject (String)
- feedbackType (String: academic, behavioral, performance, general)
- description (String)
- rating (Number: 1-5)
- teacher (String)
- comments (Array of comments)
- status (String: pending, in-review, resolved, closed)
- isAnonymous (Boolean)
- tags (Array)
- createdAt, updatedAt (Timestamps)

## 🎨 UI Features

- **Clean & Modern Design**: Professional gradient backgrounds and intuitive layouts
- **Responsive Layout**: Mobile-friendly interface
- **Tab Navigation**: Easy switching between Dashboard, Submit, and View Feedback
- **Filter & Search**: Filter feedback by status and type
- **Dark Mode Ready**: CSS variables for easy theme switching
- **Loading States**: User-friendly loading indicators
- **Error Handling**: Comprehensive error messages

## 🔧 Environment Variables

### Backend (.env)
- `MONGODB_ATLAS_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Environment (development/production)
- `FRONTEND_URL`: Frontend URL for CORS

### Frontend (.env)
- `REACT_APP_API_URL`: Backend API URL

## 📝 Usage Examples

### Register a Student
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "rollNumber": "CSE001",
    "password": "password123",
    "department": "Computer Science",
    "semester": 6,
    "phone": "9876543210"
  }'
```

### Submit Feedback
```bash
curl -X POST http://localhost:5000/api/feedback \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "subject": "Course Content Review",
    "feedbackType": "academic",
    "description": "The course curriculum is well-structured...",
    "rating": 5,
    "teacher": "Dr. Smith",
    "tags": ["excellent", "interactive"]
  }'
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Verify MongoDB Atlas URI is correct
- Check if IP whitelist includes your current IP
- Ensure database name is correct in URI

### CORS Error
- Make sure backend is running on port 5000
- Check FRONTEND_URL in backend .env file
- Verify axios base URL in frontend api.js

### Token Expired
- Logout and login again
- Token expires after 7 days by default
- Modify JWT expiration in authController.js if needed

### Frontend won't start
- Delete node_modules and reinstall: `npm install`
- Clear npm cache: `npm cache clean --force`
- Check Node.js version compatibility

## 🚀 Deployment

### Deploying Backend (Heroku)
1. Create Heroku account
2. Install Heroku CLI
3. Run `heroku create app-name`
4. Set environment variables: `heroku config:set MONGODB_ATLAS_URI=...`
5. Deploy: `git push heroku main`

### Deploying Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Connect GitHub repo to Vercel/Netlify
3. Deploy with automatic preview builds

## 📚 Learning Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [JWT Authentication](https://jwt.io/)
- [REST API Best Practices](https://restfulapi.net/)

## 🤝 Contributing

Feel free to fork and submit pull requests for improvements!

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Happy Coding! 🎉**
