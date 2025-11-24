# 🚀 CI/CD Guide for HomelabForge

## Overview

This project uses **GitHub Actions** for continuous integration and deployment. Every push and pull request is automatically tested to ensure quality.

## 📋 What Gets Checked

### 1. **HTML Validation** ✅
- Validates all `.html` files
- Checks semantic HTML5 compliance
- Ensures proper structure and accessibility

### 2. **CSS Validation** 🎨
- Lints CSS with Stylelint
- Checks for syntax errors
- Enforces consistent formatting

### 3. **JavaScript Linting** 📜
- ESLint checks for code quality
- Identifies potential bugs
- Enforces coding standards

### 4. **Link Checking** 🔗
- Scans for broken internal links
- Validates external links (with exclusions)
- Prevents 404 errors

### 5. **Lighthouse Performance** ⚡
- **Performance Score:** Target 90+
- **Accessibility Score:** Target 100
- **Best Practices:** Target 90+
- **SEO:** Target 100

**Core Web Vitals:**
- FCP (First Contentful Paint): < 2.0s
- LCP (Largest Contentful Paint): < 2.5s
- CLS (Cumulative Layout Shift): < 0.1
- TBT (Total Blocking Time): < 300ms

### 6. **Accessibility Audit** ♿
- WCAG AAA compliance testing
- Screen reader compatibility
- Keyboard navigation
- Color contrast validation

### 7. **Security Scan** 🔒
- Trivy vulnerability scanner
- Checks for security issues
- Uploads results to GitHub Security tab

### 8. **SEO Validation** 🔍
- Verifies `robots.txt` exists
- Validates `sitemap.xml` structure
- Checks meta tags (description, OG, canonical)
- Ensures proper indexing

### 9. **File Size Monitoring** 📊
- HTML: Max 100KB per file
- CSS: Max 50KB per file
- JS: Max 30KB per file
- Warnings for large files

---

## 🔧 Workflow Triggers

### Automatic Triggers:
- **Push to `main`:** Runs CI + Deploy
- **Push to `develop`:** Runs CI only
- **Pull Requests to `main`:** Runs full CI suite

### Manual Trigger:
```bash
# From GitHub UI: Actions → Deploy to GitHub Pages → Run workflow
```

---

## 🌿 Branching Strategy (Recommended)

### Current Setup (Single Branch)
You're currently working directly on `main`. This works for solo projects, but here's a better approach:

### Recommended Setup (Gitflow Lite)

```
main (production)
  ↓
develop (staging)
  ↓
feature/xyz (your work)
```

#### 1. **`main` branch:**
   - Always deployable
   - Protected (require PR reviews)
   - Auto-deploys to production

#### 2. **`develop` branch:**
   - Integration branch
   - For testing before production
   - Runs CI on every push

#### 3. **Feature branches:**
   - Create from `develop`
   - Name format: `feature/add-blog-section`
   - Delete after merge

---

## 📝 Git Workflow Examples

### Setup (First Time)

```bash
# Create and switch to develop branch
git checkout -b develop

# Push develop to remote
git push -u origin develop
```

### Working on a New Feature

```bash
# 1. Start from develop
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/add-consulting-page

# 3. Make changes
# ... edit files ...

# 4. Commit changes
git add .
git commit -m "Add consulting services page with pricing"

# 5. Push feature branch
git push -u origin feature/add-consulting-page

# 6. Create Pull Request on GitHub
# Go to: https://github.com/your-repo/pulls → New Pull Request
# Base: develop ← Compare: feature/add-consulting-page
```

### Merging to Production

```bash
# When develop is tested and ready:
# Create PR: develop → main

# After merge to main, GitHub Actions auto-deploys
```

---

## 🛠️ Local Testing Before Push

### 1. **Test HTML Locally**

```bash
# Install validator
npm install -g html-validate

# Validate files
html-validate index.html books/*.html
```

### 2. **Lint CSS**

```bash
# Install stylelint
npm install -g stylelint stylelint-config-standard

# Create config
cat > .stylelintrc.json << 'EOF'
{
  "extends": "stylelint-config-standard"
}
EOF

# Lint files
stylelint assets/css/*.css
```

### 3. **Lint JavaScript**

```bash
# Install ESLint
npm install -g eslint

# Lint files
eslint assets/js/*.js
```

### 4. **Run Local Server**

```bash
# Option 1: Python
python3 -m http.server 8000

# Option 2: Node.js
npx http-server -p 8000

# Open http://localhost:8000
```

### 5. **Test Lighthouse Locally**

```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run audit
lhci autorun --config=.github/lighthouserc.json
```

---

## 🔒 Protecting `main` Branch

### GitHub Settings Configuration:

1. Go to **Settings** → **Branches**
2. Add branch protection rule for `main`:

#### Required Settings:
- ✅ **Require pull request before merging**
- ✅ **Require status checks to pass before merging**
  - Select: `validate-html`, `validate-css`, `lighthouse`, etc.
- ✅ **Require conversation resolution before merging**
- ✅ **Do not allow bypassing the above settings**

#### Optional (for teams):
- ✅ **Require approvals** (1+ reviewers)
- ✅ **Dismiss stale pull request approvals**
- ✅ **Require review from Code Owners**

---

## 📊 Viewing CI/CD Results

### 1. **GitHub Actions Tab**
- Go to **Actions** tab in your repo
- See all workflow runs
- Click on run to see details

### 2. **Pull Request Checks**
- Open any PR
- Scroll down to "Checks" section
- See pass/fail status for each job

### 3. **Lighthouse Reports**
- Available as artifacts in workflow runs
- Download from **Actions** → **Workflow Run** → **Artifacts**

### 4. **Security Alerts**
- Go to **Security** → **Code scanning**
- View Trivy scan results

---

## 🚨 Troubleshooting

### CI Fails: HTML Validation Error

```bash
# Common issue: Missing closing tags
# Fix: Validate locally first
html-validate index.html
```

### CI Fails: Lighthouse Performance < 90

```bash
# Check for:
# - Large images (optimize with WebP)
# - Unminified CSS/JS
# - Render-blocking resources
# - Too many external scripts
```

### CI Fails: Accessibility Score < 100

```bash
# Common issues:
# - Missing alt text on images
# - Insufficient color contrast
# - Missing ARIA labels
# - No skip-to-content link
```

### CI Fails: File Size Too Large

```bash
# Check file sizes
du -h assets/css/*.css assets/js/*.js

# Minify if needed
# CSS: Use cssnano
# JS: Use terser
```

---

## 🎯 Best Practices

### Commit Messages

Use conventional commits format:

```bash
# Format: <type>: <description>

# Examples:
git commit -m "feat: add PAM book landing page"
git commit -m "fix: correct broken link in footer"
git commit -m "docs: update README with deployment instructions"
git commit -m "style: improve mobile responsiveness"
git commit -m "perf: optimize CSS for faster loading"
git commit -m "refactor: extract common styles to variables"
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Formatting, missing semi colons, etc
- `refactor:` - Code restructuring
- `perf:` - Performance improvement
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### Commit Frequency

- ✅ **Small, focused commits** - One logical change per commit
- ✅ **Commit often** - Don't accumulate too many changes
- ❌ **Avoid "WIP" commits** - Finish a logical unit of work first
- ❌ **Don't commit broken code** - Ensure tests pass locally

### Pull Request Best Practices

1. **Keep PRs small** - Easier to review (< 400 lines changed)
2. **Write descriptive titles** - "Add consulting page with pricing"
3. **Add description** - Explain what and why
4. **Link issues** - Use "Closes #123" if fixing an issue
5. **Request reviews** - Tag reviewers explicitly
6. **Respond to feedback** - Address all comments before merging

---

## 📈 Performance Budget

Our targets (monitored by Lighthouse):

| Metric | Target | Critical |
|--------|--------|----------|
| Performance | 90+ | 80+ |
| Accessibility | 100 | 95+ |
| Best Practices | 90+ | 85+ |
| SEO | 100 | 95+ |
| FCP | < 2.0s | < 3.0s |
| LCP | < 2.5s | < 4.0s |
| CLS | < 0.1 | < 0.25 |

If metrics fall below "Target", investigate. If below "Critical", **block the PR**.

---

## 🔄 Continuous Improvement

### Weekly Tasks:
- [ ] Review failed CI runs
- [ ] Check Lighthouse trends
- [ ] Monitor Core Web Vitals in Search Console
- [ ] Review security alerts

### Monthly Tasks:
- [ ] Update dependencies (if using npm)
- [ ] Review and update CI config
- [ ] Optimize assets (compress images, minify code)
- [ ] Review and improve accessibility

### Quarterly Tasks:
- [ ] Comprehensive Lighthouse audit
- [ ] Security audit (manual review)
- [ ] Performance optimization sprint
- [ ] Update documentation

---

## 🆘 Getting Help

### CI/CD Issues:
1. Check workflow logs in **Actions** tab
2. Look for red ❌ indicators
3. Read error messages carefully
4. Google the error + "GitHub Actions"

### Need to Skip CI? (Emergency Only)
```bash
# Add [skip ci] to commit message
git commit -m "docs: minor typo fix [skip ci]"

# ⚠️ Use sparingly! CI is there to protect you.
```

---

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Lighthouse CI Guide](https://github.com/GoogleChrome/lighthouse-ci)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Gitflow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

---

**Last Updated:** 2025-01-24
**Maintained by:** Miguel Alpañez
