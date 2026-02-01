import express from "express";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/authenticate.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url'; // ✨ Required for __dirname fix

// ✨ Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const upload = multer({
    // ✨ Changed to diskStorage so it saves to your folder
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            // Ensure you create this folder: backend/uploads/user
            cb(null, path.join(__dirname, '..', "uploads/user"))
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
    })
});

import {
  loginUser,
  registerUser,
  logOutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  changePassword,
  updateProfile,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
} from "../controllers/authController.js";

// Routes
router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logOutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/myprofile").get(isAuthenticatedUser, getUserProfile);
router.route("/password/change").put(isAuthenticatedUser, changePassword);

// Apply upload middleware here too for profile updates
router.route("/update").put(isAuthenticatedUser, upload.single("avatar"), updateProfile);

//Admin routes
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles('admin'), getAllUsers);
router.route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRoles('admin'), getUser)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

export default router;