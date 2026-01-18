import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { validateHeaderName } from "http";

const userSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email address"]

    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        maxlength: [6, "Password cannot exceed 6 characters"],
        select: false
    },
    avatar: {
        type: String,
        required: true

    },
    role : {
        type: String,
        default: "user"

    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }



});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.getJWTToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })

}

userSchema.methods.isValidPassword = async function (enteredPassword) {
    return  bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.getResetToken = function() {
    //generate token
    const token = crypto.randomBytes(20).toString("hex");

    //hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

    //set token expire time
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;

    return token;

}

let model = mongoose.model("User", userSchema);
export default model;