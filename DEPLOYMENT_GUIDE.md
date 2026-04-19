# Deployment Guide

Complete guide to deploying the Student Feedback System to production.

---

## Deployment Architecture

```
┌─────────────────────────────────────┐
│        Frontend (React)              │
│  Deployed on Vercel / Netlify       │
│  (Static hosting)                    │
└────────────────────┬────────────────┘
                     │
                     ↓ HTTPS
┌─────────────────────────────────────┐
│        Backend (Express.js)          │
│  Deployed on Heroku / Render        │
│  (Dynamic hosting)                   │
└────────────────────┬────────────────┘
                     │
                     ↓ MongoDB Driver
┌─────────────────────────────────────┐
│  MongoDB Atlas (Cloud Database)      │
│  (Managed database service)          │
└─────────────────────────────────────┘
```

---

## Part 1: Backend Deployment (Heroku)

### Prerequisites
- Heroku account (free at https://www.heroku.com)
- Heroku CLI installed
- Git installed
- Backend code ready

### Step-by-Step

#### 1. Create Heroku App

```bash
# Install Heroku CLI if not already installed
# https://devcenter.heroku.com/articles/heroku-cli

# Login to Heroku
heroku login

# Create new app
heroku create your-app-name-feedback

# Verify app created
heroku apps
```

#### 2. Configure Environment Variables

```bash
# Add MongoDB URI
heroku config:set MONGODB_ATLAS_URI=mongodb+srv://...

# Add JWT Secret (generate strong one)
heroku config:set JWT_SECRET=your_random_secret_hash_here

# Add Node environment
heroku config:set NODE_ENV=production

# Add frontend URL
heroku config:set FRONTEND_URL=https://your-frontend-domain.com

# Verify variables set
heroku config
```

#### 3. Deploy Code

```bash
# Navigate to backend directory
cd backend

# Initialize git if not already done
git init

# Add Heroku as remote
heroku git:remote -a your-app-name-feedback

# Add files and commit
git add .
git commit -m "Initial commit for production"

# Deploy to Heroku
git push heroku main

# View logs
heroku logs --tail
```

#### 4. Verify Deployment

```bash
# Check app status
heroku ps

# Test API endpoint
curl https://your-app-name-feedback.herokuapp.com/api/feedback

# Should return JSON response
```

#### 5. Enable Add-ons (Optional)

```bash
# Add logging
heroku addons:create papertrail

# Add monitoring
heroku addons:create newrelic

# View add-ons
heroku addons
```

---

## Part 2: Frontend Deployment (Vercel)

### Prerequisites
- Vercel account (free at https://vercel.com)
- GitHub account (recommended)
- Frontend code ready

### Option A: Deploy from GitHub (Recommended)

#### 1. Push to GitHub

```bash
# Initialize git in frontend folder
cd frontend
git init

# Add files
git add .
git commit -m "Initial commit"

# Create repo on GitHub
# Then:
git remote add origin https://github.com/username/repo-name.git
git branch -M main
git push -u origin main
```

#### 2. Connect to Vercel

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select "Import Git Repository"
4. Paste your GitHub repo URL
5. Click "Continue"
6. Click "Deploy"
7. Wait for deployment (2-3 minutes)

#### 3. Configure Environment Variables

1. In Vercel dashboard, go to your project
2. Settings → Environment Variables
3. Add:
   ```
   REACT_APP_API_URL=https://your-backend-url.herokuapp.com
   ```
4. Redeploy: Deployments → Redeploy

#### 4. Update Backend CORS

In backend .env on Heroku:
```
FRONTEND_URL=https://your-frontend-url.vercel.app
```

Then redeploy backend:
```bash
git push heroku main
```

### Option B: Deploy from Command Line

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd frontend
vercel

# Follow prompts
```

---

## Part 3: Alternative Hosting Options

### Backend Alternatives

#### Render (Good alternative to Heroku)
1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repo
4. Set environment variables
5. Deploy

#### Railway
1. Go to https://railway.app
2. Create new project
3. Select GitHub repo
4. Set environment variables
5. Deploy

#### DigitalOcean
1. Go to https://www.digitalocean.com
2. Create App Platform
3. Deploy from GitHub
4. Configure environment
5. Deploy

### Frontend Alternatives

#### Netlify
1. Go to https://www.netlify.com
2. "New site from Git"
3. Select GitHub repo
4. Build command: `npm run build`
5. Publish directory: `build`
6. Deploy

#### GitHub Pages
```bash
# Add to package.json
"homepage": "https://username.github.io/repo-name"

# Deploy
npm run build
gh-pages -d build
```

---

## Production Checklist

### Code Preparation
- [ ] Remove console.log statements
- [ ] Remove test/debug code
- [ ] Check for hardcoded credentials
- [ ] Review all API calls
- [ ] Test all features
- [ ] Performance check
- [ ] Security review

### Environment Configuration
- [ ] All .env variables set
- [ ] JWT_SECRET is strong (20+ chars, random)
- [ ] NODE_ENV set to "production"
- [ ] FRONTEND_URL correct
- [ ] Database credentials secure
- [ ] No sensitive data in code

### Database
- [ ] MongoDB Atlas IP whitelist updated
- [ ] Database backup enabled
- [ ] Indexes created
- [ ] Database user has limited permissions
- [ ] Encryption at rest enabled
- [ ] VPC peering configured (optional)

### Security
- [ ] HTTPS enforced
- [ ] CORS configured for specific domain
- [ ] Rate limiting implemented
- [ ] Input validation active
- [ ] Error messages don't leak info
- [ ] No sensitive headers exposed
- [ ] Logs don't contain secrets

### Testing
- [ ] Load test completed
- [ ] User acceptance testing done
- [ ] Integration testing passed
- [ ] Security audit performed
- [ ] Browser compatibility checked
- [ ] Mobile responsiveness verified
- [ ] Error handling tested

### Monitoring
- [ ] Error tracking set up (Sentry)
- [ ] Performance monitoring enabled
- [ ] Logging configured
- [ ] Alerts set up for failures
- [ ] Uptime monitoring enabled
- [ ] Database monitoring active

### Documentation
- [ ] Deployment instructions documented
- [ ] Environment variables documented
- [ ] Rollback procedures documented
- [ ] API documentation updated
- [ ] Known issues listed
- [ ] Support contacts available

---

## Production Configuration

### Backend Production .env

```
MONGODB_ATLAS_URI=mongodb+srv://prod-user:SecurePass123@cluster.mongodb.net/student-feedback-prod?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=GeneratedRandomStringWith30CharactersMinimumLength
NODE_ENV=production
FRONTEND_URL=https://your-production-domain.com
LOG_LEVEL=info
```

### Frontend Production .env

```
REACT_APP_API_URL=https://your-backend-production-url.com
REACT_APP_ENV=production
```

---

## Deployment Workflow

### Continuous Deployment (Recommended)

```
Local Development
       ↓
Git Push to GitHub
       ↓
GitHub Webhook → Vercel/Heroku
       ↓
Automated Tests Run
       ↓
Build Created
       ↓
Deploy to Production
       ↓
Smoke Tests
       ↓
Monitor Logs
```

### Manual Deployment

```
Test Locally
    ↓
Commit Changes
    ↓
Push to GitHub
    ↓
Manually trigger deployment
    ↓
Verify logs
    ↓
Test production
```

---

## Post-Deployment

### Day 1 Checklist
- [ ] Test all features in production
- [ ] Monitor error logs
- [ ] Check database connectivity
- [ ] Verify email notifications (if added)
- [ ] Test payment (if applicable)
- [ ] Check performance metrics
- [ ] Verify backups running

### Week 1 Checklist
- [ ] Monitor user feedback
- [ ] Check error rates
- [ ] Review performance metrics
- [ ] Test disaster recovery
- [ ] Update documentation
- [ ] Plan follow-up improvements
- [ ] Schedule maintenance window

### Monthly Checklist
- [ ] Review logs for errors
- [ ] Update dependencies
- [ ] Test backup/restore
- [ ] Review security
- [ ] Optimize slow queries
- [ ] Update documentation
- [ ] Plan next features

---

## Monitoring & Maintenance

### Essential Monitoring

1. **Application Monitoring**
   - Sentry for error tracking
   - New Relic for performance
   - DataDog for infrastructure

2. **Database Monitoring**
   - MongoDB Atlas built-in monitoring
   - Query performance analysis
   - Storage consumption

3. **Uptime Monitoring**
   - Pingdom for uptime
   - StatusPage for status page
   - Alert services

### Log Analysis

```bash
# View Heroku logs
heroku logs --tail

# Filter by type
heroku logs --tail -p web
heroku logs --tail -p router

# Search logs
heroku logs --tail | grep "error"
```

---

## Scaling Considerations

### When to Scale

- Database exceeds memory limits
- API response times slow (>200ms)
- High error rates
- High traffic peaks

### Scaling Options

1. **Database**
   - Upgrade MongoDB tier
   - Add read replicas
   - Sharding (horizontal)

2. **Backend**
   - Upgrade dyno type (Heroku)
   - Add multiple instances
   - Load balancing

3. **Frontend**
   - CDN caching
   - Code splitting
   - Compression

---

## Rollback Procedures

### If Deployment Fails

```bash
# Heroku rollback
heroku releases
heroku rollback v123

# Vercel rollback
# Manual: Go to Deployments → Select previous → Promote to Production

# Manual rollback from GitHub
git revert <commit-hash>
git push heroku main
```

### Database Rollback

- Use MongoDB Atlas backup
- Select backup point
- Start automated restore
- Verify data integrity
- Test application

---

## Disaster Recovery

### Backup Strategy

1. **Database**
   - Daily automated backups
   - 30-day retention
   - Test restore monthly

2. **Code**
   - GitHub repositories
   - Release tags
   - Commit history

3. **Configuration**
   - Document all settings
   - Store in .env template
   - Version control

### Recovery Procedures

1. **Data Loss**
   - Restore from latest backup
   - Verify integrity
   - Test with users

2. **Service Down**
   - Switch to failover
   - Check logs for cause
   - Restart services
   - Monitor recovery

3. **Security Breach**
   - Revoke credentials
   - Reset passwords
   - Audit logs
   - Patch vulnerability
   - Notify users

---

## Cost Optimization

### Free Tier Options

- **Backend**: Render (Free tier), Railway (free credits)
- **Frontend**: Vercel (Free tier), Netlify (Free tier)
- **Database**: MongoDB Atlas (Free M0 tier)
- **Monitoring**: Heroku Logs (free), Sentry (free tier)

### Budget Estimates

| Service | Free | Paid | Notes |
|---------|------|------|-------|
| MongoDB | $0 | $57+/mo | Free 512MB sufficient |
| Backend | $0 | $7+/mo | Free dyno vs Paid ($7) |
| Frontend | $0 | $0 | Usually completely free |
| Domain | $10/yr | - | Optional but recommended |
| **Total** | $0 | $70+/mo | Can stay free indefinitely |

---

## SSL/HTTPS Setup

### Automatic (Recommended)

- Vercel: Automatic SSL
- Heroku: Automatic with custom domain
- Render: Automatic SSL

### Custom Domain

1. **Register domain** (GoDaddy, Namecheap, etc.)
2. **Update DNS records** to point to hosting
3. **Wait for propagation** (24-48 hours)
4. **Enable SSL** in hosting dashboard
5. **Test** with https://www.ssllabs.com

---

## Performance Optimization for Production

### Frontend
```javascript
// Lazy load components
const Dashboard = lazy(() => import('./Dashboard'));

// Code splitting
import { Suspense } from 'react';

// Preload critical assets
<link rel="preload" href="./critical.js" />

// Enable compression
// (automatic on most hosting)
```

### Backend
```javascript
// Enable response compression
const compression = require('compression');
app.use(compression());

// Add caching headers
app.set('cache control', 'public, max-age=3600');

// Database query optimization
// Use indexes
// Pagination
// Lean queries for read-only
```

---

## Monitoring Tools

### Free Options
- Sentry: Error tracking
- Uptime.com: Uptime monitoring
- Google Analytics: User analytics
- CloudFlare: CDN (free tier)

### Paid Options
- New Relic: Full-stack monitoring
- DataDog: Infrastructure monitoring
- Sumologic: Log analytics
- PagerDuty: Incident management

---

## Support & Maintenance

### SLA Targets

- **Uptime**: 99.5% (43 minutes downtime/month)
- **Response Time**: <500ms p95
- **Error Rate**: <0.1%

### Maintenance Windows

```
Schedule: Sunday 2:00-4:00 AM UTC
Duration: 2 hours
Frequency: Monthly
Notification: Email 7 days before
```

### On-Call Support

- 24/7 monitoring
- Auto-restart on failure
- Alert on critical errors
- Incident response plan

---

## Summary

Deployment steps:
1. ✅ Prepare code for production
2. ✅ Set up MongoDB Atlas
3. ✅ Deploy backend to Heroku
4. ✅ Deploy frontend to Vercel
5. ✅ Configure environments
6. ✅ Test all features
7. ✅ Set up monitoring
8. ✅ Document procedures
9. ✅ Plan maintenance
10. ✅ Launch!

---

**Estimated Deployment Time**: 1-2 hours
**Cost**: $0-$70/month
**Maintenance**: 2-4 hours/month

**Congratulations! Your app is live! 🚀**
