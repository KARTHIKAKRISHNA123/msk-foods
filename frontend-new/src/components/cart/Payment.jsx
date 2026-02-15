import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import MetaData from '../layouts/MetaData';
import CheckoutSteps from './CheckoutSteps';

export default function Payment() {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.authState);
    const { shippingInfo } = useSelector(state => state.cartState);
    
    const [payDisable, setPayDisable] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

    useEffect(() => {
        if (!shippingInfo || !shippingInfo.address) {
            navigate('/shipping');
            return;
        }
        if (!orderInfo) {
            navigate('/order/confirm');
        }
    }, [shippingInfo, orderInfo, navigate]);

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
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setPayDisable(true);
        const toastId = toast.loading("Processing Secure Royal Payment...", { position: "top-center", theme: "colored" });

        try {
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.post('/api/v1/payment/process', paymentData, config);
            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: { name: user.name, email: user.email }
                }
            });

            if (result.error) {
                toast.update(toastId, { render: result.error.message, type: "error", isLoading: false, autoClose: 5000 });
                setPayDisable(false);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    toast.update(toastId, { render: "Payment Successful!", type: "success", isLoading: false, autoClose: 5000 });
                    sessionStorage.removeItem('orderInfo'); 
                    navigate('/order/success');
                } else {
                    toast.update(toastId, { render: "Payment processing failed.", type: "warning", isLoading: false, autoClose: 5000 });
                    setPayDisable(false);
                }
            }
        } catch (error) {
            toast.update(toastId, { render: error.response?.data?.message || "Payment Error", type: "error", isLoading: false, autoClose: 5000 });
            setPayDisable(false);
        }
    };

    // ✨ STRIPE STYLING - Matches Montserrat Font from Login
    const stripeOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#0f420f', // Deep Royal Green
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: '0.05em', 
                fontWeight: '500',
                fontSmoothing: 'antialiased',
                '::placeholder': {
                    color: 'transparent', // ✨ NO VISIBLE PLACEHOLDERS
                },
                iconColor: '#c5a059' 
            },
            invalid: { color: '#9e2146', iconColor: '#9e2146' }
        }
    };

    // Matches Login.jsx Input Style exactly
    const getInputWrapperStyle = (fieldName) => ({
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: focusedField === fieldName ? '#c5a059' : 'rgba(197, 160, 89, 0.3)',
        padding: '10px 0',
        transition: 'all 0.3s ease',
        background: 'transparent'
    });

    return (
        <Fragment>
            <MetaData title={'Secure Royal Gateway'} />

            <div 
                className="row wrapper justify-content-center align-items-center" 
                style={{ 
                    minHeight: '85vh', 
                    margin: 0,
                    // ✨ EXACT Background from Login/Register
                    background: '#fdfbf7', 
                    backgroundImage: `
                        radial-gradient(circle at 50% 10%, rgba(197, 160, 89, 0.1) 0%, transparent 50%),
                        linear-gradient(180deg, #fdfbf7 0%, #f4ebd0 100%)
                    `,
                    paddingBottom: "80px"
                }}
            >
                <div className="w-100">
                    <CheckoutSteps shipping confirmOrder payment />
                </div>

                <div className="col-11 col-md-6 col-lg-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="shadow-lg"
                        style={{ 
                            background: '#ffffff', 
                            borderRadius: '15px', 
                            borderTop: '6px solid #c5a059', 
                            boxShadow: '0 30px 60px rgba(15, 66, 15, 0.08)',
                            position: 'relative', 
                            overflow: 'hidden'    
                        }}
                    >
                        {/* Ceremonial Inner Frame */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                            style={{
                                position: 'absolute', top: '15px', left: '15px', right: '15px', bottom: '15px',
                                border: '1px solid rgba(197, 160, 89, 0.2)', pointerEvents: 'none', borderRadius: '15px'
                            }} 
                        />

                        <form onSubmit={submitHandler} className="p-5" style={{ position: 'relative', zIndex: 1 }}>
                            
                            {/* HEADER */}
                            <div className="text-center mb-5">
                                <motion.h1 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="mb-2" 
                                    style={{ fontFamily: 'Playfair Display, serif', color: '#0f420f', fontWeight: '700', letterSpacing: '0.5px' }}
                                >
                                    Secure Payment
                                </motion.h1>
                                <div style={{ width: '40px', height: '2px', background: '#c5a059', margin: '0 auto 15px auto', opacity: 0.7 }}></div>
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-muted" 
                                    style={{ fontSize: '0.85rem', fontFamily: 'Montserrat, sans-serif' }}
                                >
                                    Encrypted Vault Access
                                </motion.p>
                            </div>

                            {/* CARD NUMBER */}
                            <div className="form-group mb-4">
                                <label className="fw-bold mb-2 text-uppercase" style={{ color: '#c5a059', fontSize: '0.7rem', letterSpacing: '1.5px' }}>Card Medallion Number</label>
                                <div style={getInputWrapperStyle('cardNumber')}>
                                    <CardNumberElement 
                                        options={stripeOptions} 
                                        onFocus={() => setFocusedField('cardNumber')}
                                        onBlur={() => setFocusedField(null)}
                                    />
                                </div>
                            </div>

                            {/* EXPIRY & CVC */}
                            <div className="row mb-5">
                                <div className="col-6">
                                    <label className="fw-bold mb-2 text-uppercase" style={{ color: '#c5a059', fontSize: '0.7rem', letterSpacing: '1.5px' }}>Expiry</label>
                                    <div style={getInputWrapperStyle('cardExpiry')}>
                                        <CardExpiryElement 
                                            options={stripeOptions} 
                                            onFocus={() => setFocusedField('cardExpiry')}
                                            onBlur={() => setFocusedField(null)}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label className="fw-bold mb-2 text-uppercase" style={{ color: '#c5a059', fontSize: '0.7rem', letterSpacing: '1.5px' }}>CVC</label>
                                    <div style={getInputWrapperStyle('cardCvc')}>
                                        <CardCvcElement 
                                            options={stripeOptions} 
                                            onFocus={() => setFocusedField('cardCvc')}
                                            onBlur={() => setFocusedField(null)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* BUTTON */}
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
                                    letterSpacing: '3px', // ✨ Matches Login Button Tracking
                                    textTransform: 'uppercase', 
                                    fontWeight: '700',
                                    fontSize: '0.85rem', // ✨ Matches Login Button Size
                                    boxShadow: '0 4px 10px rgba(197, 160, 89, 0.2)'
                                }}
                            >
                                Finalize Order · ₹{orderInfo ? orderInfo.totalPrice : '0'}
                            </motion.button>

                            {/* MICRO-TRUST TEXT */}
                            <div className="mt-4 text-center">
                                <span className="text-muted small" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                                    GST Included. Secure Payment via Stripe.
                                </span>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </Fragment>
    );
}