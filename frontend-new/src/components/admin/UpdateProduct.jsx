import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getProduct, updateProduct, clearProductUpdated, clearError } from '../../slices/productsSlice';
import MetaData from '../layouts/MetaData';
import Sidebar from './Sidebar';

export default function UpdateProduct() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    // --- THEME VARIABLES ---
    const fontRoyal = "'Playfair Display', serif";
    const fontModern = "'Montserrat', sans-serif";
    const colorGreen = '#0f420f';
    const colorDarkGreen = '#051805';
    const colorGold = '#c5a059';
    const colorCream = '#fdfbf7';

    // --- FORM STATE ---
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Health Food");
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const { loading, isProductUpdated, error, product } = useSelector(state => state.productsState);

    const categories = [
        'Electronics', 'Mobile Phones', 'Laptops', 'Accessories',
        'Headphones', 'Food', 'Books', 'Clothes/Shoes',
        'Beauty/Health', 'Sports', 'Outdoor', 'Home', 'Health Food'
    ];

    // Fetch product on mount
    useEffect(() => {
        dispatch(getProduct(id));
    }, [id]);

    // Pre-fill form when product loads
    useEffect(() => {
        if (product && product._id === id) {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setSeller(product.seller);
            setStock(product.stock);
            setImagesPreview(product.images.map(img => img.image));
        }
    }, [product]);

    // Handle update success & errors
    useEffect(() => {
        if (isProductUpdated) {
            toast.success('Product Updated Successfully!', { position: 'top-center', theme: 'colored' });
            dispatch(clearProductUpdated());
            navigate('/admin/products');
        }
        if (error) {
            toast.error(error, { position: 'top-center', theme: 'colored' });
            dispatch(clearError());
        }
    }, [isProductUpdated, error]);

    const onImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImagesPreview([]);
        setImages([]);

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
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
        dispatch(updateProduct(id, formData));
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

    return (
        <Fragment>
            <MetaData title="Update Vault Entry" />

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
                            style={{ fontFamily: fontRoyal, color: colorGreen, fontWeight: '800', fontSize: '2.8rem', margin: 0 }}
                        >
                            Modify Product
                        </motion.h1>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '80px' }}
                            transition={{ duration: 1, delay: 0.4 }}
                            style={{ height: '4px', background: colorGold, marginTop: '12px' }}
                            className="mx-auto mx-md-0 rounded"
                        />
                    </div>

                    {/* Form Container */}
                    <div className="row justify-content-center justify-content-md-start">
                        <div className="col-12 col-lg-9">
                            <motion.div
                                variants={formVariants}
                                initial="hidden"
                                animate="show"
                                className="shadow-lg p-4 p-md-5"
                                style={{
                                    background: `linear-gradient(145deg, ${colorGreen} 0%, ${colorDarkGreen} 100%)`,
                                    borderRadius: '20px',
                                    border: `1px solid rgba(197, 160, 89, 0.4)`,
                                    boxShadow: '0 25px 50px rgba(15, 66, 15, 0.3)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {/* Subtle Background Watermark */}
                                <i className="fa fa-pencil position-absolute" style={{
                                    fontSize: '15rem', color: 'rgba(197, 160, 89, 0.03)',
                                    top: '-20px', right: '-20px', transform: 'rotate(-15deg)', zIndex: 0
                                }}></i>

                                {/* Ceremonial Inner Frame */}
                                <div style={{
                                    position: 'absolute', top: '12px', left: '12px', right: '12px', bottom: '12px',
                                    border: `1px dashed rgba(197, 160, 89, 0.25)`, borderRadius: '15px', pointerEvents: 'none', zIndex: 0
                                }} />

                                <form onSubmit={submitHandler} encType='multipart/form-data' noValidate style={{ position: 'relative', zIndex: 1 }}>

                                    <div className="row">
                                        <motion.div variants={itemVariants} className="col-md-8 mb-4">
                                            <label className="form-label d-flex align-items-center" style={{ fontFamily: fontModern, color: colorGold, fontWeight: '700', fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                                                <i className="fa fa-tag me-2" style={{ fontSize: '0.9rem' }}></i> Product Name
                                            </label>
                                            <input type="text" className="form-control msk-input" value={name} onChange={(e) => setName(e.target.value)} />
                                        </motion.div>

                                        <motion.div variants={itemVariants} className="col-md-4 mb-4">
                                            <label className="form-label d-flex align-items-center" style={{ fontFamily: fontModern, color: colorGold, fontWeight: '700', fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                                                <i className="fa fa-building me-2" style={{ fontSize: '0.9rem' }}></i> Brand / Seller
                                            </label>
                                            <input type="text" className="form-control msk-input" value={seller} onChange={(e) => setSeller(e.target.value)} />
                                        </motion.div>
                                    </div>

                                    <div className="row">
                                        <motion.div variants={itemVariants} className="col-md-6 mb-4">
                                            <label className="form-label d-flex align-items-center" style={{ fontFamily: fontModern, color: colorGold, fontWeight: '700', fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                                                <i className="fa fa-rupee me-2" style={{ fontSize: '0.9rem' }}></i> Price
                                            </label>
                                            <input type="number" className="form-control msk-input" value={price} onChange={(e) => setPrice(e.target.value)} />
                                        </motion.div>

                                        <motion.div variants={itemVariants} className="col-md-6 mb-4">
                                            <label className="form-label d-flex align-items-center" style={{ fontFamily: fontModern, color: colorGold, fontWeight: '700', fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                                                <i className="fa fa-cubes me-2" style={{ fontSize: '0.9rem' }}></i> Update Stock
                                            </label>
                                            <input type="number" className="form-control msk-input" value={stock} onChange={(e) => setStock(e.target.value)} />
                                        </motion.div>
                                    </div>

                                    <div className="row">
                                        <motion.div variants={itemVariants} className="col-md-12 mb-4">
                                            <label className="form-label d-flex align-items-center" style={{ fontFamily: fontModern, color: colorGold, fontWeight: '700', fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                                                <i className="fa fa-align-left me-2" style={{ fontSize: '0.9rem' }}></i> Product Description
                                            </label>
                                            <textarea className="form-control msk-input" rows="4" style={{ resize: 'vertical' }} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                        </motion.div>
                                    </div>

                                    <motion.div variants={itemVariants} className="mb-4">
                                        <label className="form-label d-flex align-items-center" style={{ fontFamily: fontModern, color: colorGold, fontWeight: '700', fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                                            <i className="fa fa-list-alt me-2" style={{ fontSize: '0.9rem' }}></i> Category
                                        </label>
                                        <select className="form-select msk-input" style={{ cursor: 'pointer' }} value={category} onChange={(e) => setCategory(e.target.value)}>
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </motion.div>

                                    {/* Image Upload Dropzone */}
                                    <motion.div variants={itemVariants} className="mb-5">
                                        <label className="form-label d-flex align-items-center" style={{ fontFamily: fontModern, color: colorGold, fontWeight: '700', fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                                            <i className="fa fa-image me-2" style={{ fontSize: '0.9rem' }}></i> Replace Images (Optional)
                                        </label>

                                        <motion.div
                                            whileHover={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', borderColor: colorGold, scale: 1.01 }}
                                            className="d-flex flex-column align-items-center justify-content-center p-4 mb-3 rounded" style={{
                                            border: `2px dashed rgba(197, 160, 89, 0.5)`,
                                            background: 'rgba(253, 251, 247, 0.02)',
                                            position: 'relative',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease'
                                        }}>
                                            <input
                                                type="file"
                                                name="product_images"
                                                multiple
                                                onChange={onImagesChange}
                                                style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 2 }}
                                            />
                                            <motion.i
                                                animate={{ y: [0, -8, 0] }}
                                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                                className="fa fa-refresh mb-3"
                                                style={{ fontSize: '2.5rem', color: colorGold, filter: 'drop-shadow(0 0 10px rgba(197, 160, 89, 0.4))' }}
                                            ></motion.i>
                                            <h6 style={{ fontFamily: fontRoyal, color: colorCream, fontWeight: '700', margin: 0, letterSpacing: '1px' }}>Click to Overwrite Existing Images</h6>
                                        </motion.div>

                                        {/* Image Preview Row */}
                                        {imagesPreview.length > 0 && (
                                            <div className="d-flex p-3 rounded" style={{ background: 'rgba(253, 251, 247, 0.05)', border: `1px solid rgba(197, 160, 89, 0.2)`, gap: '15px', overflowX: 'auto' }}>
                                                {imagesPreview.map((img, index) => (
                                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: index * 0.1 }} key={index}>
                                                        <img src={img} alt={`Preview ${index}`} className="rounded shadow" width="70" height="70" style={{ objectFit: 'cover', border: `2px solid ${colorGold}` }} />
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>

                                    {/* Action Button */}
                                    <motion.button
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.02, boxShadow: '0 15px 30px rgba(197, 160, 89, 0.3)' }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="btn w-100 py-3 shadow-lg"
                                        style={{
                                            background: 'linear-gradient(135deg, #d4af37 0%, #c5a059 100%)',
                                            color: colorDarkGreen,
                                            border: 'none',
                                            borderRadius: '10px',
                                            fontWeight: '800',
                                            fontSize: '1.1rem',
                                            letterSpacing: '3px',
                                            textTransform: 'uppercase',
                                            fontFamily: fontModern,
                                            opacity: loading ? 0.7 : 1,
                                            cursor: loading ? 'not-allowed' : 'pointer'
                                        }}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span><i className="fa fa-spinner fa-spin me-2"></i> Syncing...</span>
                                        ) : (
                                            <span><i className="fa fa-save me-2"></i> Update Vault</span>
                                        )}
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