import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { useStripe, useElements, ... } from '@stripe/react-stripe-js'; // ❌ REMOVED
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import MetaData from '../layouts/MetaData';
import CheckoutSteps from './CheckoutSteps';

export default function Payment() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.authState);
    const { items: cartItems, shippingInfo } = useSelector(state => state.cartState);
    
    const [payDisable, setPayDisable] = useState(false);

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

    const paymentData = {
        amount: Math.round(orderInfo ? orderInfo.totalPrice * 100 : 0),
        shipping: {
            name: user.name,
            address: {
                city: shippingInfo.city,
                postal_code: shippingInfo.postalCode,
                country: shippingInfo.country,
                state: shippingInfo.state,
                line1: shippingInfo.address
            },
            phone: shippingInfo.phoneNo
        }
    }

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice;
        order.shippingPrice = orderInfo.shippingPrice;
        order.taxPrice = orderInfo.taxPrice;
        order.totalPrice = orderInfo.totalPrice;
    }

    useEffect(() => {
        if (!orderInfo) {
            toast.error("Order information missing. Please confirm again.", { position: "top-center", theme: "colored" });
            navigate('/order/confirm');
        }
    }, [orderInfo, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setPayDisable(true);
        const toastId = toast.loading("Processing Secure Payment...", { position: "top-center", theme: "colored" });

        try {
            // --- MOCK PAYMENT LOGIC (Since Stripe is removed) ---
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mock success
            toast.update(toastId, { render: "Payment Successful! Order Placed (Mock).", type: "success", isLoading: false, autoClose: 5000 });
            
            // TODO: dispatch(createOrder(order)); 
            
            navigate('/order/success');

        } catch (error) {
            toast.update(toastId, { render: error.response?.data?.message || "Payment Error", type: "error", isLoading: false, autoClose: 5000 });
            setPayDisable(false);
        }
    }

    // Styles for the dummy inputs to match your Royal Theme
    const inputStyle = {
        width: '100%',
        border: 'none',
        borderBottom: '1px solid rgba(197, 160, 89, 0.3)',
        borderRadius: 0,
        background: 'transparent',
        padding: '10px 0',
        color: '#0f420f',
        fontSize: '16px',
        fontFamily: "'Montserrat', sans-serif",
        outline: 'none'
    };

    return (
        <Fragment>
            <MetaData title={'Secure Payment Gateway'} />

            <div style={{
                backgroundColor: "#F4E7CE",
                minHeight: "100vh",
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
                paddingBottom: "80px"
            }}>
                
                <CheckoutSteps shipping confirmOrder payment />

                <div className="row wrapper justify-content-center align-items-center m-0" style={{ minHeight: '60vh' }}>
                    <div className="col-11 col-md-6 col-lg-4">
                        
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="shadow-lg p-5"
                            style={{ 
                                background: '#ffffff', 
                                borderRadius: '15px', 
                                borderTop: '6px solid #c5a059', 
                                position: 'relative',
                                overflow: 'hidden'    
                            }}
                        >
                            {/* Inner Ceremonial Frame */}
                            <div style={{
                                position: 'absolute', top: '15px', left: '15px', right: '15px', bottom: '15px',
                                border: '1px solid rgba(197, 160, 89, 0.2)', pointerEvents: 'none', borderRadius: '15px'
                            }} />

                            <form onSubmit={submitHandler} style={{ position: 'relative', zIndex: 1 }}>
                                <div className="text-center mb-5">
                                    <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#0f420f', fontWeight: '700' }}>
                                        Card Payment
                                    </h2>
                                    <div style={{ width: '40px', height: '2px', background: '#c5a059', margin: '15px auto', opacity: 0.7 }}></div>
                                    <p className="text-muted small">SECURE SSL ENCRYPTED CONNECTION</p>
                                </div>

                                {/* Placeholder Card Number */}
                                <div className="form-group mb-4">
                                    <label className="fw-bold mb-2 small text-uppercase" style={{ color: '#c5a059', letterSpacing: '1.5px' }}>Card Number</label>
                                    <input 
                                        type="text" 
                                        placeholder="0000 0000 0000 0000" 
                                        style={inputStyle}
                                    />
                                </div>

                                {/* Placeholder Expiry & CVC */}
                                <div className="row mb-5">
                                    <div className="col-6">
                                        <label className="fw-bold mb-2 small text-uppercase" style={{ color: '#c5a059', letterSpacing: '1.5px' }}>Expiry</label>
                                        <input 
                                            type="text" 
                                            placeholder="MM / YY" 
                                            style={inputStyle}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label className="fw-bold mb-2 small text-uppercase" style={{ color: '#c5a059', letterSpacing: '1.5px' }}>CVC</label>
                                        <input 
                                            type="text" 
                                            placeholder="123" 
                                            style={inputStyle}
                                        />
                                    </div>
                                </div>

                                <motion.button
                                    id="pay_btn"
                                    type="submit"
                                    whileHover={{ scale: 1.01, boxShadow: "0 10px 20px rgba(197, 160, 89, 0.2)" }}
                                    whileTap={{ scale: 0.99 }}
                                    disabled={payDisable}
                                    className="btn w-100 py-3"
                                    style={{ 
                                        background: 'linear-gradient(135deg, #d4af37 0%, #c5a059 100%)', 
                                        color: '#0f420f', 
                                        border: 'none', 
                                        borderRadius: '5px', 
                                        letterSpacing: '2px', 
                                        textTransform: 'uppercase', 
                                        fontWeight: '700',
                                        fontSize: '0.9rem',
                                        boxShadow: '0 4px 10px rgba(197, 160, 89, 0.2)'
                                    }}
                                >
                                    Pay {orderInfo && ` ₹${orderInfo.totalPrice}`}
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}