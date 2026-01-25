import { Fragment, useState } from "react";
import MetaData from "./layouts/MetaData";
import Loader from "./layouts/Loader";
import { Link } from 'react-router-dom';

export default function Home() {
    const loading = false;
    
    // UPDATED: Changed .jpg to .jpeg here
    const [activeImage, setActiveImage] = useState("/images/products/msk_frontview.jpeg");

    const healthMix = {
        _id: "1",
        name: "MSK Foods Health Mix",
        price: 275,        // Discounted Price
        originalPrice: 300, // Old Price
        ratings: 5.0,
        numOfReviews: 145,
        tagline: "Homemade. Nutritious. Delicious.",
        description: "A premium blend of 15 Millets made with traditional care. Our Health Mix is 100% natural with Zero Added Sugar and No Preservatives. A low-GI superfood suitable for all age groups and highly recommended for diabetic patients.",
        images: [
            // UPDATED: Changed .jpg to .jpeg here
            { image: "/images/products/msk_frontview.jpeg" },
            { image: "/images/products/msk_backview.jpeg" } 
        ]
    };

    // Calculate discount percentage automatically
    const discount = Math.round(((healthMix.originalPrice - healthMix.price) / healthMix.originalPrice) * 100);

    return (
        <Fragment>
            {loading ? <Loader/> :
                <Fragment>
                    <MetaData title={'Best Health Mix'} />
                    
                    {/* HERO SECTION */}
                    <div className="container mt-5 fade-in">
                        <div className="row align-items-center" style={{ minHeight: '75vh' }}>
                            
                            {/* LEFT: Product Image with "Flip" Feature */}
                            <div className="col-12 col-md-6 mb-4 mb-md-0 text-center">
                                <div className="product-image-wrapper" style={{
                                    padding: '2rem',
                                    background: 'linear-gradient(135deg, #e3f9e5 0%, #f0fdf4 100%)',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    boxShadow: '0 20px 50px rgba(15, 61, 15, 0.15)'
                                }}>
                                    <img 
                                        src={activeImage} 
                                        alt={healthMix.name} 
                                        className="img-fluid" 
                                        style={{ maxHeight: '500px', borderRadius: '10px', transition: '0.3s' }} 
                                    />
                                </div>
                                <div className="mt-3 d-flex justify-content-center gap-2">
                                    <button 
                                        className="btn btn-sm btn-outline-success" 
                                        onClick={() => setActiveImage(healthMix.images[0].image)}>Front View</button>
                                    <button 
                                        className="btn btn-sm btn-outline-success" 
                                        onClick={() => setActiveImage(healthMix.images[1].image)}>Back View</button>
                                </div>
                            </div>

                            {/* RIGHT: Product Details */}
                            <div className="col-12 col-md-6">
                                {/* Brand Badges */}
                                <div className="mb-2">
                                    <span className="badge bg-warning text-dark me-2" style={{fontSize: '0.8rem'}}>BLEND OF 15 MILLETS</span>
                                    <span className="badge bg-success" style={{fontSize: '0.8rem'}}>DIABETIC FRIENDLY</span>
                                </div>

                                <h1 className="display-4 fw-bold" style={{ color: '#0f3d0f' }}>
                                    {healthMix.name}
                                </h1>
                                <p className="lead fw-bold text-muted" style={{fontFamily: 'serif', fontStyle: 'italic'}}>
                                    "{healthMix.tagline}"
                                </p>

                                <div className="ratings mt-2">
                                    <div className="rating-outer">
                                        <div className="rating-inner" style={{ width: `${(healthMix.ratings / 5) * 100}%` }}></div>
                                    </div>
                                    <span id="no_of_reviews" className="ms-2">({healthMix.numOfReviews} Happy Customers)</span>
                                </div>

                                {/* PRICE SECTION */}
                                <div className="mt-4">
                                    <h2 className="fw-bold d-flex align-items-center" style={{ color: '#d4af37' }}>
                                        {/* Original Price (Crossed Out) */}
                                        <span className="text-muted text-decoration-line-through me-3" style={{fontSize: '1.5rem', opacity: 0.6}}>
                                            ₹{healthMix.originalPrice}
                                        </span>
                                        
                                        {/* New Discounted Price */}
                                        ₹{healthMix.price}
                                        
                                        {/* Unit */}
                                        <span className="text-muted fs-6 fw-normal ms-2 text-dark">/ 500g Pack</span>
                                        
                                        {/* Discount Badge */}
                                        <span className="badge bg-danger ms-3" style={{fontSize: '0.9rem'}}>
                                            {discount}% OFF
                                        </span>
                                    </h2>
                                    <p className="text-success small fw-bold">You save ₹{healthMix.originalPrice - healthMix.price}!</p>
                                </div>

                                <p className="mt-3" style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.6' }}>
                                    {healthMix.description}
                                </p>

                                {/* Key Features */}
                                <div className="d-flex gap-4 mt-3 mb-4">
                                    <div className="d-flex align-items-center">
                                        <i className="fa fa-ban text-danger me-2 fs-4"></i>
                                        <div>
                                            <small className="d-block fw-bold text-uppercase text-muted" style={{fontSize:'0.7rem'}}>Guaranteed</small>
                                            <span className="fw-bold">Zero Sugar</span>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <i className="fa fa-flask text-success me-2 fs-4"></i>
                                        <div>
                                            <small className="d-block fw-bold text-uppercase text-muted" style={{fontSize:'0.7rem'}}>100% Natural</small>
                                            <span className="fw-bold">No Preservatives</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Call to Action */}
                                <div className="d-flex gap-3 mt-2">
                                    <Link to={`/product/${healthMix._id}`} id="view_btn" className="btn btn-lg w-100" 
                                          style={{
                                              borderRadius: '50px', 
                                              background: 'linear-gradient(45deg, #0f3d0f, #225c22)', 
                                              border: 'none',
                                              color: 'white'
                                          }}>
                                        Order Now <i className="fa fa-arrow-right ms-2"></i>
                                    </Link>
                                </div>
                                <div className="mt-3 text-center">
                                     <small className="text-muted fw-bold">Call to Order: +91 94861 70416</small>
                                </div>
                                
                                {/* Directions Mini-Card */}
                                <div className="mt-4 p-3 bg-light rounded border-start border-success border-4">
                                    <h6 className="fw-bold text-success"><i className="fa fa-spoon me-1"></i> Quick Prep:</h6>
                                    <small className="text-muted">Mix 2 tbsp with 600ml water. Cook for 5 mins. Serve hot.</small>
                                </div>

                            </div>
                        </div>
                    </div>
                </Fragment>
           }
        </Fragment>
    );
}