import ErrorHandler from "../utils/errorHandler.js";

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // --- FIX START: Handle specific errors HERE (Before Env Check) ---

    // 1. Wrong Mongoose ID Error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // 2. Mongoose Validation Error
    // FIX: Changed "ValidatorError" to "ValidationError"
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((value) => value.message);
        err = new ErrorHandler(message, 400);
    }

    // 3. Mongoose Duplicate Key Error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    // 4. Wrong JWT Error
    if (err.name === "JsonWebTokenError") {
        const message = "JSON Web Token is invalid, try again";
        err = new ErrorHandler(message, 400);
    }

    // 5. JWT Expired Error
    if (err.name === "TokenExpiredError") {
        const message = "JSON Web Token is expired, try again";
        err = new ErrorHandler(message, 400);
    }

    // --- FIX END ---

    if (process.env.NODE_ENV == "development") {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: err.stack,
            error: err,
        });
    }

    if (process.env.NODE_ENV == "production") {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
};

export default errorHandler;