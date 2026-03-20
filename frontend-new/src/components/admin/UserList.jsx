import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getUsers, deleteUser, clearUserDeleted, clearError } from '../../slices/userSlice';

import MetaData from '../layouts/MetaData';
import Loader from '../layouts/Loader';
import Sidebar from './Sidebar';

export default function UserList() {
    const dispatch = useDispatch();
    
    // --- THEME VARIABLES ---
    const colorGreen = '#0f420f';
    const colorDarkGreen = '#0a2e0a';
    const colorGold = '#c5a059';
    const colorCream = '#fdfbf7';

    // Fetch user states from Redux
    const { users = [], loading = false, error, isUserDeleted } = useSelector(state => state.userState);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    // Handle Delete Success & Errors
    useEffect(() => {
        if (error) {
            toast.error(error, { theme: 'colored' });
            dispatch(clearError());
        }
        if (isUserDeleted) {
            toast.success('User successfully removed from the registry.', { theme: 'colored' });
            dispatch(clearUserDeleted());
            dispatch(getUsers()); // Refresh the table instantly!
        }
    }, [dispatch, error, isUserDeleted]);

    // Delete Handler
    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to permanently delete this user account?")) {
            dispatch(deleteUser(id));
        }
    };

    // ✨ Dynamic Role Color Logic (Matches OrderList Pill Aesthetic)
    const getRoleColors = (role) => {
        if (!role) return { bg: 'transparent', text: colorCream, border: 'rgba(253, 251, 247, 0.3)' };
        
        if (role === 'admin') {
            // THE STAMP OF AUTHORITY: Solid MSK Gold
            return {
                bg: colorGold, 
                text: colorDarkGreen, 
                border: colorGold
            };
        } else {
            // STANDARD USER: Faint Cream/Pearl
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
        opacity: 0.9
    };

    return (
        <Fragment>
            <MetaData title="Clientele Ledger" />

            <div className="row m-0" style={{ 
                minHeight: '100vh', 
                backgroundColor: colorCream,
                // Layered Ambient Background with Texture (Identical to OrderList)
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

                {/* RIGHT COLUMN: Users Content */}
                <div className="col-12 col-md-10 py-5 px-4 px-md-5">
                    
                    {/* Header Area */}
                    <div className="mb-5 text-center text-md-start">
                        <motion.h1 
                            initial={{ opacity: 0, y: -20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            style={{ fontFamily: 'var(--font-serif)', color: colorGreen, fontWeight: '800', fontSize: '2.8rem', margin: 0 }}
                        >
                            Clientele Ledger
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
                    {loading && users.length === 0 ? <Loader /> : (
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
                            <i className="fa fa-users position-absolute" style={{ 
                                fontSize: '25rem', color: 'rgba(197, 160, 89, 0.02)', 
                                top: '-50px', right: '-50px', transform: 'rotate(-15deg)', zIndex: 0 
                            }}></i>

                            <div className="p-4 p-md-5" style={{ position: 'relative', zIndex: 1 }}>
                                
                                {/* TABLE HEADER - Hidden on Mobile! */}
                                <div className="d-none d-md-flex pb-3 mb-4" style={{ borderBottom: `2px solid rgba(197, 160, 89, 0.3)` }}>
                                    <div className="col-2" style={labelStyle}>User ID</div>
                                    <div className="col-3" style={labelStyle}>Name</div>
                                    <div className="col-3" style={labelStyle}>Email</div>
                                    <div className="col-2 text-center" style={labelStyle}>Role</div>
                                    <div className="col-2 text-end pe-4" style={labelStyle}>Actions</div>
                                </div>

                                {/* TABLE BODY */}
                                {users && users.length > 0 ? (
                                    <motion.div variants={listVariants} initial="hidden" animate="show">
                                        <AnimatePresence>
                                            {users.map(user => {
                                                const roleStyle = getRoleColors(user.role);

                                                return (
                                                <motion.div 
                                                    key={user._id} 
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
                                                        color: colorCream, 
                                                        transition: 'all 0.3s ease' 
                                                    }}
                                                >
                                                    
                                                    {/* ID */}
                                                    <div className="col-12 col-md-2 mb-3 mb-md-0 d-flex justify-content-between justify-content-md-start align-items-center" style={{ fontSize: '0.85rem', color: 'rgba(253, 251, 247, 0.7)' }}>
                                                        <span className="d-md-none" style={labelStyle}>ID:</span>
                                                        <span style={{ fontFamily: 'monospace', letterSpacing: '1px' }}>#{user._id.substring(0, 8)}...</span>
                                                    </div>
                                                    
                                                    {/* Name */}
                                                    <div className="col-12 col-md-3 mb-3 mb-md-0 d-flex justify-content-between justify-content-md-start align-items-center">
                                                        <span className="d-md-none" style={labelStyle}>Name:</span>
                                                        <span style={{ fontWeight: '600', color: colorGold }}>{user.name}</span>
                                                    </div>
                                                    
                                                    {/* Email */}
                                                    <div className="col-12 col-md-3 mb-3 mb-md-0 d-flex justify-content-between justify-content-md-start align-items-center" style={{ fontSize: '0.9rem' }}>
                                                        <span className="d-md-none" style={labelStyle}>Email:</span>
                                                        <span>{user.email}</span>
                                                    </div>
                                                    
                                                    {/* Role Pill */}
                                                    <div className="col-12 col-md-2 mb-4 mb-md-0 d-flex justify-content-between justify-content-md-center align-items-center">
                                                        <span className="d-md-none" style={labelStyle}>Role:</span>
                                                        <motion.span 
                                                            whileHover={{ scale: 1.05 }}
                                                            style={{ 
                                                                background: roleStyle.bg, 
                                                                color: roleStyle.text, 
                                                                border: `1px solid ${roleStyle.border}`,
                                                                padding: '6px 14px', 
                                                                borderRadius: '30px',
                                                                fontSize: '0.7rem',
                                                                fontWeight: '800',
                                                                letterSpacing: '1.5px',
                                                                textTransform: 'uppercase'
                                                            }}
                                                        >
                                                            {user.role}
                                                        </motion.span>
                                                    </div>
                                                    
                                                    {/* Action Buttons */}
                                                    <div className="col-12 col-md-2 d-flex justify-content-end align-items-center gap-3 mt-2 mt-md-0 pe-md-2">
                                                        
                                                        {/* Manage User Button */}
                                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-100 w-md-auto">
                                                            <Link to={`/admin/user/${user._id}`} className="btn w-100 shadow-sm d-flex justify-content-center align-items-center gap-2" style={{ 
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
                                                            <button onClick={() => deleteHandler(user._id)} className="btn p-2" style={{ 
                                                                background: 'transparent', 
                                                                color: 'rgba(217, 83, 79, 0.7)', 
                                                                border: 'none', 
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                            onMouseOver={(e) => e.currentTarget.style.color = '#ff6b6b'}
                                                            onMouseOut={(e) => e.currentTarget.style.color = 'rgba(217, 83, 79, 0.7)'}
                                                            title="Delete User"
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
                                        style={{ color: 'rgba(253, 251, 247, 0.5)' }}
                                    >
                                        <i className="fa fa-users mb-3" style={{ fontSize: '3.5rem', color: colorGold }}></i>
                                        <h5 style={{ letterSpacing: '1px' }}>No users found in the registry.</h5>
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