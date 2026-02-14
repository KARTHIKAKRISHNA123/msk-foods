import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MetaData from '../layouts/MetaData';
import CheckoutSteps from './CheckoutSteps';

export default function ConfirmOrder() {
    const { shippingInfo, items: cartItems } = useSelector(state => state.cartState);
    const { user } = useSelector(state => state.authState);
    const navigate = useNavigate();

    // ✨ YOUR INCLUSIVE GST LOGIC
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const gstRate = 0.05;
    
    // Logic: Calculate the tax portion already inside the total price
    const taxPrice = Number(((itemsPrice * gstRate) / (1 + gstRate)).toFixed(2)); 
    const basePrice = Number((itemsPrice - taxPrice).toFixed(2));
    
    const shippingPrice = itemsPrice > 2000 ? 0 : 100;
    const totalPrice = (Number(itemsPrice) + Number(shippingPrice)).toFixed(2);

    const processPayment = () => {
        const data = { 
            itemsPrice: basePrice, 
            shippingPrice, 
            taxPrice, 
            totalPrice 
        };
        sessionStorage.setItem('orderInfo', JSON.stringify(data));
        navigate('/payment');
    };

    useEffect(() => {
        if (!shippingInfo || !shippingInfo.address) navigate('/shipping');
    }, [shippingInfo, navigate]);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <Fragment>
            <MetaData title={'Final Selection Review'} />

            <div style={{
                backgroundColor: "#F4E7CE",
                minHeight: "100vh",
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
                paddingBottom: "80px"
            }}>
                
                <CheckoutSteps shipping confirmOrder />

                <div className="container mt-5">
                    <div className="row g-5">
                        
                        {/* LEFT: DELIVERY & ITEMS */}
                        <motion.div 
                            className="col-lg-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Delivery Card */}
                            <motion.div variants={itemVariants} className="card border-0 shadow-lg mb-5" style={{ borderRadius: '15px', backgroundColor: '#fff', borderTop: '6px solid #c5a059' }}>
                                <div className="card-body p-5">
                                    <h4 className="mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#0f420f', fontWeight: '700' }}>Delivery Details</h4>
                                    <div style={{ width: '40px', height: '2px', background: '#c5a059', marginBottom: '25px', opacity: 0.7 }}></div>
                                    
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <p className="small text-uppercase mb-1" style={{ color: '#c5a059', letterSpacing: '1px', fontWeight: 'bold' }}>Recipient</p>
                                            <p className="h6" style={{ color: '#0f420f' }}>{user && user.name}</p>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <p className="small text-uppercase mb-1" style={{ color: '#c5a059', letterSpacing: '1px', fontWeight: 'bold' }}>Contact Number</p>
                                            <p className="h6" style={{ color: '#0f420f' }}>{shippingInfo.phoneNo}</p>
                                        </div>
                                        <div className="col-12">
                                            <p className="small text-uppercase mb-1" style={{ color: '#c5a059', letterSpacing: '1px', fontWeight: 'bold' }}>Shipping Address</p>
                                            <p className="h6 mb-0" style={{ color: '#0f420f', lineHeight: '1.6' }}>
                                                {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.state}, ${shippingInfo.country}`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <h4 className="mb-4 ps-2" style={{ fontFamily: 'Playfair Display, serif', color: '#0f420f', fontWeight: '700' }}>Your Selection</h4>

                            <AnimatePresence>
                                {cartItems.map(item => (
                                    <motion.div key={item.product} variants={itemVariants} layout className="card border-0 shadow-sm mb-4" style={{ borderRadius: "15px", backgroundColor: "#fff" }}>
                                        <div className="row g-0 align-items-center p-3">
                                            <div className="col-3 col-md-2 text-center">
                                                <img src={item.image} alt={item.name} className="img-fluid rounded" style={{ maxHeight: "80px", objectFit: "contain" }} />
                                            </div>
                                            <div className="col-9 col-md-6 ps-3">
                                                <Link to={`/product/${item.product}`} className="text-decoration-none h5 d-block mb-1" style={{ color: "#0f420f", fontFamily: "Playfair Display, serif", fontWeight: "bold" }}>{item.name}</Link>
                                                <small className="text-muted text-uppercase" style={{ fontSize: "0.7rem", letterSpacing: "1px" }}>Traditional Gold Standard</small>
                                            </div>
                                            <div className="col-12 col-md-4 text-md-end pe-md-4 mt-2 mt-md-0">
                                                <p className="mb-0" style={{ color: "#666", fontSize: '0.9rem' }}>{item.quantity} Units x <span style={{ color: "#c5a059", fontWeight: '600' }}>₹{item.price}</span></p>
                                                <p className="fw-bold mb-0" style={{ color: "#0f420f", fontSize: "1.2rem" }}>₹{(item.quantity * item.price).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {/* RIGHT: SUMMARY (Strictly consistent with Cart) */}
                        <div className="col-lg-4">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="card border-0 shadow-lg sticky-top text-white"
                                style={{ 
                                    backgroundColor: "#0f420f", 
                                    borderRadius: "15px",
                                    top: "120px",
                                    overflow: "hidden",
                                    boxShadow: '0 30px 60px rgba(15, 66, 15, 0.15)'
                                }}
                            >
                                <div className="card-body p-4">
                                    <h4 className="mb-4 pb-3" style={{ fontFamily: "Playfair Display, serif", borderBottom: "1px solid rgba(197, 160, 89, 0.3)" }}>Order Summary</h4>

                                    <div className="d-flex justify-content-between mb-3">
                                        <span style={{ opacity: 0.8 }}>Base Price</span>
                                        <span className="fw-bold" style={{ color: "#c5a059" }}>₹{basePrice.toFixed(2)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-3">
                                        <span style={{ opacity: 0.8 }}>GST (5% Included)</span>
                                        <span className="fw-bold" style={{ color: "#c5a059" }}>₹{taxPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-4">
                                        <span style={{ opacity: 0.8 }}>Shipping Fee</span>
                                        <span className="fw-bold" style={{ color: "#c5a059" }}>₹{shippingPrice}</span>
                                    </div>

                                    <div className="d-flex justify-content-between mb-4 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                                        <span className="h6 mb-0 fw-bold text-uppercase">Grand Total</span>
                                        <span className="h3 mb-0 fw-bold" style={{ color: "#c5a059" }}>₹{totalPrice}</span>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={processPayment}
                                        className="btn w-100 py-3 shadow"
                                        style={{ backgroundColor: "#c5a059", color: "#0f420f", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px", borderRadius: "5px", border: "none" }}
                                    >
                                        Proceed to Payment
                                    </motion.button>

                                    <div className="mt-4 text-center">
                                        <small style={{ opacity: 0.7, fontSize: "0.65rem", color: "#c5a059", textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            <i className="fa fa-lock me-2"></i>Secure Royal Checkout
                                        </small>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
}