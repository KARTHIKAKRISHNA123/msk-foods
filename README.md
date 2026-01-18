# Online Retail Inventory and Sales Management System

![Project Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![Tech Stack](https://img.shields.io/badge/Stack-MERN-blueviolet)

**Abstract:**  
A centralized, web-based enterprise resource planning (ERP) module designed to automate retail inventory tracking, order fulfillment, and secure payment processing. This system bridges the gap between traditional brick-and-mortar inventory management and modern e-commerce demands.

---

## 📚 Table of Contents

1. Project Overview  
2. System Architecture  
3. Key Features  
4. Technology Stack  
5. Prerequisites  
6. Installation & Setup  
7. Environment Configuration  
8. Running the Application  
9. Data Seeding  
10. API Documentation  
11. Project Structure  

---

## 📖 Project Overview

This project is engineered as an **Object-Oriented Software Engineering (OOSE)** capstone project. It functions as a full-scale E-Commerce and Inventory Management System enabling administrators to control stock levels in real time while offering users a smooth, secure shopping experience.

Unlike conventional shopping websites, this system emphasizes the **Inventory Lifecycle** — tracking products from creation (ProductDAO), updates, and availability to sales (OrderDAO) and delivery. This ensures consistency, traceability, and scalability across the retail workflow.

---

## 🏗 System Architecture

The application follows a **3-Tier MVC (Model–View–Controller) Architecture**, a proven enterprise design pattern.

- **Presentation Layer (Client):** React.js Single Page Application with Redux Toolkit  
- **Application Layer (Server):** Node.js with Express.js REST APIs  
- **Data Layer (Database):** MongoDB using Mongoose ODM  

This separation of concerns improves maintainability, scalability, and testability.

---

## 🚀 Key Features

### 🛒 Inventory Management (Admin Module)

- Real-time stock tracking with automatic updates after order placement  
- Full Product CRUD operations  
- Product image support  
- Low-stock visual alerts  

### 💳 Sales & Order Processing (User Module)

- Secure checkout using **Stripe Payment Gateway**  
- Persistent cart with Redux  
- Order tracking (Processing → Shipped → Delivered)  

### 🔐 Security & Access Control

- Role-Based Access Control (Admin / User)  
- JWT authentication with HTTPOnly cookies  
- Password hashing using bcrypt  
- Secure password recovery via SMTP (Mailtrap)  

---

## 💻 Technology Stack

- **Frontend:** React.js v18  
- **State Management:** Redux Toolkit  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **ODM:** Mongoose  
- **Payments:** Stripe API  
- **Styling:** React-Bootstrap  

---

## 🛠 Prerequisites

- Node.js (v16 or higher)  
- MongoDB (Local or Atlas)  
- Visual Studio Code  

---

## ⚙️ Installation & Setup

### Clone the Repository

git clone https://github.com/KARTHIKAKRISHNA123/Online_Retail_Inventory_And_Sales_Management_System.git  
cd Online_Retail_Inventory_And_Sales_Management_System  

### Install Backend Dependencies

npm install  

### Install Frontend Dependencies

cd frontend  
npm install  
cd ..  

---

## 🔐 Environment Configuration

Create `backend/config/config.env` and add:

PORT=8000  
NODE_ENV=DEVELOPMENT  

DB_LOCAL_URI=mongodb://127.0.0.1:27017/jvlcart  

JWT_SECRET=ENTER_YOUR_LONG_RANDOM_SECRET_KEY  
JWT_EXPIRES_TIME=7d  
COOKIE_EXPIRES_TIME=7  

CLOUDINARY_CLOUD_NAME=your_cloud_name  
CLOUDINARY_API_KEY=your_api_key  
CLOUDINARY_API_SECRET=your_api_secret  

STRIPE_API_KEY=pk_test_your_public_key  
STRIPE_SECRET_KEY=sk_test_your_secret_key  

SMTP_HOST=sandbox.smtp.mailtrap.io  
SMTP_PORT=2525  
SMTP_EMAIL=your_mailtrap_user  
SMTP_PASSWORD=your_mailtrap_password  
SMTP_FROM_EMAIL=noreply@jvlcart.com  
SMTP_FROM_NAME=JVLAdmin  

---

## ▶️ Running the Application

### Development Mode

npm run dev  

Backend: http://localhost:8000  
Frontend: http://localhost:3000  

### Production Mode

npm run build  
npm start  

---

## 📦 Data Seeding

npm run seeder  

This clears the products collection and inserts sample data.

---

## 📡 API Documentation

### Authentication & User

- POST /api/v1/register  
- POST /api/v1/login  
- POST /api/v1/password/forgot  
- GET /api/v1/me  

### Products

- GET /api/v1/products  
- GET /api/v1/product/:id  
- POST /api/v1/admin/product/new  
- PUT /api/v1/admin/product/:id  
- DELETE /api/v1/admin/product/:id  

### Orders

- POST /api/v1/order/new  
- GET /api/v1/order/:id  
- GET /api/v1/admin/orders  

---

## 📂 Project Structure

JVL-CART  
├── backend  
│   ├── config  
│   ├── controllers  
│   ├── models  
│   ├── routes  
│   ├── utils  
│   └── server.js  
├── frontend  
│   ├── public  
│   └── src  
│       ├── actions  
│       ├── components  
│       ├── constants  
│       ├── reducers  
│       └── store.js  
├── .gitignore  
├── README.md  
└── package.json  
