import React from 'react';
import { motion } from 'framer-motion';

export default function Hero({ product }) {
    const scrollToDetails = () => {
        const detailsSection = document.getElementById('product-details');
        if (detailsSection) {
            detailsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section 
            className="position-relative w-100 d-flex flex-column align-items-center justify-content-center" 
            style={{ 
                // ✨ FIXED: changed 'height' to 'minHeight' and added padding
                minHeight: '100vh', 
                paddingTop: '80px',    // Space from top
                paddingBottom: '120px', // ✨ MORE SPACE at the bottom for the frame
                background: 'linear-gradient(135deg, #fdfbf7 0%, #f4ebd0 100%)', // Royal Cream
                overflow: 'hidden'
            }}
        >
            {/* --- ANIMATED BACKGROUND ORBS --- */}
            <motion.div 
                style={{
                    position: 'absolute', top: '10%', left: '5%',
                    width: '300px', height: '300px',
                    background: 'radial-gradient(circle, rgba(197,160,89,0.1) 0%, rgba(0,0,0,0) 70%)',
                    borderRadius: '50%', zIndex: 0
                }}
                animate={{ y: [0, 50, 0], x: [0, 20, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.div 
                style={{
                    position: 'absolute', bottom: '10%', right: '5%',
                    width: '500px', height: '500px',
                    background: 'radial-gradient(circle, rgba(15, 66, 15, 0.05) 0%, rgba(0,0,0,0) 70%)',
                    borderRadius: '50%', zIndex: 0
                }}
                animate={{ y: [0, -60, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="container text-center position-relative" style={{ zIndex: 2 }}>
                
                {/* 1. Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-4"
                >
                    <span 
                        className="px-4 py-2 text-uppercase fw-bold" 
                        style={{ 
                            letterSpacing: '4px', 
                            color: '#0f420f', 
                            border: '1px solid #c5a059',
                            background: 'rgba(255,255,255,0.6)',
                            fontSize: '0.8rem'
                        }}
                    >
                        Since 2024 • Authentic Tradition
                    </span>
                </motion.div>

                {/* 2. Golden Tagline */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="display-2 fw-bold mb-3"
                    style={{ 
                        fontFamily: 'Playfair Display, serif', 
                        color: '#c5a059', // Gold Title
                        textShadow: '2px 2px 0px rgba(15, 66, 15, 0.05)',
                        lineHeight: '1.2'
                    }}
                >
                    Nature’s Gold, <br/>
                    <span style={{ color: '#0f420f', fontSize: '0.7em' }}>Crafted for Wellness.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="lead mb-5 mx-auto"
                    style={{ maxWidth: '600px', color: '#666', fontFamily: 'Montserrat, sans-serif' }}
                >
                    100% Natural Ingredients. No Preservatives. Pure Health.
                </motion.p>

                {/* 3. Hero Image (With breathing room) */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.6, type: "spring" }}
                    className="mb-5 position-relative"
                    style={{ padding: '10px' }} // Tiny padding around the image itself
                >
                    <motion.img 
                        src={product?.images[0]?.image || '/images/placeholder.png'}
                        alt="Hero Product"
                        className="img-fluid"
                        style={{ 
                            maxHeight: '420px', // Slightly adjusted to fit comfortably
                            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.25))',
                            borderRadius: '10px' // Softens the corners if the image is sharp
                        }}
                        animate={{ y: [0, -15, 0] }} 
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>

                {/* 4. Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    onClick={scrollToDetails}
                    style={{ cursor: 'pointer', marginTop: '20px' }}
                >
                    <span className="text-uppercase small fw-bold" style={{color: '#c5a059', letterSpacing: '2px'}}>
                        Scroll to Explore
                    </span>
                    <br/>
                    <motion.i 
                        className="fa fa-chevron-down mt-2"
                        style={{ color: '#0f420f', fontSize: '1.5rem' }}
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    ></motion.i>
                </motion.div>
            </div>
        </section>
    );
}