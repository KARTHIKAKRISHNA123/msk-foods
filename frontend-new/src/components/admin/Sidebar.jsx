import React, { useState, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar() {
    const location = useLocation();
    
    // ✨ State to track if the mobile menu is open
    const [isOpen, setIsOpen] = useState(false);

    // --- THEME VARIABLES ---
    const fontRoyal = "'Playfair Display', serif";
    const fontModern = "'Montserrat', sans-serif";
    const colorGreen = '#0f420f';
    const colorGold = '#c5a059';

    const isActive = (path) => location.pathname === path;

    // --- REUSABLE NAV ITEM ---
    const NavItem = ({ path, icon, label }) => {
        const active = isActive(path);
        return (
            <motion.div whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Link 
                    to={path} 
                    onClick={() => setIsOpen(false)} // ✨ Closes the menu automatically on mobile when a link is clicked!
                    className="d-flex align-items-center"
                    style={{
                        padding: '12px 20px', 
                        margin: '8px 15px',
                        borderRadius: '10px', 
                        textDecoration: 'none',
                        background: active ? 'linear-gradient(90deg, rgba(197, 160, 89, 0.15) 0%, transparent 100%)' : 'transparent',
                        borderLeft: active ? `3px solid ${colorGold}` : '3px solid transparent',
                        color: active ? colorGold : 'rgba(253, 251, 247, 0.7)',
                        fontFamily: fontModern, 
                        fontWeight: active ? '700' : '500',
                        fontSize: '0.95rem',
                        transition: 'background-color 0.3s ease, color 0.3s ease'
                    }}
                >
                    <i className={icon} style={{ width: '30px', fontSize: '1.1rem', color: colorGold }}></i>
                    {label}
                </Link>
            </motion.div>
        );
    };

    // --- THE SIDEBAR CONTENT (Saved as a variable so we don't write it twice) ---
    const sidebarContent = (
        <div style={{ 
            background: 'linear-gradient(180deg, #0f420f 0%, #071f07 100%)', 
            minHeight: '100%', 
            height: '100vh', 
            paddingTop: '30px', 
            display: 'flex', 
            flexDirection: 'column',
            boxShadow: '5px 0 20px rgba(0,0,0,0.05)'
        }}>
            {/* BRANDING HEADER */}
            <div className="text-center mb-4 pb-4" style={{ borderBottom: `1px solid rgba(197, 160, 89, 0.15)`, margin: '0 20px' }}>
                <h4 style={{ fontFamily: fontRoyal, color: colorGold, fontWeight: '700', letterSpacing: '2px', margin: '0 0 5px 0', fontSize: '1.3rem' }}>
                    MSK ADMIN
                </h4>
                <p style={{ fontFamily: fontModern, color: 'rgba(197, 160, 89, 0.8)', fontWeight: '700', letterSpacing: '3px', margin: 0, fontSize: '0.75rem', textTransform: 'uppercase' }}>
                    Executive Panel
                </p>
            </div>

            {/* NAVIGATION LINKS */}
            <nav className="flex-column flex-grow-1 mt-2">
                <NavItem path="/admin/dashboard" icon="fa fa-tachometer" label="Overview" />
                <NavItem path="/admin/products" icon="fa fa-shopping-basket" label="Inventory" />
                <NavItem path="/admin/orders" icon="fa fa-shopping-bag" label="Orders" />
                <NavItem path="/admin/users" icon="fa fa-users" label="Customers" />
            </nav>
        </div>
    );

    return (
        <Fragment>
            {/* =========================================
                1. DESKTOP VIEW (Hidden on Mobile)
            ========================================= */}
            <div className="d-none d-md-block h-100">
                {sidebarContent}
            </div>

            {/* =========================================
                2. MOBILE VIEW (Hidden on Desktop)
            ========================================= */}
            {/* The Top Bar with Hamburger */}
            <div className="d-md-none d-flex justify-content-between align-items-center p-3 shadow-sm" style={{ background: colorGreen, borderBottom: `2px solid ${colorGold}` }}>
                <div className="d-flex align-items-center">
                    <img src="/images/favicon.png" alt="MSK" style={{ width: '30px', marginRight: '10px' }} />
                    <h5 style={{ fontFamily: fontRoyal, color: colorGold, margin: 0, fontWeight: '700', letterSpacing: '1px' }}>MSK ADMIN</h5>
                </div>
                <button onClick={() => setIsOpen(true)} className="btn p-0" style={{ color: colorGold, border: 'none', background: 'transparent' }}>
                    <i className="fa fa-bars" style={{ fontSize: '1.5rem' }}></i>
                </button>
            </div>

            {/* The Slide-Out Drawer & Backdrop Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <Fragment>
                        {/* Darkened Background Overlay */}
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 0.6 }} 
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)} // Clicking outside the menu closes it
                            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#000', zIndex: 1040 }}
                        />

                        {/* The Gliding Sidebar */}
                        <motion.div 
                            initial={{ x: '-100%' }} 
                            animate={{ x: 0 }} 
                            exit={{ x: '-100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '280px', zIndex: 1050 }}
                        >
                            {/* Close 'X' Button inside the drawer */}
                            <button 
                                onClick={() => setIsOpen(false)} 
                                className="btn position-absolute top-0 end-0 m-3" 
                                style={{ color: colorGold, zIndex: 1060, background: 'rgba(0,0,0,0.2)', borderRadius: '50%' }}
                            >
                                <i className="fa fa-times fa-lg"></i>
                            </button>
                            
                            {sidebarContent}
                        </motion.div>
                    </Fragment>
                )}
            </AnimatePresence>
        </Fragment>
    );
}