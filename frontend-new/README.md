```markdown
# MSK Foods – Online Retail Inventory & Sales Management System

## Abstract

MSK Foods is a web-based **Direct-to-Consumer (D2C) Retail and Inventory Management System** designed exclusively for a **single, high-value product: MSK Health Mix**.
Unlike traditional multi-product e-commerce platforms, this system follows a **Single-Product Architecture**, enabling precise inventory control, simplified order processing, and a focused, trust-driven user experience.

The application bridges **traditional homemade nutritional preparation** with **modern web-based commerce**, emphasizing atomic stock updates, secure transactions, and streamlined checkout. The system is implemented as an **Object-Oriented Software Engineering (OOSE)** project while adhering to real-world industry standards.

---

## Table of Contents

1. Project Overview
2. Design Principles & OOSE Alignment
3. Key Features
4. Technology Stack
5. Installation & Setup
6. Environment Configuration
7. Running the Application
8. Data Seeding
9. Project Structure

---

## Project Overview

This project is engineered as a **Single-Product Retail System** where all frontend and backend workflows revolve around one product: **MSK Health Mix**.

Instead of supporting product discovery through search, filters, and catalogs, the system optimizes for a **"Land → Understand → Order"** flow. This design reflects real-world D2C platforms that focus on a limited number of flagship products.

The system tracks the complete product lifecycle:
- Stock In (Manufacturing / Preparation)
- Inventory Management
- Order Placement
- Stock Out (Dispatch & Delivery)

All inventory updates are handled atomically to ensure data consistency.

---

## Design Principles & OOSE Alignment

The application follows Object-Oriented Software Engineering principles and common enterprise patterns:

### Architectural Patterns

- **MVC Architecture**
  Clear separation between Models (Data), Controllers (Business Logic), and Views (UI).

- **Single-Product Domain Model**
  The Product entity is treated as a singular conceptual instance rather than a collection.

- **Observer Pattern**
  Redux Toolkit is used to propagate state changes (cart, order status, authentication) across UI components in real time.

- **Factory-Style Data Seeding**
  Seed scripts initialize the database with predefined roles and the MSK Health Mix product.

---

## Key Features

### Single-Product Inventory Management (Admin Module)

- Centralized control of MSK Health Mix stock
- Accurate stock decrementing on order placement
- Order-focused admin dashboard
- Product image management

### Fast & Focused Order Flow (User Module)

- Direct "Order Now" flow without product browsing
- Quantity-based purchasing for a single product
- Secure checkout experience
- Order history and delivery tracking

### Security & Access Control

- Role-Based Access Control (Admin / User)
- JWT-based authentication
- HTTP-only cookies for session security
- Password hashing using bcrypt

---

## Technology Stack

### Frontend
- React.js (v18)
- Vite (Build Tool)
- Redux Toolkit (State Management)
- Bootstrap 5 & Custom CSS

### Backend
- Node.js
- Express.js (REST API)
- MongoDB (Mongoose ODM)

### Payments & Services
- Stripe Payment Gateway
- Mailtrap (Email testing)

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/KARTHIKAKRISHNA123/Online_Retail_Inventory_And_Sales_Management_System.git
cd Online_Retail_Inventory_And_Sales_Management_System
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Install Frontend Dependencies

```bash
cd frontend-new
npm install
cd ..
```

---

## Environment Configuration

Create the following file:  
`backend/config/config.env`

Add the configuration below:

```
PORT=8000
NODE_ENV=DEVELOPMENT

DB_LOCAL_URI=mongodb://127.0.0.1:27017/mskfoods

JWT_SECRET=your_secret_key
JWT_EXPIRES_TIME=7d
COOKIE_EXPIRES_TIME=7

STRIPE_API_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key

SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_EMAIL=your_mailtrap_user
SMTP_PASSWORD=your_mailtrap_password
SMTP_FROM_EMAIL=noreply@mskfoods.com
SMTP_FROM_NAME=MSK Foods
```

---

## Running the Application

### Start Backend Server

```bash
npm run dev
```

Backend runs on: http://localhost:8000

### Start Frontend Client

```bash
cd frontend-new
npm run dev
```

Frontend runs on: http://localhost:5173

---

## Data Seeding

This application uses a Single-Product Database Model.  
Run the seeder to initialize the database with the MSK Health Mix product and default users.

```bash
npm run seeder
```

---

## Project Structure

```
MSK-FOODS-SYSTEM
├── backend
│   ├── config          # Environment & DB configuration
│   ├── controllers     # Business logic
│   ├── models          # Mongoose schemas
│   ├── routes          # API routes
│   ├── utils           # Helper utilities
│   └── server.js       # Backend entry point
│
├── frontend-new
│   ├── public
│   │   └── images      # Product images (HealthMix)
│   └── src
│       ├── components  # UI components
│       ├── slices      # Redux slices
│       ├── store.js    # Redux store
│       └── main.jsx    # Frontend entry point
│
├── README.md
└── package.json
```

---

## Final Notes

This project intentionally avoids multi-product complexity. The architecture reflects real-world Direct-to-Consumer (D2C) systems. The design balances academic OOSE (Object Oriented Software Engineering) requirements with industry-grade implementation practices. All application logic is centered around a single product: MSK Health Mix.
```