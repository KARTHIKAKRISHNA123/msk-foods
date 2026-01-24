
import express from "express";
const app = express();
import errorHandler from "./middlewares/error.js";
import auth from "./routes/auth.js";
import cookieParser from "cookie-parser";

app.use(express.json());
app.use(cookieParser());


import products from "./routes/product.js";
import order from "./routes/order.js";

app.use("/api/v1/", products);
app.use(errorHandler);
app.use("/api/v1/", auth);
app.use(errorHandler);
app.use("/api/v1/", order);
app.use(errorHandler);


export default app;