import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify'; 
// Note: Redux actions removed temporarily for UI testing

export default function Product({ product }) {
    const [activeImage, setActiveImage] = useState(null);

    const addToCartHandler = () => {
        // Temporary UI-only feedback
        toast.success('Item Added to Cart!',{
            position: 'bottom-center'
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
                
                {/* --- LEFT: Product Image --- */}
                <div className="col-md-6 text-center position-relative">
                    <motion.div 
                        className="image-container"
                        style={{ perspective: '1000px' }}
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        onMouseEnter={() => {
                            if (product.images && product.images[1]) {
                                setActiveImage(product.images[1].image);
                            }
                        }}
                        onMouseLeave={() => setActiveImage(null)}
                    >
                        <motion.img 
                            src={activeImage || (product.images && product.images[0] ? product.images[0].image : '/images/placeholder.png')} 
                            alt={product.name}
                            className="img-fluid"
                            style={{ maxHeight: '550px', cursor: 'pointer' }}
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
                </div>

                {/* --- RIGHT: Product Details --- */}
                <div className="col-md-6">
                    <div className="ps-md-5">
                        
                        <motion.div 
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="badge mb-3 px-3 py-2" 
                            style={{backgroundColor: '#f4ebd0', color: '#0a2f0a', letterSpacing: '2px', border: '1px solid #c5a059'}}
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
                                className="btn btn-lg px-5 py-3 shadow" 
                                style={{ 
                                    backgroundColor: '#0a2f0a', 
                                    color: '#c5a059',
                                    border: '1px solid #0a2f0a',
                                    borderRadius: '0',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    fontWeight: '600'
                                }}
                            >
                                Add to Cart
                            </button>

                            <Link to={`/product/${product._id}`} 
                                className="btn px-4 py-3"
                                style={{
                                    border: '1px solid #0a2f0a',
                                    color: '#0a2f0a',
                                    borderRadius: '0',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    fontWeight: '600'
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