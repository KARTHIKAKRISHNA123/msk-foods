
import express from "express";
import { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createReview, getReviews, deleteReview } from "../controllers/productController.js";
//This file contains all the routes for the products apis
import { isAuthenticatedUser , authorizeRoles} from "../middlewares/authenticate.js";

const router = express.Router();

router.route("/products").get( getProducts);

router.route("/product/:id").get(getSingleProduct).put(updateProduct).delete(deleteProduct);
router.route("/review").put(isAuthenticatedUser, createReview)
                        .delete(isAuthenticatedUser, deleteReview);
router.route("/reviews").get(getReviews);




//Admin routes
router.route("admin/product/new").post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);


export default router;