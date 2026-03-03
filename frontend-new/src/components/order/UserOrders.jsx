import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userOrders as fetchUserOrders, clearOrderError } from '../../slices/orderSlice';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import MetaData from '../layouts/MetaData';
import Loader from '../layouts/Loader';

export default function UserOrders() {
    const dispatch = useDispatch();
    const { userOrders, loading, error } = useSelector(state => state.orderState);

    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', theme: 'colored' });
            dispatch(clearOrderError());
        }

        dispatch(fetchUserOrders());
    }, [dispatch, error]);

    // ✨ Staggered Animation for the list items
    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    // Reusable Style for the Golden Labels
    const labelStyle = {
        color: '#c5a059', 
        fontSize: '0.7rem', 
        letterSpacing: '1.5px', 
        textTransform: 'uppercase', 
        fontWeight: 'bold',
        fontFamily: 'Montserrat, sans-serif'
    };

    return (
        <Fragment>
            <MetaData title="My Royal Archive" />

            <div 
                className="row justify-content-center m-0" 
                style={{ 
                    minHeight: '85vh', 
                    background: '#fdfbf7', 
                    backgroundImage: `
                        radial-gradient(circle at 50% 10%, rgba(197, 160, 89, 0.1) 0%, transparent 50%),
                        linear-gradient(180deg, #fdfbf7 0%, #f4ebd0 100%)
                    `,
                    padding: "60px 20px"
                }}
            >
                <div className="col-12 col-lg-10">
                    
                    {/* PAGE HEADER */}
                    <div className="text-center mb-5">
                        <motion.h1 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            style={{ fontFamily: 'Playfair Display, serif', color: '#0f420f', fontWeight: '700', letterSpacing: '1px' }}
                        >
                            Your Order Archive
                        </motion.h1>
                        <motion.div 
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            style={{ width: '60px', height: '2px', background: '#c5a059', margin: '15px auto', opacity: 0.8, transformOrigin: 'center' }}
                        ></motion.div>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            style={{ fontFamily: 'Montserrat, sans-serif', color: '#0f420f', fontStyle: 'italic', fontSize: '0.95rem' }}
                        >
                            A record of your honored transactions with MSK Foods.
                        </motion.p>
                    </div>

                    {/* MAIN CONTAINER */}
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
                                border: '1px solid rgba(197, 160, 89, 0.2)', pointerEvents: 'none', borderRadius: '15px', zIndex: 0 
                            }} 
                        />

                        <div className="p-4 p-md-5" style={{ position: 'relative', zIndex: 1 }}>
                            
                            {loading ? (
                                <Loader />
                            ) : userOrders && userOrders.length > 0 ? (
                                <Fragment>
                                    {/* TABLE HEADER */}
                                    <motion.div 
                                        initial={{ opacity: 0 }} 
                                        animate={{ opacity: 1 }} 
                                        transition={{ delay: 0.6, duration: 1 }}
                                        className="d-none d-md-flex pb-3 mb-3" 
                                        style={{ borderBottom: '2px solid rgba(197, 160, 89, 0.3)' }}
                                    >
                                        <div className="col-3" style={labelStyle}>Order ID</div>
                                        <div className="col-2 text-center" style={labelStyle}>Total</div>
                                        <div className="col-4 text-center" style={labelStyle}>Status</div>
                                        <div className="col-3 text-end" style={labelStyle}>Action</div>
                                    </motion.div>

                                    {/* ORDER LIST - Staggered entrance */}
                                    <motion.div variants={containerVariants} initial="hidden" animate="show">
                                        {userOrders.map((order) => (
                                            <motion.div 
                                                key={order._id} 
                                                variants={itemVariants}
                                                className="d-flex flex-column flex-md-row align-items-md-center py-4 px-3 rounded"
                                                style={{ 
                                                    borderBottom: '1px solid rgba(197, 160, 89, 0.2)', 
                                                    transition: 'all 0.3s ease',
                                                    cursor: 'default'
                                                }}
                                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(197, 160, 89, 0.08)'}
                                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                {/* ID - Snaps to edges on mobile */}
                                                <div className="col-12 col-md-3 mb-3 mb-md-0 d-flex justify-content-between justify-content-md-start align-items-center" style={{ fontFamily: 'Montserrat, sans-serif', color: '#0f420f', fontWeight: '600', fontSize: '0.85rem' }}>
                                                    <span className="d-md-none" style={labelStyle}>ID:</span>
                                                    <span>#{order._id.substring(0, 10)}...</span>
                                                </div>

                                                {/* AMOUNT - Snaps to edges on mobile */}
                                                <div className="col-12 col-md-2 mb-3 mb-md-0 d-flex justify-content-between justify-content-md-center align-items-center" style={{ fontFamily: 'Montserrat, sans-serif', color: '#0f420f', fontWeight: '700' }}>
                                                    <span className="d-md-none" style={labelStyle}>Total:</span>
                                                    <span>₹{order.totalPrice}</span>
                                                </div>

                                                {/* STATUS - Snaps to edges on mobile */}
                                                <div className="col-12 col-md-4 mb-4 mb-md-0 d-flex justify-content-between justify-content-md-center align-items-center">
                                                    <span className="d-md-none" style={labelStyle}>Status:</span>
                                                    <span 
                                                        className="px-2 py-1 text-center"
                                                        style={{ 
                                                            fontFamily: 'Montserrat, sans-serif',
                                                            fontSize: '0.7rem', 
                                                            fontWeight: '700', 
                                                            letterSpacing: '1px',
                                                            textTransform: 'uppercase',
                                                            borderRadius: '20px',
                                                            backgroundColor: order.orderStatus && order.orderStatus.includes('Delivered') ? 'rgba(15, 66, 15, 0.1)' : 'rgba(197, 160, 89, 0.15)',
                                                            color: order.orderStatus && order.orderStatus.includes('Delivered') ? '#0f420f' : '#c5a059',
                                                            display: 'inline-block',
                                                            minWidth: '95px' 
                                                        }}
                                                    >
                                                        {order.orderStatus}
                                                    </span>
                                                </div>

                                                {/* ACTION BUTTON - Block width on mobile */}
                                                <div className="col-12 col-md-3 text-md-end mt-2 mt-md-0">
                                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                        <Link 
                                                            to={`/order/${order._id}`} 
                                                            className="btn shadow-sm d-block d-md-inline-block"
                                                            style={{ 
                                                                background: 'transparent', 
                                                                color: '#0f420f', 
                                                                border: '1px solid rgba(197, 160, 89, 0.5)', 
                                                                borderRadius: '5px', 
                                                                letterSpacing: '2px',
                                                                textTransform: 'uppercase', 
                                                                fontWeight: '700',
                                                                fontFamily: 'Montserrat, sans-serif',
                                                                fontSize: '0.7rem',
                                                                padding: '10px 20px',
                                                                transition: 'all 0.3s ease',
                                                                textDecoration: 'none'
                                                            }}
                                                            onMouseOver={(e) => {
                                                                e.currentTarget.style.background = '#c5a059';
                                                                e.currentTarget.style.color = '#fff';
                                                                e.currentTarget.style.border = '1px solid #c5a059';
                                                            }}
                                                            onMouseOut={(e) => {
                                                                e.currentTarget.style.background = 'transparent';
                                                                e.currentTarget.style.color = '#0f420f';
                                                                e.currentTarget.style.border = '1px solid rgba(197, 160, 89, 0.5)';
                                                            }}
                                                        >
                                                            View Details
                                                        </Link>
                                                    </motion.div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </Fragment>
                            ) : (
                                /* EMPTY STATE */
                                <div className="text-center py-5">
                                    <motion.i 
                                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6, type: 'spring' }}
                                        className="fa fa-book mb-3" 
                                        style={{ fontSize: '3rem', color: 'rgba(197, 160, 89, 0.4)' }}
                                    ></motion.i>
                                    <motion.h4 
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                                        style={{ fontFamily: 'Playfair Display, serif', color: '#0f420f', fontWeight: '700' }}
                                    >
                                        Your archive is currently empty.
                                    </motion.h4>
                                    <motion.p 
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                                        className="mb-4" 
                                        style={{ color: '#0f420f', fontFamily: 'Montserrat, sans-serif', fontSize: '0.9rem' }}
                                    >
                                        You have not made any royal transactions yet.
                                    </motion.p>
                                    
                                    <motion.div whileHover={{ scale: 1.01, boxShadow: "0 10px 20px rgba(197, 160, 89, 0.2)" }} whileTap={{ scale: 0.99 }} style={{ display: 'inline-block' }}>
                                        <Link to="/" className="btn shadow-sm" style={{ 
                                            background: 'linear-gradient(135deg, #d4af37 0%, #c5a059 100%)', 
                                            color: '#0f420f', 
                                            border: 'none', 
                                            borderRadius: '5px', 
                                            letterSpacing: '3px', 
                                            textTransform: 'uppercase', 
                                            fontWeight: '700',
                                            fontSize: '0.85rem',
                                            padding: '12px 30px',
                                            textDecoration: 'none'
                                        }}>
                                            Begin the Tradition
                                        </Link>
                                    </motion.div>
                                </div>
                            )}

                        </div>
                    </motion.div>
                </div>
            </div>
        </Fragment>
    );
}