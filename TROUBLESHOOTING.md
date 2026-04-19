# Troubleshooting Guide

## Common Issues & Solutions

### Installation Issues

#### 1. npm install fails
**Error**: `npm ERR! code ERESOLVE unable to resolve dependency tree`

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules
rm package-lock.json

# Reinstall
npm install
```

#### 2. Node version incompatibility
**Error**: `npm ERR! engine incompatible`

**Solution**:
```bash
# Check Node version
node --version

# Install correct version (need v14+)
# Download from https://nodejs.org/

# Verify after install
node --version
npm --version
```

#### 3. Permission denied errors
**Error**: `npm ERR! code EACCES`

**Solution** (Mac/Linux):
```bash
sudo chown -R $USER ~/.npm
sudo chown -R $USER /usr/local/lib/node_modules
```

---

### MongoDB Connection Issues

#### 1. Cannot connect to MongoDB Atlas
**Error**: `MongoServerSelectionError: connect ENOTFOUND`

**Checklist**:
- [ ] Connection string copied correctly
- [ ] Username and password correct
- [ ] Database name included
- [ ] IP whitelist includes your IP (0.0.0.0/0 for dev)
- [ ] Cluster status is "RUNNING"
- [ ] Network connectivity is working

**Solution**:
```javascript
// Test connection with this code
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_ATLAS_URI)
  .then(() => console.log('✅ Connected'))
  .catch(err => console.error('❌', err.message));
```

#### 2. Authentication failed
**Error**: `MongoAuthenticationError: authentication failed`

**Causes**:
- Wrong username or password
- Special characters not URL-encoded
- User doesn't exist in Database Access
- Database user has no permissions

**Solution**:
- Go to MongoDB Atlas > Database Access
- Verify user exists
- Reset password if needed
- Check permissions: "readWriteAnyDatabase"

#### 3. IP not whitelisted
**Error**: `ECONNREFUSED or ETIMEDOUT`

**Solution**:
1. Go to MongoDB Atlas
2. Network Access > Add IP Address
3. Add your IP or 0.0.0.0/0 (dev only)
4. Click "Confirm"
5. Wait 2-3 minutes for update
6. Retry connection

---

### Backend Issues

#### 1. Server won't start
**Error**: `Error: listen EADDRINUSE :::5000`

**Cause**: Port 5000 already in use

**Solution**:
```bash
# Option 1: Kill process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9

# Option 2: Change port in .env
PORT=5001
```

#### 2. JWT Secret not set
**Error**: `Error: JWT_SECRET environment variable not set`

**Solution**:
```bash
# Edit .env file
JWT_SECRET=your_secret_key_here_minimum_16_chars_long
```

#### 3. CORS errors
**Error**: `Access to XMLHttpRequest has been blocked by CORS policy`

**Causes**:
- Frontend URL not in CORS whitelist
- Backend not running
- CORS middleware not configured

**Solution**:
```javascript
// Check server.js CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

Also verify in .env:
```
FRONTEND_URL=http://localhost:3000
```

#### 4. Middleware not working
**Error**: `Cannot read property of undefined` or `next is not a function`

**Solution**: Check middleware syntax in server.js:
```javascript
// Correct order:
app.use(express.json());
app.use(cors(options));
app.use('/api/auth', authRoutes);
```

---

### Frontend Issues

#### 1. Port 3000 already in use
**Error**: `Something is already running on port 3000`

**Solution**:
```bash
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

#### 2. Cannot find module
**Error**: `Cannot find module 'react-router-dom'`

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### 3. API calls return 404
**Error**: `TypeError: feedbackService.getAllFeedback is not a function`

**Causes**:
- Backend not running
- API base URL incorrect
- Endpoint path wrong

**Solution**:
```javascript
// Check api.js baseURL
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  // ...
});
```

#### 4. Blank white page
**Error**: Browser shows blank page, no console errors

**Solution**:
```bash
# Clear React cache
rm -rf node_modules/.cache

# Reinstall
npm install

# Restart
npm start
```

#### 5. Token not persisting
**Error**: Logged out after page refresh

**Solution**: Check authContext.js:
```javascript
// Should save token in localStorage
localStorage.setItem('token', token);

// Should retrieve on app load
const token = localStorage.getItem('token');
```

---

### Authentication Issues

#### 1. Login fails but no error message
**Error**: Login button does nothing

**Solution**:
```bash
# Check browser console (F12) for errors
# Verify backend is running
# Test login endpoint manually:
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

#### 2. Token expires immediately
**Error**: "Not authorized" message after action

**Cause**: JWT expiration too short

**Solution**: Edit authController.js:
```javascript
// Change expiration from '7d' to '30d'
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  expiresIn: '30d'  // Changed from '7d'
});
```

#### 3. Password not hashing
**Error**: Plain text passwords in database

**Solution**: Ensure bcryptjs is installed:
```bash
npm install bcryptjs
```

Check Student.js pre-save hook:
```javascript
studentSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
```

---

### Data Issues

#### 1. No data appears in feedback list
**Error**: Empty feedback list even after submission

**Solutions**:
```javascript
// 1. Check database has data
// MongoDB Atlas > Collections > feedbacks

// 2. Verify query endpoint works
curl http://localhost:5000/api/feedback

// 3. Check browser Network tab
// Look for 200 status response

// 4. Verify pagination limit
// Default is 10, try increasing
```

#### 2. Comments not saving
**Error**: Comment added but doesn't appear

**Solution**:
```javascript
// Check feedbackController.js addComment() method
// Verify population of comments:
await feedback.populate('comments.userId', 'name email');
```

#### 3. Delete feedback doesn't work
**Error**: Feedback still appears after delete

**Solution**:
```javascript
// Verify delete endpoint returns success
// Manually test:
curl -X DELETE http://localhost:5000/api/feedback/<id> \
  -H "Authorization: Bearer TOKEN"

// Check MongoDB - document should be gone
```

---

### Performance Issues

#### 1. Slow database queries
**Problem**: Feedback list loads slowly

**Solution**:
```javascript
// Add database indexes in Feedback.js
feedbackSchema.index({ student: 1, createdAt: -1 });
feedbackSchema.index({ status: 1 });
feedbackSchema.index({ feedbackType: 1 });
```

#### 2. Frontend slow to load
**Problem**: Lots of lag, slow interaction

**Solution**:
```bash
# Build optimized version
npm run build

# Check bundle size
# Run production build and serve with static server
npx serve -s build
```

#### 3. Memory leaks
**Problem**: App crashes after using for a while

**Solution**:
```javascript
// Add cleanup in useEffect
useEffect(() => {
  fetchData();
  
  return () => {
    // Cleanup here
  };
}, [dependencies]);
```

---

### Environment Issues

#### 1. .env file not loading
**Error**: `jwt_secret` is undefined

**Solution**:
```bash
# Check .env exists
ls -la .env

# Verify dotenv import
// In server.js, must be at TOP:
require('dotenv').config();

# Restart server after changing .env
```

#### 2. Environment variables null in frontend
**Error**: API URL is `http://localhost:undefined`

**Solution**:
```javascript
// React env vars must start with REACT_APP_
// In .env:
REACT_APP_API_URL=http://localhost:5000

// Access with:
console.log(process.env.REACT_APP_API_URL);
```

#### 3. Production config issues
**Error**: Works in dev, fails in production

**Solution**:
- Update FRONTEND_URL in production .env
- Update API URL in frontend
- Enable HTTPS
- Configure CORS for production domain

---

### Deployment Issues

#### 1. Heroku deployment fails
**Error**: Application error logs

**Solution**:
```bash
# Check logs
heroku logs --tail

# Verify environment variables
heroku config

# Set if missing
heroku config:set MONGODB_ATLAS_URI=mongodb+srv://...
```

#### 2. Vercel deployment fails
**Error**: Build fails, deployment canceled

**Solution**:
```bash
# Check build logs in Vercel dashboard
# Common causes:
# - Missing environment variables
# - Incorrect import paths
# - Node version mismatch
```

---

### Browser Console Errors

#### 1. "Cannot read property 'map' of undefined"
**Cause**: Data not loaded yet, trying to map null

**Solution**:
```javascript
// Add null check
{feedbacks && feedbacks.map(f => (...))}

// Or use optional chaining
{feedbacks?.map(f => (...))}
```

#### 2. "Warning: Each child in a list should have a key prop"
**Cause**: Missing key in map

**Solution**:
```javascript
// Correct:
feedbacks.map(f => <div key={f._id}>{...}</div>)

// Wrong:
feedbacks.map((f, index) => <div key={index}>{...}</div>)
```

#### 3. "undefined is not an object"
**Cause**: Accessing property of undefined

**Solution**:
```javascript
// Add checks:
user?.name instead of user.name
feedback?.student?.name instead of feedback.student.name
```

---

### API Testing

#### Test with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John","email":"john@test.com","password":"test123",
    "rollNumber":"001","department":"CS","semester":4
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"test123"}'

# Protected endpoint (with token)
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Debugging Tips

### 1. Enable Verbose Logging
```javascript
// In server.js
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}
```

### 2. Check Network Tab
- Open browser DevTools (F12)
- Go to Network tab
- Perform action
- Check request headers and response

### 3. MongoDB Query Logging
```javascript
// In server.js
mongoose.set('debug', process.env.NODE_ENV === 'development');
```

### 4. Console Logging
```javascript
// Add strategic console.logs
console.log('About to call API...');
console.log('Response:', data);
console.log('Error:', error.message);
```

---

## When All Else Fails

1. **Restart Everything**
   ```bash
   # Kill backend
   # Kill frontend
   # Delete node_modules in both
   # npm install in both
   # npm run dev
   # npm start
   ```

2. **Clear Caches**
   ```bash
   npm cache clean --force
   rm -rf ~/.npm
   rm -rf node_modules/.cache
   ```

3. **Reset Database**
   - Go to MongoDB Atlas
   - Drop database
   - Application will auto-create new one

4. **Clear Browser Data**
   - Clear localStorage
   - Clear cookies
   - Clear cache
   - Hard refresh (Ctrl+Shift+R)

5. **Check Firewall**
   - Ensure ports 3000, 5000 not blocked
   - Disable firewall temporarily for testing

---

## Getting Help

1. **Check Documentation**
   - README.md
   - API_DOCUMENTATION.md
   - PROJECT_STRUCTURE.md

2. **Search Error Message**
   - Google the error
   - Check Stack Overflow
   - Check GitHub issues

3. **Check Logs**
   - Backend terminal output
   - Browser console (F12)
   - Network tab
   - MongoDB Atlas logs

4. **Test Endpoints**
   - Use Postman or cURL
   - Test backend independently
   - Verify API responses

5. **Verify Setup**
   - Review INSTALLATION_CHECKLIST.md
   - Double-check .env files
   - Verify all dependencies installed

---

## Performance & Optimization

### Backend Optimization
```javascript
// Add database indexes
// Use pagination
// Cache frequent queries
// Compress responses
```

### Frontend Optimization
```javascript
// Code splitting
// Lazy loading
// Memoization
// Image optimization
```

---

## Security Checklist

- [ ] JWT_SECRET is strong and random
- [ ] Passwords are hashed
- [ ] CORS only allows trusted domains
- [ ] Input validation implemented
- [ ] Rate limiting considered
- [ ] HTTPS enabled in production

---

**If problem persists after trying these solutions, check:**
1. All .env variables are correct
2. Ports are not blocked by firewall
3. MongoDB Atlas cluster is in "RUNNING" state
4. All dependencies are installed correctly
5. Node.js version is 14 or higher
6. No syntax errors in code (ESLint)

---

**Need help?** Review the full documentation files included in the project.
