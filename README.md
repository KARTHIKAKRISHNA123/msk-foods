# MSK Foods – Online Retail Inventory & Sales Management System

## Abstract

MSK Foods is a production-grade, full-stack **Direct-to-Consumer (D2C) Retail and Inventory Management System** designed exclusively for a **single, high-value product: MSK Health Mix**.

Unlike traditional multi-product e-commerce platforms, this system follows a **Single-Product Architecture**, enabling precise inventory control, simplified order processing, and a focused, trust-driven user experience.

The application bridges **traditional homemade nutritional preparation** with **modern web-based commerce**, emphasizing atomic stock updates, JWT-secured transactions, role-based access control, and streamlined checkout. The system is implemented as an **Object-Oriented Software Engineering (OOSE)** project while adhering to real-world industry standards and is **fully deployed on AWS EC2**.

---

## 🌐 Live Demo

```
http://100.27.230.219
```

---

## Table of Contents

1. Project Overview
2. Design Principles & OOSE Alignment
3. Key Features
4. Technology Stack
5. System Architecture
6. Installation & Setup
7. Environment Configuration
8. Running the Application
9. Data Seeding
10. API Endpoints
11. Deployment Guide
12. Project Structure

---

## Project Overview

This project is engineered as a **Single-Product Retail System** where all frontend and backend workflows revolve around one product: **MSK Health Mix**.

Instead of supporting product discovery through search, filters, and catalogs, the system optimizes for a **"Land → Understand → Order"** flow. This design reflects real-world D2C platforms that focus on a limited number of flagship products.

The system tracks the complete product lifecycle:
- Stock In (Manufacturing / Preparation)
- Inventory Management (Admin Dashboard)
- Order Placement (Stripe Payment Gateway)
- Stock Out (Dispatch & Delivery Tracking)
- Customer Reviews & Ratings

All inventory updates are handled **atomically** to ensure data consistency using Mongoose transactions and pre-save hooks.

---

## Design Principles & OOSE Alignment

The application follows Object-Oriented Software Engineering principles and common enterprise patterns:

### Architectural Patterns

- **MVC Architecture**
  Clear separation between Models (Mongoose Schemas), Controllers (Business Logic), and Views (React Components).

- **Single-Product Domain Model**
  The Product entity is treated as a singular conceptual instance rather than a collection, optimizing all queries and UI flows around one SKU.

- **Observer Pattern**
  Redux Toolkit propagates state changes (cart, order status, authentication) across UI components in real time using subscriber-based reactivity.

- **Factory-Style Data Seeding**
  Seed scripts initialize the database with predefined roles and the MSK Health Mix product using automated JSON-driven population.

- **Repository Pattern**
  Controllers act as repositories abstracting Mongoose query logic from route handlers, ensuring clean separation of concerns.

- **Middleware Chain Pattern**
  Express middleware pipeline handles authentication (`isAuthenticatedUser`), authorization (`authorizeRoles`), async error catching (`catchAsyncErrors`), and centralized error formatting.

---

## Key Features

### 🛒 User Module
- Single-product focused "Land → Understand → Order" user journey
- Smart cart with per-user localStorage persistence using `cartItems_${userId}` keying
- Quantity-based purchasing with real-time stock validation
- Secure Stripe-powered checkout with PaymentIntent API
- Order history and real-time delivery status tracking
- Product review and star rating system
- JWT-secured session with HttpOnly cookie storage
- Password recovery via SHA-256 hashed reset tokens with 30-minute expiry
- Responsive design with Framer Motion animations and GoldDust particle system

### 🔐 Authentication & Security
- JWT (JSON Web Token) stateless authentication
- bcrypt password hashing with 10 salt rounds
- HttpOnly cookie-based session management
- Role-Based Access Control (RBAC) — Admin / User
- SHA-256 cryptographic token generation for password reset
- Environment-specific error responses (stack traces in dev, clean messages in prod)
- Private GitHub repository with fine-grained Personal Access Token for deployment

### 🛠️ Admin Module
- Centralized Admin Dashboard with revenue analytics
- Real-time inventory management (Create, Read, Update, Delete products)
- Multi-image product upload with Multer diskStorage
- Order lifecycle management (Processing → Shipped → Delivered)
- Automated stock decrement on order fulfillment using `for...of` async loop
- Customer (User) management with role assignment
- Review moderation system

### 💳 Payment Module
- Stripe Payment Gateway integration
- Server-side PaymentIntent creation with INR currency support
- Client-side card tokenization using `@stripe/react-stripe-js`
- Secure Stripe publishable key delivery via authenticated API endpoint

### 📦 Inventory & Order Module
- Atomic stock updates preventing overselling
- Order status pipeline with timestamped delivery tracking
- Admin order override with manual status updates
- Complete order history per user via MongoDB population

---

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React.js | 19.2.0 | UI Framework |
| Redux Toolkit | 2.11.2 | State Management |
| React Router DOM | 7.13.0 | Client-side Routing |
| Vite | 7.3.1 | Build Tool & Dev Server |
| Framer Motion | 12.29.2 | Animations & Transitions |
| Bootstrap | 5.3.8 | CSS Framework |
| Axios | 1.13.3 | HTTP Client |
| React Toastify | 11.0.5 | Toast Notifications |
| Stripe.js | 8.7.0 | Payment UI Components |
| React Helmet Async | 2.0.5 | SEO Meta Management |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | v24.14.0 | Runtime Environment |
| Express.js | 5.1.0 | Web Framework |
| Mongoose | 8.17.1 | MongoDB ODM |
| JWT (jsonwebtoken) | 9.0.2 | Authentication |
| bcrypt | 6.0.0 | Password Hashing |
| Multer | 2.0.2 | File Upload Handling |
| Nodemailer | 7.0.12 | Email Service |
| Stripe | 20.3.1 | Payment Processing |
| Cookie Parser | 1.4.7 | Cookie Management |
| Dotenv | 17.2.1 | Environment Variables |
| Validator | 13.15.23 | Input Validation |

### Database & Cloud
| Technology | Purpose |
|---|---|
| MongoDB Atlas | Cloud Database (Replica Set) |
| AWS EC2 t2.micro | Cloud Hosting (Amazon Linux 2023) |
| Nginx 1.28.2 | Reverse Proxy Server |
| PM2 | Process Manager |

### DevOps & Tools
| Tool | Purpose |
|---|---|
| PM2 | Process management, auto-restart, memory monitoring |
| Nginx | Reverse proxy, port forwarding (80 → 8000), upload size limits |
| NVM | Node Version Manager |
| Git + GitHub | Version Control (Private Repository) |
| GitHub PAT | Secure EC2 deployment authentication |
| Swap Memory (2GB) | Memory extension for t2.micro stability |
| systemd | PM2 auto-startup on EC2 reboot |

---

## System Architecture

```
┌─────────────────────────────────────────────────┐
│                   CLIENT LAYER                   │
│         React 19 + Redux Toolkit + Vite          │
│      (Framer Motion, Bootstrap, Axios)           │
└─────────────────┬───────────────────────────────┘
                  │ HTTP/HTTPS
                  ▼
┌─────────────────────────────────────────────────┐
│              NGINX REVERSE PROXY                 │
│         Port 80 → Port 8000                      │
│    client_max_body_size: 50MB                    │
│         AWS EC2 t2.micro                         │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│           NODE.JS / EXPRESS 5 SERVER             │
│              PM2 Process Manager                 │
│    ┌──────────────────────────────────────┐     │
│    │         Middleware Pipeline           │     │
│    │  cookieParser → express.json →        │     │
│    │  isAuthenticated → authorizeRoles →   │     │
│    │  catchAsyncErrors → errorHandler      │     │
│    └──────────────────────────────────────┘     │
│    ┌─────────┐ ┌────────┐ ┌──────┐ ┌────────┐  │
│    │Products │ │  Auth  │ │Order │ │Payment │  │
│    │ Routes  │ │ Routes │ │Routes│ │ Routes │  │
│    └─────────┘ └────────┘ └──────┘ └────────┘  │
└─────────────────┬───────────────────────────────┘
                  │
        ┌─────────┴──────────┐
        ▼                    ▼
┌──────────────┐    ┌────────────────┐
│ MongoDB Atlas│    │  Stripe API    │
│ Replica Set  │    │ PaymentIntent  │
│ (Cloud DB)   │    │    (INR)       │
└──────────────┘    └────────────────┘
```

---

## UML Diagrams — IEEE Standard

All 9 UML diagrams are in a single interactive file.
Click the link below to open — all diagrams visible as tabs at the bottom.

| # | Diagram | Standard |
|---|---|---|
| 1 | Use Case Diagram | IEEE/OMG UML 2.x |
| 2 | Class Diagram | IEEE/OMG UML 2.x |
| 3 | Sequence Diagram | IEEE/OMG UML 2.x |
| 4 | Communication Diagram | IEEE/OMG UML 2.x |
| 5 | Activity Diagram | IEEE/OMG UML 2.x |
| 6 | State Diagram | IEEE/OMG UML 2.x |
| 7 | Component Diagram | IEEE/OMG UML 2.x |
| 8 | Deployment Diagram | IEEE/OMG UML 2.x |
| 9 | Package Diagram | IEEE/OMG UML 2.x |

### Open Interactive Diagrams (all 9 tabs)
[Click here to view all 9 UML diagrams](https://app.diagrams.net/#HKARTHIKAKRISHNA123/Online_Retail_Inventory_And_Sales_Management_System/main/diagrams/MSK_Foods.drawio)

> Switch between diagrams using the tab bar at the bottom of the viewer.

---

## Installation & Setup

### Prerequisites
- Node.js v18+ (Recommended: v24.14.0 via NVM)
- MongoDB (Local or Atlas)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/KARTHIKAKRISHNA123/Online_Retail_Inventory_And_Sales_Management_System.git
cd Online_Retail_Inventory_And_Sales_Management_System
```

### 2. Install Root Dependencies

```bash
npm install
```

### 3. Install Frontend Dependencies

```bash
cd frontend-new
npm install --legacy-peer-deps
cd ..
```

---

## Environment Configuration

Create the following file:
`Backend/config/config.env`

```env
PORT=8000
NODE_ENV=development

# MongoDB
DB_LOCAL_URI=mongodb://127.0.0.1:27017/mskfoods

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_TIME=7d
COOKIE_EXPIRES_TIME=7

# SMTP (Email)
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_mailtrap_user
SMTP_PASS=your_mailtrap_password
SMTP_FROM_NAME=MSK Foods
SMTP_FROM_EMAIL=noreply@mskfoods.com

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key

# URLs
BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173
```

---

## Running the Application

### Development Mode

```bash
# Start Backend (from root)
npm run dev

# Start Frontend (new terminal)
cd frontend-new
npm run dev
```

Backend runs on: `http://localhost:8000`  
Frontend runs on: `http://localhost:5173`

### Production Mode

```bash
# Build Frontend
cd frontend-new
npm run build
cd ..

# Start Production Server
npm start
```

---

## Data Seeding

```bash
npm run seeder
```

Seeds the database with:
- MSK Health Mix product with images and pricing
- Default admin user
- Sample product categories

---

## API Endpoints

### Auth Routes (`/api/v1/`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/register` | Public | Register new user |
| POST | `/login` | Public | Login user |
| GET | `/logout` | Private | Logout user |
| POST | `/password/forgot` | Public | Send reset email |
| POST | `/password/reset/:token` | Public | Reset password |
| GET | `/myprofile` | Private | Get user profile |
| PUT | `/update` | Private | Update profile |
| PUT | `/password/change` | Private | Change password |

### Product Routes (`/api/v1/`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/products` | Public | Get all products |
| GET | `/product/:id` | Public | Get single product |
| POST | `/admin/product/new` | Admin | Create product |
| PUT | `/admin/product/:id` | Admin | Update product |
| DELETE | `/admin/product/:id` | Admin | Delete product |
| GET | `/admin/products` | Admin | Get all products |
| PUT | `/review` | Private | Create/Update review |
| GET | `/reviews` | Public | Get product reviews |
| DELETE | `/review` | Private | Delete review |

### Order Routes (`/api/v1/`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/order/new` | Private | Create order |
| GET | `/order/:id` | Private | Get single order |
| GET | `/myOrders` | Private | Get user orders |
| GET | `/admin/orders` | Admin | Get all orders |
| PUT | `/admin/order/:id` | Admin | Update order status |
| DELETE | `/admin/order/:id` | Admin | Delete order |

### Payment Routes (`/api/v1/`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/payment/process` | Private | Process Stripe payment |
| GET | `/stripeapikey` | Private | Get publishable key |

### Admin User Routes (`/api/v1/`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/admin/users` | Admin | Get all users |
| GET | `/admin/user/:id` | Admin | Get single user |
| PUT | `/admin/user/:id` | Admin | Update user role |
| DELETE | `/admin/user/:id` | Admin | Delete user |

---

## Deployment Guide (AWS EC2)

### Server Setup

```bash
# Connect to EC2
ssh -i "your-key.pem" ec2-user@your-ec2-ip

# Update server
sudo yum update -y

# Install Git
sudo yum install git -y

# Install Node.js via NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts

# Make NVM permanent
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.bashrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.bashrc
```

### Deploy Application

```bash
# Clone private repo using GitHub PAT
git clone https://YOUR_PAT@github.com/username/repo.git
cd repo

# Install dependencies
npm install
cd frontend-new
npm install --legacy-peer-deps

# Add swap memory for stability
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Build frontend
npm run build
cd ..

# Create config.env
nano Backend/config/config.env
```

### PM2 Process Manager

```bash
# Install PM2
npm install -g pm2

# Start with memory limit
pm2 start Backend/server.js --name "msk-ecommerce" --max-memory-restart 400M

# Auto-startup on reboot
pm2 startup
# Run the generated command
pm2 save
```

### Nginx Configuration

```bash
# Install Nginx
sudo yum install nginx -y

# Configure reverse proxy
sudo tee /etc/nginx/nginx.conf > /dev/null << 'EOF'
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log notice;
pid /run/nginx.pid;
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    client_max_body_size 50M;

    server {
        listen 80;
        server_name _;

        location / {
            proxy_pass http://127.0.0.1:8000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
EOF

sudo nginx -t
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Update Workflow (After Code Changes)

```bash
cd ~/repo-name
git pull
cd frontend-new
npm run build --legacy-peer-deps
cd ..
pm2 restart msk-ecommerce
```

---

## Project Structure

```
Online_Retail_Inventory_And_Sales_Management_System/
│
├── Backend/
│   ├── config/
│   │   ├── config.env          # Environment variables (gitignored)
│   │   ├── database.js         # MongoDB connection
│   │   └── env.js              # dotenv loader
│   │
│   ├── controllers/
│   │   ├── authController.js   # Auth business logic
│   │   ├── orderController.js  # Order business logic
│   │   ├── paymentController.js# Stripe integration
│   │   └── productController.js# Product & review logic
│   │
│   ├── data/
│   │   └── products.json       # Seed data
│   │
│   ├── middlewares/
│   │   ├── authenticate.js     # JWT verification + RBAC
│   │   ├── catchAsyncErrors.js # Async error wrapper
│   │   └── error.js            # Global error handler
│   │
│   ├── models/
│   │   ├── orderModel.js       # Order schema
│   │   ├── productModel.js     # Product schema
│   │   └── userModels.js       # User schema + methods
│   │
│   ├── routes/
│   │   ├── auth.js             # Auth routes
│   │   ├── order.js            # Order routes
│   │   ├── payment.js          # Payment routes
│   │   └── product.js          # Product routes
│   │
│   ├── uploads/
│   │   ├── products/           # Product images
│   │   └── user/               # User avatars
│   │
│   ├── utils/
│   │   ├── apiFeatures.js      # Search/Filter/Pagination
│   │   ├── email.js            # Nodemailer config
│   │   ├── errorHandler.js     # Custom error class
│   │   ├── jwt.js              # Token generation
│   │   └── seeder.js           # DB seeder script
│   │
│   ├── app.js                  # Express app config
│   └── server.js               # Entry point
│
├── frontend-new/
│   ├── public/
│   │   └── images/             # Static assets
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/          # Dashboard, ProductList,
│   │   │   │                   # UpdateProduct, OrderList,
│   │   │   │                   # UpdateOrder, UserList,
│   │   │   │                   # UpdateUser, Sidebar
│   │   │   ├── cart/           # Cart, Shipping,
│   │   │   │                   # ConfirmOrder, Payment,
│   │   │   │                   # OrderSuccess
│   │   │   ├── home/           # Hero, Product
│   │   │   ├── layouts/        # Header, Footer, Loader,
│   │   │   │                   # GoldDust, MetaData,
│   │   │   │                   # Pagination, ScrollToTop
│   │   │   ├── order/          # UserOrders, OrderDetails
│   │   │   ├── product/        # ProductDetails
│   │   │   ├── route/          # ProtectedRoutes
│   │   │   └── user/           # Login, Register, Profile,
│   │   │                       # UpdateProfile, UpdatePassword,
│   │   │                       # ForgotPassword, ResetPassword
│   │   │
│   │   ├── slices/
│   │   │   ├── authSlice.js    # Auth state + thunks
│   │   │   ├── cartSlice.js    # Cart state + persistence
│   │   │   ├── orderSlice.js   # Order state + thunks
│   │   │   ├── productsSlice.js# Product state + thunks
│   │   │   └── userSlice.js    # User management state
│   │   │
│   │   ├── App.jsx             # Root component + routes
│   │   ├── App.css             # Global styles
│   │   ├── main.jsx            # React entry point
│   │   └── store.js            # Redux store config
│   │
│   ├── index.html              # HTML entry point
│   ├── vite.config.js          # Vite + proxy config
│   └── package.json            # Frontend dependencies
│
├── .gitignore                  # Excludes node_modules, config.env, dist
├── package.json                # Root dependencies + scripts
└── README.md                   # This file
```

---

## Key Metrics

| Metric | Value |
|---|---|
| API Endpoints | 15+ RESTful endpoints |
| Redux Slices | 5 independent state slices |
| Protected Routes | 8+ RBAC-secured routes |
| JS Bundle Size | 730KB (215KB gzipped) |
| CSS Bundle Size | 254KB (35KB gzipped) |
| Modules Transformed | 864 modules (Vite build) |
| Swap Memory | 2GB (EC2 stability) |
| Upload Limit | 50MB (Nginx config) |
| JWT Expiry | 7 days |
| Reset Token Expiry | 30 minutes |
| bcrypt Salt Rounds | 10 |
| PM2 Memory Limit | 400MB auto-restart |

---

## Security Implementation

- **JWT** stateless authentication with HttpOnly cookies
- **bcrypt** password hashing (10 salt rounds)
- **SHA-256** cryptographic reset token generation
- **Role-Based Access Control** (Admin/User)
- **Environment variables** excluded from version control
- **Input validation** via Mongoose schema validators
- **Express 5** with async error boundary middleware
- **Helmet-ready** architecture for production headers

---

## Author

**Karthika Krishna M**  
Full Stack Developer | MERN Stack  
GitHub: [@KARTHIKAKRISHNA123](https://github.com/KARTHIKAKRISHNA123)

---

## License

This project is intended for educational and portfolio demonstration purposes.  
All business logic, UI design, and architecture are original work by the author.

---

*Built using the MERN Stack | Deployed on AWS EC2*