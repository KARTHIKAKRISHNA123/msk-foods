import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import User from '../models/userModels.js';
import sendEmail from '../utils/email.js';
import ErrorHandler from '../utils/errorHandler.js';
import sendToken from '../utils/jwt.js';
import crypto from 'crypto';

//Register a user - /api/v1/register
export const registerUser = catchAsyncErrors(async(req, res, next) => {
    // ✨ Handle multipart data (images) correctly
    const { name, email, password } = req.body;
    let avatar;

    if (req.file) {
        // ✨ FIXED: Use req.get('host') to include the port (e.g., localhost:8000)
        // ✨ FIXED: Removed duplicate ${req.host}
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        avatar = `${baseUrl}/uploads/user/${req.file.originalname}`;
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

    //Create reset password url
    const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

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
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire: {
            $gt: Date.now()
        }
    });

    if (!user) {
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired", 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });

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
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    };

    // ✨ FIXED: Logic to handle Avatar Update
    if (req.file) {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        newUserData.avatar = `${baseUrl}/uploads/user/${req.file.originalname}`;
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        user
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