import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";

//Create New Order - api/v1/order/new
export const newOrder = catchAsyncErrors (async(req, res, next) => {
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
        user: req.user.i


    })

    res.status(200).json({
        success: true,
        order
    })


})

//Get Single Order - api/v1/order/:id
export const getSingleOrder = catchAsyncErrors(async(req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) {
        return next(new ErrorHandler("Order not found with this id: ${req.params.id}", 404));
    }

    res.status(200).json({
        success: true,
        order
    })


})


//Get Logged in User Orders - /api/v1/myorders
export const myOrders = catchAsyncErrors(async(req, res, next) => {
    const orders = await Order.find({user: req.user.id});
    
    res.status(200).json({
        success: true,
        orders
    })


});

//Admin Routes: Get All Orders - api/v1/orders

export const getAllOrders = catchAsyncErrors(async(req, res, next) => {
    const orders = await Order.find();
    
    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })


})

//Admin Routes: Update Order / Order Status  - api/v1/order/:id
export const updateOrder = catchAsyncErrors(async(req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (order.orderStatus == "Delivered") {
        return next(new ErrorHandler("You have already Received this order, Because the Order is already delivered", 400));

    }

    //Updating the product stock of each order item
    order.orderItems.forEach(async (orderItem) => {
        await updateStock(orderItem.product, orderItem.quantity);


    })

    order.orderStatus = req.body.orderStatus;
    order.deliverdAt = Date.now();

    await order.save();

    res.status(200).json({
        success: true,
    })

});


async function updateStock(productId, quantity) {
    const product = await Product.findById(productId);
    product.stock -= quantity;
    product.save({validateBeforeSave: false});

}


//Admin Routes: Delete Order  - api/v1/order/:id

export const deleteOrder = catchAsyncErrors(async(req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("Order not found with this id: ${req.params.id}", 404));
    }

    await order.deleteOne();
    res.status(200).json({
        success: true,

    })
})

