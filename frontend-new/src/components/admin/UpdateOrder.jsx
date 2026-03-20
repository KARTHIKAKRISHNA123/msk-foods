import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { orderDetails as getOrderDetails, updateOrder, clearOrderUpdated, clearOrderError } from '../../slices/orderSlice';

import MetaData from '../layouts/MetaData';
import Loader from '../layouts/Loader';
import Sidebar from './Sidebar';

export default function UpdateOrder() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const dropdownRef = useRef(null);

    // --- THEME VARIABLES ---
    const fontRoyal = "'Playfair Display', serif";
    const fontModern = "'Montserrat', sans-serif";
    const colorGreen = '#0f420f';
    const colorDarkGreen = '#0a2e0a';
    const colorGold = '#c5a059';
    const colorCream = '#fdfbf7';

    // --- STATE ---
    const [status, setStatus] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { loading, orderDetails: order, isOrderUpdated, error } = useSelector(state => state.orderState);
    const { shippingInfo, user, orderItems, totalPrice, paymentInfo, orderStatus } = order || {};
    
    const isPaid = paymentInfo && paymentInfo.status === "succeeded" ? true : false;

    useEffect(() => {
        if (order && order._id !== id) {
            dispatch(getOrderDetails(id));
        } else if (order) {
            setStatus(order.orderStatus);
        }

        if (error) {
            toast.error(error, { theme: 'colored' });
            dispatch(clearOrderError());
        }

        if (isOrderUpdated) {
            toast.success('Order Status Successfully Updated!', { theme: 'colored' });
            dispatch(clearOrderUpdated());
            dispatch(getOrderDetails(id)); 
        }
    }, [dispatch, error, isOrderUpdated, id, order]);

    // Close dropdown if user clicks outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        const orderData = { orderStatus: status };
        dispatch(updateOrder(id, orderData));
    };

    // ✨ Theme-Compliant Status Colors
    const getStatusColors = (currentStatus) => {
        if (!currentStatus) return { bg: 'transparent', text: colorCream, border: 'rgba(253, 251, 247, 0.3)' };
        if (currentStatus.includes('Delivered')) {
            return { bg: colorGold, text: colorDarkGreen, border: colorGold };
        } else if (currentStatus.includes('Shipped')) {
            return { bg: 'rgba(197, 160, 89, 0.1)', text: colorGold, border: colorGold };
        } else {
            return { bg: 'rgba(253, 251, 247, 0.08)', text: colorCream, border: 'rgba(253, 251, 247, 0.3)' };
        }
    };

    // --- ANIMATIONS ---
    const formVariants = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", bounce: 0.2, staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120 } }
    };

    // Sub-header styling
    const sectionHeaderStyle = {
        fontFamily: fontRoyal, 
        color: colorGold, 
        fontSize: '1.3rem', 
        fontWeight: '700', 
        letterSpacing: '1px',
        borderBottom: `1px solid rgba(197, 160, 89, 0.2)`,
        paddingBottom: '10px',
        marginBottom: '20px'
    };

    // ✨ FIX 1: Reusable Green Card Style (overflow is now 'visible' so dropdown doesn't get cut off)
    const greenCardStyle = {
        background: `linear-gradient(145deg, ${colorGreen} 0%, ${colorDarkGreen} 100%)`, 
        borderRadius: '20px', 
        border: `1px solid rgba(197, 160, 89, 0.4)`,
        boxShadow: '0 25px 50px rgba(15, 66, 15, 0.3)',
        position: 'relative',
        overflow: 'visible' 
    };

    const innerFrame = (
        <div style={{
            position: 'absolute', top: '12px', left: '12px', right: '12px', bottom: '12px',
            border: `1px dashed rgba(197, 160, 89, 0.25)`, borderRadius: '15px', pointerEvents: 'none', zIndex: 0 
        }} />
    );

    return (
        <Fragment>
            <MetaData title="Process Order" />

            <div className="row m-0" style={{ 
                minHeight: '100vh', 
                backgroundColor: colorCream,
                backgroundImage: `
                    radial-gradient(circle at 0% 0%, rgba(197, 160, 89, 0.15) 0%, transparent 40%),
                    radial-gradient(circle at 100% 100%, rgba(15, 66, 15, 0.12) 0%, transparent 40%),
                    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E")
                `,
                backgroundAttachment: 'fixed'
            }}>
                
                {/* LEFT COLUMN: Sidebar */}
                <div className="col-12 col-md-2 p-0" style={{ zIndex: 10 }}>
                    <Sidebar />
                </div>

                {/* RIGHT COLUMN: Content */}
                <div className="col-12 col-md-10 py-5 px-4 px-md-5">
                    
                    <div className="mb-5 text-center text-md-start">
                        <motion.h1 
                            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}
                            style={{ fontFamily: fontRoyal, color: colorGreen, fontWeight: '800', fontSize: '2.8rem', margin: 0 }}
                        >
                            Process Order
                        </motion.h1>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ fontFamily: 'monospace', color: '#555', letterSpacing: '1px', marginTop: '5px' }}>
                            Order ID: <span style={{ color: colorGold, fontWeight: '700' }}>#{order?._id}</span>
                        </motion.p>
                        <motion.div 
                            initial={{ width: 0 }} animate={{ width: '80px' }} transition={{ duration: 1, delay: 0.4 }}
                            style={{ height: '4px', background: colorGold, marginTop: '12px' }} className="mx-auto mx-md-0 rounded"
                        />
                    </div>

                    {loading ? <Loader /> : (
                        <motion.div variants={formVariants} initial="hidden" animate="show" className="row justify-content-between">
                            
                            {/* --- LEFT SIDE: ORDER MANIFEST --- */}
                            <div className="col-12 col-lg-7 mb-5 mb-lg-0">
                                <motion.div variants={itemVariants} className="shadow-lg p-4 p-md-5" style={greenCardStyle}>
                                    {innerFrame}
                                    
                                    <div style={{ position: 'relative', zIndex: 1 }}>
                                        {/* Shipping Details */}
                                        <h4 style={sectionHeaderStyle}><i className="fa fa-map-marker me-2"></i> Shipping Details</h4>
                                        <div style={{ fontFamily: fontModern, fontSize: '0.95rem', color: colorCream, lineHeight: '1.8' }} className="mb-5">
                                            <p className="mb-1"><strong style={{ color: colorGold, letterSpacing: '1px' }}>NAME:</strong> {user?.name}</p>
                                            <p className="mb-1"><strong style={{ color: colorGold, letterSpacing: '1px' }}>PHONE:</strong> {shippingInfo?.phoneNo}</p>
                                            <p className="mb-0"><strong style={{ color: colorGold, letterSpacing: '1px' }}>ADDRESS:</strong> {shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.postalCode}, {shippingInfo?.state}, {shippingInfo?.country}</p>
                                        </div>

                                        {/* Payment Details */}
                                        <h4 style={sectionHeaderStyle}><i className="fa fa-credit-card me-2"></i> Payment Information</h4>
                                        <div style={{ fontFamily: fontModern, fontSize: '0.95rem', color: colorCream, lineHeight: '1.8' }} className="mb-5 d-flex align-items-center gap-3">
                                            <span className="badge rounded-pill px-3 py-2 shadow-sm" style={{ 
                                                background: isPaid ? 'rgba(46, 204, 113, 0.15)' : 'rgba(217, 83, 79, 0.15)', 
                                                color: isPaid ? '#4ade80' : '#ff6b6b',
                                                border: `1px solid ${isPaid ? 'rgba(46, 204, 113, 0.4)' : 'rgba(217, 83, 79, 0.4)'}`,
                                                fontSize: '0.85rem',
                                                letterSpacing: '1px'
                                            }}>
                                                {isPaid ? "PAID ONLINE" : "UNPAID"}
                                            </span>
                                            <span style={{ fontWeight: '700', color: colorCream, fontSize: '1.1rem' }}>
                                                Amount: <span style={{ color: colorGold }}>₹{totalPrice}</span>
                                            </span>
                                        </div>

                                        {/* Order Items */}
                                        <h4 style={sectionHeaderStyle}><i className="fa fa-shopping-basket me-2"></i> Order Items</h4>
                                        <div>
                                            {orderItems && orderItems.map(item => (
                                                <div key={item.product} className="d-flex align-items-center py-3" style={{ borderBottom: '1px solid rgba(197, 160, 89, 0.15)' }}>
                                                    {/* ✨ FIX 2: Restored image back to 60x60 thumbnail size */}
                                                    <img src={item.image} alt={item.name} width="300" height="175" style={{ borderRadius: '8px', objectFit: 'cover', border: `2px solid ${colorGold}` }} className="shadow-sm me-3" />
                                                    <div className="flex-grow-1">
                                                        <Link to={`/product/${item.product}`} style={{ textDecoration: 'none', color: colorCream, fontWeight: '700', fontFamily: fontRoyal, fontSize: '1.15rem', letterSpacing: '0.5px' }}>
                                                            {item.name}
                                                        </Link>
                                                        <p className="mb-0 mt-1" style={{ fontFamily: fontModern, fontSize: '0.85rem', color: 'rgba(253, 251, 247, 0.7)' }}>
                                                            ₹{item.price} <span className="mx-1" style={{ color: colorGold }}>x</span> {item.quantity} = <strong style={{ color: colorGold, fontSize: '0.95rem' }}>₹{item.price * item.quantity}</strong>
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* --- RIGHT SIDE: ACTION CENTER --- */}
                            <div className="col-12 col-lg-4">
                                <motion.div variants={itemVariants} className="shadow-lg p-4 rounded" style={{ ...greenCardStyle, position: 'sticky', top: '100px' }}>
                                    {innerFrame}
                                    
                                    <div style={{ position: 'relative', zIndex: 1 }}>
                                        <h4 className="text-center mb-4" style={{ fontFamily: fontRoyal, color: colorGold, fontWeight: '700' }}>Order Status</h4>
                                        
                                        <div className="text-center mb-4">
                                            <span className="badge rounded-pill px-4 py-2" style={{ 
                                                background: getStatusColors(orderStatus).bg, 
                                                color: getStatusColors(orderStatus).text, 
                                                border: `1px solid ${getStatusColors(orderStatus).border}`,
                                                fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase'
                                            }}>
                                                Current: {orderStatus}
                                            </span>
                                        </div>

                                        {orderStatus !== 'Delivered' ? (
                                            <form onSubmit={submitHandler}>
                                                
                                                {/* ✨ CUSTOM GOLD DROPDOWN COMPONENT */}
                                                <div className="mb-4" ref={dropdownRef}>
                                                    <label className="form-label" style={{ fontFamily: fontModern, color: colorGold, fontWeight: '600', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                                        Update Status To:
                                                    </label>
                                                    
                                                    <div style={{ position: 'relative' }}>
                                                        {/* Custom Select Input Box */}
                                                        <div 
                                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                            className="d-flex justify-content-between align-items-center"
                                                            style={{ 
                                                                background: isDropdownOpen ? 'rgba(253, 251, 247, 0.08)' : 'rgba(253, 251, 247, 0.05)', 
                                                                color: colorCream, 
                                                                border: isDropdownOpen ? `1px solid ${colorGold}` : `1px solid rgba(197, 160, 89, 0.4)`,
                                                                boxShadow: isDropdownOpen ? `0 0 15px rgba(197, 160, 89, 0.2)` : 'none',
                                                                padding: '14px 18px', borderRadius: '8px', cursor: 'pointer',
                                                                fontWeight: '600', fontFamily: fontModern, transition: 'all 0.3s ease'
                                                            }}
                                                        >
                                                            <span>{status || 'Select Status'}</span>
                                                            <motion.i 
                                                                animate={{ rotate: isDropdownOpen ? 180 : 0 }} 
                                                                transition={{ duration: 0.3 }}
                                                                className="fa fa-chevron-down" 
                                                                style={{ color: colorGold, fontSize: '0.8rem' }}
                                                            />
                                                        </div>

                                                        {/* Animated Dropdown Menu */}
                                                        <AnimatePresence>
                                                            {isDropdownOpen && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                                                                    animate={{ opacity: 1, y: 0, scaleY: 1 }}
                                                                    exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                                                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                                                    style={{
                                                                        position: 'absolute', top: '100%', left: 0, right: 0,
                                                                        marginTop: '8px', background: colorDarkGreen,
                                                                        border: `1px solid ${colorGold}`, borderRadius: '8px',
                                                                        overflow: 'hidden', zIndex: 50,
                                                                        boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
                                                                        transformOrigin: 'top center'
                                                                    }}
                                                                >
                                                                    {['Processing', 'Shipped', 'Delivered'].map((optionStatus) => (
                                                                        <div 
                                                                            key={optionStatus}
                                                                            onClick={() => { setStatus(optionStatus); setIsDropdownOpen(false); }}
                                                                            onMouseEnter={(e) => { e.currentTarget.style.background = colorGold; e.currentTarget.style.color = colorDarkGreen; }}
                                                                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = colorGold; }}
                                                                            style={{
                                                                                padding: '14px 18px', cursor: 'pointer', color: colorGold, 
                                                                                fontWeight: '600', fontFamily: fontModern, transition: 'all 0.2s ease',
                                                                                borderBottom: optionStatus !== 'Delivered' ? `1px solid rgba(197, 160, 89, 0.1)` : 'none'
                                                                            }}
                                                                        >
                                                                            {optionStatus}
                                                                        </div>
                                                                    ))}
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </div>
                                                
                                                <motion.button 
                                                    whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(197, 160, 89, 0.2)' }} 
                                                    whileTap={{ scale: 0.98 }}
                                                    type="submit" disabled={loading} className="btn w-100 py-3 shadow mt-3"
                                                    style={{ 
                                                        background: 'linear-gradient(135deg, #d4af37 0%, #c5a059 100%)', color: colorDarkGreen, 
                                                        border: 'none', borderRadius: '8px', fontWeight: '800', letterSpacing: '2px', 
                                                        textTransform: 'uppercase', fontFamily: fontModern
                                                    }}
                                                >
                                                    {loading ? <i className="fa fa-spinner fa-spin"></i> : "Update Ledger"}
                                                </motion.button>
                                            </form>
                                        ) : (
                                            <div className="text-center p-3 rounded mt-4" style={{ background: 'rgba(197, 160, 89, 0.1)', border: `1px solid rgba(197, 160, 89, 0.3)` }}>
                                                <i className="fa fa-check-circle mb-2" style={{ fontSize: '2.5rem', color: colorGold }}></i>
                                                <p className="mb-0 mt-2" style={{ fontFamily: fontModern, color: colorCream, fontSize: '0.9rem', fontWeight: '500' }}>This order has been fulfilled and locked.</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}

                </div>
            </div>
        </Fragment>
    );
}