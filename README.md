# localbrand — Considered pieces for the everyday

A modern e-commerce storefront and studio management web application built with React 19, Vite, and Tailwind CSS.

## 🚀 Features

- **Storefront & Catalog**: Browse products across Bags, Shoes, Travel, Clothing, and Accessories.
- **Product Filtering & Search**: Instant real-time search, category filtering, and sorting (price, newest).
- **Shopping Cart & Wishlist**: Fully functional bag and wishlist with `localStorage` persistence.
- **Checkout & Order Flow**: Multi-step checkout experience with coupon support (`WELCOME10`) and order confirmation.
- **Studio Admin Dashboard**: Comprehensive admin dashboard with sales charts, metrics, products, orders, categories, promotions, and customer management.
- **Customer Account / Auth**: Client-side authentication and account management with PBKDF2 hashing.

---

## 💻 Tech Stack

- **Framework**: React 19
- **Bundler & Dev Server**: Vite 8
- **Styling**: Tailwind CSS v4 & Custom modern typography / CSS
- **Linting**: Oxlint
- **Deployment**: GitHub Pages (Automated via GitHub Actions)

---

## 🛠️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

---

## 🌐 Deploy to GitHub Pages

This project is pre-configured for **GitHub Pages** deployment with relative asset paths and an automated GitHub Actions workflow (`.github/workflows/deploy.yml`).

### Automatic Deployment (Recommended via GitHub Actions)

1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: initial commit ready for GitHub Pages"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPOSITORY_NAME>.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Navigate to **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. Every time you push to the `main` branch, GitHub Actions will automatically build and publish your site.
4. Your live site will be accessible at:
   ```
   https://<YOUR_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>/
   ```

### Manual Deployment (Alternative via gh-pages script)

If you prefer to deploy manually to a `gh-pages` branch:
```bash
npm run deploy
```
Then under **Settings** → **Pages**, choose **Deploy from a branch** and select the `gh-pages` branch.
