import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { changePassword, clearError } from '../../slices/authSlice';
import MetaData from '../layouts/MetaData';
import { motion } from 'framer-motion';

export default function UpdatePassword() {
    
    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { isUpdated, error, loading } = useSelector(state => state.authState);

    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append('oldPassword', oldPassword);
    //     formData.append('password', password);
    //     dispatch(changePassword(formData));
    // }

    const submitHandler = (e) => {
        e.preventDefault();
        
        //  Remove FormData (only needed for file uploads)
        // const formData = new FormData();
        // formData.append('oldPassword', oldPassword);
        // formData.append('password', password);
        // dispatch(changePassword(formData));

        //  Send a plain object instead
        dispatch(changePassword({ oldPassword, password }));
    }

    useEffect(() => {
        if(isUpdated) {
            toast('Password Updated Successfully', {
                type: 'success',
                position: "top-center",
                theme: "colored",
                onOpen: () => dispatch(clearError())
            });
            navigate('/myprofile');
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
    }, [isUpdated, error, dispatch, navigate]);

    return (
        <Fragment>
            <MetaData title={'Change Password'} />

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
                                    Change Password
                                </motion.h1>
                                <div style={{ width: '40px', height: '2px', background: '#c5a059', margin: '0 auto 15px auto', opacity: 0.7 }}></div>
                                <p className="text-muted small">Secure your account with a new key.</p>
                            </div>

                            {/* OLD PASSWORD */}
                            <div className="form-group mb-4">
                                <label htmlFor="old_password_field" className="fw-bold mb-2 text-uppercase" style={{ color: '#c5a059', fontSize: '0.7rem', letterSpacing: '1.5px' }}>Old Password</label>
                                <input
                                    type="password"
                                    id="old_password_field"
                                    className="form-control"
                                    value={oldPassword}
                                    onChange={e => setOldPassword(e.target.value)}
                                    style={{ border: 'none', borderBottom: '1px solid rgba(197, 160, 89, 0.3)', borderRadius: '0', padding: '10px 0', background: 'transparent' }}
                                    onFocus={(e) => e.target.style.borderBottom = '1px solid #c5a059'}
                                    onBlur={(e) => e.target.style.borderBottom = '1px solid rgba(197, 160, 89, 0.3)'}
                                />
                            </div>

                            {/* NEW PASSWORD */}
                            <div className="form-group mb-5">
                                <label htmlFor="new_password_field" className="fw-bold mb-2 text-uppercase" style={{ color: '#c5a059', fontSize: '0.7rem', letterSpacing: '1.5px' }}>New Password</label>
                                <input
                                    type="password"
                                    id="new_password_field"
                                    className="form-control"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    style={{ border: 'none', borderBottom: '1px solid rgba(197, 160, 89, 0.3)', borderRadius: '0', padding: '10px 0', background: 'transparent' }}
                                    onFocus={(e) => e.target.style.borderBottom = '1px solid #c5a059'}
                                    onBlur={(e) => e.target.style.borderBottom = '1px solid rgba(197, 160, 89, 0.3)'}
                                />
                            </div>

                            {/* BUTTON */}
                            <motion.button 
                                type="submit" 
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
                                Update Password
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </Fragment>
    )
}