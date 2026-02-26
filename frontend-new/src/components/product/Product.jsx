import React from 'react'; 
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// ✨ Added useSelector
import { useDispatch, useSelector } from 'react-redux'; 
import { addToCart } from '../../slices/cartSlice'; 
import { toast } from 'react-toastify';

export default function Product({ product }) {
    const dispatch = useDispatch();
    
    // ✨ Pull the current cart items from the Redux store
    const { items: cartItems } = useSelector(state => state.cartState);
    
    const hasBackImage = product.images && product.images.length > 1;

    // ✨ Upgraded to Smart Add to Cart Logic
    const addToCartHandler = () => {
        // 1. Check if this product is already in the cart
        const existingItem = cartItems.find(item => item.product === product._id);

        // 2. Calculate the new quantity (Current Quantity + 1, or just 1)
        const newQuantity = existingItem ? existingItem.quantity + 1 : 1;

        // 3. Protect against adding more than the available stock
        if (newQuantity > product.stock) {
            toast.error("You have reached the maximum available stock for this premium item.", { 
                position: "top-center", 
                theme: "colored" 
            });
            return;
        }

        // 4. Dispatch the correct accumulated quantity to the override reducer
        dispatch(addToCart(product._id, newQuantity));
        
        toast.success('Added to your Royal Cart', {
            position: 'top-center',
            theme: "colored"
        });
    }

    return (
        <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}    
            viewport={{ once: true }}    
            transition={{ duration: 0.8 }}
            className="container mt-5 mb-5"
        >
            <div className="row align-items-center">
                
                <div className="col-md-6 text-center" style={{ perspective: '1500px' }}> 
                    <motion.div 
                        className="image-card-wrapper"
                        initial="front"
                        whileHover={hasBackImage ? "back" : "front"} 
                        variants={{
                            front: { rotateY: 0 },
                            back: { rotateY: 180 }
                        }}
                        transition={{ duration: 1.2, ease: "easeInOut" }} 
                        style={{ 
                            position: 'relative', 
                            width: '100%', 
                            height: '550px',
                            transformStyle: 'preserve-3d', 
                            cursor: 'pointer'
                        }}
                    >
                        <motion.div
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backfaceVisibility: 'hidden', 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <motion.img 
                                src={product.images && product.images[0] ? product.images[0].image : '/images/placeholder.png'} 
                                alt={product.name}
                                className="img-fluid"
                                style={{ maxHeight: '550px', borderRadius: '15px' }}
                                animate={{ 
                                    scale: [1, 1.02, 1], 
                                    filter: [
                                        'drop-shadow(0 25px 50px rgba(10, 47, 10, 0.3)) brightness(1)', 
                                        'drop-shadow(0 40px 70px rgba(10, 47, 10, 0.4)) brightness(1.1)', 
                                        'drop-shadow(0 25px 50px rgba(10, 47, 10, 0.3)) brightness(1)'
                                    ]
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>

                        {hasBackImage && (
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    backfaceVisibility: 'hidden',
                                    rotateY: 180, 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <motion.img 
                                    src={product.images[1].image} 
                                    alt={`${product.name} Back View`}
                                    className="img-fluid"
                                    style={{ maxHeight: '550px', borderRadius: '15px' }}
                                    animate={{ 
                                        scale: [1, 1.02, 1], 
                                        filter: [
                                            'drop-shadow(0 25px 50px rgba(10, 47, 10, 0.3)) brightness(1)', 
                                            'drop-shadow(0 40px 70px rgba(10, 47, 10, 0.4)) brightness(1.1)', 
                                            'drop-shadow(0 25px 50px rgba(10, 47, 10, 0.3)) brightness(1)'
                                        ]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                />
                            </motion.div>
                        )}
                    </motion.div>
                </div>

                <div className="col-md-6">
                    <div className="ps-md-5">
                        
                        <motion.div 
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="badge mb-3 px-3 py-2" 
                            style={{backgroundColor: '#f4ebd0', color: '#0a2f0a', letterSpacing: '2px', border: '1px solid #c5a059', borderRadius: '15px'}}
                        >
                            100% NATURAL
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="display-3 fw-bold mb-2" 
                            style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                            {product.name}
                        </motion.h1>

                        <motion.div 
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="d-flex align-items-center mb-4"
                        >
                            <div className="rating-outer me-2">
                                <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                            </div>
                            <span className="text-muted" style={{fontFamily: 'Montserrat, sans-serif'}}>
                                ({product.numOfReviews} Reviews)
                            </span>
                        </motion.div>

                        <motion.h2 
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mb-4" 
                            style={{ color: '#c5a059', fontWeight: '700', fontSize: '3rem', fontFamily: 'Playfair Display, serif' }}
                        >
                            ₹{product.price}
                        </motion.h2>

                        <motion.p 
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="lead mb-5" 
                            style={{ lineHeight: '1.9', color: '#555', fontSize: '1.1rem' }}
                        >
                            {product.description}
                        </motion.p>
                        
                        <motion.div 
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="d-flex align-items-center gap-3"
                        >
                            <button 
                                onClick={addToCartHandler}
                                // ✨ Added a check to disable the button if out of stock
                                disabled={product.stock === 0} 
                                className="btn btn-lg px-5 py-3 shadow" 
                                style={{ 
                                    backgroundColor: product.stock === 0 ? '#999' : '#0a2f0a', 
                                    color: product.stock === 0 ? '#fff' : '#c5a059',
                                    border: `1px solid ${product.stock === 0 ? '#999' : '#0a2f0a'}`,
                                    borderRadius: '30px', 
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    fontWeight: '600',
                                    cursor: product.stock === 0 ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </button>

                            <Link to={`/product/${product._id}`} 
                                className="btn px-4 py-3"
                                style={{
                                    border: '1px solid #0a2f0a',
                                    color: '#0a2f0a',
                                    borderRadius: '30px', 
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    fontWeight: '600',
                                    textDecoration: 'none' 
                                }}
                            >
                                Details
                            </Link>
                        </motion.div>

                    </div>
                </div>

            </div>
        </motion.section>
    )
}