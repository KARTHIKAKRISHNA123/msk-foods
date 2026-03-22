import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { update, clearError, clearUpdateProfile } from '../../slices/authSlice';
import MetaData from '../layouts/MetaData';
import { motion } from 'framer-motion';

// 👇 1. IMPORT THE IMAGE (Adjust path if your file is in src/assets)
import defaultAvatar from '/images/default_avatar.png'; 
// If it's in assets, use: import defaultAvatar from '../../assets/default_avatar.png';

export default function UpdateProfile() {
    const { user, error, isUpdated, loading } = useSelector(state => state.authState);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    
    // 👇 2. USE IMPORTED IMAGE AS INITIAL STATE
    const [avatarPreview, setAvatarPreview] = useState(defaultAvatar);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 1. Load User Data & Handle Notifications
    useEffect(() => {
        if(user) {
            setName(user.name);
            setEmail(user.email);
            if(user.avatar) {
                setAvatarPreview(user.avatar);
            }
        }

        // ✨ FIX: Simplified Toast Logic to prevent race conditions
        if(isUpdated) {
            toast.success('Profile Updated Successfully', {
                position: "top-center",
                theme: "colored"
            });
            
            // Clear the state and navigate immediately
            dispatch(clearUpdateProfile());
            navigate('/myprofile');
            return;
        }

        if(error) {
            toast.error(error, {
                position: "top-center",
                theme: "colored"
            });
            dispatch(clearError());
            return;
        }
    }, [user, isUpdated, error, dispatch, navigate]);

    // 2. Handle File Change
    const onChangeAvatar = (e) => {
        if(e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0]);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('avatar', avatar);
        dispatch(update(formData));
    }

    return (
        <Fragment>
            <MetaData title={'Update Profile'} />

            <div 
                className="row wrapper justify-content-center align-items-center" 
                style={{ 
                    minHeight: '85vh',  // Reduced from 90vh
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

                        {/* Reduced padding from p-5 to p-4 */}
                        <form onSubmit={submitHandler} encType='multipart/form-data' className="p-4" style={{ position: 'relative', zIndex: 1 }}>
                            
                            {/* HEADER - Reduced margin from mb-5 to mb-3 */}
                            <div className="text-center mb-3">
                                <motion.h1 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="mb-2" 
                                    style={{ fontFamily: 'Playfair Display, serif', color: '#0f420f', fontWeight: '700', letterSpacing: '0.5px' }}
                                >
                                    Update Profile
                                </motion.h1>
                                <div style={{ width: '40px', height: '2px', background: '#c5a059', margin: '0 auto 10px auto', opacity: 0.7 }}></div>
                            </div>

                            {/* CENTERED AVATAR - Reduced margin from mb-5 to mb-4 */}
                            <div className="d-flex flex-column align-items-center mb-4">
                                <div style={{ position: 'relative', width: '100px', height: '100px', marginBottom: '15px' }}>
                                    
                                    <img 
                                        src={avatarPreview} 
                                        alt="Avatar Preview"
                                        onError={(e) => {e.target.src = defaultAvatar}}
                                        className="shadow-sm"
                                        style={{ 
                                            width: '100%', 
                                            height: '100%', 
                                            objectFit: 'cover', 
                                            borderRadius: '50%', 
                                            border: '3px solid #c5a059', 
                                            padding: '3px',
                                            background: '#fff'
                                        }} 
                                    />

                                    <label htmlFor='customFile' style={{
                                        position: 'absolute',
                                        bottom: '0',
                                        right: '0',
                                        background: '#c5a059',
                                        color: '#fff',
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                                        border: '2px solid #fff'
                                    }}>
                                        <i className="fa fa-camera" style={{ fontSize: '14px' }}></i>
                                    </label>
                                    <input
                                        type='file'
                                        name='avatar'
                                        id='customFile'
                                        accept='image/*'
                                        onChange={onChangeAvatar}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                                <span className="text-uppercase" style={{ fontSize: '0.7rem', color: '#c5a059', letterSpacing: '1.5px', fontWeight: 'bold' }}>
                                    Change Portrait
                                </span>
                            </div>

                            {/* NAME INPUT - Reduced margin from mb-4 to mb-3 */}
                            <div className="form-group mb-3">
                                <label htmlFor="name_field" className="fw-bold mb-1 text-uppercase" style={{ color: '#c5a059', fontSize: '0.7rem', letterSpacing: '1.5px' }}>Full Name</label>
                                <input
                                    type="name"
                                    id="name_field"
                                    className="form-control"
                                    name='name'
                                    style={{ border: 'none', borderBottom: '1px solid rgba(197, 160, 89, 0.3)', borderRadius: '0', padding: '8px 0', background: 'transparent' }}
                                    onFocus={(e) => e.target.style.borderBottom = '1px solid #c5a059'}
                                    onBlur={(e) => e.target.style.borderBottom = '1px solid rgba(197, 160, 89, 0.3)'}
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>

                            {/* EMAIL INPUT - Reduced margin from mb-5 to mb-4 */}
                            <div className="form-group mb-4">
                                <label htmlFor="email_field" className="fw-bold mb-1 text-uppercase" style={{ color: '#c5a059', fontSize: '0.7rem', letterSpacing: '1.5px' }}>Email Address</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    name='email'
                                    style={{ border: 'none', borderBottom: '1px solid rgba(197, 160, 89, 0.3)', borderRadius: '0', padding: '8px 0', background: 'transparent' }}
                                    onFocus={(e) => e.target.style.borderBottom = '1px solid #c5a059'}
                                    onBlur={(e) => e.target.style.borderBottom = '1px solid rgba(197, 160, 89, 0.3)'}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>

                            <motion.button
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
                                Update Changes
                            </motion.button>

                        </form>
                    </motion.div>
                </div>
            </div>
        </Fragment>
    )
}