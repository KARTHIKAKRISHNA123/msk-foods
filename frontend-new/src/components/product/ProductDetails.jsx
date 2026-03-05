import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom'; 
import { motion } from 'framer-motion';
import { getProducts } from '../../slices/productsSlice'; 
import { addToCart } from '../../slices/cartSlice'; 
import MetaData from '../layouts/MetaData';
import Loader from '../layouts/Loader'; 
import { toast } from 'react-toastify';

// --- THEME VARIABLES ---
const fontRoyal = "'Playfair Display', serif";
const fontModern = "'Montserrat', sans-serif";
const colorGreen = '#0f420f';
const colorGold = '#c5a059';

// --- ICONS ---
const NursingIcon = () => (
    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-3">
        <circle cx="15" cy="5.5" r="2.5" fill={colorGold}/>
        <circle cx="10.5" cy="11.5" r="2" fill={colorGold}/>
        <path d="M17 9.5C16.2 9.5 15.5 9.8 15 10.2V11C15 12.6569 13.6569 14 12 14H11C9.34315 14 8 12.6569 8 11V16C8 18.2091 9.79086 20 12 20H15C17.7614 20 20 17.7614 20 15V12.5C20 10.8431 18.6569 9.5 17 9.5Z" fill={colorGold}/>
    </svg>
);

export default function ProductDetails() {
    const { loading, products, error } = useSelector((state) => state.productsState);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);

    const product = products && products.find(p => p._id === id) || (products && products[0]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!products || products.length === 0) {
            dispatch(getProducts());
        }
        if (error) {
            toast.error(error, { position: 'top-center', theme: 'colored' });
        }
    }, [dispatch, id, error, products]);

    const increaseQty = () => {
        if (!product || quantity >= Number(product.stock)) {
            return; 
        }
        setQuantity(quantity + 1);
    }
    
    const decreaseQty = () => {
        if (1 >= quantity) return;
        setQuantity(quantity - 1);
    }

    const addToCartHandler = () => {
        dispatch(addToCart(product._id, quantity));
        toast.success('Added to Royal Selection', { position: 'top-center', theme: 'colored' });
    }

    // --- ANIMATIONS ---
    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    const marqueeVariants = {
        animate: {
            x: [0, -1000],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 35, 
                    ease: "linear",
                },
            },
        },
    };

    if (loading) return <Loader />;
    if (!product) return null;

    return (
        <Fragment>
            <MetaData title={product.name} />
            
            <div style={{ 
                background: '#fdfbf7', 
                backgroundImage: `
                    radial-gradient(circle at 50% 10%, rgba(197, 160, 89, 0.1) 0%, transparent 50%),
                    linear-gradient(180deg, #fdfbf7 0%, #f4ebd0 100%)
                `, 
                overflowX: 'hidden' 
            }}>

                {/* BACK BUTTON */}
                <div className="container pt-4">
                    <Link to="/" className="text-decoration-none d-flex align-items-center" style={{ color: colorGold, fontFamily: fontModern, fontWeight: '700', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                        <i className="fa fa-arrow-left me-2"></i> Back to Home
                    </Link>
                </div>

                {/* --- HERO HEADER --- */}
                <section className="container py-5 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="text-uppercase fw-bold" style={{ color: colorGold, fontFamily: fontModern, letterSpacing: '3px', fontSize: '0.85rem' }}>
                            The Gold Standard
                        </span>

                        <h1 className="display-3 fw-bold mt-2 mb-4" style={{ fontFamily: fontRoyal, color: colorGreen }}>
                            Wholesome Nutrition,<br />Naturally Balanced.
                        </h1>

                        <motion.div 
                            className="my-4 position-relative d-inline-block"
                            animate={{ y: [0, -15, 0] }} 
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                             <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(197,160,89,0.2) 0%, rgba(255,255,255,0) 70%)', zIndex: -1 }}></div>
                            
                            <img 
                                src={product.images && product.images[0] ? product.images[0].image : '/images/placeholder.png'} 
                                alt={product.name} 
                                className="img-fluid"
                                style={{ maxHeight: '350px', filter: 'drop-shadow(0 20px 30px rgba(15,66,15,0.15))' }}
                            />
                        </motion.div>

                        <h2 className="mb-2 fw-bold" style={{ fontFamily: fontRoyal, color: colorGold, fontSize: '2rem' }}>
                            {product.name}
                        </h2>
                        
                        <h3 className="mb-4" style={{ color: colorGreen, fontFamily: fontRoyal, fontWeight: '900', fontSize: '2.5rem' }}>
                            ₹{product.price}
                        </h3>

                        {/* CONTROLS */}
                        <div className="d-flex flex-column align-items-center gap-4 mb-5">
                             <div className="d-flex align-items-center justify-content-center">
                                <span className="me-3 text-uppercase fw-bold" style={{ fontFamily: fontModern, letterSpacing: '1px', fontSize: '0.85rem', color: colorGold }}>Quantity:</span>
                                <div className="stockCounter d-flex align-items-center shadow-sm" style={{ border: `1px solid rgba(197, 160, 89, 0.4)`, borderRadius: '30px', padding: '8px 15px', background: '#fff' }}>
                                    <span className="btn btn-sm" onClick={decreaseQty} style={{ fontFamily: fontModern, fontSize: '1.2rem', color: colorGreen, cursor: 'pointer' }}>-</span>
                                    
                                    <input type="number" className="form-control count border-0 text-center" value={quantity} readOnly style={{ fontFamily: fontModern, color: colorGreen, width: '70px', padding: '0', fontWeight: 'bold', background: 'transparent', fontSize: '1.1rem' }} />
                                    
                                    <span className="btn btn-sm" onClick={increaseQty} style={{ fontFamily: fontModern, fontSize: '1.2rem', color: colorGreen, cursor: 'pointer' }}>+</span>
                                </div>
                            </div>

                            <motion.button 
                                whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(197, 160, 89, 0.2)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={addToCartHandler}
                                disabled={product.stock === 0}
                                className="btn px-5 py-3 shadow-sm" 
                                style={{ 
                                    background: 'linear-gradient(135deg, #d4af37 0%, #c5a059 100%)', 
                                    color: colorGreen,
                                    border: 'none',
                                    borderRadius: '5px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '3px',
                                    fontWeight: '700',
                                    fontFamily: fontModern,
                                    minWidth: '250px',
                                    fontSize: '0.9rem'
                                }}
                            >
                                {product.stock === 0 ? "Out of Stock" : "Add to Selection"}
                            </motion.button>
                        </div>
                    </motion.div>
                </section>

                {/* --- INFINITE INGREDIENTS MARQUEE --- */}
                <div className="py-4 mb-5" style={{ background: colorGreen, overflow: 'hidden', whiteSpace: 'nowrap', borderTop: `2px solid ${colorGold}`, borderBottom: `2px solid ${colorGold}` }}>
                    <motion.div variants={marqueeVariants} animate="animate" className="d-flex gap-5">
                        {[...Array(10)].map((_, i) => (
                            <h4 key={i} className="text-uppercase m-0 mx-5" style={{ 
                                color: 'rgba(244, 235, 208, 0.4)', 
                                fontFamily: fontRoyal, 
                                letterSpacing: '3px'
                            }}>
                                ✦ 15 MILLETS · LOW GLYCEMIC · HEART FRIENDLY · HIGH FIBRE · SUSTAINED ENERGY · TRADITIONAL SUPERFOOD ✦
                            </h4>
                        ))}
                    </motion.div>
                </div>

                {/* --- TRUST BADGES --- */}
                <section className="container mb-5">
                    <div className="row g-4 justify-content-center">
                        {[
                            { icon: <i className="fa fa-leaf fs-1 mb-3"></i>, title: "100% Natural", subtitle: "No Artificial Flavors" },
                            { icon: <i className="fa fa-ban fs-1 mb-3"></i>, title: "No Preservatives", subtitle: "Clean Label" },
                            { icon: <i className="fa fa-certificate fs-1 mb-3"></i>, title: "Premium Quality", subtitle: "Export Standard" }
                        ].map((badge, index) => (
                            <motion.div key={index} className="col-md-4" whileHover={{ scale: 1.05 }}>
                                <div className="p-4 text-center h-100 shadow-sm" style={{ background: '#fff', borderRadius: '15px', border: `1px solid rgba(197, 160, 89, 0.15)` }}>
                                    <div style={{ color: colorGold }}>{badge.icon}</div>
                                    <h5 className="fw-bold" style={{ fontFamily: fontRoyal, color: colorGreen, fontSize: '1.2rem' }}>{badge.title}</h5>
                                    <p className="small mb-0" style={{ fontFamily: fontModern, color: 'rgba(15, 66, 15, 0.7)', fontWeight: '600' }}>{badge.subtitle}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* --- BENEFITS --- */}
                <section className="container mb-5">
                    <motion.div className="row g-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                        <motion.div className="col-md-6" variants={fadeInUp}>
                            <motion.div className="p-5 h-100 shadow-sm" style={{ background: '#fff', border: '1px solid rgba(197, 160, 89, 0.2)', borderRadius: '15px' }} whileHover={{ y: -10, borderColor: colorGold, boxShadow: '0 15px 30px rgba(197,160,89,0.15)' }}>
                                <i className="fa fa-heartbeat fs-1 mb-3" style={{ color: colorGold }}></i>
                                <h3 className="fw-bold mb-3" style={{ color: colorGreen, fontFamily: fontRoyal }}>Supports Diabetic-Friendly Lifestyle</h3>
                                <ul className="list-unstyled" style={{ fontFamily: fontModern, color: 'rgba(15, 66, 15, 0.8)', lineHeight: '1.8', fontWeight: '500' }}>
                                    <li className="mb-2"><span style={{ color: colorGold, marginRight: '8px' }}>✓</span> Low glycaemic impact from 15 varieties of millets.</li>
                                    <li className="mb-2"><span style={{ color: colorGold, marginRight: '8px' }}>✓</span> Helps maintain balanced energy release.</li>
                                    <li><span style={{ color: colorGold, marginRight: '8px' }}>✓</span> Widely recommended for managing sugar levels.</li>
                                </ul>
                            </motion.div>
                        </motion.div>
                        <motion.div className="col-md-6" variants={fadeInUp}>
                            <motion.div className="p-5 h-100 shadow-sm" style={{ background: '#fff', border: '1px solid rgba(197, 160, 89, 0.2)', borderRadius: '15px' }} whileHover={{ y: -10, borderColor: colorGold, boxShadow: '0 15px 30px rgba(197,160,89,0.15)' }}>
                                <i className="fa fa-tint fs-1 mb-3" style={{ color: colorGold }}></i>
                                <h3 className="fw-bold mb-3" style={{ color: colorGreen, fontFamily: fontRoyal }}>Heart Health & Blood Pressure</h3>
                                <ul className="list-unstyled" style={{ fontFamily: fontModern, color: 'rgba(15, 66, 15, 0.8)', lineHeight: '1.8', fontWeight: '500' }}>
                                    <li className="mb-2"><span style={{ color: colorGold, marginRight: '8px' }}>✓</span> Rich in Magnesium and Dietary Fibre.</li>
                                    <li className="mb-2"><span style={{ color: colorGold, marginRight: '8px' }}>✓</span> Supports cardiovascular wellness.</li>
                                    <li><span style={{ color: colorGold, marginRight: '8px' }}>✓</span> A wholesome alternative to refined grains.</li>
                                </ul>
                            </motion.div>
                        </motion.div>
                        <motion.div className="col-12" variants={fadeInUp}>
                            <motion.div className="p-5 shadow-sm position-relative overflow-hidden" style={{ background: colorGreen, borderRadius: '15px' }} whileHover={{ scale: 1.01 }}>
                                <div className="row align-items-center">
                                    <div className="col-md-8 position-relative" style={{ zIndex: 2 }}>
                                        <h3 className="display-5 fw-bold mb-3" style={{ color: colorGold, fontFamily: fontRoyal }}>Includes Traditional Karuppu Kavuni Rice</h3>
                                        <p className="lead" style={{ fontFamily: fontModern, color: '#f4ebd0', opacity: 0.9, fontSize: '1rem', lineHeight: '1.8' }}>Valued in traditional diets for its natural antioxidants. Adds depth of nutrition and heritage value to every scoop.</p>
                                    </div>
                                    <div className="col-md-4 text-center">
                                        <i className="fa fa-leaf display-1" style={{ color: 'rgba(197,160,89,0.2)' }}></i>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* --- RITUAL OF PREPARATION --- */}
                <section className="container py-5">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                        <div className="text-center mb-5">
                            <h2 className="display-5 fw-bold" style={{ color: colorGreen, fontFamily: fontRoyal }}>Ritual of Preparation</h2>
                            <div style={{ width: '60px', height: '2px', background: colorGold, margin: '15px auto', opacity: 0.8 }}></div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                {[
                                    "Add 2 tablespoons of MSK Health Mix powder to 600 ml of water.",
                                    "Mix well to avoid lumps.",
                                    "Cook on medium flame for 5 minutes, stirring continuously.",
                                    "Add jaggery or salt as preferred.",
                                    "Serve hot for best taste and nutrition."
                                ].map((step, index) => (
                                    <motion.div key={index} className="d-flex align-items-center mb-4 p-4 shadow-sm" whileHover={{ x: 10, backgroundColor: 'rgba(197,160,89,0.05)' }} style={{ borderLeft: `4px solid ${colorGold}`, background: '#fff', borderRadius: '0 15px 15px 0' }}>
                                        <span className="display-6 fw-bold me-4" style={{ fontFamily: fontRoyal, color: 'rgba(15, 66, 15, 0.15)' }}>0{index + 1}</span>
                                        <p className="mb-0" style={{ fontFamily: fontModern, color: colorGreen, fontSize: '1.05rem', fontWeight: '500' }}>{step}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* --- SUITABLE FOR --- */}
                <section className="py-5" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.3) 100%)' }}>
                    <div className="container text-center">
                         <h3 className="fw-bold mb-5" style={{ fontFamily: fontRoyal, color: colorGreen, letterSpacing: '2px', textTransform: 'uppercase' }}>Suitable For</h3>
                         <div className="row justify-content-center g-4">
                            {[
                                { renderIcon: () => <i className="fa fa-child fs-1 mb-3" style={{ color: colorGold }}></i>, text: "Children" },
                                { renderIcon: () => <i className="fa fa-users fs-1 mb-3" style={{ color: colorGold }}></i>, text: "Adults" },
                                { renderIcon: () => <i className="fa fa-blind fs-1 mb-3" style={{ color: colorGold }}></i>, text: "Elderly" },
                                { renderIcon: () => <NursingIcon />, text: "Nursing Mothers" }
                            ].map((item, index) => (
                                <motion.div key={index} className="col-6 col-md-3" whileHover={{ scale: 1.1 }}>
                                    <div className="p-3">
                                        {item.renderIcon()}
                                        <h5 style={{ fontFamily: fontModern, color: colorGreen, fontSize: '1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.text}</h5>
                                    </div>
                                </motion.div>
                            ))}
                         </div>
                    </div>
                </section>

                {/* --- ROYAL TESTIMONIALS --- */}
                <section className="container py-5 mt-3 mb-5">
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold" style={{ color: colorGreen, fontFamily: fontRoyal }}>Words of Tradition</h2>
                        <div style={{ width: '60px', height: '2px', background: colorGold, margin: '15px auto', opacity: 0.8 }}></div>
                    </div>
                    
                    <div className="row g-4 justify-content-center">
                        {[
                            { name: "Lakshmi S.", role: "Mother of Two", text: "The authentic taste of traditional millets. My children love it as their morning porridge. It feels good to give them something so pure." },
                            { name: "Ramanathan K.", role: "Fitness Enthusiast", text: "I've replaced my artificial protein shakes with MSK Health Mix. The sustained energy it gives for my workouts is incredible." },
                            { name: "Meenakshi V.", role: "Grandmother", text: "Reminds me of how my mother used to prepare health mix at home. The inclusion of Karuppu Kavuni makes it truly special." }
                        ].map((review, index) => (
                            <motion.div key={index} className="col-md-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                                <div className="p-4 h-100 position-relative shadow-sm" style={{ background: '#fff', borderRadius: '15px', border: `1px solid rgba(197, 160, 89, 0.2)` }}>
                                    <i className="fa fa-quote-left position-absolute" style={{ top: '20px', left: '20px', fontSize: '2rem', color: 'rgba(197, 160, 89, 0.15)' }}></i>
                                    <p className="mt-4 mb-4" style={{ color: colorGreen, fontFamily: fontModern, fontSize: '0.95rem', lineHeight: '1.6', position: 'relative', zIndex: 1, fontWeight: '500' }}>
                                        "{review.text}"
                                    </p>
                                    <div className="d-flex align-items-center">
                                        <div className="rounded-circle d-flex justify-content-center align-items-center" style={{ width: '45px', height: '45px', background: colorGreen, color: colorGold, fontFamily: fontRoyal, fontSize: '1.2rem', fontWeight: 'bold' }}>
                                            {review.name.charAt(0)}
                                        </div>
                                        <div className="ms-3">
                                            <h6 className="mb-0 fw-bold" style={{ fontFamily: fontRoyal, color: colorGreen, fontSize: '1.1rem' }}>{review.name}</h6>
                                            <small style={{ fontFamily: fontModern, color: colorGold, fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{review.role}</small>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* --- FOOTER --- */}
                <footer className="py-5" style={{ background: colorGreen, color: '#f4ebd0', borderTop: `5px solid ${colorGold}` }}>
                    <div className="container">
                        <div className="row align-items-center text-center text-md-start">
                            <div className="col-md-4 mb-4 mb-md-0">
                                <h4 className="fw-bold mb-3" style={{ color: colorGold, fontFamily: fontRoyal, fontSize: '1.5rem' }}>Quality Promise</h4>
                                <ul className="list-unstyled" style={{ fontFamily: fontModern, opacity: 0.9, fontWeight: '500' }}>
                                    <li className="mb-2"><span style={{ color: colorGold, marginRight: '8px' }}>✓</span> No Added Sugar</li>
                                    <li className="mb-2"><span style={{ color: colorGold, marginRight: '8px' }}>✓</span> No Preservatives</li>
                                    <li className="mb-2"><span style={{ color: colorGold, marginRight: '8px' }}>✓</span> Hygienically Manufactured</li>
                                </ul>
                            </div>
                            <div className="col-md-4 mb-4 mb-md-0 text-center">
                                <h5 className="text-uppercase mb-3 fw-bold" style={{ fontFamily: fontModern, letterSpacing: '2px', color: colorGold, fontSize: '0.85rem' }}>Manufactured By</h5>
                                <h2 className="fw-bold mb-1" style={{ fontFamily: fontRoyal, color: '#fff', letterSpacing: '1px' }}>MSK FOODS</h2>
                                <p className="mb-0 mt-2" style={{ fontFamily: fontModern, opacity: 0.9, fontSize: '0.9rem' }}>No. 100, Main Road, Alangulam</p>
                                <p className="mt-1 fw-bold" style={{ fontFamily: fontModern, color: colorGold, fontSize: '1.1rem' }}>Ph: 94861 70416</p>
                            </div>
                            <div className="col-md-4 text-md-end">
                                <h6 className="fw-bold mb-3" style={{ fontFamily: fontRoyal, color: colorGold, fontSize: '1.5rem' }}>Storage</h6>
                                <p className="mb-1" style={{ fontFamily: fontModern, opacity: 0.9, fontSize: '0.95rem' }}>Store in a cool, dry place.</p>
                                <p className="mb-0" style={{ fontFamily: fontModern, opacity: 0.9, fontSize: '0.95rem' }}>Best before 6 months.</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </Fragment>
    );
}