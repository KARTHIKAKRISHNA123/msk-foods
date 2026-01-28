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
  // await new Promise(resolve => setTimeout(resolve, 3000));
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
  const isReviewed =product.reviews.find(review => {
    return review.user.toString() == req.user.id.toString();
  });
  
  //Finding whether the user has already reviewed the product
  if (isReviewed) {

    //updating the review
    product.reviews.forEach(review => {
      if (review.user.toString() == req.user.id.toString()) {
        review.comment = comment;
        review.rating = rating;


      }

    });

  }
  else {

    //Adding the review
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  
  // Find the average rating
  product.ratings = product.reviews.reduce((acc, review) => {
    return review.rating + acc;
  }, 0) / product.reviews.length;

  product.ratings = isNaN(product.ratings) ? 0 : product.ratings;

  await product.save({validateBeforeSave: false});

  res.status(200).json({
    success: true,

  });



});


//Get Reviews - api/v1/reviews
export const getReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews
  });

});

//Delete Review - api/v1/review
export const deleteReview = catchAsyncErrors(async(req, res, next) => {
  const product = await Product.findById(req.query.productId);

  //Filtering out the review to be deleted
  const reviews = product.reviews.filter(review => {
    return review._id.toString() !== req.query.id.toString();

  });
  //Getting the number of reviews after deletion
  const numOfReviews = reviews.length;

  //Calculating the ratings after deletion
  let ratings = product.reviews.reduce((acc, review) => {
    return review.rating + acc;


  }, 0) / reviews.length;

  ratings = isNaN(ratings) ? 0: ratings;
  
  //Saving the updated reviews, ratings and numOfReviews to the product
  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    numOfReviews,
    ratings
  })

  res.status(200).json({
    success: true,
  })
})