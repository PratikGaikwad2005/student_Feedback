# MongoDB Atlas Setup Guide

Complete step-by-step guide to setting up MongoDB Atlas for the Student Feedback System.

## Step 1: Create MongoDB Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Start Free"
3. Sign up with:
   - Email
   - Password (strong password recommended)
   - Agree to terms
4. Verify email address
5. Log in to MongoDB Atlas

## Step 2: Create Organization & Project

1. After login, you'll see Default Organization
2. Click "Create New Project" button
3. Name your project: "Student Feedback System"
4. Click "Next"
5. Click "Create Project"

## Step 3: Create Cluster

1. In the project, click "Create Deployment"
2. Select "Build a Database"
3. Choose cluster type: **M0 (Free tier)**
4. Select provider: AWS (or preferred cloud)
5. Select region: Choose closest to your location
6. Cluster name: "student-feedback-cluster"
7. Click "Create Deployment"
8. Wait for cluster to be created (2-3 minutes)

### ⚠️ Important: Network Access

During cluster creation:
1. Set Database User:
   - Username: `admin`
   - Password: Create strong password (save this!)
   - Click "Create User"

2. Add IP Address:
   - Option A: Add current IP (click "Add My Current IP")
   - Option B: Allow all IPs (0.0.0.0/0) for development
   - Click "Finish and Close"

## Step 4: Get Connection String

1. In cluster dashboard, click "Connect" button
2. Choose connection method: "Drivers"
3. Select Driver: "Node.js"
4. Select Version: 4.x or higher
5. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

## Step 5: Update Connection String

Replace placeholders in the string:
```
Original:
mongodb+srv://admin:<password>@cluster-name.mongodb.net/?retryWrites=true&w=majority

Replace with your values:
mongodb+srv://admin:YourPassword123@student-feedback-cluster.mongodb.net/student-feedback?retryWrites=true&w=majority
```

Parameters:
- `admin` = your database username
- `YourPassword123` = your database password
- `student-feedback-cluster` = your cluster name
- `student-feedback` = database name (auto-created)

## Step 6: Whitelist Your IP

1. In MongoDB Atlas, go to "Network Access"
2. Click "Add IP Address"
3. Options:
   - Development: Add current IP
   - Production: Add specific IP address
   - Testing: 0.0.0.0/0 (allows all - not secure)
4. Click "Confirm"

## Step 7: Test Connection

### Using MongoDB Atlas Web Interface

1. Go to "Databases"
2. Click your cluster name
3. Click "Collections" tab
4. Should show "No Data"

### Using Command Line (mongosh)

1. Install MongoDB Shell: https://www.mongodb.com/try/download/shell
2. In your cluster, click "Connect"
3. Choose "Shell"
4. Copy the connection command
5. Paste in terminal/CMD
6. Enter your password
7. Connected! Type `exit` to quit

### Using Node.js in Backend

The backend server will automatically test connection on startup:
```
npm run dev
```
Look for: `"MongoDB Atlas connected successfully"`

## Step 8: Create Database User (if needed)

If you need additional database users:

1. Go to "Database Access"
2. Click "Add New Database User"
3. Authentication Method: "Password"
4. Username: (choose name)
5. Password: (enter strong password)
6. Built-in Role: "readWriteAnyDatabase"
7. Click "Add User"

## Step 9: Enable Additional Features (Optional)

### Backup
1. Go to "Backup" (under Deployment)
2. Toggle "Backup enabled"
3. Frequency: "Hourly"
4. Retention: "7 days"

### Monitoring
1. Go to "Monitoring"
2. View performance metrics
3. Set up alerts for thresholds

### Alerts
1. Go to "Alert Settings"
2. Click "Create Alert"
3. Set triggers for:
   - Cluster down
   - High CPU usage
   - Replication lag

## Step 10: Verify Connection String Format

Your final connection string should be:

```mongodb
mongodb+srv://admin:password@cluster-name.mongodb.net/database-name?retryWrites=true&w=majority
```

## Common Connection Issues

### Issue: "Authentication failed"
- Check username and password are correct
- Ensure special characters are URL-encoded
- Verify user exists in Database Access section

### Issue: "Connect ETIMEDOUT"
- Check IP whitelist includes your IP
- Verify cluster is in "Running" state
- Check internet connection
- Try from different network if on corporate VPN

### Issue: "Database not found"
- Database auto-creates on first write
- Submit feedback from app to create it
- Or use MongoDB Atlas web interface

### Issue: "Connection string format invalid"
- Use full connection string with protocol `mongodb+srv://`
- Include database name at end
- Include query parameters `?retryWrites=true&w=majority`

## Backend .env Configuration

Once you have your connection string:

```bash
# .env file in backend/
MONGODB_ATLAS_URI=mongodb+srv://admin:YourPassword@student-feedback-cluster.mongodb.net/student-feedback?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your_secret_key_here_minimum_16_chars
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Testing MongoDB Connection

Create a test file `testConnection.js` in backend:

```javascript
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected Successfully!'))
.catch(err => console.error('❌ Connection Error:', err));
```

Run it:
```bash
node testConnection.js
```

## Data in MongoDB Atlas

After running the app and submitting feedback:

1. Go to Atlas Dashboard
2. Click your cluster
3. Go to "Collections"
4. You'll see:
   - `students` collection
   - `feedbacks` collection
5. Click on collection to view documents
6. Each document shows all fields in JSON format

## Sample Document Structures

### Student Document
```json
{
  "_id": ObjectId("..."),
  "name": "John Doe",
  "email": "john@example.com",
  "rollNumber": "CSE001",
  "password": "$2a$10$...(hashed)",
  "department": "Computer Science",
  "semester": 6,
  "phone": "9876543210",
  "isTeacher": false,
  "createdAt": ISODate("2024-01-15T..."),
  "updatedAt": ISODate("2024-01-15T...")
}
```

### Feedback Document
```json
{
  "_id": ObjectId("..."),
  "student": ObjectId("..."),
  "subject": "Great Course",
  "feedbackType": "academic",
  "description": "The course content is excellent...",
  "rating": 5,
  "teacher": "Dr. Smith",
  "status": "pending",
  "isAnonymous": false,
  "tags": ["excellent", "interactive"],
  "comments": [
    {
      "_id": ObjectId("..."),
      "userId": ObjectId("..."),
      "name": "Admin",
      "comment": "Thank you for feedback",
      "createdAt": ISODate("...")
    }
  ],
  "createdAt": ISODate("2024-01-15T..."),
  "updatedAt": ISODate("2024-01-15T...")
}
```

## Best Practices

### Development
- ✅ Use free M0 tier for development
- ✅ Allow all IPs (0.0.0.0/0) for development
- ✅ Store passwords in .env file
- ✅ Test connection before deploying backend
- ✅ Keep backups enabled

### Production
- ❌ Don't use M0 tier (upgrade to M10+)
- ❌ Don't allow all IPs (whitelist specific IPs)
- ❌ Use strong, randomly generated passwords
- ❌ Enable encryption at rest
- ❌ Enable authentication (already done)
- ✅ Enable daily backups
- ✅ Set up monitoring alerts
- ✅ Use read replicas for availability

## Useful MongoDB Atlas Commands

### View all databases
```javascript
db.getMongo().getDBNames()
```

### Switch to student-feedback database
```javascript
use student-feedback
```

### Count documents
```javascript
db.students.countDocuments()
db.feedbacks.countDocuments()
```

### View all collections
```javascript
show collections
```

### Sample queries
```javascript
// Find all students
db.students.find()

// Find specific student
db.students.findOne({ email: "john@example.com" })

// Count pending feedback
db.feedbacks.countDocuments({ status: "pending" })

// Find high-rated feedback
db.feedbacks.find({ rating: { $gte: 4 } })
```

## Accessing MongoDB Atlas Dashboard

1. Log in to MongoDB Atlas
2. Select Project
3. Select Cluster
4. Available tabs:
   - **Overview**: Cluster status and info
   - **Collections**: View/edit data
   - **Metrics**: Performance monitoring
   - **Logs**: Server logs
   - **Backup**: Backup management
   - **More**: Additional settings

## Billing

### Free Tier (M0)
- ✅ Free forever
- ✅ 512 MB storage
- ✅ Shared RAM
- ✅ Basic support
- ❌ No backup
- ❌ No VPC

### Paid Tiers Start at M10
- ✅ $57/month (M10)
- ✅ Dedicated resources
- ✅ Advanced features
- ✅ Priority support
- ✅ Backups included

## Security Checklist

- [ ] Create strong database password
- [ ] Whitelist only necessary IPs
- [ ] Enable backup
- [ ] Create database user (not admin)
- [ ] Use HTTPS for connections
- [ ] Rotate passwords periodically
- [ ] Enable IP whitelist
- [ ] Set up alerts
- [ ] Monitor access logs
- [ ] Use VPC (production)

## Next Steps

1. ✅ MongoDB Atlas account created
2. ✅ Cluster deployed
3. ✅ Connection string obtained
4. ✅ IP whitelist configured
5. ✅ Add to backend .env file
6. ✅ Test connection
7. ✅ Start backend server
8. ✅ Start frontend
9. ✅ Submit test feedback
10. ✅ View data in Atlas

---

**You're ready to go!** Your MongoDB Atlas is configured and ready for the Student Feedback System.
