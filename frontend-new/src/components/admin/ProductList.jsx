import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts } from '../../slices/productsSlice';

import MetaData from '../layouts/MetaData';
import Loader from '../layouts/Loader';
import Sidebar from './Sidebar';

export default function ProductList() {
    const dispatch = useDispatch();
    
    // --- THEME VARIABLES ---
    const fontRoyal = "'Playfair Display', serif";
    const fontModern = "'Montserrat', sans-serif";
    const colorGreen = '#0f420f';
    const colorDarkGreen = '#0a2e0a';
    const colorGold = '#c5a059';
    const colorCream = '#fdfbf7';

    // Fetch products from Redux state
    const { products = [], loading = false } = useSelector(state => state.productsState);

    useEffect(() => {
        dispatch(getAdminProducts());
    }, [dispatch]);

    // --- FRAMER MOTION ANIMATION VARIANTS ---
    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", bounce: 0.3 } }
    };

    const listVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
    };

    const rowVariants = {
        hidden: { opacity: 0, x: -30 },
        show: { opacity: 1, x: 0, transition: { duration: 0.6, type: "spring" } }
    };

    // Reusable Style for the Golden Mobile Labels & Headers
    const labelStyle = {
        color: colorGold, 
        fontSize: '0.75rem', 
        letterSpacing: '2px', 
        textTransform: 'uppercase', 
        fontWeight: '800',
        fontFamily: fontModern,
        opacity: 0.9
    };

    return (
        <Fragment>
            <MetaData title="Inventory Management" />

            <div className="row m-0" style={{ minHeight: '100vh', background: colorCream }}>
                
                {/* LEFT COLUMN: Sidebar */}
                <div className="col-12 col-md-2 p-0" style={{ zIndex: 10 }}>
                    <Sidebar />
                </div>

                {/* RIGHT COLUMN: Inventory Content */}
                <div className="col-12 col-md-10 py-5 px-4 px-md-5" style={{ 
                    backgroundImage: `radial-gradient(circle at 80% 10%, rgba(197, 160, 89, 0.05) 0%, transparent 40%)`
                }}>
                    
                    {/* Header Area */}
                    <div className="mb-5 text-center text-md-start">
                        <motion.h1 
                            initial={{ opacity: 0, y: -20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            style={{ fontFamily: fontRoyal, color: colorGreen, fontWeight: '800', fontSize: '2.8rem', margin: 0 }}
                        >
                            Inventory Command
                        </motion.h1>
                        
                        {/* Animated Gold Line */}
                        <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: '80px' }} 
                            transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
                            style={{ height: '4px', background: colorGold, marginTop: '12px' }} 
                            className="mx-auto mx-md-0 rounded"
                        />
                    </div>

                    {/* Content */}
                    {loading ? <Loader /> : (
                        <motion.div 
                            variants={cardVariants}
                            initial="hidden"
                            animate="show"
                            className="shadow-lg"
                            style={{ 
                                // ✨ Dominant Royal Green Gradient
                                background: `linear-gradient(145deg, ${colorGreen} 0%, ${colorDarkGreen} 100%)`, 
                                borderRadius: '20px', 
                                border: `1px solid rgba(197, 160, 89, 0.4)`, // Subtle Gold Border
                                overflow: 'hidden',
                                position: 'relative',
                                boxShadow: '0 25px 50px rgba(15, 66, 15, 0.2)'
                            }}
                        >
                            {/* Decorative Inner Gold Frame */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                style={{
                                    position: 'absolute', top: '12px', left: '12px', right: '12px', bottom: '12px',
                                    border: `1px dashed rgba(197, 160, 89, 0.25)`, borderRadius: '15px', pointerEvents: 'none', zIndex: 0
                                }}
                            />

                            <div className="p-4 p-md-5" style={{ position: 'relative', zIndex: 1 }}>
                                
                                {/* TABLE HEADER - Hidden on Mobile! */}
                                <div className="d-none d-md-flex pb-3 mb-4" style={{ borderBottom: `2px solid rgba(197, 160, 89, 0.3)` }}>
                                    <div className="col-2" style={labelStyle}>Product ID</div>
                                    <div className="col-4" style={labelStyle}>Item Name</div>
                                    <div className="col-2 text-center" style={labelStyle}>Unit Price</div>
                                    <div className="col-2 text-center" style={labelStyle}>Stock Level</div>
                                    <div className="col-2 text-center" style={labelStyle}>Action</div>
                                </div>

                                {/* TABLE BODY - Fully Responsive with Staggered Entrance */}
                                {products && products.length > 0 ? (
                                    <motion.div variants={listVariants} initial="hidden" animate="show">
                                        <AnimatePresence>
                                            {products.map(product => (
                                                <motion.div 
                                                    key={product._id} 
                                                    variants={rowVariants}
                                                    layout // Smoothly adjusts if items are added/removed
                                                    whileHover={{ 
                                                        scale: 1.02, 
                                                        backgroundColor: 'rgba(197, 160, 89, 0.08)',
                                                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                                        borderRadius: '10px'
                                                    }}
                                                    className="d-flex flex-column flex-md-row align-items-md-center py-4 px-3 mb-2"
                                                    style={{ 
                                                        borderBottom: `1px solid rgba(197, 160, 89, 0.1)`, 
                                                        fontFamily: fontModern, 
                                                        color: colorCream, 
                                                        transition: 'background-color 0.3s ease' 
                                                    }}
                                                >
                                                    
                                                    {/* ID */}
                                                    <div className="col-12 col-md-2 mb-3 mb-md-0 d-flex justify-content-between justify-content-md-start align-items-center" style={{ fontSize: '0.85rem', color: 'rgba(253, 251, 247, 0.6)' }}>
                                                        <span className="d-md-none" style={labelStyle}>ID:</span>
                                                        <span style={{ fontFamily: 'monospace', letterSpacing: '1px' }}>#{product._id.substring(0, 8)}</span>
                                                    </div>
                                                    
                                                    {/* Name */}
                                                    <div className="col-12 col-md-4 mb-3 mb-md-0 d-flex justify-content-between justify-content-md-start align-items-center">
                                                        <span className="d-md-none" style={labelStyle}>Product:</span>
                                                        <h5 className="mb-0 text-end text-md-start" style={{ fontFamily: fontRoyal, fontWeight: '700', color: colorGold, fontSize: '1.25rem', letterSpacing: '1px' }}>
                                                            {product.name}
                                                        </h5>
                                                    </div>
                                                    
                                                    {/* Price */}
                                                    <div className="col-12 col-md-2 mb-3 mb-md-0 d-flex justify-content-between justify-content-md-center align-items-center" style={{ fontSize: '1.15rem', fontWeight: '600' }}>
                                                        <span className="d-md-none" style={labelStyle}>Price:</span>
                                                        <span>₹{product.price}</span>
                                                    </div>
                                                    
                                                    {/* Stock Status Pill */}
                                                    <div className="col-12 col-md-2 mb-4 mb-md-0 d-flex justify-content-between justify-content-md-center align-items-center">
                                                        <span className="d-md-none" style={labelStyle}>Stock:</span>
                                                        <motion.span 
                                                            whileHover={{ scale: 1.1 }}
                                                            style={{ 
                                                                background: product.stock > 0 ? 'rgba(197, 160, 89, 0.15)' : 'rgba(217, 83, 79, 0.2)', 
                                                                color: product.stock > 0 ? colorGold : '#ff6b6b', 
                                                                padding: '6px 16px', 
                                                                borderRadius: '30px',
                                                                fontSize: '0.8rem',
                                                                fontWeight: '800',
                                                                letterSpacing: '1px',
                                                                textTransform: 'uppercase',
                                                                border: product.stock > 0 ? `1px solid rgba(197, 160, 89, 0.3)` : `1px solid rgba(217, 83, 79, 0.4)`
                                                            }}
                                                        >
                                                            {product.stock} Units
                                                        </motion.span>
                                                    </div>
                                                    
                                                    {/* Action Button */}
                                                    <div className="col-12 col-md-2 d-flex justify-content-end justify-content-md-center mt-2 mt-md-0">
                                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-100 w-md-auto">
                                                            <Link to={`/admin/product/${product._id}`} className="btn w-100 text-center shadow-sm" style={{ 
                                                                background: 'linear-gradient(135deg, #d4af37 0%, #c5a059 100%)', 
                                                                color: colorDarkGreen, 
                                                                border: 'none', 
                                                                borderRadius: '8px', 
                                                                padding: '10px 24px',
                                                                fontWeight: '800',
                                                                fontSize: '0.8rem',
                                                                letterSpacing: '1.5px',
                                                                textTransform: 'uppercase'
                                                            }}>
                                                                <i className="fa fa-pencil me-2"></i> Edit
                                                            </Link>
                                                        </motion.div>
                                                    </div>

                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-5 text-center" 
                                        style={{ fontFamily: fontModern, color: 'rgba(253, 251, 247, 0.5)' }}
                                    >
                                        <i className="fa fa-box-open mb-3" style={{ fontSize: '3.5rem', color: colorGold }}></i>
                                        <h5 style={{ letterSpacing: '1px' }}>The vault is empty.</h5>
                                    </motion.div>
                                )}

                            </div>
                        </motion.div>
                    )}

                </div>
            </div>
        </Fragment>
    );
}