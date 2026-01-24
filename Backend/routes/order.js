import express from "express";
import { Router } from "express";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/authenticate.js";
import { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } from "../controllers/orderController.js";
import { get } from "mongoose";

const router = Router();

router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/myOrders').get(isAuthenticatedUser, myOrders);

// Admin routes

router.route("/orders").get(isAuthenticatedUser, authorizeRoles('admin'), getAllOrders);
router.route("/order/:id").put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
                          .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);

export default router;