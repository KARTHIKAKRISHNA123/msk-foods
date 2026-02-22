import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MetaData from '../layouts/MetaData';

export default function OrderSuccess() {
    return (
        <Fragment>
            <MetaData title={'Transaction Complete'} />

            <div 
                className="row wrapper justify-content-center align-items-center" 
                style={{ 
                    minHeight: '85vh', 
                    margin: 0,
                    background: '#fdfbf7', 
                    backgroundImage: `
                        radial-gradient(circle at 50% 10%, rgba(197, 160, 89, 0.1) 0%, transparent 50%),
                        linear-gradient(180deg, #fdfbf7 0%, #f4ebd0 100%)
                    `,
                    paddingBottom: "80px"
                }}
            >
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
                                position: 'absolute',
                                top: '15px', left: '15px', right: '15px', bottom: '15px',
                                border: '1px solid rgba(197, 160, 89, 0.2)', 
                                pointerEvents: 'none',
                                zIndex: 0,
                                borderRadius: '15px' 
                            }}
                        />

                        <div className="p-5" style={{ position: 'relative', zIndex: 1 }}>
                            
                            {/* The Gold Medallion Icon with Light Golden Tick */}
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                                className="mb-4"
                            >
                                <div style={{ 
                                    width: '75px', height: '75px', 
                                    margin: '0 auto',
                                    background: 'transparent',
                                    border: '1px solid rgba(197, 160, 89, 0.4)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '4px'
                                }}>
                                    <div style={{
                                        width: '100%', height: '100%',
                                        background: 'linear-gradient(135deg, #d4af37 0%, #c5a059 100%)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 10px 20px rgba(197, 160, 89, 0.3)'
                                    }}>
                                        <i className="fa fa-check" style={{ fontSize: '1.8rem', color: '#fdfbf7' }}></i>
                                    </div>
                                </div>
                            </motion.div>

                            {/* HEADER */}
                            <div className="text-center mb-4">
                                <motion.h1 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="mb-2" 
                                    style={{ fontFamily: 'Playfair Display, serif', color: '#0f420f', fontWeight: '700', letterSpacing: '0.5px' }}
                                >
                                    Transaction Honored
                                </motion.h1>
                                
                                <div style={{ width: '40px', height: '2px', background: '#c5a059', margin: '0 auto 20px auto', opacity: 0.7 }}></div>
                                
                                {/* ✨ MATCHING TEXT STYLE: Playfair, Royal Green, No Gray */}
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    style={{ 
                                        color: '#0f420f', 
                                        fontSize: '1rem', 
                                        fontFamily: 'Playfair Display, serif', 
                                        lineHeight: '1.7',
                                        fontStyle: 'italic'
                                    }}
                                >
                                    Your order has been elegantly processed. The MSK artisans are now preparing your <span style={{ color: '#c5a059', fontWeight: '700', fontStyle: 'normal' }}>premium, nutrition-rich health mix</span> with the utmost care.
                                </motion.p>
                            </div>

                            {/* TEXT LINK - Matching Playfair & Royal Green */}
                            <div className="d-flex justify-content-center mb-4">
                                <Link 
                                    to="/orders" 
                                    style={{ 
                                        color: '#0f420f', 
                                        fontSize: '0.95rem', 
                                        fontFamily: 'Playfair Display, serif', 
                                        textDecoration: 'none', 
                                        transition: '0.3s', 
                                        letterSpacing: '0.5px', 
                                        fontWeight: '700',
                                        borderBottom: '1px solid rgba(197, 160, 89, 0.4)',
                                        paddingBottom: '2px'
                                    }} 
                                    onMouseOver={(e) => {
                                        e.target.style.color = '#c5a059';
                                        e.target.style.borderBottom = '1px solid #c5a059';
                                    }} 
                                    onMouseOut={(e) => {
                                        e.target.style.color = '#0f420f';
                                        e.target.style.borderBottom = '1px solid rgba(197, 160, 89, 0.4)';
                                    }}
                                >
                                    View Your Orders
                                </Link>
                            </div>

                            {/* PRIMARY BUTTON - Kept exactly like Login for UI consistency */}
                            <motion.div whileHover={{ scale: 1.01, boxShadow: "0 10px 20px rgba(197, 160, 89, 0.2)" }} whileTap={{ scale: 0.99 }}>
                                <Link to="/" className="btn w-100 py-3 d-flex align-items-center justify-content-center" style={{ 
                                    background: 'linear-gradient(135deg, #d4af37 0%, #c5a059 100%)', 
                                    color: '#0f420f', 
                                    border: 'none', 
                                    borderRadius: '5px', 
                                    letterSpacing: '3px', 
                                    textTransform: 'uppercase', 
                                    fontWeight: '700',
                                    fontSize: '0.85rem',
                                    fontFamily: 'Montserrat, sans-serif', // UI Button Font
                                    boxShadow: '0 4px 10px rgba(197, 160, 89, 0.2)',
                                    textDecoration: 'none'
                                }}>
                                    Continue Exploring
                                </Link>
                            </motion.div>

                            {/* MICRO-TRUST TEXT - Matching Playfair & Royal Green */}
                            <div className="mt-4 text-center" style={{ fontFamily: 'Playfair Display, serif', color: '#0f420f' }}>
                                <span style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>Welcome to the </span>
                                <span style={{ color: '#c5a059', fontWeight: 'bold', textDecoration: 'none', marginLeft: '3px', fontSize: '1rem', fontStyle: 'normal' }}>
                                    Tradition
                                </span>
                            </div>

                        </div>
                    </motion.div>
                </div>
            </div>
        </Fragment>
    )
}