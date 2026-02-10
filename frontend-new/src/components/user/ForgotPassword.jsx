import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { forgotPassword, clearError } from '../../slices/authSlice';
import MetaData from '../layouts/MetaData';
import { motion } from 'framer-motion';

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    
    const { error, message } = useSelector(state => state.authState);

    const submitHandler = (e) => {
        e.preventDefault();
        
        // ❌ Don't use FormData (Backend expects JSON)
        // const formData = new FormData();
        // formData.append('email', email);
        // dispatch(forgotPassword(formData));

        // ✅ Send plain JSON object
        dispatch(forgotPassword({ email }));
    }

    useEffect(() => {
        if(message) {
            toast.success(message, {
                position: "top-center",
                theme: "colored",
            });
            setEmail("");
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
    }, [message, error, dispatch]);

    return (
        <Fragment>
            <MetaData title={'Forgot Password'} />

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
                                    Forgot Password?
                                </motion.h1>
                                <div style={{ width: '40px', height: '2px', background: '#c5a059', margin: '0 auto 15px auto', opacity: 0.7 }}></div>
                                <p className="text-muted small mt-3">
                                    Enter your registered email address.<br/>We will send you a link to reset your password.
                                </p>
                            </div>

                            {/* EMAIL INPUT */}
                            <div className="form-group mb-5">
                                <label htmlFor="email_field" className="fw-bold mb-2 text-uppercase" style={{ color: '#c5a059', fontSize: '0.7rem', letterSpacing: '1.5px' }}>Email Address</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    style={{ border: 'none', borderBottom: '1px solid rgba(197, 160, 89, 0.3)', borderRadius: '0', padding: '10px 0', background: 'transparent' }}
                                    onFocus={(e) => e.target.style.borderBottom = '1px solid #c5a059'}
                                    onBlur={(e) => e.target.style.borderBottom = '1px solid rgba(197, 160, 89, 0.3)'}
                                />
                            </div>

                            {/* BUTTON */}
                            <motion.button 
                                type="submit" 
                                id="forgot_password_button"
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
                                Send Email
                            </motion.button>

                        </form>
                    </motion.div>
                </div>
            </div>
        </Fragment>
    )
}