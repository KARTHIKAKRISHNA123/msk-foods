import express from "express";
import { Router } from "express";
import { isAuthenticatedUser } from "../middlewares/authenticate.js";
import { newOrder } from "../controllers/orderController.js";

const router = Router();

router.route('order/new').post(isAuthenticatedUser, newOrder);