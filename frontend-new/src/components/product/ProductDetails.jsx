import React, { useEffect, Fragment } from 'react';
import { motion } from 'framer-motion';
import MetaData from '../layouts/MetaData';
import { useParams } from 'react-router-dom';

// ✨ Nursing Icon (Kept the good one)
const NursingIcon = () => (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-3">
        <circle cx="15" cy="5.5" r="2.5" fill="#c5a059"/>
        <circle cx="10.5" cy="11.5" r="2" fill="#c5a059"/>
        <path d="M17 9.5C16.2 9.5 15.5 9.8 15 10.2V11C15 12.6569 13.6569 14 12 14H11C9.34315 14 8 12.6569 8 11V16C8 18.2091 9.79086 20 12 20H15C17.7614 20 20 17.7614 20 15V12.5C20 10.8431 18.6569 9.5 17 9.5Z" fill="#c5a059"/>
    </svg>
);

export default function ProductDetails() {
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // ⚠️ TEMPORARY STATIC DATA
    const product = {
        name: "MSK Health Mix",
        description: "A carefully crafted blend of 15 varieties of millets, prepared using traditional methods and modern hygiene standards.",
        price: 250,
        ratings: 4.5,
        numOfReviews: 145,
        images: [{ image: '/images/products/healthmix.jpg' }] 
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    return (
        <Fragment>
            <MetaData title={product.name} />
            
            <div style={{ background: '#fdfbf7', overflowX: 'hidden' }}>

                {/* --- HERO HEADER --- */}
                <section className="container py-5 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="text-uppercase fw-bold" style={{ color: '#c5a059', letterSpacing: '3px' }}>
                            The Gold Standard
                        </span>
                        <h1 className="display-3 fw-bold mt-2 mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#0f420f' }}>
                            Wholesome Nutrition,<br />Naturally Balanced.
                        </h1>
                        <div style={{ width: '80px', height: '2px', background: '#c5a059', margin: '0 auto' }}></div>
                    </motion.div>
                </section>

                {/* --- SECTION 1: KEY BENEFITS (Bento Grid) --- */}
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
                                whileHover={{ 
                                    y: -10, 
                                    borderColor: '#c5a059', 
                                    boxShadow: '0 15px 30px rgba(197,160,89,0.15)' 
                                }}
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
                                whileHover={{ 
                                    y: -10, 
                                    borderColor: '#c5a059',
                                    boxShadow: '0 15px 30px rgba(197,160,89,0.15)'
                                }}
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

                {/* --- SECTION 2: DIRECTIONS --- */}
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

                {/* --- SECTION 3: SUITABLE FOR (4 Items now) --- */}
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
                                // REMOVED: Pregnant Women
                            ].map((item, index) => (
                                <motion.div 
                                    key={index}
                                    // ✨ UPDATED: col-md-3 (4 items per row looks perfect)
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
                                <p className="mb-0">No. 100, Main Road, Olangulam</p>
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