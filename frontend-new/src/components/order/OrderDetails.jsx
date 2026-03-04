import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { orderDetails as fetchOrderDetails, clearOrderError } from '../../slices/orderSlice';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import MetaData from '../layouts/MetaData';
import Loader from '../layouts/Loader';

export default function OrderDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    
    const { orderDetails, loading, error } = useSelector(state => state.orderState);

    const { 
        shippingInfo = {}, 
        user = {}, 
        paymentInfo = {}, 
        orderItems = [], 
        totalPrice, 
        orderStatus,
        createdAt 
    } = orderDetails || {};

    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', theme: 'colored' });
            dispatch(clearOrderError());
        }
        dispatch(fetchOrderDetails(id));
    }, [dispatch, error, id]);

    const shippingAddress = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;
    
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded';
    const isDelivered = orderStatus && orderStatus.includes('Delivered');

    // ✨ STRICT THEME STYLES
    const labelStyle = { color: '#c5a059', fontSize: '0.75rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif', marginBottom: '5px' };
    const valueStyle = { color: '#0f420f', fontFamily: 'Montserrat, sans-serif', fontWeight: '600', fontSize: '1rem', lineHeight: '1.6' };

    // ✨ FRAMER MOTION VARIANTS
    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        show: (delay) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: delay, ease: "easeOut" } })
    };

    const listContainer = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.6 } }
    };

    const listItem = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <Fragment>
            <MetaData title={`Order #${id}`} />

            <div 
                className="row wrapper justify-content-center align-items-center m-0" 
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
                {loading ? (
                    <Loader />
                ) : (
                    <div className="col-11 col-lg-9 col-xl-8">
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
                                    position: 'absolute',
                                    top: '15px', left: '15px', right: '15px', bottom: '15px',
                                    border: '1px solid rgba(197, 160, 89, 0.2)', 
                                    pointerEvents: 'none',
                                    zIndex: 0,
                                    borderRadius: '15px' 
                                }}
                            />

                            <div className="p-4 p-md-5" style={{ position: 'relative', zIndex: 1 }}>
                                
                                {/* Header */}
                                <motion.div 
                                    variants={fadeUp} custom={0.1} initial="hidden" animate="show"
                                    className="d-flex align-items-center mb-4 pb-3"
                                    style={{ borderBottom: '1px solid rgba(197, 160, 89, 0.2)' }}
                                >
                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                        <Link to="/orders" className="btn btn-sm me-3 shadow-sm" style={{ background: 'transparent', border: '1px solid #c5a059', color: '#c5a059', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <i className="fa fa-arrow-left"></i>
                                        </Link>
                                    </motion.div>
                                    <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#0f420f', fontWeight: '700', margin: 0, letterSpacing: '0.5px' }}>
                                        Order Details
                                    </h2>
                                </motion.div>

                                {/* Top Section: Order ID & Status */}
                                <motion.div variants={fadeUp} custom={0.2} initial="hidden" animate="show" className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center pb-4 mb-4">
                                    <div>
                                        <div style={labelStyle}>Order ID</div>
                                        <div style={{ ...valueStyle, fontSize: '1.2rem', letterSpacing: '1px' }}>#{orderDetails?._id}</div>
                                        <div className="mt-1" style={{ color: 'rgba(15, 66, 15, 0.7)', fontSize: '0.8rem', fontFamily: 'Montserrat, sans-serif', fontWeight: '600' }}>
                                            Placed on: {createdAt ? new Date(createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                                        </div>
                                    </div>
                                    
                                    <div className="mt-3 mt-md-0 text-md-end">
                                        <div style={labelStyle}>Current Status</div>
                                        <span className="px-3 py-2 mt-1 d-inline-block shadow-sm" style={{ 
                                            fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', borderRadius: '30px',
                                            backgroundColor: isDelivered ? 'rgba(15, 66, 15, 0.1)' : 'rgba(197, 160, 89, 0.15)',
                                            color: isDelivered ? '#0f420f' : '#c5a059',
                                            border: `1px solid ${isDelivered ? 'rgba(15, 66, 15, 0.2)' : 'rgba(197, 160, 89, 0.3)'}`
                                        }}>
                                            {orderStatus}
                                        </span>
                                    </div>
                                </motion.div>

                                {/* Middle Section: Shipping & Payment Info */}
                                <motion.div variants={fadeUp} custom={0.4} initial="hidden" animate="show" className="row mb-5">
                                    <div className="col-md-6 mb-4 mb-md-0">
                                        <h4 className="mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#0f420f', fontWeight: '700', fontSize: '1.3rem' }}>Shipping Info</h4>
                                        <div className="p-4 shadow-sm" style={{ background: '#fdfbf7', borderRadius: '10px', border: '1px solid rgba(197, 160, 89, 0.2)', height: '100%' }}>
                                            <div className="mb-3"><span style={labelStyle}>Name:</span> <span style={valueStyle}>{user.name}</span></div>
                                            <div className="mb-3"><span style={labelStyle}>Phone:</span> <span style={valueStyle}>{shippingInfo.phoneNo}</span></div>
                                            <div><span style={labelStyle}>Address:</span> <div style={{...valueStyle, marginTop: '4px'}}>{shippingAddress}</div></div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <h4 className="mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#0f420f', fontWeight: '700', fontSize: '1.3rem' }}>Payment Info</h4>
                                        <div className="p-4 shadow-sm" style={{ background: '#fdfbf7', borderRadius: '10px', border: '1px solid rgba(197, 160, 89, 0.2)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <div className="mb-4 d-flex justify-content-between align-items-center pb-3" style={{ borderBottom: '1px solid rgba(197, 160, 89, 0.2)' }}>
                                                <span style={labelStyle}>Status:</span> 
                                                <span style={{ ...valueStyle, color: isPaid ? '#0f420f' : '#c5a059', fontWeight: '800', letterSpacing: '1px', backgroundColor: isPaid ? 'rgba(15, 66, 15, 0.1)' : 'rgba(197, 160, 89, 0.15)', padding: '5px 15px', borderRadius: '20px' }}>
                                                    {isPaid ? "PAID" : "NOT PAID"}
                                                </span>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span style={labelStyle}>Total Amount:</span> 
                                                <span style={{ ...valueStyle, fontSize: '1.4rem', color: '#c5a059', fontWeight: '800' }}>₹{totalPrice}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Bottom Section: Order Items */}
                                <motion.div variants={fadeUp} custom={0.5} initial="hidden" animate="show">
                                    <h4 className="mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#0f420f', fontWeight: '700', fontSize: '1.3rem' }}>Royal Selection</h4>
                                </motion.div>
                                
                                <motion.div variants={listContainer} initial="hidden" animate="show" className="order-items-container">
                                    {orderItems && orderItems.map(item => (
                                        <motion.div variants={listItem} key={item.product} className="row align-items-center py-3 px-2 mb-3 shadow-sm" style={{ background: '#fdfbf7', borderRadius: '10px', border: '1px solid rgba(197, 160, 89, 0.2)' }}>
                                            <div className="col-4 col-md-2 text-center">
                                                <img src={item.image} alt={item.name} className="img-fluid rounded" style={{ maxHeight: '80px', objectFit: 'cover', border: '1px solid rgba(197,160,89,0.3)', boxShadow: '0 4px 8px rgba(15, 66, 15, 0.1)' }} />
                                            </div>

                                            <div className="col-8 col-md-5 mt-2 mt-md-0">
                                                <Link to={`/product/${item.product}`} style={{ textDecoration: 'none', color: '#0f420f', fontFamily: 'Montserrat, sans-serif', fontWeight: '700', fontSize: '1rem', transition: '0.2s' }} onMouseOver={(e) => e.target.style.color = '#c5a059'} onMouseOut={(e) => e.target.style.color = '#0f420f'}>
                                                    {item.name}
                                                </Link>
                                            </div>

                                            <div className="col-12 col-md-5 mt-3 mt-md-0 d-flex justify-content-between justify-content-md-end align-items-center">
                                                <span style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(15, 66, 15, 0.8)', fontSize: '0.95rem', fontWeight: '600' }}>
                                                    ₹{item.price} <span style={{ color: '#c5a059', margin: '0 5px' }}>x</span> {item.quantity}
                                                </span>
                                                <span className="ms-md-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#0f420f', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                                    = <span style={{ color: '#c5a059' }}>₹{item.price * item.quantity}</span>
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>

                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </Fragment>
    );
}