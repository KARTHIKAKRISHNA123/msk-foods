import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import Order from "../models/orderModel.js";

//Create New Order - api/v1/order/new
export const newOrder = catchAsyncError (async(req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo

        

    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user.id


    })

    res.status(200).json({
        success: true,
        order
    })


})