# 🚀 IT Freelancer Deployment Template

Automated infrastructure for deploying high-performance static websites on AWS.

## 📁 Repository Structure
- `frontend/`: Place your website source files here.
- `terraform/`: AWS Infrastructure as Code (S3 + CloudFront + ACM).
- `docker/`: Local containerization and testing setup.
- `.github/workflows/`: CI/CD pipeline for automated deployment.

## 🛠️ Quick Start

### 1. Local Testing
```bash
cd docker
docker-compose up
```
Visit `http://localhost:8080` to see your site.

### 2. Infrastructure Setup
```bash
cd terraform
terraform init
terraform apply -var="domain_name=yourclient.com"
```

### 3. CI/CD Secrets
Add these to your GitHub Repository Secrets:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `S3_BUCKET` (e.g., yourclient.com)
- `CLOUDFRONT_DIST_ID`

## 📡 IoT & Real-Time (Upcoming)
Check Phase 4 guide for ECS and API Gateway integration.

---
© 2026 SEPL IoT Solutions.
