import ErrorHandler from "../utils/errorHandler.js";

const errorHandler = (err, req, res, next) => {
    // Create a copy of the error to avoid mutating the original directly in unexpected ways
    let error = { ...err };
    error.statusCode = err.statusCode || 500;
    error.message = err.message || "Internal Server Error";

    // --- FIX START: Handle specific errors HERE (Before Env Check) ---

    // 1. Wrong Mongoose ID Error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        error = new ErrorHandler(message, 400);
    }

    // 2. Mongoose Validation Error
    if (err.name === "ValidationError") {
        // ✨ FIX: Added .join(', ') so it sends a clean string instead of a breaking Array
        const message = Object.values(err.errors).map((value) => value.message).join(', ');
        error = new ErrorHandler(message, 400);
    }

    // 3. Mongoose Duplicate Key Error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        error = new ErrorHandler(message, 400);
    }

    // 4. Wrong JWT Error
    if (err.name === "JsonWebTokenError") {
        const message = "JSON Web Token is invalid, try again";
        error = new ErrorHandler(message, 400);
    }

    // 5. JWT Expired Error
    if (err.name === "TokenExpiredError") {
        const message = "JSON Web Token is expired, try again";
        error = new ErrorHandler(message, 400);
    }

    // --- FIX END ---

    // ✨ FIX: Safely read NODE_ENV (removes accidental spaces)
    const env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : "development";

    if (env === "development") {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            stack: err.stack,
            error: err,
        });
    }

    // ✨ FIX: Use 'else' so it ALWAYS sends a response, no matter what!
    else {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
    }
};

export default errorHandler;