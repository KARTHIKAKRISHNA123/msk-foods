import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';
import MetaData from './layouts/MetaData';

export default function Home() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.productsState);
    
    // State to handle image hover effect (Front -> Back view)
    const [activeImage, setActiveImage] = useState(null);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const healthMix = products && products[0]; 

    return (
        <>
            <MetaData title={'Best Health Mix'} />

            {loading ? (
                // Centered Loader
                <div className="d-flex justify-content-center align-items-center" style={{height: '60vh'}}>
                    <div className="spinner-border" style={{color: '#c5a059', width: '3rem', height: '3rem'}} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : error ? (
                <div className="alert alert-danger text-center mt-5">{error}</div>
            ) : (
                healthMix && (
                    <section id="products" className="container mt-5 mb-5">
                        <div className="row align-items-center">
                            
                            {/* Left Side: Product Image (Interactive) */}
                            <div className="col-md-6 text-center position-relative">
                                <div 
                                    className="image-container"
                                    style={{ perspective: '1000px' }} // Adds depth for 3D feel
                                    onMouseEnter={() => {
                                        // If a back view exists, switch to it on hover
                                        if (healthMix.images[1]) setActiveImage(healthMix.images[1].image);
                                    }}
                                    onMouseLeave={() => {
                                        // Revert to front view
                                        setActiveImage(null);
                                    }}
                                >
                                    <img 
                                        // ⚠️ KEY CHANGE: Using .image instead of .url based on your JSON
                                        src={activeImage || (healthMix.images[0] ? healthMix.images[0].image : '/images/placeholder.png')} 
                                        alt={healthMix.name}
                                        className="img-fluid"
                                        style={{ 
                                            maxHeight: '550px', 
                                            filter: 'drop-shadow(0 25px 50px rgba(10, 47, 10, 0.3))', // Luxury deep shadow
                                            transition: 'all 0.5s ease-in-out',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Right Side: Details (Luxury Typography) */}
                            <div className="col-md-6">
                                <div className="ps-md-5">
                                    <div className="badge mb-3 px-3 py-2" style={{backgroundColor: '#f4ebd0', color: '#0a2f0a', letterSpacing: '2px', border: '1px solid #c5a059'}}>
                                        100% NATURAL
                                    </div>
                                    
                                    <h1 className="display-3 fw-bold mb-2" style={{ color: '#0a2f0a', fontFamily: 'Playfair Display, serif' }}>
                                        {healthMix.name}
                                    </h1>

                                    <div className="d-flex align-items-center mb-4">
                                        <div className="rating-outer me-2">
                                            <div className="rating-inner" style={{ width: `${(healthMix.ratings / 5) * 100}%` }}></div>
                                        </div>
                                        <span className="text-muted" style={{fontFamily: 'Montserrat, sans-serif'}}>
                                            ({healthMix.numOfReviews} Reviews)
                                        </span>
                                    </div>

                                    <h2 className="mb-4" style={{ color: '#c5a059', fontWeight: '700', fontSize: '3rem', fontFamily: 'Playfair Display, serif' }}>
                                        ₹{healthMix.price}
                                    </h2>

                                    <p className="lead mb-5" style={{ lineHeight: '1.9', color: '#555', fontSize: '1.1rem' }}>
                                        {healthMix.description}
                                    </p>
                                    
                                    <div className="d-grid gap-2 d-md-block">
                                        <button 
                                            className="btn btn-lg px-5 py-3 me-3" 
                                            style={{ 
                                                backgroundColor: '#0a2f0a', 
                                                color: '#c5a059',
                                                border: '1px solid #0a2f0a',
                                                borderRadius: '0',
                                                textTransform: 'uppercase',
                                                letterSpacing: '2px',
                                                fontSize: '0.9rem',
                                                transition: 'all 0.3s'
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.backgroundColor = '#1e4d1e';
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.backgroundColor = '#0a2f0a';
                                                e.currentTarget.style.transform = 'translateY(0)';
                                            }}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>
                )
            )}
        </>
    );
}