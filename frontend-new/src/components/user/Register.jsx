import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, register } from '../../slices/authSlice';
import MetaData from '../layouts/MetaData';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../layouts/Loader';
import { motion } from 'framer-motion';

export default function Register() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector(state => state.authState);

    const { name, email, password } = userData;

    const onChange = (e) => {
        if(e.target.name === 'avatar') {
            const file = e.target.files[0];
            
            // 1. Save the actual FILE object to send to the backend
            setAvatar(file);

            // 2. Create the preview URL for the UI
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                }
            }
            reader.readAsDataURL(file);
        } else {
            setUserData({...userData, [e.target.name]: e.target.value });
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        
        if (!name || !email || !password) {
             toast.error("Please complete all required details.", { 
                position: "top-center", 
                theme: "colored" 
            });
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        
        // Append the file object if it exists
        if (avatar) {
            formData.append('avatar', avatar);
        }

        dispatch(register(formData));
    }

    useEffect(() => {
        if (error) {
            toast.error(error, { position: "top-center", theme: "colored" });
            dispatch(clearError());
            return;
        }
        if (isAuthenticated) {
            navigate('/');
            toast.success("Welcome to MSK Foods.", { position: "top-center", theme: "colored" });
        }
    }, [error, isAuthenticated, dispatch, navigate]);

    if(loading) return <Loader/>

    return (
        <Fragment>
            <MetaData title={`Begin the Tradition`} />

            <div 
                className="row wrapper justify-content-center align-items-center" 
                style={{ 
                    minHeight: '90vh', 
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

                        <form onSubmit={submitHandler} encType='multipart/form-data' noValidate className="p-5" style={{ position: 'relative', zIndex: 1 }}>
                            
                            {/* HEADER */}
                            <div className="text-center mb-5">
                                <motion.h1 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="mb-2" 
                                    style={{ fontFamily: 'Playfair Display, serif', color: '#0f420f', fontWeight: '700', letterSpacing: '0.5px' }}
                                >
                                    Begin the Tradition
                                </motion.h1>
                                <div style={{ width: '40px', height: '2px', background: '#c5a059', margin: '0 auto 15px auto', opacity: 0.7 }}></div>
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-muted" 
                                    style={{ fontSize: '0.85rem', fontFamily: 'Montserrat, sans-serif' }}
                                >
                                    A step towards wholesome, balanced nourishment.
                                </motion.p>
                            </div>

                            {/* ✨ CENTERED AVATAR "MEDALLION" */}
                            <div className="d-flex flex-column align-items-center mb-5">
                                <div style={{ position: 'relative', width: '100px', height: '100px', marginBottom: '15px' }}>
                                    {/* The Image */}
                                    <img 
                                        src={avatarPreview} 
                                        alt="Avatar Preview"
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
                                    {/* The "Edit" Button (Small Gold Circle) */}
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
                                        accept='images/*'
                                        onChange={onChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                                <span className="text-uppercase" style={{ fontSize: '0.7rem', color: '#c5a059', letterSpacing: '1.5px', fontWeight: 'bold' }}>
                                    Profile Portrait
                                </span>
                            </div>

                            {/* UNIFORM INPUT FIELDS */}
                            <div className="form-group mb-4">
                                <label htmlFor="name_field" className="fw-bold mb-2 text-uppercase" style={{ color: '#c5a059', fontSize: '0.7rem', letterSpacing: '1.5px' }}>Full Name</label>
                                <input
                                    type="name"
                                    id="name_field"
                                    className="form-control"
                                    name='name'
                                    style={{ border: 'none', borderBottom: '1px solid rgba(197, 160, 89, 0.3)', borderRadius: '0', padding: '10px 0', background: 'transparent' }}
                                    onFocus={(e) => e.target.style.borderBottom = '1px solid #c5a059'}
                                    onBlur={(e) => e.target.style.borderBottom = '1px solid rgba(197, 160, 89, 0.3)'}
                                    value={name}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label htmlFor="email_field" className="fw-bold mb-2 text-uppercase" style={{ color: '#c5a059', fontSize: '0.7rem', letterSpacing: '1.5px' }}>Email Address</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    name='email'
                                    style={{ border: 'none', borderBottom: '1px solid rgba(197, 160, 89, 0.3)', borderRadius: '0', padding: '10px 0', background: 'transparent' }}
                                    onFocus={(e) => e.target.style.borderBottom = '1px solid #c5a059'}
                                    onBlur={(e) => e.target.style.borderBottom = '1px solid rgba(197, 160, 89, 0.3)'}
                                    value={email}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="form-group mb-5">
                                <label htmlFor="password_field" className="fw-bold mb-2 text-uppercase" style={{ color: '#c5a059', fontSize: '0.7rem', letterSpacing: '1.5px' }}>Password</label>
                                <input
                                    type="password"
                                    id="password_field"
                                    className="form-control"
                                    name='password'
                                    style={{ border: 'none', borderBottom: '1px solid rgba(197, 160, 89, 0.3)', borderRadius: '0', padding: '10px 0', background: 'transparent' }}
                                    onFocus={(e) => e.target.style.borderBottom = '1px solid #c5a059'}
                                    onBlur={(e) => e.target.style.borderBottom = '1px solid rgba(197, 160, 89, 0.3)'}
                                    value={password}
                                    onChange={onChange}
                                />
                            </div>

                            {/* BUTTON */}
                            <motion.button
                                id="register_button"
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
                                Create Account
                            </motion.button>

                            <div className="mt-4 text-center">
                                <span className="text-muted small" style={{ fontSize: '0.8rem' }}>Already part of the tradition? </span>
                                <Link to="/login" style={{ color: '#c5a059', fontWeight: 'bold', textDecoration: 'none', borderBottom: '1px solid #c5a059', marginLeft: '8px', fontSize: '0.85rem' }}>
                                    Member Access
                                </Link>
                            </div>
                        </form>
                    </motion.div>
                    
                    {/* Micro-Trust Line */}
                    <div className="text-center mt-4">
                        <p style={{ color: '#999', fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                            We respect your privacy. No spam. No unnecessary communication.
                        </p>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}