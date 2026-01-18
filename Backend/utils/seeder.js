import fs from "fs";
//import products from "../data/products.json" assert { type: "json" };
import Product from "../models/productModel.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "../config/config.env") });
import connectDatabase from "../config/database.js";
connectDatabase();

// const seedProduct = async (product) => {
//     await Product.create(product);
//     console.log(`${product.name} is added`);

//}

const products = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/products.json"))
);

const seedProducts = async () => {
  try {
    await Product.deleteMany({});
    console.log("All Products are deleted");
    await Product.insertMany(products);
    console.log("All Products are added");
  } catch (err) {
    console.log(err.message);
    
  }
  process.exit();
};

seedProducts();
