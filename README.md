# Hospital Management System – AWS 3-Tier Architecture (HTTPS Enabled)

This project is a Node.js based Hospital Management System deployed on AWS using a **production-grade 3-Tier Architecture**
with **SSL/HTTPS enabled using AWS ACM, CloudFront, and Route 53**.

---

##  Architecture Overview

User (HTTPS)
 |
 v
CloudFront (CDN + SSL Termination)
 |
 v
Nginx (Web Tier – Public EC2)
 |
 v
Node.js Application (App Tier – Private EC2)
 |
 v
Amazon RDS MySQL (Database Tier – Private Subnets, Multi-AZ)

---

##  Technology Stack

- Node.js
- Express.js
- EJS Templates
- MySQL
- Nginx
- AWS EC2
- Amazon RDS (MySQL)
- Amazon VPC
- Amazon Route 53
- AWS Certificate Manager (ACM)
- Amazon CloudFront
- PM2
- Amazon Linux 2023

---

##  AWS Infrastructure

- VPC with CIDR: 10.0.0.0/16
- Public Subnet: Web Tier
- Private Subnet: Application Tier
- Private Subnets (2 AZs): Database Tier

---

##  SSL / HTTPS Configuration (ACM + CloudFront + Route 53)

- SSL certificate created using ACM (Region: us-east-1)
- DNS validation done using Route 53
- CloudFront distribution configured with ACM certificate
- HTTP redirected to HTTPS
- SSL terminates at CloudFront

SSL Flow:
User → HTTPS → CloudFront → HTTP → Web EC2 → App EC2 → RDS

---

##  DEPLOYMENT COMMANDS (IMPORTANT)

### 1️ Web EC2 – Install & Configure Nginx
```bash
sudo dnf update -y
sudo dnf install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Configure Nginx Reverse Proxy
```bash
sudo nano /etc/nginx/conf.d/hospital.conf
```

```nginx
server {
    listen 80;
    location / {
        proxy_pass http://APP_PRIVATE_IP:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

### 2️ Application EC2 – Install Node.js
```bash
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo dnf install nodejs -y
node -v
npm -v
```

---

### 3️ Deploy Application
```bash
git clone https://github.com/your-username/your-repo.git
cd Hospital_project
npm install
```

---

### 4️ Run Application Using PM2
```bash
sudo npm install -g pm2
pm2 start index.js --name hospital-app
pm2 startup
pm2 save
pm2 status
```

---

### 5️ Database – Import SQL into Amazon RDS
```bash
sudo dnf install mysql -y
```

```bash
mysql -h RDS_ENDPOINT -u admin -p
CREATE DATABASE hospital_db;
EXIT;
```

```bash
mysql -h RDS_ENDPOINT -u admin -p hospital_db < hospital_db.sql
```

---

##  Security Configuration

- Web EC2 allows traffic only from CloudFront
- App EC2 has no public IP
- RDS accessible only from App EC2
- Security Group to Security Group communication

---

## ▶ Application Access

https://your-domain-name.com

(HTTPS enforced via CloudFront)

---

##  Author

Chetan Muli  
Cloud Engineer  
AWS | Linux | Node.js | MySQL | Nginx | CloudFront | Route 53

---

##  License

This project is created for learning and demonstration purposes only.
