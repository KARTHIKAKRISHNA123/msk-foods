
import express from "express";
import { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createReview, getReviews, deleteReview } from "../controllers/productController.js";
//This file contains all the routes for the products apis
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/authenticate.js";
import { getAdminProducts } from "../controllers/productController.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const router = express.Router();

// REPLACE WITH:
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const uploadPath = path.join(__dirname, '..', "uploads/products");
            fs.mkdirSync(uploadPath, { recursive: true });
            cb(null, uploadPath);
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    })
});
router.route("/products").get(getProducts);

router.route("/product/:id").get(getSingleProduct).put(updateProduct).delete(deleteProduct);
router.route("/review").put(isAuthenticatedUser, createReview)
    .delete(isAuthenticatedUser, deleteReview);
router.route("/reviews").get(getReviews);




//Admin routes
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles('admin'), upload.array("images"), newProduct);
router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);


export default router;