# Project Structure & File Guide

## Complete Directory Tree

```
student-feedback-system/
│
├── backend/                          # Express.js Backend
│   ├── models/
│   │   ├── Student.js               # Student database schema & methods
│   │   └── Feedback.js              # Feedback database schema
│   │
│   ├── controllers/
│   │   ├── authController.js        # Auth logic (register, login)
│   │   ├── studentController.js     # Student CRUD operations
│   │   └── feedbackController.js    # Feedback CRUD & analytics
│   │
│   ├── routes/
│   │   ├── authRoutes.js            # Auth endpoints (/api/auth/*)
│   │   ├── studentRoutes.js         # Student endpoints (/api/students/*)
│   │   └── feedbackRoutes.js        # Feedback endpoints (/api/feedback/*)
│   │
│   ├── middleware/
│   │   └── auth.js                  # JWT verification middleware
│   │
│   ├── server.js                    # Main server file & Express setup
│   ├── package.json                 # Backend dependencies
│   ├── .env                         # Environment variables (don't commit)
│   ├── .env.example                 # Example env variables
│   └── .gitignore                   # Git ignore rules
│
├── frontend/                         # React.js Frontend
│   ├── public/
│   │   └── index.html               # HTML entry point
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js             # Login form component
│   │   │   ├── Register.js          # Registration form component
│   │   │   ├── FeedbackForm.js      # Feedback submission component
│   │   │   ├── FeedbackList.js      # Feedback list with filters
│   │   │   ├── Dashboard.js         # Statistics dashboard
│   │   │   └── Navbar.js            # Navigation bar
│   │   │
│   │   ├── pages/
│   │   │   ├── AuthPage.js          # Auth page wrapper
│   │   │   └── Home.js              # Home/dashboard page
│   │   │
│   │   ├── services/
│   │   │   ├── api.js               # Axios API configuration
│   │   │   └── authContext.js       # Auth state management
│   │   │
│   │   ├── styles/
│   │   │   ├── index.css            # Global styles
│   │   │   ├── App.css              # App component styles
│   │   │   ├── Navbar.css           # Navigation styles
│   │   │   ├── Auth.css             # Auth pages styles
│   │   │   ├── Home.css             # Home page styles
│   │   │   ├── Feedback.css         # Feedback component styles
│   │   │   └── Dashboard.css        # Dashboard styles
│   │   │
│   │   ├── App.js                   # Main app component & routing
│   │   └── index.js                 # React entry point
│   │
│   ├── package.json                 # Frontend dependencies
│   ├── .env                         # Environment variables
│   ├── .env.example                 # Example env variables
│   └── .gitignore                   # Git ignore rules
│
├── README.md                         # Main documentation
├── QUICKSTART.md                     # Quick setup guide
├── API_DOCUMENTATION.md              # Detailed API reference
├── INSTALLATION_CHECKLIST.md         # Setup verification checklist
├── PROJECT_STRUCTURE.md              # This file
└── .gitignore                        # Root level git ignore
```

## File Descriptions

### Backend Files

#### Models (`/backend/models/`)

**Student.js**
- Defines student user schema
- Password hashing with bcryptjs
- Password matching method for authentication
- Fields: name, email, rollNumber, password, department, semester, phone, isTeacher

**Feedback.js**
- Defines feedback document schema
- Relationships with Student model
- Comments sub-document array
- Indexes for performance
- Status enum: pending, in-review, resolved, closed
- Type enum: academic, behavioral, performance, general

#### Controllers (`/backend/controllers/`)

**authController.js**
- `register()` - Create new student account with JWT token
- `login()` - Authenticate and generate JWT token
- `getCurrentUser()` - Fetch authenticated user details

**studentController.js**
- `getAllStudents()` - List all students with pagination
- `getStudentById()` - Fetch specific student
- `updateStudent()` - Edit student profile
- `deleteStudent()` - Remove student account
- `getStudentsByDepartment()` - Filter students by department

**feedbackController.js**
- `createFeedback()` - Submit new feedback
- `getAllFeedback()` - List feedback with filters
- `getFeedbackById()` - Get specific feedback with comments
- `getUserFeedback()` - Get current user's feedback
- `updateFeedback()` - Edit feedback
- `deleteFeedback()` - Remove feedback
- `addComment()` - Add comment to feedback
- `getFeedbackStats()` - Get analytics and statistics

#### Routes (`/backend/routes/`)

**authRoutes.js**
- POST `/api/auth/register` - Register
- POST `/api/auth/login` - Login
- GET `/api/auth/me` - Get current user (protected)

**studentRoutes.js**
- GET `/api/students` - List all
- GET `/api/students/:id` - Get by ID
- PUT `/api/students/:id` - Update (protected)
- DELETE `/api/students/:id` - Delete (protected)
- GET `/api/students/department/:department` - Filter by dept

**feedbackRoutes.js**
- POST `/api/feedback` - Create (protected)
- GET `/api/feedback` - List all
- GET `/api/feedback/:id` - Get by ID
- GET `/api/feedback/user/my-feedback` - User's feedback (protected)
- PUT `/api/feedback/:id` - Update (protected)
- DELETE `/api/feedback/:id` - Delete (protected)
- POST `/api/feedback/:id/comment` - Add comment (protected)
- GET `/api/feedback/stats` - Statistics

#### Middleware (`/backend/middleware/`)

**auth.js**
- `protect()` - Verify JWT token and extract user ID
- `authorize()` - Role-based access control (not fully implemented)

#### Server Files

**server.js**
- Express app initialization
- MongoDB connection setup
- CORS configuration
- Middleware setup
- Route imports
- Error handling
- Server startup on port 5000

**package.json**
- Dependencies: express, mongoose, jwt, bcryptjs, dotenv, cors
- Dev dependencies: nodemon
- Scripts: start (production), dev (with nodemon)

### Frontend Files

#### Components (`/src/components/`)

**Login.js**
- Email and password form
- Error handling
- Loading state
- Calls authService.login()

**Register.js**
- Multi-field registration form
- Student info collection
- Department and semester selection
- Password validation
- Calls authService.register()

**FeedbackForm.js**
- Subject, type, description fields
- Rating 1-5 slider
- Teacher name (optional)
- Tags input (comma-separated)
- Anonymous checkbox
- Calls feedbackService.createFeedback()

**FeedbackList.js**
- Displays all feedback in cards
- Filter by status and type
- Expandable details view
- Shows comments
- Pagination ready
- Uses feedbackService.getAllFeedback()

**Dashboard.js**
- Statistics cards
- Total feedback count
- Average rating
- Breakdown by status
- Breakdown by type
- Calls feedbackService.getFeedbackStats()

**Navbar.js**
- Branding and title
- Current user display
- Logout button
- Dark theme styling

#### Pages (`/src/pages/`)

**AuthPage.js**
- Toggle between Login and Register
- Handles auth success redirect
- Wrapper for auth components

**Home.js**
- Tab navigation (Dashboard, Submit, View)
- Content switching based on active tab
- Refresh trigger after feedback submission
- Main authenticated user interface

#### Services (`/src/services/`)

**api.js**
- Axios instance with base URL
- Request interceptor to add authorization
- authService methods
- studentService methods
- feedbackService methods
- All API endpoints exported

**authContext.js**
- React Context for authentication state
- AuthProvider wrapper component
- useAuth hook for consuming auth context
- register(), login(), logout() methods
- Token and user state management
- LocalStorage integration

#### Styles (`/src/styles/`)

**index.css**
- Global styles
- Root element styling
- Theme colors
- Button and input defaults

**App.css**
- App layout structure
- Flex column layout

**Navbar.css**
- Navigation bar styling
- Gradient background
- User info display
- Logout button styling

**Auth.css**
- Auth page gradient background
- Toggle button styling
- Auth card styling
- Form input styling
- Error message styling

**Home.css**
- Home page layout
- Tab navigation styling
- Tab content container
- Header gradient background

**Feedback.css**
- Feedback form styling
- Feedback card styling
- Filter controls
- Comment section styling
- Tag styling
- Status color coding

**Dashboard.css**
- Statistics grid layout
- Stat cards with gradients
- Stat list styling
- Hover effects

#### Main Files

**App.js**
- BrowserRouter setup
- Routes configuration
- PrivateRoute protection
- Authentication check
- Main app structure

**index.js**
- React app entry point
- ReactDOM rendering
- Root element mounting

**index.html**
- HTML entry point
- Meta tags and title
- Root div for React mounting

**package.json**
- React, ReactDOM dependencies
- Axios for API calls
- React Router for navigation
- Dependencies and scripts

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────┐
│              Frontend (React)                       │
│                                                     │
│  ┌────────────────────────────────────────────┐   │
│  │  App.js (Router)                           │   │
│  │  ├── AuthPage (Login/Register)             │   │
│  │  └── Home (Dashboard/Feedback)             │   │
│  └────────────────────────────────────────────┘   │
│         ↓ ↑ (API calls via axios)                  │
│  ┌────────────────────────────────────────────┐   │
│  │  services/                                 │   │
│  │  ├── api.js (Axios instance)              │   │
│  │  └── authContext.js (State management)    │   │
│  └────────────────────────────────────────────┘   │
│         ↓ ↑ (HTTP requests/responses)              │
└─────────────────────────────────────────────────────┘
                     ↕ HTTP/JSON
┌─────────────────────────────────────────────────────┐
│            Backend (Express.js)                     │
│                                                     │
│  ┌────────────────────────────────────────────┐   │
│  │  server.js                                 │   │
│  │  ├── Routes                                │   │
│  │  │   ├── authRoutes                       │   │
│  │  │   ├── studentRoutes                    │   │
│  │  │   └── feedbackRoutes                   │   │
│  │  ├── Middleware (auth, error handling)    │   │
│  │  └── Database (MongoDB)                   │   │
│  └────────────────────────────────────────────┘   │
│         ↓ ↑ (Business logic)                       │
│  ┌────────────────────────────────────────────┐   │
│  │  controllers/                              │   │
│  │  ├── authController                       │   │
│  │  ├── studentController                    │   │
│  │  └── feedbackController                   │   │
│  └────────────────────────────────────────────┘   │
│         ↓ ↑ (Schema & validation)                  │
│  ┌────────────────────────────────────────────┐   │
│  │  models/                                   │   │
│  │  ├── Student.js (Schema)                  │   │
│  │  └── Feedback.js (Schema)                 │   │
│  └────────────────────────────────────────────┘   │
│         ↓ ↑ (MongoDB operations)                   │
└─────────────────────────────────────────────────────┘
                     ↕ Mongoose
┌─────────────────────────────────────────────────────┐
│         MongoDB Atlas (Cloud Database)              │
│                                                     │
│  Collections:                                       │
│  ├── students                                       │
│  └── feedbacks                                      │
│      └── comments (embedded)                        │
└─────────────────────────────────────────────────────┘
```

## Authentication Flow

```
1. User visits /
2. Register or Login form displays
3. Submit credentials → authService.register() or login()
4. Backend: POST /api/auth/register or /api/auth/login
5. Backend validates and creates JWT token
6. Frontend receives token → localStorage.token
7. Token added to future requests via axios interceptor
8. User redirected to /home
9. Navbar shows user name
10. Protected routes accessible
11. User can logout → token removed
12. Redirect to login page
```

## Component Reusability

- **Navbar**: Used on all protected routes
- **FeedbackForm**: Standalone component, callable from Home
- **FeedbackList**: Standalone, with props for refresh trigger
- **Dashboard**: Standalone statistics component
- **Login/Register**: Interchangeable via toggle on AuthPage

## Styling Strategy

- CSS Grid for responsive layouts
- Flexbox for component alignment  
- Gradient backgrounds for modern look
- Color scheme: Purple (#667eea) as primary
- Status colors: Green (resolved), Orange (pending), Blue (in-review), Gray (closed)
- Mobile-first responsive design

## Environment Variables

### Backend (.env)
```
MONGODB_ATLAS_URI=mongodb+srv://...
PORT=5000
JWT_SECRET=your_secret_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

## Key Dependencies

### Backend
- **express**: Web framework
- **mongoose**: MongoDB ORM
- **jsonwebtoken**: JWT token generation
- **bcryptjs**: Password hashing
- **cors**: Cross-origin support
- **dotenv**: Environment variables

### Frontend
- **react**: UI library
- **react-dom**: DOM rendering
- **axios**: HTTP client
- **react-router-dom**: Client-side routing

## Scaling Considerations

### Future Enhancements
1. Email notifications
2. File upload for attachments
3. Advanced search with Elasticsearch
4. Real-time updates with Socket.io
5. SMS notifications
6. Two-factor authentication
7. Role-based access control (RBAC)
8. Audit logging
9. Data export (PDF/Excel)
10. Admin dashboard

### Performance Optimizations
1. Add database indexes
2. Implement caching (Redis)
3. Code splitting in React
4. API rate limiting
5. Query optimization
6. CDN for static assets
7. Database replication
8. Load balancing

### Security Improvements
1. HTTPS enforcement
2. CSRF protection
3. Input validation & sanitization
4. SQL injection prevention
5. Rate limiting
6. API key authentication
7. OAuth2 integration
8. Data encryption at rest

---

This project is well-structured and ready for expansion. Each file has a clear purpose and responsibility, following the MVC architecture pattern for the backend and component-based architecture for the frontend.
