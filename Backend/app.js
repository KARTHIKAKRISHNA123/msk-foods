import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

// Route Imports
import products from "./routes/product.js";
import auth from "./routes/auth.js";
import order from "./routes/order.js";
import errorHandler from "./middlewares/error.js";

import payment from "./routes/payment.js";


const app = express();



// ✨ 1. Define __dirname for ES Modules (Fixes path issues)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());
// ✨ 2. Robust Static File Serving
// This ensures '/uploads' points to the correct folder no matter where you run the app from
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✨ 3. Routes (Grouped together)
app.use("/api/v1/", products);
app.use("/api/v1/", auth);
app.use("/api/v1/", order);
app.use("/api/v1/", payment);

// ✨ 4. Error Handler (MUST BE LAST)
// Only use this once, after all routes are defined.
app.use(errorHandler);

export default app;