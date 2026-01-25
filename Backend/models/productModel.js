import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter the Product Name"],
        trim: true,
        maxLength: [100, "Product Name Cannot Exceed 100 Characters"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter the Product Price"],
        default: 0.0,
        

    },
    description: {
        type: String,
        required: [true, "Please Enter the Product Description"]
    },
    ratings: {
        type: String,
        default: 0
    },
    images: [
        {
            image: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please Enter the Product Category"],
        enum: {
            values: [
                'Electronics',
                'Mobile Phones',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home',
                'Health Food'
            ],
            message: "Please Select Correct Category"
        },
    },
    seller: {
        type: String,
        required: [true, "Please Enter the Product Seller"]
    },
    stock: {
        type: Number,
        required: [true, "Please Enter the Product Stock"],
        default: 0,
        maxLength: [20, "Product Stock Cannot Exceed 20"],
        min: [0, "Product Stock Cannot be Negative"]
        
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            // user: {
            //     type: mongoose.Schema.ObjectId,
            //     ref: "User",
            //     required: true
            // },
            // 
            user: mongoose.Schema.Types.ObjectId,
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],

    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    



});

let schema = mongoose.model("Product", productSchema);
export default schema;