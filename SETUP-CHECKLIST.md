# Setup Checklist for FitTrack

Use this checklist to ensure you have everything configured correctly.

## Prerequisites ✓

- [ ] Node.js 18 or higher installed
- [ ] npm or yarn package manager installed
- [ ] Code editor (VS Code recommended)
- [ ] Git installed (optional)

## Step 1: MongoDB Atlas Setup ✓

- [ ] Created account at https://www.mongodb.com/cloud/atlas
- [ ] Created a free M0 cluster
- [ ] Created database user with username and password
- [ ] Added IP address to whitelist (or used 0.0.0.0/0 for development)
- [ ] Obtained connection string from "Connect → Connect your application"
- [ ] Connection string looks like: `mongodb+srv://username:password@cluster.mongodb.net/...`

## Step 2: Environment Variables ✓

- [ ] Created `.env.local` file in project root
- [ ] Added MONGODB_URI with your connection string
- [ ] Generated NEXTAUTH_SECRET using: `openssl rand -base64 32`
- [ ] Added NEXTAUTH_URL as `http://localhost:3000`
- [ ] Set NODE_ENV to `development`

Example `.env.local`:
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/fittrack?retryWrites=true&w=majority
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-here
NODE_ENV=development
```

## Step 3: Installation ✓

- [ ] Opened terminal in project directory
- [ ] Ran `npm install --legacy-peer-deps`
- [ ] All dependencies installed successfully
- [ ] No critical errors in installation

## Step 4: Run the Application ✓

- [ ] Ran `npm run dev`
- [ ] Server started on http://localhost:3000
- [ ] No error messages in terminal
- [ ] Can access the landing page

## Step 5: Test Core Features ✓

### Registration
- [ ] Clicked "Get Started" or "Sign Up"
- [ ] Entered email and password
- [ ] Completed profile information
- [ ] Successfully created account
- [ ] Redirected to login page

### Login
- [ ] Entered email and password
- [ ] Successfully logged in
- [ ] Redirected to dashboard
- [ ] Can see dashboard with welcome message

### Workout Logging
- [ ] Navigated to Workouts → New Workout
- [ ] Filled in workout details
- [ ] Added at least one exercise
- [ ] Successfully saved workout
- [ ] Can see workout in workout list

### Health Metrics
- [ ] Navigated to Health Metrics → Log Metrics
- [ ] Entered some health data (e.g., weight, sleep)
- [ ] Successfully saved metrics
- [ ] Can see metrics in metrics list

### Reports
- [ ] Navigated to Reports
- [ ] Can see summary statistics
- [ ] Charts display correctly (if data exists)
- [ ] Can change time period filter

### Profile
- [ ] Navigated to Profile
- [ ] Updated profile information
- [ ] Successfully saved changes
- [ ] BMI calculates correctly (if height and weight entered)

### Logout
- [ ] Clicked Sign Out
- [ ] Successfully logged out
- [ ] Redirected to login page
- [ ] Cannot access dashboard without logging in

## Common Issues & Solutions 🔧

### Database Connection Issues
- [ ] Verified MongoDB URI is correct
- [ ] Checked IP whitelist in MongoDB Atlas
- [ ] Ensured database user has correct permissions
- [ ] Restarted development server

### Authentication Issues
- [ ] Verified NEXTAUTH_SECRET is set
- [ ] Checked NEXTAUTH_URL matches your localhost
- [ ] Cleared browser cookies
- [ ] Tried incognito/private browsing mode

### Build/Runtime Errors
- [ ] Deleted `.next` folder
- [ ] Deleted `node_modules` folder
- [ ] Ran `npm install --legacy-peer-deps` again
- [ ] Restarted development server

### Port Already in Use
- [ ] Killed process on port 3000
- [ ] Or changed port: `npm run dev -- -p 3001`

## Development Best Practices ✓

- [ ] Created a `.gitignore` file (already included)
- [ ] Never commit `.env.local` to version control
- [ ] Keep dependencies updated
- [ ] Test features after making changes
- [ ] Use browser DevTools for debugging

## Deployment Checklist (When Ready) 🚀

### Vercel Deployment
- [ ] Pushed code to GitHub repository
- [ ] Created account on Vercel
- [ ] Imported GitHub repository
- [ ] Added environment variables in Vercel settings:
  - [ ] MONGODB_URI
  - [ ] NEXTAUTH_URL (production URL)
  - [ ] NEXTAUTH_SECRET
  - [ ] NODE_ENV=production
- [ ] Deployed successfully
- [ ] Tested production site
- [ ] Updated MongoDB Atlas IP whitelist for production

## Security Checklist 🔐

- [ ] `.env.local` not committed to git
- [ ] Strong NEXTAUTH_SECRET generated
- [ ] MongoDB connection string kept secret
- [ ] Database user has minimal required permissions
- [ ] Production environment variables set correctly
- [ ] HTTPS enabled in production (automatic with Vercel)

## Performance Checklist ⚡

- [ ] Images optimized (if you add custom images)
- [ ] MongoDB indexes are in place (already configured in models)
- [ ] No console errors in production
- [ ] Page load times are reasonable
- [ ] Charts render smoothly

## Troubleshooting Contacts 📞

If you're stuck:
1. Check browser console (F12 → Console tab)
2. Check terminal for error messages
3. Review MongoDB Atlas logs
4. Check Network tab for API errors
5. Verify all environment variables are set

## Success Criteria ✅

You've successfully set up FitTrack when:
- ✅ You can register a new account
- ✅ You can log in with credentials
- ✅ You can create and view workouts
- ✅ You can log and view health metrics
- ✅ You can see charts in the reports section
- ✅ You can update your profile
- ✅ You can log out and log back in
- ✅ All pages load without errors
- ✅ Data persists after page refresh
- ✅ No console errors during normal use

## Next Steps After Setup 🎯

1. **Customize the app:**
   - Modify colors in Tailwind config
   - Add your own branding
   - Customize workout types or metrics

2. **Add features:**
   - Workout templates
   - Exercise library
   - Goal tracking
   - Progress photos

3. **Share your app:**
   - Deploy to Vercel
   - Share with friends
   - Get feedback

4. **Learn more:**
   - Next.js documentation
   - MongoDB best practices
   - TypeScript patterns
   - React hooks

---

**Congratulations! You're ready to start tracking your fitness journey! 💪**
