// ✨ 1. LOAD ENV VARS FIRST
// This must be the very first line to ensure variables exist before other files load
import './config/env.js'; 

import app from "./app.js";
import connectDatabase from "./config/database.js";

// Handle Uncaught Exceptions (e.g., usage of undefined variables)
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaughtException error");
    process.exit(1);
});

// 2. Connect to Database
connectDatabase();

// 3. Start Server
const server = app.listen(process.env.PORT, () => {
    console.log(
        `Server Listening on port ${process.env.PORT} in ${process.env.NODE_ENV}`
    );
});

// Handle Unhandled Promise Rejections (e.g., DB connection failure)
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    });
});