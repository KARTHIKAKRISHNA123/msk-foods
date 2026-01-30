import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom'; 
import { motion } from 'framer-motion';
import { getProducts } from '../../slices/productsSlice'; 
//import { addItemsToCart } from '../../actions/cartActions'; 
import MetaData from '../layouts/MetaData';
import Loader from '../layouts/Loader'; 
import { toast } from 'react-toastify';

// --- ICONS ---
const NursingIcon = () => (
    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-3">
        <circle cx="15" cy="5.5" r="2.5" fill="#c5a059"/>
        <circle cx="10.5" cy="11.5" r="2" fill="#c5a059"/>
        <path d="M17 9.5C16.2 9.5 15.5 9.8 15 10.2V11C15 12.6569 13.6569 14 12 14H11C9.34315 14 8 12.6569 8 11V16C8 18.2091 9.79086 20 12 20H15C17.7614 20 20 17.7614 20 15V12.5C20 10.8431 18.6569 9.5 17 9.5Z" fill="#c5a059"/>
    </svg>
);

const TrustBadge = ({ icon, title, subtitle }) => (
    <div className="d-flex align-items-center gap-3 p-3" style={{ border: '1px solid rgba(197, 160, 89, 0.2)', background: '#fff' }}>
        <div style={{ color: '#c5a059', fontSize: '1.5rem' }}>{icon}</div>
        <div className="text-start">
            <h6 className="mb-0 fw-bold text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '1px', color: '#0f420f' }}>{title}</h6>
            <small className="text-muted" style={{ fontSize: '0.7rem' }}>{subtitle}</small>
        </div>
    </div>
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
        if (product && product.stock <= quantity) return;
        setQuantity(quantity + 1);
    }

    const decreaseQty = () => {
        if (1 >= quantity) return;
        setQuantity(quantity - 1);
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(product._id, quantity));
        toast.success('Item Added to Cart!', { position: 'top-center', theme: 'colored' });
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
                    duration: 35, // Slower speed
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
            
            <div style={{ background: '#fdfbf7', overflowX: 'hidden', backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}>

                {/* BACK BUTTON */}
                <div className="container pt-4">
                    <Link to="/" className="text-decoration-none d-flex align-items-center" style={{ color: '#c5a059', fontWeight: 'bold', fontSize: '0.9rem' }}>
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
                        {/* 1. Brand Tagline */}
                        <span className="text-uppercase fw-bold" style={{ color: '#c5a059', letterSpacing: '3px' }}>
                            The Gold Standard
                        </span>

                        {/* 2. Headline */}
                        <h1 className="display-3 fw-bold mt-2 mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#0f420f' }}>
                            Wholesome Nutrition,<br />Naturally Balanced.
                        </h1>

                        {/* Product Image */}
                        <motion.div 
                            className="my-4 position-relative d-inline-block"
                            animate={{ y: [0, -15, 0] }} 
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                             <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(197,160,89,0.3) 0%, rgba(255,255,255,0) 70%)', zIndex: -1 }}></div>
                            
                            <img 
                                src={product.images && product.images[0] ? product.images[0].image : '/images/placeholder.png'} 
                                alt={product.name} 
                                className="img-fluid"
                                style={{ maxHeight: '350px', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.1))' }}
                            />
                        </motion.div>

                        {/* 3. Product Name */}
                        <h2 className="mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#c5a059', fontSize: '2rem' }}>
                            {product.name}
                        </h2>
                        
                        {/* 4. Price */}
                        <h3 className="mb-4" style={{ color: '#c5a059', fontFamily: 'Playfair Display, serif', fontWeight: 'bold', fontSize: '2.5rem' }}>
                            ₹{product.price}
                        </h3>

                        {/* 5. Controls */}
                        <div className="d-flex flex-column align-items-center gap-4 mb-5">
                             <div className="d-flex align-items-center justify-content-center">
                                <span className="me-3 text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.9rem', color: '#555' }}>Quantity:</span>
                                <div className="stockCounter d-flex align-items-center" style={{ border: '1px solid #c5a059', borderRadius: '0', padding: '8px 15px', background: '#fff' }}>
                                    <span className="btn btn-sm" onClick={decreaseQty} style={{ fontSize: '1.2rem', color: '#0f420f', cursor: 'pointer' }}>-</span>
                                    <input type="number" className="form-control count border-0 text-center" value={quantity} readOnly style={{ width: '50px', fontWeight: 'bold', background: 'transparent', fontSize: '1.1rem' }} />
                                    <span className="btn btn-sm" onClick={increaseQty} style={{ fontSize: '1.2rem', color: '#0f420f', cursor: 'pointer' }}>+</span>
                                </div>
                            </div>

                            <button 
                                onClick={addToCartHandler}
                                disabled={product.stock === 0}
                                className="btn px-5 py-3 shadow-sm" 
                                style={{ 
                                    backgroundColor: '#0f420f', 
                                    color: '#c5a059',
                                    border: '1px solid #0f420f',
                                    borderRadius: '0',
                                    textTransform: 'uppercase',
                                    letterSpacing: '3px',
                                    fontWeight: '600',
                                    minWidth: '250px',
                                    fontSize: '1rem'
                                }}
                            >
                                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                            </button>
                        </div>
                    </motion.div>
                </section>

                {/* --- INFINITE INGREDIENTS MARQUEE --- */}
                <div className="py-4 mb-5" style={{ background: '#0f420f', overflow: 'hidden', whiteSpace: 'nowrap', borderTop: '2px solid #c5a059', borderBottom: '2px solid #c5a059' }}>
                    <motion.div variants={marqueeVariants} animate="animate" className="d-flex gap-5">
                        {[...Array(10)].map((_, i) => (
                            <h4 key={i} className="text-uppercase m-0 mx-5" style={{ 
                                color: 'rgba(244, 235, 208, 0.25)', 
                                fontFamily: 'Playfair Display', 
                                letterSpacing: '3px'
                            }}>
                                ✦ 15 MILLETS · LOW GLYCEMIC · HEART FRIENDLY · HIGH FIBRE · SUSTAINED ENERGY · TRADITIONAL SUPERFOOD ✦
                            </h4>
                        ))}
                    </motion.div>
                </div>

                {/* --- TRUST BADGES --- */}
                {/* --- TRUST BADGES (Updated to Match "Suitable For" Style) --- */}
<section className="container mb-5">
    <div className="row g-4 justify-content-center">
        {[
            { 
                icon: <i className="fa fa-leaf fs-1 mb-3" style={{ color: '#c5a059' }}></i>, 
                title: "100% Natural", 
                subtitle: "No Artificial Flavors" 
            },
            { 
                icon: <i className="fa fa-ban fs-1 mb-3" style={{ color: '#c5a059' }}></i>, 
                title: "No Preservatives", 
                subtitle: "Clean Label" 
            },
            { 
                icon: <i className="fa fa-certificate fs-1 mb-3" style={{ color: '#c5a059' }}></i>, 
                title: "Premium Quality", 
                subtitle: "Export Standard" 
            }
        ].map((badge, index) => (
            <motion.div 
                key={index}
                className="col-md-4" // Uses 3 columns (larger cards)
                whileHover={{ scale: 1.05 }}
            >
                <div 
                    className="p-4 text-center h-100 shadow-sm" 
                    style={{ background: '#fff', borderRadius: '0' }}
                >
                    {badge.icon}
                    <h5 className="fw-bold" style={{ color: '#0f420f', fontSize: '1rem' }}>{badge.title}</h5>
                    <p className="small text-muted mb-0">{badge.subtitle}</p>
                </div>
            </motion.div>
        ))}
    </div>
</section>

                {/* --- BENEFITS --- */}
                <section className="container mb-5">
                    <motion.div 
                        className="row g-4"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {/* Card 1 */}
                        <motion.div className="col-md-6" variants={fadeInUp}>
                            <motion.div 
                                className="p-5 h-100 shadow-sm" 
                                style={{ background: '#fff', border: '1px solid rgba(197,160,89,0.3)' }}
                                whileHover={{ y: -10, borderColor: '#c5a059', boxShadow: '0 15px 30px rgba(197,160,89,0.15)' }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <i className="fa fa-heartbeat fs-1 mb-3" style={{ color: '#c5a059' }}></i>
                                <h3 className="fw-bold mb-3" style={{ color: '#0f420f', fontFamily: 'Playfair Display, serif' }}>Supports Diabetic-Friendly Lifestyle</h3>
                                <ul className="list-unstyled text-muted" style={{ lineHeight: '1.8' }}>
                                    <li className="mb-2">✓ Low glycaemic impact from 15 varieties of millets.</li>
                                    <li className="mb-2">✓ Helps maintain balanced energy release.</li>
                                    <li>✓ Widely recommended for managing sugar levels.</li>
                                </ul>
                            </motion.div>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div className="col-md-6" variants={fadeInUp}>
                            <motion.div 
                                className="p-5 h-100 shadow-sm" 
                                style={{ background: '#fff', border: '1px solid rgba(197,160,89,0.3)' }}
                                whileHover={{ y: -10, borderColor: '#c5a059', boxShadow: '0 15px 30px rgba(197,160,89,0.15)' }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <i className="fa fa-tint fs-1 mb-3" style={{ color: '#c5a059' }}></i>
                                <h3 className="fw-bold mb-3" style={{ color: '#0f420f', fontFamily: 'Playfair Display, serif' }}>Heart Health & Blood Pressure</h3>
                                <ul className="list-unstyled text-muted" style={{ lineHeight: '1.8' }}>
                                    <li className="mb-2">✓ Rich in Magnesium and Dietary Fibre.</li>
                                    <li className="mb-2">✓ Supports cardiovascular wellness.</li>
                                    <li>✓ A wholesome alternative to refined grains.</li>
                                </ul>
                            </motion.div>
                        </motion.div>

                        {/* Card 3 (Dark) */}
                        <motion.div className="col-12" variants={fadeInUp}>
                            <motion.div 
                                className="p-5 shadow-sm position-relative overflow-hidden" 
                                style={{ background: '#0f420f' }}
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 200 }}
                            >
                                <div className="row align-items-center">
                                    <div className="col-md-8 position-relative" style={{ zIndex: 2 }}>
                                        <h3 className="display-5 fw-bold mb-3" style={{ color: '#c5a059', fontFamily: 'Playfair Display, serif' }}>
                                            Includes Traditional Karuppu Kavuni Rice
                                        </h3>
                                        <p className="lead text-white-50">
                                            Valued in traditional diets for its natural antioxidants. Adds depth of nutrition and heritage value to every scoop.
                                        </p>
                                    </div>
                                    <div className="col-md-4 text-center">
                                        <i className="fa fa-leaf display-1" style={{ color: 'rgba(197,160,89,0.2)' }}></i>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* --- DIRECTIONS --- */}
                <section className="container py-5">
                    <motion.div 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true }} 
                        variants={fadeInUp}
                    >
                        <h2 className="text-center display-4 fw-bold mb-5" style={{ color: '#0f420f', fontFamily: 'Playfair Display, serif' }}>
                            Ritual of Preparation
                        </h2>
                        
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                {[
                                    "Add 2 tablespoons of MSK Health Mix powder to 600 ml of water.",
                                    "Mix well to avoid lumps.",
                                    "Cook on medium flame for 5 minutes, stirring continuously.",
                                    "Add jaggery or salt as preferred.",
                                    "Serve hot for best taste and nutrition."
                                ].map((step, index) => (
                                    <motion.div 
                                        key={index}
                                        className="d-flex align-items-center mb-4 p-3"
                                        whileHover={{ x: 10, backgroundColor: 'rgba(197,160,89,0.1)' }}
                                        style={{ borderLeft: '4px solid #c5a059', background: '#fff' }}
                                    >
                                        <span className="display-6 fw-bold me-4" style={{ color: 'rgba(15, 66, 15, 0.2)' }}>0{index + 1}</span>
                                        <p className="mb-0 lead" style={{ color: '#0f420f' }}>{step}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* --- SUITABLE FOR --- */}
                <section className="py-5" style={{ background: '#fff' }}>
                    <div className="container text-center">
                         <h3 className="fw-bold mb-5" style={{ color: '#0f420f', letterSpacing: '2px' }}>SUITABLE FOR</h3>
                         <div className="row justify-content-center g-4">
                            {[
                                { 
                                    renderIcon: () => <i className="fa fa-child fs-1 mb-3" style={{ color: '#c5a059' }}></i>, 
                                    text: "Children" 
                                },
                                { 
                                    renderIcon: () => <i className="fa fa-users fs-1 mb-3" style={{ color: '#c5a059' }}></i>, 
                                    text: "Adults" 
                                },
                                { 
                                    renderIcon: () => <i className="fa fa-blind fs-1 mb-3" style={{ color: '#c5a059' }}></i>, 
                                    text: "Elderly" 
                                },
                                { 
                                    renderIcon: () => <NursingIcon />, 
                                    text: "Nursing Mothers" 
                                }
                            ].map((item, index) => (
                                <motion.div 
                                    key={index}
                                    className="col-6 col-md-3"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <div className="p-3">
                                        {item.renderIcon()}
                                        <h5 style={{ color: '#555', fontSize: '0.9rem', fontWeight: 'bold' }}>{item.text}</h5>
                                    </div>
                                </motion.div>
                            ))}
                         </div>
                    </div>
                </section>

                {/* --- FOOTER --- */}
                <footer className="py-5" style={{ background: '#0f420f', color: '#f4ebd0', borderTop: '5px solid #c5a059' }}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-4 mb-4 mb-md-0">
                                <h4 className="fw-bold mb-3" style={{ color: '#c5a059', fontFamily: 'Playfair Display, serif' }}>Quality Promise</h4>
                                <ul className="list-unstyled" style={{ opacity: 0.8 }}>
                                    <li className="mb-2"><i className="fa fa-check-circle me-2 text-warning"></i>No Added Sugar</li>
                                    <li className="mb-2"><i className="fa fa-check-circle me-2 text-warning"></i>No Preservatives</li>
                                    <li className="mb-2"><i className="fa fa-check-circle me-2 text-warning"></i>Hygienically Manufactured</li>
                                </ul>
                            </div>
                            <div className="col-md-4 mb-4 mb-md-0 text-center">
                                <h5 className="text-uppercase mb-3" style={{ letterSpacing: '2px', color: '#c5a059' }}>Manufactured By</h5>
                                <h2 className="fw-bold mb-1">MSK FOODS</h2>
                                <p className="mb-0">No. 100, Main Road, Alangulam</p>
                                <p className="mt-2 fw-bold" style={{ color: '#c5a059' }}>Ph: 94861 70416</p>
                            </div>
                            <div className="col-md-4 text-md-end">
                                <div className="mb-3">
                                    <h6 className="fw-bold" style={{ color: '#c5a059' }}>Storage</h6>
                                    <p className="small mb-0" style={{ opacity: 0.7 }}>Store in a cool, dry place.</p>
                                    <p className="small" style={{ opacity: 0.7 }}>Best before 6 months.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>
        </Fragment>
    );
}