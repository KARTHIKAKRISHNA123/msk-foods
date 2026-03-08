import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// ✨ FIX: Imported the actual Redux actions
import { createNewProduct, clearProductCreated, clearError } from '../../slices/productsSlice';

import MetaData from '../layouts/MetaData';
import Sidebar from './Sidebar';

export default function NewProduct() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // --- THEME VARIABLES ---
    const fontRoyal = "'Playfair Display', serif";
    const fontModern = "'Montserrat', sans-serif";
    const colorGreen = '#0f420f';
    const colorGold = '#c5a059';
    const colorCream = '#fdfbf7';

    // --- FORM STATE ---
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Health Mix");
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState("MSK Foods");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    // ✨ FIX: Pulled the actual state from Redux
    const { loading, isProductCreated, error } = useSelector(state => state.productsState);

    // --- CATEGORIES ---
    const categories = [
        "Health Mix",
        "Spices",
        "Grains",
        "Specialty"
    ];

    // ✨ FIX: Added the useEffect to listen for success or failure!
    useEffect(() => {
        if (isProductCreated) {
            toast.success('Product Commissioned Successfully!', { theme: 'colored' });
            navigate('/admin/products'); // Send them back to the inventory list
            dispatch(clearProductCreated()); // Reset the Redux state
        }

        if (error) {
            toast.error(error, { theme: 'colored' });
            dispatch(clearError());
        }
    }, [dispatch, isProductCreated, error, navigate]);

    const onImagesChange = (e) => {
        const files = Array.from(e.target.files);
        
        // Reset previous previews when new images are selected
        setImagesPreview([]);
        setImages([]);

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result]);
                    setImages(oldArray => [...oldArray, file]);
                }
            }
            reader.readAsDataURL(file);
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('stock', stock);
        formData.append('category', category);
        formData.append('seller', seller);
        images.forEach(image => {
            formData.append('images', image);
        });

        // ✨ FIX: Actually dispatching the action to hit your backend API
        dispatch(createNewProduct(formData));
    };

    // --- ANIMATIONS ---
    const formVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 } }
    };

    const inputVariants = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <Fragment>
            <MetaData title="Commission New Product" />

            <div className="row m-0" style={{ minHeight: '100vh', background: colorCream }}>
                
                {/* LEFT COLUMN: Sidebar */}
                <div className="col-12 col-md-2 p-0" style={{ zIndex: 10 }}>
                    <Sidebar />
                </div>

                {/* RIGHT COLUMN: Form Content */}
                <div className="col-12 col-md-10 py-5 px-4 px-md-5" style={{ 
                    backgroundImage: `radial-gradient(circle at 80% 10%, rgba(197, 160, 89, 0.05) 0%, transparent 40%)`
                }}>
                    
                    {/* Header Area */}
                    <div className="mb-5 text-center text-md-start">
                        <motion.h1 
                            initial={{ opacity: 0, y: -20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            style={{ fontFamily: fontRoyal, color: colorGreen, fontWeight: '800', fontSize: '2.5rem', margin: 0 }}
                        >
                            Commission Product
                        </motion.h1>
                        <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: '80px' }} 
                            transition={{ duration: 1, delay: 0.4 }}
                            style={{ height: '3px', background: colorGold, marginTop: '10px' }} 
                            className="mx-auto mx-md-0"
                        />
                    </div>

                    {/* Form Container */}
                    <div className="row justify-content-center justify-content-md-start">
                        <div className="col-12 col-lg-8">
                            <motion.div 
                                variants={formVariants}
                                initial="hidden"
                                animate="show"
                                className="shadow-lg p-4 p-md-5"
                                style={{ 
                                    background: '#ffffff', 
                                    borderRadius: '15px', 
                                    borderTop: `6px solid ${colorGold}`, 
                                    boxShadow: '0 30px 60px rgba(15, 66, 15, 0.08)',
                                    position: 'relative'
                                }}
                            >
                                {/* Ceremonial Inner Frame */}
                                <div style={{
                                    position: 'absolute', top: '15px', left: '15px', right: '15px', bottom: '15px',
                                    border: '1px solid rgba(197, 160, 89, 0.15)', pointerEvents: 'none', borderRadius: '15px', zIndex: 0 
                                }} />

                                <form onSubmit={submitHandler} encType='multipart/form-data' style={{ position: 'relative', zIndex: 1 }}>
                                    
                                    <motion.div variants={inputVariants} className="mb-4">
                                        <label className="form-label" style={{ fontFamily: fontModern, color: colorGreen, fontWeight: '700', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Product Name</label>
                                        <input type="text" className="form-control shadow-sm" style={{ border: '1px solid rgba(15, 66, 15, 0.2)', padding: '12px' }} value={name} onChange={(e) => setName(e.target.value)} required />
                                    </motion.div>

                                    <div className="row">
                                        <motion.div variants={inputVariants} className="col-md-6 mb-4">
                                            <label className="form-label" style={{ fontFamily: fontModern, color: colorGreen, fontWeight: '700', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Price (₹)</label>
                                            <input type="number" className="form-control shadow-sm" style={{ border: '1px solid rgba(15, 66, 15, 0.2)', padding: '12px' }} value={price} onChange={(e) => setPrice(e.target.value)} required />
                                        </motion.div>

                                        <motion.div variants={inputVariants} className="col-md-6 mb-4">
                                            <label className="form-label" style={{ fontFamily: fontModern, color: colorGreen, fontWeight: '700', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Initial Stock</label>
                                            <input type="number" className="form-control shadow-sm" style={{ border: '1px solid rgba(15, 66, 15, 0.2)', padding: '12px' }} value={stock} onChange={(e) => setStock(e.target.value)} required />
                                        </motion.div>
                                    </div>

                                    <motion.div variants={inputVariants} className="mb-4">
                                        <label className="form-label" style={{ fontFamily: fontModern, color: colorGreen, fontWeight: '700', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Description</label>
                                        <textarea className="form-control shadow-sm" rows="4" style={{ border: '1px solid rgba(15, 66, 15, 0.2)', padding: '12px' }} value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                                    </motion.div>

                                    <div className="row">
                                        <motion.div variants={inputVariants} className="col-md-6 mb-4">
                                            <label className="form-label" style={{ fontFamily: fontModern, color: colorGreen, fontWeight: '700', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Category</label>
                                            <select className="form-select shadow-sm" style={{ border: '1px solid rgba(15, 66, 15, 0.2)', padding: '12px' }} value={category} onChange={(e) => setCategory(e.target.value)}>
                                                {categories.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </motion.div>

                                        <motion.div variants={inputVariants} className="col-md-6 mb-4">
                                            <label className="form-label" style={{ fontFamily: fontModern, color: colorGreen, fontWeight: '700', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Brand / Seller</label>
                                            <input type="text" className="form-control shadow-sm" style={{ border: '1px solid rgba(15, 66, 15, 0.2)', padding: '12px' }} value={seller} onChange={(e) => setSeller(e.target.value)} required />
                                        </motion.div>
                                    </div>

                                    {/* Image Upload Area */}
                                    <motion.div variants={inputVariants} className="mb-5">
                                        <label className="form-label" style={{ fontFamily: fontModern, color: colorGreen, fontWeight: '700', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Product Images</label>
                                        <div className="custom-file mb-3">
                                            <input type="file" name="product_images" className="custom-file-input form-control shadow-sm" id="customFile" style={{ padding: '10px' }} multiple onChange={onImagesChange} />
                                        </div>
                                        
                                        {/* Image Preview Box */}
                                        {imagesPreview.length > 0 && (
                                            <div className="d-flex p-3 rounded shadow-sm" style={{ background: 'rgba(197, 160, 89, 0.05)', border: `1px dashed ${colorGold}`, gap: '10px', overflowX: 'auto' }}>
                                                {imagesPreview.map(img => (
                                                    <img src={img} key={img} alt="Preview" className="rounded" width="65" height="65" style={{ objectFit: 'cover', border: `2px solid ${colorGold}` }} />
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>

                                    <motion.button 
                                        variants={inputVariants}
                                        whileHover={{ scale: 1.02 }} 
                                        whileTap={{ scale: 0.98 }}
                                        type="submit" 
                                        className="btn w-100 py-3 shadow"
                                        style={{ 
                                            background: 'linear-gradient(135deg, #d4af37 0%, #c5a059 100%)', 
                                            color: colorGreen, 
                                            border: 'none', 
                                            borderRadius: '8px', 
                                            fontWeight: '800',
                                            fontSize: '1rem',
                                            letterSpacing: '2px',
                                            textTransform: 'uppercase',
                                            fontFamily: fontModern,
                                            opacity: loading ? 0.7 : 1, // ✨ Visual cue for loading
                                            cursor: loading ? 'not-allowed' : 'pointer'
                                        }}
                                        disabled={loading} // ✨ FIX: Prevents multiple submissions
                                    >
                                        {loading ? "Commissioning..." : "Add To Inventory"}
                                    </motion.button>

                                </form>
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>
    );
}