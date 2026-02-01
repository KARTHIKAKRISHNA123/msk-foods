import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, login } from '../../slices/authSlice';
import MetaData from '../layouts/MetaData';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../layouts/Loader';
import { motion } from 'framer-motion';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, isAuthenticated } = useSelector(state => state.authState);

    const submitHandler = (e) => {
        e.preventDefault();

        // ✨ CUSTOM VALIDATION (Top Center)
        if (!email) {
            toast.error("Please enter your email address.", { 
                position: "top-center", // 👈 Changed to Top Center
                theme: "colored" 
            });
            return;
        }
        if (!password) {
            toast.error("Please enter your password.", { 
                position: "top-center", // 👈 Changed to Top Center
                theme: "colored" 
            });
            return;
        }

        dispatch(login(email, password));
    }

    useEffect(() => {
        if (error) {
            toast.error(error, { position: "top-center", theme: "colored" }); // 👈 Changed to Top Center
            dispatch(clearError());
            return;
        }
        if (isAuthenticated) {
            navigate('/');
            toast.success("Welcome back.", { position: "top-center", theme: "colored" }); // 👈 Changed to Top Center
        }
    }, [error, isAuthenticated, dispatch, navigate]);

    if(loading) return <Loader/>

    return (
        <Fragment>
            <MetaData title={`Member Access`} />

            <div 
                className="row wrapper justify-content-center align-items-center" 
                style={{ 
                    minHeight: '85vh', 
                    margin: 0,
                    background: '#fdfbf7', 
                    backgroundImage: `
                        radial-gradient(circle at 50% 10%, rgba(197, 160, 89, 0.1) 0%, transparent 50%),
                        linear-gradient(180deg, #fdfbf7 0%, #f4ebd0 100%)
                    `
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
                            borderRadius: '2px', 
                            borderTop: '6px solid #c5a059', 
                            boxShadow: '0 30px 60px rgba(15, 66, 15, 0.08)',
                            position: 'relative', 
                            overflow: 'hidden'    
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                            style={{
                                position: 'absolute',
                                top: '15px', left: '15px', right: '15px', bottom: '15px',
                                border: '1px solid rgba(197, 160, 89, 0.2)', 
                                pointerEvents: 'none',
                                zIndex: 0
                            }}
                        />

                        {/* ✨ ADDED 'noValidate' to disable default browser bubble */}
                        <form onSubmit={submitHandler} noValidate className="p-5" style={{ position: 'relative', zIndex: 1 }}>
                            
                            <div className="text-center mb-5">
                                <motion.h1 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="mb-2" 
                                    style={{ fontFamily: 'Playfair Display, serif', color: '#0f420f', fontWeight: '700', letterSpacing: '0.5px' }}
                                >
                                    Member Access
                                </motion.h1>
                                
                                <div style={{ width: '40px', height: '2px', background: '#c5a059', margin: '0 auto 15px auto', opacity: 0.7 }}></div>
                                
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-muted" 
                                    style={{ fontSize: '0.85rem', fontFamily: 'Montserrat, sans-serif' }}
                                >
                                    Where tradition meets modern nourishment.
                                </motion.p>
                            </div>

                            <div className="form-group mb-4">
                                <label htmlFor="email_field" className="fw-bold mb-2 text-uppercase" style={{ color: '#c5a059', fontSize: '0.7rem', letterSpacing: '1.5px' }}>Email Address</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    style={{ 
                                        border: 'none',
                                        borderBottom: '1px solid rgba(197, 160, 89, 0.3)', 
                                        borderRadius: '0',
                                        padding: '10px 0',
                                        background: 'transparent',
                                        fontSize: '1rem',
                                        color: '#0f420f',
                                        transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => e.target.style.borderBottom = '1px solid #c5a059'}
                                    onBlur={(e) => e.target.style.borderBottom = '1px solid rgba(197, 160, 89, 0.3)'}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    // ✨ Removed 'required' attribute (handled manually now)
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label htmlFor="password_field" className="fw-bold mb-2 text-uppercase" style={{ color: '#c5a059', fontSize: '0.7rem', letterSpacing: '1.5px' }}>Password</label>
                                <input
                                    type="password"
                                    id="password_field"
                                    className="form-control"
                                    style={{ 
                                        border: 'none',
                                        borderBottom: '1px solid rgba(197, 160, 89, 0.3)',
                                        borderRadius: '0',
                                        padding: '10px 0',
                                        background: 'transparent',
                                        fontSize: '1rem',
                                        color: '#0f420f',
                                        transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => e.target.style.borderBottom = '1px solid #c5a059'}
                                    onBlur={(e) => e.target.style.borderBottom = '1px solid rgba(197, 160, 89, 0.3)'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    // ✨ Removed 'required' attribute
                                />
                            </div>

                            <div className="d-flex justify-content-end mb-5">
                                <Link to="/password/forgot" style={{ color: '#999', fontSize: '0.8rem', textDecoration: 'none', transition: '0.3s' }} onMouseOver={(e) => e.target.style.color = '#c5a059'} onMouseOut={(e) => e.target.style.color = '#999'}>
                                    Forgot Password?
                                </Link>
                            </div>

                            <motion.button
                                id="login_button"
                                type="submit"
                                whileHover={{ scale: 1.01, boxShadow: "0 10px 20px rgba(197, 160, 89, 0.2)" }}
                                whileTap={{ scale: 0.99 }}
                                className="btn w-100 py-3"
                                disabled={loading}
                                style={{ 
                                    background: 'linear-gradient(135deg, #d4af37 0%, #c5a059 100%)', 
                                    color: '#0f420f', 
                                    border: 'none', 
                                    borderRadius: '0', 
                                    letterSpacing: '3px', 
                                    textTransform: 'uppercase', 
                                    fontWeight: '700',
                                    fontSize: '0.85rem',
                                    boxShadow: '0 4px 10px rgba(197, 160, 89, 0.2)'
                                }}
                            >
                                Enter
                            </motion.button>

                            <div className="mt-5 text-center">
                                <span className="text-muted small" style={{ fontSize: '0.8rem' }}>New to MSK Foods? </span>
                                <Link to="/register" style={{ color: '#c5a059', fontWeight: 'bold', textDecoration: 'none', borderBottom: '1px solid #c5a059', marginLeft: '8px', fontSize: '0.85rem' }}>
                                    Begin the Tradition
                                </Link>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </Fragment>
    )
}