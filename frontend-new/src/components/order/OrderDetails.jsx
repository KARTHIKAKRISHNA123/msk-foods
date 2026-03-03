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
    
    // Pull the data we just wired up in your Redux slice!
    const { orderDetails, loading, error } = useSelector(state => state.orderState);

    // Safely extract the data so the app doesn't crash while loading
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

        // Fetch the specific order using the ID from the URL
        dispatch(fetchOrderDetails(id));
    }, [dispatch, error, id]);

    // Format the address string
    const shippingAddress = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;
    
    // Check Statuses
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded';
    const isDelivered = orderStatus && orderStatus.includes('Delivered');

    // Theme Styles
    const labelStyle = { color: '#c5a059', fontSize: '0.75rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif', marginBottom: '5px' };
    const valueStyle = { color: '#0f420f', fontFamily: 'Montserrat, sans-serif', fontWeight: '600', fontSize: '1rem', lineHeight: '1.6' };

    return (
        <Fragment>
            <MetaData title={`Order #${id}`} />

            <div style={{ 
                minHeight: '85vh', 
                background: '#fdfbf7', 
                backgroundImage: 'radial-gradient(circle at 50% 10%, rgba(197, 160, 89, 0.1) 0%, transparent 50%), linear-gradient(180deg, #fdfbf7 0%, #f4ebd0 100%)',
                padding: "60px 20px"
            }}>
                {loading ? (
                    <Loader />
                ) : (
                    <div className="container">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="row justify-content-center"
                        >
                            <div className="col-12 col-lg-9">
                                
                                {/* Header */}
                                <div className="d-flex align-items-center mb-4">
                                    <Link to="/orders" className="btn btn-sm me-3" style={{ background: 'transparent', border: '1px solid #c5a059', color: '#c5a059', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <i className="fa fa-arrow-left"></i>
                                    </Link>
                                    <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#0f420f', fontWeight: '700', margin: 0 }}>
                                        Order Details
                                    </h2>
                                </div>

                                {/* Main Card */}
                                <div className="shadow-lg p-4 p-md-5" style={{ background: '#ffffff', borderRadius: '15px', borderTop: '6px solid #c5a059', position: 'relative' }}>
                                    
                                    {/* Top Section: Order ID & Status */}
                                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center pb-4 mb-4" style={{ borderBottom: '1px solid rgba(197, 160, 89, 0.2)' }}>
                                        <div>
                                            <div style={labelStyle}>Order ID</div>
                                            <div style={{ ...valueStyle, fontSize: '1.2rem' }}>#{orderDetails?._id}</div>
                                            <div className="text-muted mt-1" style={{ fontSize: '0.8rem', fontFamily: 'Montserrat, sans-serif' }}>
                                                Placed on: {createdAt ? new Date(createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                                            </div>
                                        </div>
                                        
                                        <div className="mt-3 mt-md-0 text-md-end">
                                            <div style={labelStyle}>Current Status</div>
                                            <span className="px-3 py-2 mt-1 d-inline-block" style={{ 
                                                fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', borderRadius: '30px',
                                                backgroundColor: isDelivered ? 'rgba(15, 66, 15, 0.1)' : 'rgba(197, 160, 89, 0.15)',
                                                color: isDelivered ? '#0f420f' : '#c5a059'
                                            }}>
                                                {orderStatus}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Middle Section: Shipping & Payment Info */}
                                    <div className="row mb-5">
                                        <div className="col-md-6 mb-4 mb-md-0">
                                            <h4 className="mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#0f420f', fontWeight: '700' }}>Shipping Info</h4>
                                            <div className="p-3" style={{ background: '#fdfbf7', borderRadius: '10px', border: '1px solid rgba(197, 160, 89, 0.2)' }}>
                                                <div className="mb-2"><span style={labelStyle}>Name:</span> <span style={valueStyle}>{user.name}</span></div>
                                                <div className="mb-2"><span style={labelStyle}>Phone:</span> <span style={valueStyle}>{shippingInfo.phoneNo}</span></div>
                                                <div><span style={labelStyle}>Address:</span> <span style={valueStyle}>{shippingAddress}</span></div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <h4 className="mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#0f420f', fontWeight: '700' }}>Payment Info</h4>
                                            <div className="p-3" style={{ background: '#fdfbf7', borderRadius: '10px', border: '1px solid rgba(197, 160, 89, 0.2)' }}>
                                                <div className="mb-2">
                                                    <span style={labelStyle}>Status:</span> 
                                                    <span style={{ ...valueStyle, color: isPaid ? '#0f420f' : 'red', fontWeight: 'bold', marginLeft: '10px' }}>
                                                        {isPaid ? "PAID" : "NOT PAID"}
                                                    </span>
                                                </div>
                                                <div><span style={labelStyle}>Total Amount:</span> <span style={{ ...valueStyle, fontSize: '1.2rem', color: '#c5a059' }}>₹{totalPrice}</span></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Section: Order Items */}
                                    <h4 className="mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#0f420f', fontWeight: '700' }}>Royal Selection</h4>
                                    
                                    <div className="order-items-container">
                                        {orderItems && orderItems.map(item => (
                                            <div key={item.product} className="row align-items-center py-3 px-2 mb-3 shadow-sm" style={{ background: '#fdfbf7', borderRadius: '10px', border: '1px solid rgba(197, 160, 89, 0.1)' }}>
                                                <div className="col-4 col-md-2 text-center">
                                                    <img src={item.image} alt={item.name} className="img-fluid rounded" style={{ maxHeight: '80px', objectFit: 'cover' }} />
                                                </div>

                                                <div className="col-8 col-md-5 mt-2 mt-md-0">
                                                    <Link to={`/product/${item.product}`} style={{ textDecoration: 'none', color: '#0f420f', fontFamily: 'Montserrat, sans-serif', fontWeight: '700', fontSize: '1rem' }}>
                                                        {item.name}
                                                    </Link>
                                                </div>

                                                <div className="col-12 col-md-5 mt-3 mt-md-0 d-flex justify-content-between justify-content-md-end align-items-center">
                                                    <span style={{ fontFamily: 'Montserrat, sans-serif', color: '#555', fontSize: '0.9rem' }}>
                                                        ₹{item.price} <span style={{ color: '#c5a059', margin: '0 5px' }}>x</span> {item.quantity}
                                                    </span>
                                                    <span className="ms-md-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#0f420f', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                                        = <span style={{ color: '#c5a059' }}>₹{item.price * item.quantity}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </Fragment>
    );
}