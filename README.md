# 🔥 HomelabForge

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fhomelabforge.dev)](https://homelabforge.dev)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

Production-ready Terraform modules, Ansible playbooks, and dev containers for homelab and enterprise DevOps.

**🌐 Live Site:** [homelabforge.dev](https://homelabforge.dev)

---

## 🎯 What is HomelabForge?

HomelabForge is a curated collection of open-source DevOps tools and templates designed for:

- **Homelab enthusiasts** building production-grade infrastructure at home
- **DevOps engineers** looking for battle-tested automation
- **System administrators** seeking Infrastructure as Code solutions
- **Students and learners** exploring modern DevOps practices

---

## 🛠️ Featured Projects

### 1. **Infrastructure Dev Containers**
Multi-stack development environments for Ansible, Terraform, Golang, and LaTeX.

- ✅ Signed images with Cosign
- ✅ CI/CD ready with GitHub Actions
- ✅ Zero local setup required

**Repository:** [malpanez/ansible-devcontainer-vscode](https://github.com/malpanez/ansible-devcontainer-vscode)

### 2. **Terraform Cloudflare Module**
Automate DNS, SSL, and security headers for GitHub Pages.

- ⚡ 2 hours of clicks → 5 minutes of code
- 🔒 Production-ready security configurations
- 📦 Terraform Registry ready

**Repository:** [malpanez/terraform-cloudflare-github-pages](https://github.com/malpanez/terraform-cloudflare-github-pages)

### 3. **Advanced PAM Course** (Coming Soon)
Deep-dive course on Linux PAM authentication.

- 📚 Designed for neurodivergent learners
- 🔐 15+ hands-on labs
- 🎯 Enterprise-ready patterns

---

## 🚀 Tech Stack

This website is built with modern web technologies optimized for performance:

- **HTML5** - Semantic markup with accessibility in mind
- **CSS3** - Modern responsive design with CSS variables
- **Vanilla JavaScript** - No frameworks, pure performance
- **PWA** - Progressive Web App capabilities
- **Service Worker** - Offline support and caching
- **GitHub Pages** - Free, fast, reliable hosting

### Performance Optimizations

- ⚡ **Critical CSS inline** - Fast First Contentful Paint
- 🎨 **Deferred CSS loading** - Non-blocking render
- 📦 **Lazy loading** - Images and iframes load on demand
- 🔄 **Service Worker** - Aggressive caching strategy
- 📱 **Mobile-first** - Responsive design from the ground up
- ♿ **A11y focused** - WCAG AAA compliant
- 🧠 **Neurodivergent-friendly** - Clear typography, no distractions

---

## 📊 Performance Scores

Target metrics (test with [PageSpeed Insights](https://pagespeed.web.dev/)):

- **Performance:** 95+ ⚡
- **Accessibility:** 100 ♿
- **Best Practices:** 100 ✅
- **SEO:** 100 🔍

### Core Web Vitals

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

---

## 🧰 Project Structure

```
homelabforge.dev/
├── assets/
│   ├── css/
│   │   └── styles.css          # Main stylesheet (deferred)
│   ├── js/
│   │   └── main.js             # Interactive features
│   ├── img/
│   │   └── logo.svg            # Brand logo
│   └── icons/                  # PWA icons (generated)
├── index.html                  # Main landing page
├── manifest.json               # PWA manifest
├── sw.js                       # Service Worker
├── robots.txt                  # SEO robots file
├── sitemap.xml                 # XML sitemap
├── CNAME                       # Custom domain config
└── README.md                   # This file
```

---

## 🔧 Local Development

### Prerequisites

- A modern web browser
- Python 3 or Node.js (for local server)

### Run Locally

#### Option 1: Python

```bash
# Clone the repository
git clone https://github.com/malpanez/malpanez.github.io-1.git
cd malpanez.github.io-1

# Start local server
python3 -m http.server 8000

# Open http://localhost:8000
```

#### Option 2: Node.js

```bash
# Install http-server globally
npm install -g http-server

# Start server
http-server -p 8000

# Open http://localhost:8000
```

#### Option 3: VS Code Live Server

1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

---

## 🎨 Customization

### Colors

Edit CSS variables in `assets/css/styles.css`:

```css
:root {
    --primary-orange: #FF9900;
    --primary-orange-light: #FFB84D;
    --bg-primary: #0D1117;
    --bg-secondary: #1a1f2e;
}
```

### Content

Edit `index.html` to update:
- Projects
- Skills
- Links
- Contact information

---

## 🚢 Deployment

### GitHub Pages (Automatic)

1. Push to `main` branch
2. GitHub Actions deploys automatically
3. Site live at `homelabforge.dev`

### Manual Deployment

```bash
# Add changes
git add .

# Commit
git commit -m "Update website content"

# Push to GitHub
git push origin main
```

GitHub Pages will deploy automatically within 1-2 minutes.

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Code Style

- Use semantic HTML5
- Follow BEM naming convention for CSS
- Vanilla JavaScript (no frameworks)
- Keep it simple and performant

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Miguel Alpañez**

- 🌐 Website: [homelabforge.dev](https://homelabforge.dev)
- 📝 Blog: [blog.homelabforge.dev](https://blog.homelabforge.dev)
- 🐙 GitHub: [@malpanez](https://github.com/malpanez)
- 💼 LinkedIn: [Miguel Alpañez](https://www.linkedin.com/in/miguel-alpañez/)
- 📧 Email: miguel@homelabforge.dev

---

## 🎓 Certifications

- ☁️ AWS Solutions Architect Associate
- 🤖 Red Hat Certified Specialist in Ansible Automation
- 🔵 Azure Fundamentals (AZ-900)

---

## 🙏 Acknowledgments

- [GitHub Pages](https://pages.github.com/) for free hosting
- [Cloudflare](https://www.cloudflare.com/) for DNS and CDN
- [Tally](https://tally.so/) for beautiful forms
- [Calendly](https://calendly.com/) for scheduling

---

## 📚 Resources

- [Terraform Documentation](https://www.terraform.io/docs)
- [Ansible Documentation](https://docs.ansible.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Web.dev Performance](https://web.dev/performance/)

---

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature request?

1. Check existing [Issues](https://github.com/malpanez/malpanez.github.io-1/issues)
2. If not found, [create a new issue](https://github.com/malpanez/malpanez.github.io-1/issues/new)
3. Provide clear description and steps to reproduce

---

## 📈 Analytics

This site uses privacy-friendly analytics (optional):
- No cookies
- No personal data collection
- GDPR compliant
- Respects Do Not Track (DNT)

---

## 🌟 Star History

If you find this project useful, please consider giving it a star ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=malpanez/malpanez.github.io-1&type=Date)](https://star-history.com/#malpanez/malpanez.github.io-1&Date)

---

**Built with ❤️ by Miguel Alpañez | Open Source | Neurodivergent Friendly**
