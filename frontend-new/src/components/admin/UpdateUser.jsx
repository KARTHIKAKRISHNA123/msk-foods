import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getUser, updateUser, clearUserUpdated, clearError } from '../../slices/userSlice';

import MetaData from '../layouts/MetaData';
import Loader from '../layouts/Loader';
import Sidebar from './Sidebar';

export default function UpdateUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // ✨ NEW: Grab the currently logged-in user from authState
    const { user: loggedInUser } = useSelector(state => state.authState);
    const { loading, isUserUpdated, error, user } = useSelector(state => state.userState);

    // ✨ SECURITY CHECK: Is the admin looking at their own profile?
    const isSelf = loggedInUser && user && loggedInUser._id === user._id;

    useEffect(() => {
        if (user && user._id !== id) {
            dispatch(getUser(id));
        } else if (user) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role || 'user');
        }

        if (error) {
            toast.error(error, { theme: 'colored' });
            dispatch(clearError());
        }

        if (isUserUpdated) {
            toast.success('Authorization Level Successfully Updated!', { theme: 'colored' });
            dispatch(clearUserUpdated());
            navigate('/admin/users');
        }
    }, [dispatch, error, isUserUpdated, navigate, user, id]);

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
        
        // Final backend safety net before dispatch
        if (isSelf) {
            toast.error("Security Violation: Cannot change own authorization.", { theme: "colored" });
            return;
        }

        const userData = { name, email, role };
        dispatch(updateUser(id, userData));
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

    // Reusable Green Card Style (Visible overflow for dropdowns)
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
            <MetaData title="Manage Clientele" />

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
                            Manage Clientele
                        </motion.h1>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ fontFamily: 'monospace', color: '#555', letterSpacing: '1px', marginTop: '5px' }}>
                            User ID: <span style={{ color: colorGold, fontWeight: '700' }}>#{user?._id}</span>
                        </motion.p>
                        <motion.div 
                            initial={{ width: 0 }} animate={{ width: '80px' }} transition={{ duration: 1, delay: 0.4 }}
                            style={{ height: '4px', background: colorGold, marginTop: '12px' }} className="mx-auto mx-md-0 rounded"
                        />
                    </div>

                    {loading ? <Loader /> : (
                        <motion.div variants={formVariants} initial="hidden" animate="show" className="row justify-content-between">
                            
                            {/* --- LEFT SIDE: CLIENT DOSSIER --- */}
                            <div className="col-12 col-lg-7 mb-5 mb-lg-0">
                                <motion.div variants={itemVariants} className="shadow-lg p-4 p-md-5" style={greenCardStyle}>
                                    {innerFrame}
                                    <i className="fa fa-id-card-o position-absolute" style={{ fontSize: '20rem', color: 'rgba(197, 160, 89, 0.02)', bottom: '-20px', right: '-20px', transform: 'rotate(-10deg)', zIndex: 0 }}></i>

                                    <div style={{ position: 'relative', zIndex: 1 }}>
                                        <h4 style={sectionHeaderStyle}><i className="fa fa-user-circle me-2"></i> Client Archive</h4>
                                        
                                        <div className="mb-4">
                                            <label className="form-label" style={{ fontFamily: fontModern, color: colorGold, fontWeight: '700', fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                                                Full Name
                                            </label>
                                            <input type="text" className="form-control msk-input" value={name} onChange={(e) => setName(e.target.value)} required />
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label" style={{ fontFamily: fontModern, color: colorGold, fontWeight: '700', fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                                                Email Address
                                            </label>
                                            <input type="email" className="form-control msk-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* --- RIGHT SIDE: AUTHORIZATION CENTER --- */}
                            <div className="col-12 col-lg-4">
                                <motion.div variants={itemVariants} className="shadow-lg p-4 rounded" style={{ ...greenCardStyle, position: 'sticky', top: '100px' }}>
                                    {innerFrame}
                                    
                                    <div style={{ position: 'relative', zIndex: 1 }}>
                                        <h4 className="text-center mb-4" style={{ fontFamily: fontRoyal, color: colorGold, fontWeight: '700' }}>Authorization</h4>
                                        
                                        <div className="text-center mb-4">
                                            <span className="badge rounded-pill px-4 py-2" style={{ 
                                                background: role === 'admin' ? colorGold : 'rgba(253, 251, 247, 0.08)', 
                                                color: role === 'admin' ? colorDarkGreen : colorCream, 
                                                border: role === 'admin' ? `1px solid ${colorGold}` : `1px solid rgba(253, 251, 247, 0.3)`,
                                                fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase'
                                            }}>
                                                Current: {role}
                                            </span>
                                        </div>

                                        {/* ✨ SECURITY IMPLEMENTATION */}
                                        {isSelf ? (
                                            <div className="text-center p-3 rounded mt-4" style={{ background: 'rgba(217, 83, 79, 0.1)', border: `1px solid rgba(217, 83, 79, 0.3)` }}>
                                                <i className="fa fa-shield mb-2" style={{ fontSize: '2rem', color: '#ff6b6b' }}></i>
                                                <p className="mb-0 mt-1" style={{ fontFamily: fontModern, color: colorCream, fontSize: '0.85rem', fontWeight: '500' }}>
                                                    Security Lock: You cannot alter your own Executive Authorization level.
                                                </p>
                                            </div>
                                        ) : (
                                            <form onSubmit={submitHandler}>
                                                <div className="mb-4" ref={dropdownRef}>
                                                    <label className="form-label" style={{ fontFamily: fontModern, color: colorGold, fontWeight: '600', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                                        Assign New Role:
                                                    </label>
                                                    
                                                    <div style={{ position: 'relative' }}>
                                                        <div 
                                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                            className="d-flex justify-content-between align-items-center"
                                                            style={{ 
                                                                background: isDropdownOpen ? 'rgba(253, 251, 247, 0.08)' : 'rgba(253, 251, 247, 0.05)', 
                                                                color: colorCream, 
                                                                border: isDropdownOpen ? `1px solid ${colorGold}` : `1px solid rgba(197, 160, 89, 0.4)`,
                                                                boxShadow: isDropdownOpen ? `0 0 15px rgba(197, 160, 89, 0.2)` : 'none',
                                                                padding: '14px 18px',
                                                                borderRadius: '8px',
                                                                cursor: 'pointer',
                                                                fontWeight: '600',
                                                                fontFamily: fontModern,
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                        >
                                                            <span>{role === 'admin' ? 'Executive Admin' : 'Standard User'}</span>
                                                            <motion.i 
                                                                animate={{ rotate: isDropdownOpen ? 180 : 0 }} 
                                                                transition={{ duration: 0.3 }}
                                                                className="fa fa-chevron-down" 
                                                                style={{ color: colorGold, fontSize: '0.8rem' }}
                                                            />
                                                        </div>

                                                        <AnimatePresence>
                                                            {isDropdownOpen && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                                                                    animate={{ opacity: 1, y: 0, scaleY: 1 }}
                                                                    exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                                                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                                                    style={{
                                                                        position: 'absolute',
                                                                        top: '100%', left: 0, right: 0,
                                                                        marginTop: '8px',
                                                                        background: colorDarkGreen,
                                                                        border: `1px solid ${colorGold}`,
                                                                        borderRadius: '8px',
                                                                        overflow: 'hidden',
                                                                        zIndex: 50,
                                                                        boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
                                                                        transformOrigin: 'top center'
                                                                    }}
                                                                >
                                                                    <div 
                                                                        onClick={() => { setRole('user'); setIsDropdownOpen(false); }}
                                                                        onMouseEnter={(e) => { e.currentTarget.style.background = colorGold; e.currentTarget.style.color = colorDarkGreen; }}
                                                                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = colorGold; }}
                                                                        style={{
                                                                            padding: '14px 18px', cursor: 'pointer', color: colorGold, 
                                                                            fontWeight: '600', fontFamily: fontModern, transition: 'all 0.2s ease',
                                                                            borderBottom: `1px solid rgba(197, 160, 89, 0.1)`
                                                                        }}
                                                                    >
                                                                        Standard User
                                                                    </div>
                                                                    
                                                                    <div 
                                                                        onClick={() => { setRole('admin'); setIsDropdownOpen(false); }}
                                                                        onMouseEnter={(e) => { e.currentTarget.style.background = colorGold; e.currentTarget.style.color = colorDarkGreen; }}
                                                                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = colorGold; }}
                                                                        style={{
                                                                            padding: '14px 18px', cursor: 'pointer', color: colorGold, 
                                                                            fontWeight: '600', fontFamily: fontModern, transition: 'all 0.2s ease'
                                                                        }}
                                                                    >
                                                                        Executive Admin
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </div>
                                                
                                                <motion.button 
                                                    whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(197, 160, 89, 0.2)' }} 
                                                    whileTap={{ scale: 0.98 }}
                                                    type="submit" 
                                                    disabled={loading}
                                                    className="btn w-100 py-3 shadow mt-3"
                                                    style={{ 
                                                        background: 'linear-gradient(135deg, #d4af37 0%, #c5a059 100%)', 
                                                        color: colorDarkGreen, border: 'none', borderRadius: '8px', 
                                                        fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: fontModern
                                                    }}
                                                >
                                                    {loading ? <i className="fa fa-spinner fa-spin"></i> : "Update Registry"}
                                                </motion.button>
                                            </form>
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