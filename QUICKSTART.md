# Quick Start Guide

## 5-Minute Setup

### Step 1: MongoDB Atlas Setup (2 minutes)
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free tier available)
3. Create a cluster
4. Note your connection string: `mongodb+srv://username:password@cluster-name.mongodb.net/database-name`

### Step 2: Backend Start (1.5 minutes)
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and paste your MongoDB URI
npm run dev
```
✅ Backend running on http://localhost:5000

### Step 3: Frontend Start (1.5 minutes)
```bash
cd frontend
npm install
npm start
```
✅ Frontend running on http://localhost:3000

## Test the Application

### 1. Register a New User
- Click "Register" tab
- Fill in all fields:
  - Name: John Doe
  - Email: john@example.com
  - Roll Number: CSE001
  - Password: Password@123
  - Department: Computer Science
  - Semester: 6
- Click Register

### 2. Login
- Email: john@example.com
- Password: Password@123

### 3. Submit Feedback
- Go to "Submit Feedback" tab
- Fill in:
  - Subject: "Great teaching method"
  - Type: Academic
  - Description: "The teaching methodology is excellent and well-structured..."
  - Rating: 5
- Submit

### 4. View Dashboard
- Click "Dashboard" to see statistics

### 5. View Feedback
- Click "View Feedback" to see all submissions
- Click "Show Details" to expand and read

## Useful Commands

### Backend
```bash
cd backend
npm install          # Install dependencies
npm run dev          # Start with nodemon
npm start            # Start production
```

### Frontend
```bash
cd frontend
npm install          # Install dependencies
npm start            # Start development server
npm run build        # Build for production
npm test             # Run tests
```

## Default Users to Test With

After registration, you can create multiple test accounts:
- Email: student1@example.com (Roll: STU001)
- Email: student2@example.com (Roll: STU002)
- Email: teacher1@example.com (Roll: TCH001)

## Important Notes

1. **JWT Token**: Stored in localStorage as 'token'
2. **Token Expiry**: 7 days (can be modified in authController.js)
3. **Password**: Minimum 6 characters
4. **Anonymous Feedback**: Can be submitted anonymously for sensitive topics
5. **Database**: Data persists in MongoDB Atlas

## File Organization

```
Backend Structure:
├── models/         - Database schemas
├── controllers/    - Business logic
├── routes/         - API endpoints
├── middleware/     - Authentication, validation
└── server.js      - Main server file

Frontend Structure:
├── components/     - Reusable React components
├── pages/          - Page-level components
├── services/       - API calls & state management
├── styles/         - CSS files
└── App.js          - Main app component
```

## Features Included

✅ User Authentication (Register/Login)
✅ Student Profile Management
✅ Feedback Submission with Multiple Types
✅ Feedback Review & Filtering
✅ Comment System for Collaboration
✅ Anonymous Feedback Option
✅ Dashboard with Statistics
✅ Rating System (1-5 stars)
✅ Tags for Organization
✅ Responsive Design
✅ Error Handling
✅ Loading States

## Next Steps

1. **Customize**: Modify colors in CSS files
2. **Add Features**: Implement search, file uploads, etc.
3. **Deploy**: Use Heroku (backend) + Vercel (frontend)
4. **Database**: Add indexes for better performance
5. **Security**: Implement rate limiting and input validation

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Cannot connect to MongoDB | Check MongoDB URI in .env |
| CORS Error | Verify FRONTEND_URL in backend .env |
| Port already in use | Change PORT in .env or kill existing process |
| Token not working | Clear browser localStorage and re-login |
| Dependencies missing | Run `npm install` in both folders |

## Support

For detailed information, see README.md in the root directory.
