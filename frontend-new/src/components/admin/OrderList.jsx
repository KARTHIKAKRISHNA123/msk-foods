import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { adminOrders as fetchAdminOrders, deleteOrder, clearOrderDeleted, clearOrderError } from '../../slices/orderSlice';

import MetaData from '../layouts/MetaData';
import Loader from '../layouts/Loader';
import Sidebar from './Sidebar';

export default function OrderList() {
    const dispatch = useDispatch();
    
    // --- THEME VARIABLES ---
    const fontRoyal = "'Playfair Display', serif";
    const fontModern = "'Montserrat', sans-serif";
    const colorGreen = '#0f420f';
    const colorDarkGreen = '#0a2e0a';
    const colorGold = '#c5a059';
    const colorCream = '#fdfbf7';

    // Fetch order states from Redux
    const { adminOrders = [], loading = false, error, isOrderDeleted } = useSelector(state => state.orderState);

    useEffect(() => {
        dispatch(fetchAdminOrders());
    }, [dispatch]);

    // Handle Delete Success & Errors
    useEffect(() => {
        if (error) {
            toast.error(error, { theme: 'colored' });
            dispatch(clearOrderError());
        }
        if (isOrderDeleted) {
            toast.success('Order successfully removed from the ledger.', { theme: 'colored' });
            dispatch(clearOrderDeleted());
            dispatch(fetchAdminOrders()); // Refresh the table instantly!
        }
    }, [dispatch, error, isOrderDeleted]);

    // Delete Handler
    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to permanently delete this order?")) {
            dispatch(deleteOrder(id));
        }
    };

    // ✨ UPGRADED: Strictly Theme-Compliant Status Colors
    const getStatusColors = (status) => {
        if (!status) return { bg: 'transparent', text: colorCream, border: 'rgba(253, 251, 247, 0.3)' };
        
        if (status.includes('Delivered')) {
            // THE STAMP OF COMPLETION: Solid MSK Gold
            return {
                bg: colorGold, 
                text: colorDarkGreen, // Dark text on solid gold for high contrast
                border: colorGold
            };
        } else if (status.includes('Shipped')) {
            // IN TRANSIT: Glowing Gold Outline
            return {
                bg: 'rgba(197, 160, 89, 0.1)', 
                text: colorGold, 
                border: colorGold
            };
        } else {
            // PROCESSING: Faint Cream/Pearl
            return {
                bg: 'rgba(253, 251, 247, 0.08)', 
                text: colorCream, 
                border: 'rgba(253, 251, 247, 0.3)'
            };
        }
    };

    // --- FRAMER MOTION ANIMATION VARIANTS ---
    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", bounce: 0.3 } }
    };

    const listVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
    };

    const rowVariants = {
        hidden: { opacity: 0, x: -30 },
        show: { opacity: 1, x: 0, transition: { duration: 0.5, type: "spring" } },
        exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
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
            <MetaData title="Order Ledger" />

            <div className="row m-0" style={{ 
                minHeight: '100vh', 
                backgroundColor: colorCream,
                // Layered Ambient Background with Texture
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

                {/* RIGHT COLUMN: Orders Content */}
                <div className="col-12 col-md-10 py-5 px-4 px-md-5">
                    
                    {/* Header Area */}
                    <div className="mb-5 text-center text-md-start">
                        <motion.h1 
                            initial={{ opacity: 0, y: -20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            style={{ fontFamily: fontRoyal, color: colorGreen, fontWeight: '800', fontSize: '2.8rem', margin: 0 }}
                        >
                            Order Ledger
                        </motion.h1>
                        
                        <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: '80px' }} 
                            transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
                            style={{ height: '4px', background: colorGold, marginTop: '12px' }} 
                            className="mx-auto mx-md-0 rounded"
                        />
                    </div>

                    {/* Content */}
                    {loading && adminOrders.length === 0 ? <Loader /> : (
                        <motion.div 
                            variants={cardVariants}
                            initial="hidden"
                            animate="show"
                            className="shadow-lg"
                            style={{ 
                                background: `linear-gradient(145deg, ${colorGreen} 0%, ${colorDarkGreen} 100%)`, 
                                borderRadius: '20px', 
                                border: `1px solid rgba(197, 160, 89, 0.4)`,
                                overflow: 'hidden',
                                position: 'relative',
                                boxShadow: '0 30px 60px rgba(15, 66, 15, 0.25)'
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

                            {/* Faint Background Watermark Icon */}
                            <i className="fa fa-book position-absolute" style={{ 
                                fontSize: '25rem', color: 'rgba(197, 160, 89, 0.02)', 
                                top: '-50px', right: '-50px', transform: 'rotate(-15deg)', zIndex: 0 
                            }}></i>

                            <div className="p-4 p-md-5" style={{ position: 'relative', zIndex: 1 }}>
                                
                                {/* TABLE HEADER - Hidden on Mobile! */}
                                <div className="d-none d-md-flex pb-3 mb-4" style={{ borderBottom: `2px solid rgba(197, 160, 89, 0.3)` }}>
                                    <div className="col-3" style={labelStyle}>Order ID</div>
                                    <div className="col-2" style={labelStyle}>Items</div>
                                    <div className="col-2 text-center" style={labelStyle}>Amount</div>
                                    <div className="col-2 text-center" style={labelStyle}>Status</div>
                                    <div className="col-3 text-end pe-4" style={labelStyle}>Actions</div>
                                </div>

                                {/* TABLE BODY */}
                                {adminOrders && adminOrders.length > 0 ? (
                                    <motion.div variants={listVariants} initial="hidden" animate="show">
                                        <AnimatePresence>
                                            {adminOrders.map(order => {
                                                const statusStyle = getStatusColors(order.orderStatus);

                                                return (
                                                <motion.div 
                                                    key={order._id} 
                                                    variants={rowVariants}
                                                    exit="exit"
                                                    layout 
                                                    whileHover={{ 
                                                        scale: 1.01, 
                                                        backgroundColor: 'rgba(253, 251, 247, 0.03)',
                                                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                                        borderRadius: '10px'
                                                    }}
                                                    className="d-flex flex-column flex-md-row align-items-md-center py-4 px-3 mb-2"
                                                    style={{ 
                                                        borderBottom: `1px solid rgba(197, 160, 89, 0.1)`, 
                                                        fontFamily: fontModern, 
                                                        color: colorCream, 
                                                        transition: 'all 0.3s ease' 
                                                    }}
                                                >
                                                    
                                                    {/* ID */}
                                                    <div className="col-12 col-md-3 mb-3 mb-md-0 d-flex justify-content-between justify-content-md-start align-items-center" style={{ fontSize: '0.85rem', color: 'rgba(253, 251, 247, 0.7)' }}>
                                                        <span className="d-md-none" style={labelStyle}>ID:</span>
                                                        <span style={{ fontFamily: 'monospace', letterSpacing: '1px' }}>#{order._id.substring(0, 10)}...</span>
                                                    </div>
                                                    
                                                    {/* No. of Items */}
                                                    <div className="col-12 col-md-2 mb-3 mb-md-0 d-flex justify-content-between justify-content-md-start align-items-center">
                                                        <span className="d-md-none" style={labelStyle}>Items:</span>
                                                        <span style={{ fontWeight: '600' }}>{order.orderItems.length}</span>
                                                    </div>
                                                    
                                                    {/* Amount */}
                                                    <div className="col-12 col-md-2 mb-3 mb-md-0 d-flex justify-content-between justify-content-md-center align-items-center" style={{ fontSize: '1.1rem', fontWeight: '700', color: colorGold }}>
                                                        <span className="d-md-none" style={labelStyle}>Amount:</span>
                                                        <span>₹{order.totalPrice}</span>
                                                    </div>
                                                    
                                                    {/* Status Pill (Using Theme Colors) */}
                                                    <div className="col-12 col-md-2 mb-4 mb-md-0 d-flex justify-content-between justify-content-md-center align-items-center">
                                                        <span className="d-md-none" style={labelStyle}>Status:</span>
                                                        <motion.span 
                                                            whileHover={{ scale: 1.05 }}
                                                            style={{ 
                                                                background: statusStyle.bg, 
                                                                color: statusStyle.text, 
                                                                border: `1px solid ${statusStyle.border}`,
                                                                padding: '6px 14px', 
                                                                borderRadius: '30px',
                                                                fontSize: '0.7rem',
                                                                fontWeight: '800',
                                                                letterSpacing: '1.5px',
                                                                textTransform: 'uppercase'
                                                            }}
                                                        >
                                                            {order.orderStatus}
                                                        </motion.span>
                                                    </div>
                                                    
                                                    {/* Action Buttons */}
                                                    <div className="col-12 col-md-3 d-flex justify-content-end align-items-center gap-3 mt-2 mt-md-0 pe-md-2">
                                                        
                                                        {/* Manage Order Button */}
                                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-100 w-md-auto">
                                                            <Link to={`/admin/order/${order._id}`} className="btn w-100 shadow-sm d-flex justify-content-center align-items-center gap-2" style={{ 
                                                                background: 'transparent', 
                                                                color: colorGold, 
                                                                border: `1px solid ${colorGold}`, 
                                                                borderRadius: '30px', 
                                                                padding: '6px 20px',
                                                                fontWeight: '700',
                                                                fontSize: '0.75rem',
                                                                letterSpacing: '1px',
                                                                textTransform: 'uppercase',
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                            onMouseOver={(e) => {
                                                                e.currentTarget.style.background = colorGold;
                                                                e.currentTarget.style.color = colorDarkGreen;
                                                            }}
                                                            onMouseOut={(e) => {
                                                                e.currentTarget.style.background = 'transparent';
                                                                e.currentTarget.style.color = colorGold;
                                                            }}
                                                            >
                                                                Manage <i className="fa fa-chevron-right" style={{ fontSize: '0.65rem' }}></i>
                                                            </Link>
                                                        </motion.div>

                                                        {/* Delete Button */}
                                                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                                            <button onClick={() => deleteHandler(order._id)} className="btn p-2" style={{ 
                                                                background: 'transparent', 
                                                                color: 'rgba(217, 83, 79, 0.7)', 
                                                                border: 'none', 
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                            onMouseOver={(e) => e.currentTarget.style.color = '#ff6b6b'}
                                                            onMouseOut={(e) => e.currentTarget.style.color = 'rgba(217, 83, 79, 0.7)'}
                                                            title="Delete Order"
                                                            >
                                                                <i className="fa fa-trash-o" style={{ fontSize: '1.1rem' }}></i>
                                                            </button>
                                                        </motion.div>

                                                    </div>

                                                </motion.div>
                                            )})}
                                        </AnimatePresence>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-5 text-center" 
                                        style={{ fontFamily: fontModern, color: 'rgba(253, 251, 247, 0.5)' }}
                                    >
                                        <i className="fa fa-file-text-o mb-3" style={{ fontSize: '3.5rem', color: colorGold }}></i>
                                        <h5 style={{ letterSpacing: '1px' }}>No orders found in the ledger.</h5>
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