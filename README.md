# MSK Foods – Online Retail Inventory & Sales Management System

## Abstract

MSK Foods is a full-stack **Direct-to-Consumer (D2C) Retail and Inventory Management System** designed exclusively for a **single, high-value product: MSK Health Mix**.

Unlike traditional multi-product e-commerce platforms, this system follows a **Single-Product Architecture**, enabling precise inventory control, simplified order processing, and a focused, trust-driven user experience.

The application bridges **traditional homemade nutritional preparation** with **modern web-based commerce**, emphasizing atomic stock updates, JWT-secured transactions, role-based access control, and streamlined checkout. The system was built as an **Object-Oriented Software Engineering (OOSE)** project following real-world industry standards. It was originally deployed on AWS EC2 and now runs as a **local project** (see [Deployment History](#deployment-history-archived)).

---

## Quick Start (Run Locally)

```bash
# 1. Clone
git clone https://github.com/KARTHIKAKRISHNA123/Online_Retail_Inventory_And_Sales_Management_System.git
cd Online_Retail_Inventory_And_Sales_Management_System

# 2. Install backend + frontend dependencies
npm install
cd frontend-new && npm install --legacy-peer-deps && cd ..

# 3. Create Backend/config/config.env  (see "Environment Configuration")

# 4. Seed the database
npm run seeder

# 5. Start the backend (terminal 1)
npm run dev

# 6. Start the frontend (terminal 2)
cd frontend-new && npm run dev
```

Open **http://localhost:5173** in your browser.

---

## Table of Contents

1. Project Overview
2. Design Principles & OOSE Alignment
3. Key Features
4. Technology Stack
5. System Architecture
6. Prerequisites
7. Installation & Setup
8. Environment Configuration
9. Running the Application
10. Data Seeding
11. Testing Payments Locally
12. Troubleshooting
13. API Endpoints
14. Project Structure
15. Deployment History (Archived)

---

## Project Overview

This project is engineered as a **Single-Product Retail System** where all frontend and backend workflows revolve around one product: **MSK Health Mix**.

Instead of supporting product discovery through search, filters, and catalogs, the system optimizes for a **"Land → Understand → Order"** flow. This design reflects real-world D2C platforms that focus on a limited number of flagship products.

The system tracks the complete product lifecycle:
- Stock In (Manufacturing / Preparation)
- Inventory Management (Admin Dashboard)
- Order Placement (Stripe Payment Gateway, test mode)
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

### Database & Services
| Technology | Purpose |
|---|---|
| MongoDB (Local replica set or Atlas M0) | Database (a replica set is required for transactions) |
| Stripe (test mode) | Payments |
| Mailtrap (sandbox SMTP) | Catching password-reset emails during development |

### Tools
| Tool | Purpose |
|---|---|
| Nodemon / `npm run dev` | Backend auto-reload during development |
| Vite dev server | Frontend hot reload with `/api` proxy to the backend |
| NVM | Node Version Manager |
| Git + GitHub | Version Control |

---

## System Architecture

### Local Development

```
┌─────────────────────────────────────────────────┐
│                   CLIENT LAYER                   │
│         React 19 + Redux Toolkit + Vite          │
│      (Framer Motion, Bootstrap, Axios)           │
│              http://localhost:5173               │
└─────────────────┬───────────────────────────────┘
                  │  Vite proxy: /api → :8000
                  ▼
┌─────────────────────────────────────────────────┐
│           NODE.JS / EXPRESS 5 SERVER             │
│              http://localhost:8000               │
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
│   MongoDB    │    │  Stripe API    │
│ (local/Atlas)│    │ PaymentIntent  │
│              │    │ (INR, test)    │
└──────────────┘    └────────────────┘
```

### Production-Style Local Run
After `npm run build` in `frontend-new`, Express serves the compiled frontend itself, so the whole app runs from one process at `http://localhost:8000`.

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
> The Deployment Diagram shows the original AWS EC2 topology; the app itself now runs locally.

<!--
## Screenshots
Add screenshots or a short GIF here, for example:
![Home](docs/screenshots/home.png)
![Admin Dashboard](docs/screenshots/admin-dashboard.png)
-->

---

## Prerequisites

| Requirement | Version | Check with |
|---|---|---|
| Node.js | v18+ (recommended v24.14.0 via NVM) | `node -v` |
| npm | comes with Node | `npm -v` |
| Git | any recent | `git --version` |
| MongoDB | Atlas free M0 **or** local install | see [Database Setup](#database-setup) |
| Stripe account | free, test mode only | https://dashboard.stripe.com/test/apikeys |
| Mailtrap account (optional) | free sandbox inbox | https://mailtrap.io |

### Database Setup

The order flow uses **Mongoose transactions**, and MongoDB only supports transactions on a **replica set**. A plain standalone `mongod` will start but transactional writes will fail. Pick one:

**Option A – MongoDB Atlas free tier (easiest)**
1. Create a free M0 cluster at https://cloud.mongodb.com.
2. Create a database user and allow your IP under **Network Access**.
3. Copy the connection string, for example `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/mskfoods`, into `DB_LOCAL_URI` below.

**Option B – Local MongoDB as a single-node replica set**
```bash
# start mongod with a replica set name (use your own data folder)
mongod --dbpath ./data/db --replSet rs0

# in another terminal, initialise the set once
mongosh --eval "rs.initiate()"
```
Then use `DB_LOCAL_URI=mongodb://127.0.0.1:27017/mskfoods?replicaSet=rs0`.

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/KARTHIKAKRISHNA123/Online_Retail_Inventory_And_Sales_Management_System.git
cd Online_Retail_Inventory_And_Sales_Management_System
```

### 2. Install Root (Backend) Dependencies

```bash
npm install
```

### 3. Install Frontend Dependencies

```bash
cd frontend-new
npm install --legacy-peer-deps
cd ..
```

> `--legacy-peer-deps` is needed because some older packages declare peer dependencies that conflict with React 19.

---

## Environment Configuration

Create the file `Backend/config/config.env` (it is gitignored, so never commit it):

```env
PORT=8000
NODE_ENV=development

# MongoDB  (Atlas URI or local replica-set URI, see Database Setup)
DB_LOCAL_URI=mongodb://127.0.0.1:27017/mskfoods?replicaSet=rs0

# JWT  (use a long random string; generate one with the command below)
JWT_SECRET=replace_with_a_long_random_string
JWT_EXPIRES_TIME=7d
COOKIE_EXPIRES_TIME=7

# SMTP (Email, Mailtrap sandbox)
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_mailtrap_user
SMTP_PASS=your_mailtrap_password
SMTP_FROM_NAME=MSK Foods
SMTP_FROM_EMAIL=noreply@mskfoods.com

# Stripe (TEST keys only)
STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key

# URLs
BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173
```

Generate a strong `JWT_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

**Where to get the keys**
- **Stripe test keys:** Stripe Dashboard → Developers → API keys (toggle **Test mode** on).
- **Mailtrap credentials:** Mailtrap → Email Testing → Inboxes → SMTP Settings.

---

## Running the Application

### Development Mode (two terminals)

```bash
# Terminal 1: backend (from project root)
npm run dev

# Terminal 2: frontend
cd frontend-new
npm run dev
```

| Service | URL |
|---|---|
| Frontend (use this one) | http://localhost:5173 |
| Backend API | http://localhost:8000/api/v1 |

The Vite dev server proxies `/api` requests to the backend, so cookies and CORS work without extra setup.

### Production Mode (single process, still local)

```bash
# Build the frontend
cd frontend-new
npm run build
cd ..

# Set NODE_ENV=production in config.env, then start the server
npm start
```

Open http://localhost:8000. Express serves the built frontend from `frontend-new/dist`.

---

## Data Seeding

```bash
npm run seeder
```

Seeds the database with:
- MSK Health Mix product with images and pricing
- Default admin user (check `Backend/utils/seeder.js` and `Backend/data/` for the seeded credentials)
- Sample product categories

Run it once on a fresh database. Running it again may reset existing data.

**Making an admin manually:** register a normal account in the UI, then change its `role` to `admin` in MongoDB (Compass or `mongosh`), or use the Admin → Users screen from an existing admin.

---

## Testing Payments Locally

Stripe runs in **test mode**, so no real money moves. At checkout use:

| Field | Value |
|---|---|
| Card number | `4242 4242 4242 4242` |
| Expiry | any future date (e.g. `12/34`) |
| CVC | any 3 digits |
| ZIP / PIN | any |

Other test cards are listed at https://docs.stripe.com/testing.

Password-reset emails are delivered to your **Mailtrap inbox**, not to real addresses.

---

## Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `npm install` fails with `ERESOLVE` in `frontend-new` | Use `npm install --legacy-peer-deps` |
| `MongooseServerSelectionError` / connection refused | MongoDB isn't running, the URI is wrong, or (Atlas) your IP isn't whitelisted |
| Order placement fails with "Transaction numbers are only allowed on a replica set member" | You're on standalone MongoDB. Use Atlas or start `mongod` with `--replSet` (see Database Setup) |
| `EADDRINUSE: port 8000 already in use` | Another process uses the port. Stop it or change `PORT` in `config.env` |
| Login works but you get logged out / 401 errors | Open the app via `http://localhost:5173` (not `127.0.0.1`) and keep `FRONTEND_URL` matching |
| Stripe payment form doesn't load | Check `STRIPE_PUBLISHABLE_KEY` / `STRIPE_SECRET_KEY` are **test** keys and the server was restarted after editing `config.env` |
| Forgot-password email never arrives | Check the Mailtrap inbox and SMTP credentials |
| Product image upload fails | Make sure `Backend/uploads/products` and `Backend/uploads/user` exist (create them if missing) |
| "No routes matched" after a build | Express 5 wildcard routes must be written as `/{*path}`, not `"*"` |
| `config.env` changes have no effect | Restart the backend; environment variables are read at startup |

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
| JWT Expiry | 7 days |
| Reset Token Expiry | 30 minutes |
| bcrypt Salt Rounds | 10 |

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

> Never commit `config.env` or real API keys. Use Stripe **test** keys only.

---

## Deployment History (Archived)

This project was originally deployed on **AWS EC2** as a hands-on DevOps exercise, and the live demo has since been decommissioned (the AWS free plan ended in September 2026). The setup is kept here as documentation of what was built and learned.

| Component | Detail |
|---|---|
| Hosting | AWS EC2 t2.micro, Amazon Linux 2023 |
| Reverse proxy | Nginx, port 80 → 8000, 50MB upload limit |
| Process manager | PM2 with auto-restart on 400MB memory and systemd startup on reboot |
| Memory | 2GB swapfile to keep the 1GB instance stable during builds |
| Database | MongoDB Atlas replica set |
| Source access | Private GitHub repository cloned with a token |

**Lessons learned**
- A 2GB swapfile is essential for `npm run build` on a 1GB instance.
- `--legacy-peer-deps` was required for older peer dependencies against React 19.
- Nginx `client_max_body_size` must be raised to allow multi-image product uploads.
- PM2 plus `pm2 startup` keeps the app alive across reboots.

The UML Deployment Diagram documents this topology. To deploy again, the same app runs on any Node host (Render, Railway, a VPS) with a MongoDB Atlas connection string and the environment variables above.

---

## Author

**Karthika Krishna M**  
Full Stack Developer | MERN Stack  
GitHub: [@KARTHIKAKRISHNA123](https://github.com/KARTHIKAKRISHNA123)



---

*Built using the MERN Stack | Runs locally (originally deployed on AWS EC2)*
