import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = catchAsyncErrors(async (req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        description: "MSK Foods - Test Payment",
        metadata: {
            integration_check: "accept_payment"

        },
        shipping: req.body.shipping
    })

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret,

    });
})


export const sendStripeApi = catchAsyncErrors(async (req, res, next) => {
    

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_PUBLISHABLE_KEY
        
    });
})