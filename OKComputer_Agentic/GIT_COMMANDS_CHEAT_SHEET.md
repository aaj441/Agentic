# Git Commands Cheat Sheet

## 🚀 **Quick Git Reference for Your WCAG Pipeline**

This cheat sheet provides all the Git commands you'll need to manage your WCAG Pipeline repository on GitHub.

## 📋 **Essential Git Commands**

### **Initial Setup**
```bash
# Initialize Git repository
git init

# Configure user information
git config --global user.name "Your GitHub Username"
git config --global user.email "your-email@example.com"

# Check Git status
git status
```

### **Adding Files**
```bash
# Add specific file
git add filename.html

# Add all files
git add .

# Add all files with specific extension
git add *.js
git add *.html
git add *.css

# Check what will be committed
git status
```

### **Committing Changes**
```bash
# Commit with message
git commit -m "Add PDF export functionality"

# Commit with detailed message
git commit -m "feat: Add professional PDF reports

- Multi-page PDF generation with jsPDF
- Industry-specific content and layouts
- Executive summary and remediation plans
- Legal references and cost estimates"

# Amend last commit (if you forgot something)
git commit --amend -m "Updated commit message"
```

### **Connecting to GitHub**
```bash
# Add GitHub as remote origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Verify remote
git remote -v

# Push to GitHub (first time)
git push -u origin main

# Push changes (after first time)
git push origin main
```

### **Working with Branches**
```bash
# Create new branch
git branch feature-name

# Switch to branch
git checkout feature-name

# Create and switch to branch in one command
git checkout -b feature-name

# List all branches
git branch -a

# Merge branch into main
git checkout main
git merge feature-name

# Delete branch after merge
git branch -d feature-name
```

### **Viewing History**
```bash
# View commit history
git log

# View commit history (one line per commit)
git log --oneline

# View changes in specific commit
git show commit-hash

# View changes in working directory
git diff

# View changes in staging area
git diff --staged
```

### **Undoing Changes**
```bash
# Undo changes in working directory
git checkout -- filename.html

# Undo all changes in working directory
git checkout -- .

# Remove file from staging area
git reset HEAD filename.html

# Undo last commit (keep changes)
git reset HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

### **Working with Remotes**
```bash
# List remote repositories
git remote -v

# Add additional remote
git remote add staging https://github.com/YOUR_USERNAME/wcag-pipeline-staging.git

# Remove remote
git remote remove origin

# Rename remote
git remote rename origin production

# Fetch changes from remote
git fetch origin

# Pull changes from remote
git pull origin main
```

### **Advanced Commands**
```bash
# Stash changes (temporarily save)
git stash

# Apply stashed changes
git stash pop

# List stashes
git stash list

# Cherry-pick specific commit
git cherry-pick commit-hash

# Rebase branch
git rebase main

# Tag a release
git tag -a v1.0.0 -m "Version 1.0.0 release"
git push origin v1.0.0
```

## 🚀 **Deployment Commands**

### **Railway Deployment**
```bash
# Install Railway CLI (optional)
npm i -g @railway/cli

# Login to Railway
railway login

# Link to Railway project
railway link

# Deploy to Railway
railway up

# Check deployment status
railway status
```

### **Vercel Deployment**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to Vercel
vercel --prod

# Check deployment logs
vercel logs
```

## 📝 **Commit Message Best Practices**

### **Format**
```
<type>: <subject>

<body>

<footer>
```

### **Types**
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or modifying tests
- **chore**: Maintenance tasks

### **Examples**
```bash
# Feature
git commit -m "feat: Add PDF export functionality

- Multi-page PDF generation with jsPDF
- Industry-specific content and layouts
- Executive summary and remediation plans"

# Bug fix
git commit -m "fix: Resolve keyword targeting issue

- Music keyword now shows music industry sites
- Added industry-specific violation types
- Enhanced site selection logic"

# Documentation
git commit -m "docs: Update deployment instructions

- Added Railway deployment guide
- Updated environment variables section
- Added troubleshooting tips"

# Refactor
git commit -m "refactor: Improve code organization

- Separated concerns into modules
- Added error handling
- Improved performance"
```

## 🔧 **Troubleshooting**

### **Common Issues**

#### **Authentication Problems**
```bash
# If push fails with authentication error
# Use personal access token instead of password
# Go to GitHub Settings → Developer settings → Personal access tokens

# Or use SSH instead of HTTPS
git remote set-url origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
```

#### **Merge Conflicts**
```bash
# When you have merge conflicts
git status  # See conflicting files
# Edit files to resolve conflicts
git add .   # Stage resolved files
git commit  # Complete the merge
```

#### **Large Files**
```bash
# If you accidentally committed large files
git rm --cached large-file.zip
git commit -m "Remove large file"
# Add to .gitignore to prevent future commits
```

#### **Wrong Branch**
```bash
# If you committed to wrong branch
git checkout correct-branch
git cherry-pick commit-hash
git checkout wrong-branch
git reset HEAD~1 --hard
```

## 📊 **Git Workflow for Your Project**

### **Daily Development Workflow**
```bash
# Start of day - pull latest changes
git pull origin main

# Make changes to files
# Edit index.html, main.js, etc.

# Check what changed
git status
git diff

# Add changes to staging
git add .

# Commit with descriptive message
git commit -m "feat: Add new feature"

# Push to GitHub
git push origin main
```

### **Feature Development Workflow**
```bash
# Create feature branch
git checkout -b feature/pdf-export

# Make changes and commit
git add .
git commit -m "feat: Add PDF export functionality"

# Push feature branch
git push origin feature/pdf-export

# Create pull request on GitHub
# Merge after review
git checkout main
git pull origin main
```

### **Release Workflow**
```bash
# Create release branch
git checkout -b release/v1.0.0

# Final testing and bug fixes
git add .
git commit -m "fix: Final bug fixes for v1.0.0"

# Merge to main
git checkout main
git merge release/v1.0.0

# Tag the release
git tag -a v1.0.0 -m "Version 1.0.0 release"
git push origin main --tags
```

## 🎯 **Quick Reference Card**

### **Most Used Commands**
```bash
git status          # Check current status
git add .           # Add all files
git commit -m ""    # Commit with message
git push            # Push to remote
git pull            # Pull from remote
git log --oneline   # View commit history
```

### **Emergency Commands**
```bash
git checkout -- .   # Discard all changes
git reset HEAD~1    # Undo last commit
git stash           # Temporarily save changes
git reflog          # View all actions (recovery)
```

## 🚀 **Deployment Commands**

### **Railway (Recommended)**
```bash
# Deploy to Railway (automatic on push)
git push origin main

# Manual deployment (if needed)
railway up
```

### **Vercel**
```bash
# Deploy to Vercel (automatic on push)
git push origin main

# Manual deployment
vercel --prod
```

---

## 💡 **Pro Tips**

1. **Commit Often**: Small, frequent commits are better than large ones
2. **Write Good Messages**: Clear, descriptive commit messages help everyone
3. **Test Before Commit**: Make sure your code works before committing
4. **Use Branches**: For features, experiments, and releases
5. **Keep It Clean**: Don't commit sensitive data or large files
6. **Stay Updated**: Regularly pull from main branch
7. **Document Changes**: Update README when adding features

## 🎉 **You're Ready!**

You now have all the Git commands you need to:
- ✅ Manage your WCAG Pipeline repository
- ✅ Deploy to Railway or Vercel
- ✅ Collaborate with other developers
- ✅ Maintain version control
- ✅ Handle any Git situation

**Your WCAG Pipeline is ready for professional development and deployment! 🚀**