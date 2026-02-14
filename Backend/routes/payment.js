import express from "express";
import { isAuthenticatedUser } from "../middlewares/authenticate.js";
import { processPayment, sendStripeApi } from "../controllers/paymentController.js";
const router = express.Router();

router.route("/payment/process").post( isAuthenticatedUser, processPayment);
router.route("/stripeapikey").get( isAuthenticatedUser, sendStripeApi);



export default router;