# 🛒 Agile Final Project - FashionTrend (E-commerce Website)

Welcome to the *FashionTrend* project — a fully responsive, static e-commerce website developed as part of the Agile & DevOps final project. The platform simulates an online shopping experience using core web technologies and follows Agile development principles with CI/CD integration.

---

## 🌟 Project Overview

FashionTrend is a front-end-only e-commerce platform featuring multiple pages like homepage, shop, blogs, contact, about us, and a checkout preview. The website demonstrates Agile iteration practices, automated testing using GitHub Actions, and deployment via Docker and Render.

---

## 🌐 Features

- 🏠 Homepage with product highlights
- 🛍 Shop page with dynamic product listings (from products.json)
- 📖 Blog and informational pages (Contact, About Us)
- 🧾 Checkout system (simulated front-end)
- 📱 Responsive design with modern CSS
- 🔠 FontAwesome integration
- 📂 Clean folder and component structure
- 🔍 Search and cart interactivity via JavaScript

---

## 🛠 Technologies Used

| Category          | Tools / Languages             |
|-------------------|-------------------------------|
| Frontend          | HTML5, CSS3, JavaScript       |
| UI/Icons          | FontAwesome                   |
| Data Handling     | JSON                          |
| Local Server (Test) | Python (run_server.py)     |
| Containerization  | Docker                        |
| CI/CD             | GitHub Actions                |
| Deployment        | Render, Docker Hub            |
| Version Control   | Git, GitHub                   |

---

## 🧪 CI/CD Pipeline (GitHub Actions)

We implemented a GitHub Actions CI/CD pipeline to automate:

- ✅ HTML, CSS, JS, and JSON code validation
- ✅ Stylelint and ESLint checks
- ✅ Docker image build and push to Docker Hub
- ✅ Deployment-ready setup for Render

### 🔄 Workflow Highlights

- Auto-triggered on main branch push
- Validates codebase using linters
- Builds Docker image with static files
- Publishes image to Docker Hub
- (Optional) Auto-deployment to Render

---

## 🐳 Docker Integration

We containerized the app using Docker to ensure consistent deployment.

### Dockerfile Highlights:

```Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "src", "-l", "3000"]

Build & Run Locally

docker build -t fashiontrend .
docker run -p 3000:3000 fashiontrend

Push to Docker Hub
docker tag fashiontrend your-dockerhub-username/fashiontrend:v1
docker push your-dockerhub-username/fashiontrend:v1



