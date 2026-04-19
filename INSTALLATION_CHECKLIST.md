# Installation Checklist

Complete this checklist to ensure your Student Feedback System is properly set up.

## Prerequisites ✓

- [ ] Node.js v14+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Git installed (`git --version`)
- [ ] MongoDB Atlas account created
- [ ] MongoDB cluster created and connection string obtained

## MongoDB Setup ✓

- [ ] Create MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
- [ ] Create a free cluster
- [ ] Create database user with credentials
- [ ] Whitelist your IP address (or 0.0.0.0 for development)
- [ ] Get connection string (MongoDB+srv format)
- [ ] Test connection string works

## Backend Setup ✓

- [ ] Navigate to `backend` directory
- [ ] Run `npm install`
- [ ] Create `.env` file from `.env.example`
- [ ] Add MongoDB connection string to `.env`
- [ ] Add JWT_SECRET to `.env`
- [ ] Verify all environment variables are set
- [ ] Run `npm run dev` and check for errors
- [ ] Confirm backend server starts on port 5000
- [ ] Test API endpoint: `curl http://localhost:5000/api`

## Frontend Setup ✓

- [ ] Navigate to `frontend` directory (new terminal)
- [ ] Run `npm install`
- [ ] Create `.env` file from `.env.example`
- [ ] Set `REACT_APP_API_URL=http://localhost:5000`
- [ ] Run `npm start`
- [ ] Confirm frontend opens in browser (http://localhost:3000)
- [ ] Check browser console for errors

## Testing ✓

### User Registration
- [ ] Navigate to http://localhost:3000
- [ ] Click "Register" tab
- [ ] Fill in all required fields
- [ ] Submit registration form
- [ ] Verify successful registration message
- [ ] Check user is logged in (name shows in navbar)

### User Login
- [ ] Logout from current user
- [ ] Click "Login" tab
- [ ] Use same credentials from registration
- [ ] Verify successful login
- [ ] Verify user information displays correctly

### Feedback Submission
- [ ] Click "Submit Feedback" tab
- [ ] Fill in feedback form:
  - [ ] Subject: Non-empty
  - [ ] Description: At least 10 characters
  - [ ] Type: Select valid type
  - [ ] Rating: Valid number 1-5
- [ ] Submit feedback
- [ ] Verify success message appears

### Dashboard
- [ ] Click "Dashboard" tab
- [ ] Verify statistics display:
  - [ ] Total Feedback count
  - [ ] Average Rating
  - [ ] Feedback by Status breakdown
  - [ ] Feedback by Type breakdown

### Feedback List
- [ ] Click "View Feedback" tab
- [ ] Verify feedbacks load and display
- [ ] Test status filter
- [ ] Test type filter
- [ ] Click "Show Details" on a feedback
- [ ] Verify comment section shows

### Multiple Users
- [ ] Create at least 2-3 different user accounts
- [ ] Submit feedback from different accounts
- [ ] Verify all feedbacks appear in the list
- [ ] Test filtering with multiple feedbacks

## Database Verification ✓

- [ ] Go to MongoDB Atlas dashboard
- [ ] Navigate to your cluster collections
- [ ] Verify `students` collection exists with documents
- [ ] Verify `feedbacks` collection exists with documents
- [ ] Verify data structure matches database schema

## Port Verification ✓

- [ ] Backend running on: http://localhost:5000
  - [ ] Test: `curl http://localhost:5000/api` returns JSON response
- [ ] Frontend running on: http://localhost:3000
  - [ ] Opens without CORS errors
  - [ ] Can navigate between pages

## API Testing (Optional - Advanced) ✓

- [ ] Test registration endpoint: `POST /api/auth/register`
- [ ] Test login endpoint: `POST /api/auth/login`
- [ ] Test create feedback: `POST /api/feedback` (with token)
- [ ] Test get all feedback: `GET /api/feedback`
- [ ] Test get statistics: `GET /api/feedback/stats`

## Error Handling ✓

- [ ] Test invalid login credentials
- [ ] Verify error message displayed
- [ ] Test required field validation
- [ ] Verify error messages appear for missing fields
- [ ] Test feedback submission with empty fields
- [ ] Verify validation messages display

## Browser DevTools ✓

- [ ] Open Browser DevTools (F12)
- [ ] Check Console tab for errors
- [ ] Check Network tab for API calls
- [ ] Verify token is stored in localStorage
- [ ] No critical warnings or errors should appear

## Documentation ✓

- [ ] Read `README.md` for overview
- [ ] Review `QUICKSTART.md` for quick reference
- [ ] Check `API_DOCUMENTATION.md` for endpoints
- [ ] Understand project structure

## Optional Enhancements ✓

- [ ] Setup `.gitignore` for version control
- [ ] Prepare environment files for production
- [ ] Consider adding database backups
- [ ] Plan for deployment strategy
- [ ] Add email notifications (future)
- [ ] Implement file upload for attachments (future)

## Production Preparation ✓

- [ ] Change JWT_SECRET to secure value
- [ ] Set NODE_ENV to production
- [ ] Enable HTTPS
- [ ] Configure CORS for production domain
- [ ] Add rate limiting
- [ ] Implement logging
- [ ] Add monitoring and analytics
- [ ] Backup MongoDB regularly

## Deployment Readiness ✓

- [ ] Backend code reviewed
- [ ] Frontend optimized (build tested)
- [ ] Database backups configured
- [ ] Environment variables documented
- [ ] Security best practices implemented
- [ ] Performance tested
- [ ] Mobile responsiveness verified
- [ ] All documentation updated

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| `Cannot connect to MongoDB` | Check connection string in .env, IP whitelist |
| `CORS error in browser` | Verify backend CORS config, frontend API URL |
| `Port 3000/5000 already in use` | Kill process or change port in .env |
| `Module not found` | Delete node_modules, run npm install again |
| `Token invalid/expired` | Clear localStorage, logout and re-login |
| `Blank page on frontend` | Check browser console for errors, verify backend running |

## Getting Help

If you encounter issues:
1. Check browser console (F12) for error messages
2. Check backend terminal for server errors
3. Review API_DOCUMENTATION.md for correct endpoint usage
4. Verify .env files have correct values
5. Ensure MongoDB cluster is active and running

## Final Verification

Before considering setup complete:

```bash
# Terminal 1 - Backend
cd backend
npm run dev
# Should show: "Server is running on port 5000"
# Should show: "MongoDB Atlas connected successfully"

# Terminal 2 - Frontend
cd frontend
npm start
# Should show: "Compiled successfully!"
# Should open http://localhost:3000 in browser
```

✅ **Setup Complete!** Your Student Feedback System is ready to use.

---

**Next Steps:**
1. Customize colors and branding
2. Add additional features (file upload, email, SMS, etc.)
3. Deploy to production
4. Set up monitoring and analytics
5. Create backup and disaster recovery plan
