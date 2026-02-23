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

        // Fetch the user's order history when the component mounts
        dispatch(fetchUserOrders());
    }, [dispatch, error]);

    // ✨ Animation Variants for the list
    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
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
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ fontFamily: 'Playfair Display, serif', color: '#0f420f', fontWeight: '700', letterSpacing: '1px' }}
                        >
                            Your Order Archive
                        </motion.h1>
                        <div style={{ width: '60px', height: '2px', background: '#c5a059', margin: '15px auto', opacity: 0.8 }}></div>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
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
                        <div style={{
                            position: 'absolute', top: '15px', left: '15px', right: '15px', bottom: '15px',
                            border: '1px solid rgba(197, 160, 89, 0.2)', pointerEvents: 'none', borderRadius: '15px', zIndex: 0 
                        }} />

                        <div className="p-4 p-md-5" style={{ position: 'relative', zIndex: 1 }}>
                            
                            {loading ? (
                                <Loader />
                            ) : userOrders && userOrders.length > 0 ? (
                                <Fragment>
                                    {/* TABLE HEADER (Hidden on extra small screens for mobile responsiveness) */}
                                    <div className="d-none d-md-flex pb-3 mb-3" style={{ borderBottom: '2px solid rgba(197, 160, 89, 0.3)' }}>
                                        <div className="col-3 fw-bold text-uppercase" style={{ color: '#c5a059', fontSize: '0.75rem', letterSpacing: '1.5px' }}>Order ID</div>
                                        <div className="col-2 fw-bold text-uppercase text-center" style={{ color: '#c5a059', fontSize: '0.75rem', letterSpacing: '1.5px' }}>Amount</div>
                                        <div className="col-4 fw-bold text-uppercase text-center" style={{ color: '#c5a059', fontSize: '0.75rem', letterSpacing: '1.5px' }}>Status</div>
                                        <div className="col-3 fw-bold text-uppercase text-end" style={{ color: '#c5a059', fontSize: '0.75rem', letterSpacing: '1.5px' }}>Action</div>
                                    </div>

                                    {/* ORDER LIST */}
                                    <motion.div variants={containerVariants} initial="hidden" animate="show">
                                        {userOrders.map((order) => (
                                            <motion.div 
                                                key={order._id} 
                                                variants={itemVariants}
                                                className="d-flex flex-column flex-md-row align-items-md-center py-4 px-2"
                                                style={{ 
                                                    borderBottom: '1px solid rgba(15, 66, 15, 0.1)',
                                                    transition: 'all 0.3s ease',
                                                }}
                                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(197, 160, 89, 0.03)'}
                                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                {/* ID */}
                                                <div className="col-12 col-md-3 mb-2 mb-md-0" style={{ fontFamily: 'Montserrat, sans-serif', color: '#0f420f', fontWeight: '600', fontSize: '0.85rem' }}>
                                                    <span className="d-md-none text-muted small me-2">ID:</span>
                                                    #{order._id.substring(0, 10)}...
                                                </div>

                                                {/* AMOUNT */}
                                                <div className="col-12 col-md-2 mb-2 mb-md-0 text-md-center" style={{ fontFamily: 'Montserrat, sans-serif', color: '#0f420f', fontWeight: '700' }}>
                                                    <span className="d-md-none text-muted small me-2">Total:</span>
                                                    ₹{order.totalPrice}
                                                </div>

                                                {/* STATUS */}
                                                <div className="col-12 col-md-4 mb-3 mb-md-0 text-md-center">
                                                    <span className="d-md-none text-muted small me-2">Status:</span>
                                                    <span 
                                                        className="px-3 py-1"
                                                        style={{ 
                                                            fontSize: '0.75rem', 
                                                            fontWeight: '700', 
                                                            letterSpacing: '1px',
                                                            textTransform: 'uppercase',
                                                            borderRadius: '20px',
                                                            // ✨ Royal Status Colors
                                                            backgroundColor: order.orderStatus && order.orderStatus.includes('Delivered') ? 'rgba(15, 66, 15, 0.1)' : 'rgba(197, 160, 89, 0.15)',
                                                            color: order.orderStatus && order.orderStatus.includes('Delivered') ? '#0f420f' : '#c5a059'
                                                        }}
                                                    >
                                                        {order.orderStatus}
                                                    </span>
                                                </div>

                                                {/* ACTION BUTTON */}
                                                <div className="col-12 col-md-3 text-md-end">
                                                    <Link 
                                                        to={`/order/${order._id}`} 
                                                        className="btn shadow-sm"
                                                        style={{ 
                                                            background: 'transparent', 
                                                            color: '#0f420f', 
                                                            border: '1px solid rgba(197, 160, 89, 0.5)', 
                                                            borderRadius: '5px', 
                                                            letterSpacing: '1px', 
                                                            textTransform: 'uppercase', 
                                                            fontWeight: '700',
                                                            fontSize: '0.7rem',
                                                            padding: '8px 20px',
                                                            transition: 'all 0.3s ease'
                                                        }}
                                                        onMouseOver={(e) => {
                                                            e.currentTarget.style.background = '#c5a059';
                                                            e.currentTarget.style.color = '#fff';
                                                        }}
                                                        onMouseOut={(e) => {
                                                            e.currentTarget.style.background = 'transparent';
                                                            e.currentTarget.style.color = '#0f420f';
                                                        }}
                                                    >
                                                        <i className="fa fa-eye me-2"></i> View Scroll
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </Fragment>
                            ) : (
                                /* EMPTY STATE */
                                <div className="text-center py-5">
                                    <i className="fa fa-book mb-3" style={{ fontSize: '3rem', color: 'rgba(197, 160, 89, 0.4)' }}></i>
                                    <h4 style={{ fontFamily: 'Playfair Display, serif', color: '#0f420f', fontWeight: '700' }}>Your archive is currently empty.</h4>
                                    <p className="text-muted mb-4" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.9rem' }}>You have not made any royal transactions yet.</p>
                                    <Link to="/" className="btn shadow-sm" style={{ 
                                        background: 'linear-gradient(135deg, #d4af37 0%, #c5a059 100%)', 
                                        color: '#0f420f', 
                                        border: 'none', 
                                        borderRadius: '5px', 
                                        letterSpacing: '2px', 
                                        textTransform: 'uppercase', 
                                        fontWeight: '700',
                                        fontSize: '0.8rem',
                                        padding: '12px 30px'
                                    }}>
                                        Begin the Tradition
                                    </Link>
                                </div>
                            )}

                        </div>
                    </motion.div>
                </div>
            </div>
        </Fragment>
    );
}