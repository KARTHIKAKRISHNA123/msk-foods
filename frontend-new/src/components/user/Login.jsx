import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, login } from '../../slices/authSlice';
import MetaData from '../layouts/MetaData';
import { toast } from 'react-toastify';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Loader from '../layouts/Loader';
import { motion } from 'framer-motion';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // --- THEME VARIABLES ---
    const fontRoyal = "'Playfair Display', serif";
    const fontModern = "'Montserrat', sans-serif";
    const colorGreen = '#0f420f';
    const colorDarkGreen = '#0a2e0a';
    const colorGold = '#c5a059';
    const colorCream = '#fdfbf7';

    const { loading, error, isAuthenticated } = useSelector(state => state.authState);
    const redirect = location.search ? '/' + location.search.split('=')[1] : '/';

    const submitHandler = (e) => {
        e.preventDefault();

        // Custom Validation
        if (!email) {
            toast.error("Please enter your email address.", { position: "top-center", theme: "colored" });
            return;
        }
        if (!password) {
            toast.error("Please enter your password.", { position: "top-center", theme: "colored" });
            return;
        }

        dispatch(login(email, password));
    }

    useEffect(() => {
        if (error) {
            toast.error(error, { position: "top-center", theme: "colored" });
            dispatch(clearError());
            return;
        }
        if (isAuthenticated) {
            navigate(redirect);
            toast.success("Welcome back.", { position: "top-center", theme: "colored" });
        }
    }, [error, isAuthenticated, dispatch, navigate, redirect]);

    // --- 🎬 FRAMER MOTION ANIMATIONS (Synced with Register.jsx) ---
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 30 },
        show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const formVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } } 
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } } 
    };

    // Reusable Green Card Style
    const greenCardStyle = {
        background: `linear-gradient(145deg, ${colorGreen} 0%, ${colorDarkGreen} 100%)`, 
        borderRadius: '20px', 
        border: `1px solid rgba(197, 160, 89, 0.4)`,
        boxShadow: '0 25px 50px rgba(15, 66, 15, 0.3)',
        position: 'relative',
        overflow: 'hidden'
    };

    const innerFrame = (
        <div style={{
            position: 'absolute', top: '12px', left: '12px', right: '12px', bottom: '12px',
            border: `1px dashed rgba(197, 160, 89, 0.25)`, borderRadius: '15px', pointerEvents: 'none', zIndex: 0 
        }} />
    );

    if(loading) return <Loader/>

    return (
        <Fragment>
            <MetaData title={`Member Access`} />

            <div className="d-flex justify-content-center align-items-center" style={{ 
                minHeight: '100vh', 
                backgroundColor: colorCream,
                backgroundImage: `
                    radial-gradient(circle at 0% 0%, rgba(197, 160, 89, 0.15) 0%, transparent 40%),
                    radial-gradient(circle at 100% 100%, rgba(15, 66, 15, 0.12) 0%, transparent 40%),
                    url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E")
                `,
                backgroundAttachment: 'fixed',
                padding: '40px 20px'
            }}>
                
                <motion.div 
                    variants={cardVariants} 
                    initial="hidden" 
                    animate="show" 
                    className="col-12 col-md-8 col-lg-5"
                >
                    <div className="shadow-lg p-4 p-md-5" style={greenCardStyle}>
                        {innerFrame}
                        
                        {/* Faint Background Watermark Icon */}
                        <i className="fa fa-key position-absolute" style={{ 
                            fontSize: '18rem', color: 'rgba(197, 160, 89, 0.03)', 
                            top: '-20px', right: '-20px', transform: 'rotate(15deg)', zIndex: 0 
                        }}></i>

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            
                            {/* Header */}
                            <motion.div variants={itemVariants} className="text-center mb-5">
                                <h2 style={{ fontFamily: fontRoyal, color: colorGold, fontWeight: '800', fontSize: '2.5rem', margin: 0 }}>
                                    Member Access
                                </h2>
                                <p style={{ fontFamily: fontModern, color: 'rgba(253, 251, 247, 0.7)', fontSize: '0.9rem', marginTop: '10px', letterSpacing: '1px' }}>
                                    Where tradition meets modern nourishment.
                                </p>
                            </motion.div>

                            {/* The Form container handles staggered children animations */}
                            <motion.form variants={formVariants} initial="hidden" animate="show" onSubmit={submitHandler} noValidate>
                                
                                {/* Email Input */}
                                <motion.div variants={itemVariants} className="mb-4">
                                    <label className="form-label" style={{ fontFamily: fontModern, color: colorGold, fontWeight: '600', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                        Email Address
                                    </label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={email}
                                        onChange={e => setEmail(e.target.value)} 
                                        className="form-control msk-input" 
                                        style={{ background: 'rgba(253, 251, 247, 0.05)', color: colorCream, border: `1px solid rgba(197, 160, 89, 0.4)` }}
                                    />
                                </motion.div>

                                {/* Password Input */}
                                <motion.div variants={itemVariants} className="mb-4">
                                    <label className="form-label" style={{ fontFamily: fontModern, color: colorGold, fontWeight: '600', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                        Password
                                    </label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="form-control msk-input" 
                                        style={{ background: 'rgba(253, 251, 247, 0.05)', color: colorCream, border: `1px solid rgba(197, 160, 89, 0.4)` }}
                                    />
                                </motion.div>

                                {/* Forgot Password Link */}
                                <motion.div variants={itemVariants} className="d-flex justify-content-end mb-5">
                                    <Link to="/password/forgot" style={{ 
                                        color: 'rgba(253, 251, 247, 0.6)', 
                                        fontSize: '0.8rem', 
                                        fontFamily: fontModern,
                                        textDecoration: 'none', 
                                        transition: '0.3s' 
                                    }} 
                                    onMouseOver={(e) => e.target.style.color = colorGold} 
                                    onMouseOut={(e) => e.target.style.color = 'rgba(253, 251, 247, 0.6)'}>
                                        Forgot Password?
                                    </Link>
                                </motion.div>

                                {/* Submit Button */}
                                <motion.div variants={itemVariants}>
                                    <motion.button 
                                        whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(197, 160, 89, 0.2)' }} 
                                        whileTap={{ scale: 0.98 }}
                                        type="submit" 
                                        disabled={loading}
                                        className="btn w-100 py-3 shadow"
                                        style={{ 
                                            background: 'linear-gradient(135deg, #d4af37 0%, #c5a059 100%)', 
                                            color: colorDarkGreen, 
                                            border: 'none', 
                                            borderRadius: '8px', 
                                            fontWeight: '800',
                                            letterSpacing: '2px',
                                            textTransform: 'uppercase',
                                            fontFamily: fontModern
                                        }}
                                    >
                                        {loading ? <i className="fa fa-spinner fa-spin"></i> : "Enter"}
                                    </motion.button>
                                </motion.div>
                                
                            </motion.form>

                            {/* Register Redirect Link */}
                            <motion.div variants={itemVariants} className="text-center mt-4 pt-3" style={{ borderTop: `1px solid rgba(197, 160, 89, 0.2)` }}>
                                <span style={{ fontFamily: fontModern, color: 'rgba(253, 251, 247, 0.7)', fontSize: '0.9rem' }}>
                                    New to MSK Foods? 
                                </span>
                                <Link to="/register" className="ms-2" style={{ 
                                    color: colorGold, 
                                    fontWeight: '700', 
                                    textDecoration: 'none',
                                    fontFamily: fontModern,
                                    letterSpacing: '0.5px'
                                }}>
                                    Begin the Tradition <i className="fa fa-angle-right ms-1"></i>
                                </Link>
                            </motion.div>

                        </div>
                    </div>
                </motion.div>
            </div>
        </Fragment>
    )
}