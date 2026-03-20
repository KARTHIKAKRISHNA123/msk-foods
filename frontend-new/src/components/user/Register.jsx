import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../../slices/authSlice';
import { toast } from 'react-toastify';
import MetaData from '../layouts/MetaData';

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // --- THEME VARIABLES ---
    const fontRoyal = "'Playfair Display', serif";
    const fontModern = "'Montserrat', sans-serif";
    const colorGreen = '#0f420f';
    const colorDarkGreen = '#0a2e0a';
    const colorGold = '#c5a059';
    const colorCream = '#fdfbf7';

    // --- STATE ---
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");

    const { loading, error, isAuthenticated } = useSelector(state => state.authState);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
        if (error) {
            toast.error(error, { theme: 'colored' });
            dispatch(clearAuthError());
        }
    }, [error, isAuthenticated, dispatch, navigate]);

    const onChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0]);
                }
            };
            if (e.target.files[0]) {
                reader.readAsDataURL(e.target.files[0]);
            }
        } else {
            setUserData({ ...userData, [e.target.name]: e.target.value });
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        if (avatar) {
            formData.append('avatar', avatar);
        }
        dispatch(register(formData));
    };

    // --- 🎬 FRAMER MOTION ANIMATIONS ---
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 30 },
        show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const formVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } } // Creates the cascading effect
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } } // Smooth spring up
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

    return (
        <Fragment>
            <MetaData title="Join Clientele" />

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
                        
                        <i className="fa fa-diamond position-absolute" style={{ 
                            fontSize: '18rem', color: 'rgba(197, 160, 89, 0.03)', 
                            top: '-20px', right: '-20px', transform: 'rotate(15deg)', zIndex: 0 
                        }}></i>

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            
                            {/* Header */}
                            <motion.div variants={itemVariants} className="text-center mb-5">
                                <h2 style={{ fontFamily: fontRoyal, color: colorGold, fontWeight: '800', fontSize: '2.5rem', margin: 0 }}>
                                    Join MSK Foods
                                </h2>
                                <p style={{ fontFamily: fontModern, color: 'rgba(253, 251, 247, 0.7)', fontSize: '0.9rem', marginTop: '10px', letterSpacing: '1px' }}>
                                    Create your exclusive clientele account.
                                </p>
                            </motion.div>

                            {/* ✨ The Form container handles staggered children animations */}
                            <motion.form variants={formVariants} initial="hidden" animate="show" onSubmit={submitHandler} encType='multipart/form-data'>
                                
                                {/* Name Input */}
                                <motion.div variants={itemVariants} className="mb-4">
                                    <label className="form-label" style={{ fontFamily: fontModern, color: colorGold, fontWeight: '600', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                        Full Name
                                    </label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        onChange={onChange} 
                                        className="form-control msk-input" 
                                        style={{ background: 'rgba(253, 251, 247, 0.05)', color: colorCream, border: `1px solid rgba(197, 160, 89, 0.4)` }}
                                        required 
                                    />
                                </motion.div>

                                {/* Email Input */}
                                <motion.div variants={itemVariants} className="mb-4">
                                    <label className="form-label" style={{ fontFamily: fontModern, color: colorGold, fontWeight: '600', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                        Email Address
                                    </label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        onChange={onChange} 
                                        className="form-control msk-input" 
                                        style={{ background: 'rgba(253, 251, 247, 0.05)', color: colorCream, border: `1px solid rgba(197, 160, 89, 0.4)` }}
                                        required 
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
                                        onChange={onChange} 
                                        className="form-control msk-input" 
                                        style={{ background: 'rgba(253, 251, 247, 0.05)', color: colorCream, border: `1px solid rgba(197, 160, 89, 0.4)` }}
                                        required 
                                    />
                                </motion.div>

                                {/* ✨ CUSTOM GOLD AVATAR UPLOAD */}
                                <motion.div variants={itemVariants} className="mb-5">
                                    <label className="form-label" style={{ fontFamily: fontModern, color: colorGold, fontWeight: '600', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                        Profile Avatar
                                    </label>
                                    <div className="d-flex align-items-center gap-3">
                                        <div>
                                            <figure className="avatar mr-3 item-rtl" style={{ margin: 0 }}>
                                                <img 
                                                    src={avatarPreview} 
                                                    className="rounded-circle shadow-sm" 
                                                    alt="Avatar Preview" 
                                                    style={{ width: '60px', height: '60px', objectFit: 'cover', border: `2px solid ${colorGold}` }} 
                                                />
                                            </figure>
                                        </div>
                                        <div className="flex-grow-1">
                                            {/* Hide the default ugly file input */}
                                            <input 
                                                type="file" 
                                                name="avatar" 
                                                id="customFile"
                                                onChange={onChange} 
                                                className="d-none" 
                                                accept="image/*"
                                            />
                                            {/* Beautiful Golden Label acts as the button */}
                                            <label 
                                                htmlFor="customFile"
                                                className="d-flex align-items-center justify-content-center w-100"
                                                style={{
                                                    background: 'rgba(197, 160, 89, 0.1)',
                                                    color: colorGold,
                                                    border: `1px dashed ${colorGold}`,
                                                    padding: '12px',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    fontFamily: fontModern,
                                                    fontWeight: '600',
                                                    fontSize: '0.9rem',
                                                    transition: 'all 0.3s ease',
                                                    margin: 0
                                                }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.background = colorGold;
                                                    e.currentTarget.style.color = colorDarkGreen;
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.background = 'rgba(197, 160, 89, 0.1)';
                                                    e.currentTarget.style.color = colorGold;
                                                }}
                                            >
                                                <i className="fa fa-upload me-2"></i>
                                                {/* Show the selected file name if it exists, otherwise show default text */}
                                                {avatar ? avatar.name : "Select Image..."}
                                            </label>
                                        </div>
                                    </div>
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
                                        {loading ? <i className="fa fa-spinner fa-spin"></i> : "Establish Account"}
                                    </motion.button>
                                </motion.div>
                                
                            </motion.form>

                            {/* Login Redirect Link */}
                            <motion.div variants={itemVariants} className="text-center mt-4 pt-3" style={{ borderTop: `1px solid rgba(197, 160, 89, 0.2)` }}>
                                <span style={{ fontFamily: fontModern, color: 'rgba(253, 251, 247, 0.7)', fontSize: '0.9rem' }}>
                                    Already part of the clientele? 
                                </span>
                                <Link to="/login" className="ms-2" style={{ 
                                    color: colorGold, 
                                    fontWeight: '700', 
                                    textDecoration: 'none',
                                    fontFamily: fontModern,
                                    letterSpacing: '0.5px'
                                }}>
                                    Sign In <i className="fa fa-angle-right ms-1"></i>
                                </Link>
                            </motion.div>

                        </div>
                    </div>
                </motion.div>
            </div>
        </Fragment>
    );
}