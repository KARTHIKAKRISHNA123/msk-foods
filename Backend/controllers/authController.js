import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import User from '../models/userModels.js';
import sendEmail from '../utils/email.js';
import ErrorHandler from '../utils/errorHandler.js';
import sendToken from '../utils/jwt.js';
import crypto from 'crypto';
import fs from 'fs'; 
import path from 'path'; 
import { fileURLToPath } from 'url'; // ✨ Added for ES Module compatibility

// ✨ Safe __dirname declaration for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Register a user - /api/v1/register
export const registerUser = catchAsyncErrors(async(req, res, next) => {
    const { name, email, password } = req.body;
  let avatar;

  // 1. Set the default base URL from your .env file
  let baseUrl = process.env.BACKEND_URL;

  // 2. Override it dynamically only if in production
  if (process.env.NODE_ENV === "production") {
    baseUrl = `${req.protocol}://${req.get('host')}`;
  }

  // 3. Construct the avatar path
  if (req.file) {
    // FIXED: Use req.file.filename (Unique Name) instead of originalname
    avatar = `${baseUrl}/uploads/user/${req.file.filename}`;
  }

    const user = await User.create({
        name,
        email,
        password,
        avatar
    });

    sendToken(user, 201, res);
});

//Login User - /api/v1/login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email & password", 400));
    }

    //finding the user from database
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    if (!await user.isValidPassword(password)) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 201, res);
});


//Logout User - /api/v1/logout
export const logOutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    }).status(200)
        .json({
            success: true,
            message: "Logged Out"
        });
});

//Forgot Password - /api/v1/password/forgot
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User Not found with this email", 404));
    }

    const resetToken = user.getResetToken();
    await user.save({ validateBeforeSave: false });

    // ✨ FIX: Dynamic Frontend URL for the email link
    let frontendUrl = process.env.FRONTEND_URL;
    if (process.env.NODE_ENV === "production") {
        // This ensures the email link points to your live AWS domain
        frontendUrl = `${req.protocol}://${req.get('host')}`;
    }

    //Create reset password url
    const resetUrl = `${frontendUrl}/password/reset/${resetToken}`;

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then please ignore it.`;

    try {
        sendEmail({
            email: user.email,
            subject: `MSK Foods Password Recovery`,
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});


//Reset Password - /api/v1/password/reset/:token
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
    // 1. Hash the token from the URL
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    // 2. Find user with that token AND check if it hasn't expired
    // ✅ Uses 'resetPasswordTokenExpire' to match your User Model
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire: { $gt: Date.now() } 
    });

    if (!user) {
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired", 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    // 3. Set new password
    // Because of your pre('save') hook, this will be automatically hashed!
    user.password = req.body.password;
    
    // 4. Clear reset token fields so they can't be used again
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;

    // 5. Save (triggers the hashing middleware)
    await user.save();

    sendToken(user, 201, res);
});

//Get User Profile - /api/v1/myprofile
export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    });

});


//Change Password - /api/v1/password/change
export const changePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    //check previous user password
    if (!await user.isValidPassword(req.body.oldPassword)) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    //Assigning New Password 
    user.password = req.body.password;
    await user.save();
    res.status(200).json({
        success: true,
    });

});

//Update User Profile
//Update User Profile
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    };

    if (req.file) {
        const user = await User.findById(req.user.id);
        
        // PRO-TIP: Delete the old avatar from the server to save space
        if (user.avatar && user.avatar.includes('/uploads/user/')) {
            const oldAvatarFilename = user.avatar.split('/').pop();
            
            // ✨ FIX 1: Corrected folder path to properly delete old images
            const oldAvatarPath = path.join(__dirname, `../uploads/user/${oldAvatarFilename}`);
            
            if (fs.existsSync(oldAvatarPath)) {
                fs.unlinkSync(oldAvatarPath);
            }
        }

        // ✨ FIX 2: Bulletproof AWS Public IP assignment
        // This explicitly uses your BACKEND_URL from config.env, or grabs the AWS IP from the browser request
        let baseUrl = process.env.BACKEND_URL || `${req.protocol}://${req.get('host')}`;

        // Construct the avatar path using the unique filename
        newUserData.avatar = `${baseUrl}/uploads/user/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        user: updatedUser
    });
});

//Admin: Get All Users - /api/v1/admin/users
export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    });
});

//Admin: Get Single User Details - /api/v1/admin/user/:id
export const getUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`));
    }
    res.status(200).json({
        success: true,
        user
    });

});

//Admin: Update User Role - /api/v1/admin/user/:id
export const updateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        user
    });
});

//Admin: Delete User - /api/v1/admin/user/:id
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`));
    }
    await user.deleteOne();
    res.status(200).json({
        success: true,
    });
});