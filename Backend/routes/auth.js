import express from "express";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/authenticate.js";

const router = express.Router();
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
import { get } from "mongoose";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logOutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/myprofile").get(isAuthenticatedUser, getUserProfile);
router.route("/password/change").put(isAuthenticatedUser, changePassword);
router.route("/update").put(isAuthenticatedUser, updateProfile);

//Admin routes
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles('admin'), getAllUsers);
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoles('admin'), getUser)
.put(isAuthenticatedUser,authorizeRoles('admin'), updateUser)
.delete(isAuthenticatedUser,authorizeRoles('admin'), deleteUser);



export default router;
