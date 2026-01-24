import Product from "../models/productModel.js";
// This file contains all the controllers for the products which is the api for products
import mongoose from "mongoose";
import errorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import APIFeatures from "../utils/apiFeatures.js";

//Get All Products - /api/v1/products
export const getProducts = async (req, res, next) => {

  const resPerPage = 2;

  const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    //message: "This route will show all products in the database"
    count: products.length,
    products,
  });
};

//Create Product - /api/v1/product/new
export const newProduct = catchAsyncErrors(async (req, res, next) => {

  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//Get Single Product - api/v1/product/:id
export const getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new errorHandler("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

//Update Product - api/v1/product/:id
export const updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    product,
  });
};

//Delete Product - api/v1/product/:id
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product is deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



//Create Review - api/v1/review
export const createReview = catchAsyncErrors(async (req, res, next) => {
  const {productId, rating, comment} = req.body;
  const review = {
    user: req.user.id,
    rating,
    comment,

  }

  const product = await Product.findById(productId);
  product.reviews.find();
  

});