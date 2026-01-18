
import express from "express";
import { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
//This file contains all the routes for the products apis
import { isAuthenticatedUser , authorizeRoles} from "../middlewares/authenticate.js";

const router = express.Router();

router.route("/products").get(isAuthenticatedUser, getProducts);

router.route("/product/:id").get(getSingleProduct).put(updateProduct).delete(deleteProduct);


//Admin routes
router.route("admin/product/new").post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);


export default router;