import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'; // useParams is crucial here
import { toast } from 'react-toastify';
import { resetPassword, clearError } from '../../slices/authSlice';
import MetaData from '../layouts/MetaData';
import { motion } from 'framer-motion';

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams(); // 👇 Extracts the token from the URL
    
    const { isAuthenticated, error, loading } = useSelector(state => state.authState);

    const submitHandler = (e) => {
        e.preventDefault();
        
        // 1. Send as JSON object (Backend expects req.body.password, req.body.confirmPassword)
        const formData = {
            password,
            confirmPassword
        }

        // 2. Dispatch with Token
        dispatch(resetPassword(formData, token));
    }

    useEffect(() => {
        // If reset is successful, the slice sets isAuthenticated to true
        if(isAuthenticated) {
            toast.success('Password Reset Successfully!', {
                position: "top-center",
                theme: "colored",
            });
            navigate('/'); // Redirect to Home
            return;
        }

        if(error) {
            toast.error(error, {
                position: "top-center",
                theme: "colored",
                onOpen: ()=> { dispatch(clearError()) }
            });
            return;
        }
    }, [isAuthenticated, error, dispatch, navigate]);

    return (
        <Fragment>
            <MetaData title={'Reset Password'} />

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
                <div className="col-11 col-md-7 col-lg-5">
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
                                zIndex: 0
                            }}
                        />

                        <form onSubmit={submitHandler} className="p-5" style={{ position: 'relative', zIndex: 1 }}>
                            
                            {/* HEADER */}
                            <div className="text-center mb-5">
                                <motion.h1 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="mb-2" 
                                    style={{ fontFamily: 'Playfair Display, serif', color: '#0f420f', fontWeight: '700', letterSpacing: '0.5px' }}
                                >
                                    Reset Password
                                </motion.h1>
                                <div style={{ width: '40px', height: '2px', background: '#c5a059', margin: '0 auto 15px auto', opacity: 0.7 }}></div>
                                <p className="text-muted small">Create a new password to secure your account.</p>
                            </div>

                            {/* NEW PASSWORD */}
                            <div className="form-group mb-4">
                                <label htmlFor="password_field" className="fw-bold mb-2 text-uppercase" style={{ color: '#c5a059', fontSize: '0.7rem', letterSpacing: '1.5px' }}>New Password</label>
                                <input
                                    type="password"
                                    id="password_field"
                                    className="form-control"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    style={{ border: 'none', borderBottom: '1px solid rgba(197, 160, 89, 0.3)', borderRadius: '0', padding: '10px 0', background: 'transparent' }}
                                    onFocus={(e) => e.target.style.borderBottom = '1px solid #c5a059'}
                                    onBlur={(e) => e.target.style.borderBottom = '1px solid rgba(197, 160, 89, 0.3)'}
                                />
                            </div>

                            {/* CONFIRM PASSWORD */}
                            <div className="form-group mb-5">
                                <label htmlFor="confirm_password_field" className="fw-bold mb-2 text-uppercase" style={{ color: '#c5a059', fontSize: '0.7rem', letterSpacing: '1.5px' }}>Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirm_password_field"
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    style={{ border: 'none', borderBottom: '1px solid rgba(197, 160, 89, 0.3)', borderRadius: '0', padding: '10px 0', background: 'transparent' }}
                                    onFocus={(e) => e.target.style.borderBottom = '1px solid #c5a059'}
                                    onBlur={(e) => e.target.style.borderBottom = '1px solid rgba(197, 160, 89, 0.3)'}
                                />
                            </div>

                            {/* BUTTON */}
                            <motion.button 
                                type="submit" 
                                id="new_password_button"
                                whileHover={{ scale: 1.01, boxShadow: "0 10px 20px rgba(197, 160, 89, 0.2)" }}
                                whileTap={{ scale: 0.99 }}
                                className="btn w-100 py-3"
                                disabled={loading}
                                style={{
                                    background: 'linear-gradient(135deg, #d4af37 0%, #c5a059 100%)',
                                    color: '#0f420f',
                                    fontWeight: 'bold',
                                    border: 'none',
                                    borderRadius: '0', 
                                    letterSpacing: '3px', 
                                    textTransform: 'uppercase',
                                    fontSize: '0.85rem',
                                    boxShadow: '0 4px 10px rgba(197, 160, 89, 0.2)'
                                }}
                            >
                                Set Password
                            </motion.button>

                        </form>
                    </motion.div>
                </div>
            </div>
        </Fragment>
    )
}