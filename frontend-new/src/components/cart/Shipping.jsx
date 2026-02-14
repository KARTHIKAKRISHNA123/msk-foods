import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { countries } from 'countries-list'; 
import { saveShippingInfo } from '../../slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layouts/MetaData';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import CheckoutSteps from './CheckoutSteps'; // ✨ IMPORT HERE

export default function Shipping() {
    const { shippingInfo } = useSelector(state => state.cartState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [address, setAddress] = useState(shippingInfo.address || "");
    const [city, setCity] = useState(shippingInfo.city || "");
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode || "");
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");
    const [country, setCountry] = useState(shippingInfo.country || "India"); 
    const [state, setState] = useState(shippingInfo.state || "");

    const [isOpen, setIsOpen] = useState(false);
    const countriesList = Object.values(countries);

    const submitHandler = (e) => {
        e.preventDefault();

        if (!address) return toast.error("Please enter your shipping address.", { position: "top-center", theme: "colored" });
        if (!city) return toast.error("Please enter your city.", { position: "top-center", theme: "colored" });
        if (!state) return toast.error("Please enter your state.", { position: "top-center", theme: "colored" });
        if (!phoneNo) return toast.error("Please enter your phone number.", { position: "top-center", theme: "colored" });
        if (!postalCode) return toast.error("Please enter your postal code.", { position: "top-center", theme: "colored" });
        if (!country) return toast.error("Please select your country.", { position: "top-center", theme: "colored" });

        if (phoneNo.length < 10) {
            toast.error("Phone number must be at least 10 digits", { position: "top-center", theme: "colored" });
            return;
        }

        dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country, state }));
        navigate('/order/confirm');
    }

    const inputStyle = {
        border: 'none',
        borderBottom: '1px solid rgba(197, 160, 89, 0.3)', 
        borderRadius: '0',
        padding: '12px 5px',
        background: 'transparent', 
        fontSize: '1rem',
        color: '#0f420f',
        transition: 'all 0.3s ease'
    };

    const handleFocus = (e) => {
        e.target.style.borderBottom = '1px solid #c5a059';
    };

    const handleBlur = (e) => {
        e.target.style.borderBottom = '1px solid rgba(197, 160, 89, 0.3)';
    };

    return (
        <Fragment>
            <MetaData title={'Shipping Info'} />

            {/* Global Styles */}
            <style>{`
                .custom-dropdown-list::-webkit-scrollbar { width: 8px; }
                .custom-dropdown-list::-webkit-scrollbar-track { background: #fdfbf7; }
                .custom-dropdown-list::-webkit-scrollbar-thumb { background: #c5a059; border-radius: 4px; }
                .custom-dropdown-list::-webkit-scrollbar-thumb:hover { background: #0f420f; }
                .custom-dropdown-list { scrollbar-width: thin; scrollbar-color: #c5a059 #fdfbf7; }
                input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
                input[type=number] { -moz-appearance: textfield; }
                .custom-dropdown-item:hover { background-color: #c5a059 !important; color: #fff !important; padding-left: 20px !important; }
            `}</style>

            <div style={{ 
                minHeight: '100vh', 
                background: '#fdfbf7', 
                backgroundImage: `radial-gradient(circle at 50% 10%, rgba(197, 160, 89, 0.1) 0%, transparent 50%), linear-gradient(180deg, #fdfbf7 0%, #f4ebd0 100%)`,
                paddingBottom: '80px',
                paddingTop: '20px'
            }}>
                
                {/* ✨ USE THE COMPONENT HERE */}
                <CheckoutSteps shipping />

                <div className="row justify-content-center px-3">
                    <div className="col-12 col-md-8 col-lg-6">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="shadow-lg p-5"
                            style={{ 
                                background: '#ffffff', 
                                borderTop: '6px solid #c5a059', 
                                borderRadius: '15px', 
                                boxShadow: '0 30px 60px rgba(15, 66, 15, 0.08)',
                                position: 'relative',
                                overflow: 'visible' 
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                                style={{
                                    position: 'absolute', top: '15px', left: '15px', right: '15px', bottom: '15px',
                                    border: '1px solid rgba(197, 160, 89, 0.2)', pointerEvents: 'none', zIndex: 0, borderRadius: '15px'
                                }}
                            />

                             <div style={{
                                position: 'absolute', top: '-20px', right: '-20px', 
                                fontSize: '10rem', color: 'rgba(197,160,89,0.05)', 
                                pointerEvents: 'none', transform: 'rotate(15deg)', zIndex: 0
                            }}>
                                <i className="fa fa-truck"></i>
                            </div>

                            <div className="text-center mb-5" style={{ position: 'relative', zIndex: 1 }}>
                                <motion.h2 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    style={{ fontFamily: 'Playfair Display, serif', color: '#0f420f', fontWeight: '700', fontSize: '2.5rem' }}
                                >
                                    Shipping Details
                                </motion.h2>
                                <div style={{ width: '40px', height: '2px', background: '#c5a059', margin: '15px auto', opacity: 0.7 }}></div>
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-muted" 
                                    style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '1px', fontSize: '0.9rem' }}
                                >
                                    Where should we deliver your royal selection?
                                </motion.p>
                            </div>

                            <form onSubmit={submitHandler} noValidate style={{ position: 'relative', zIndex: 1 }}>
                                <div className="form-group mb-4">
                                    <label className="fw-bold mb-2 small text-uppercase" style={{ color: '#c5a059', letterSpacing: '1.5px' }}>Address Line</label>
                                    <input type="text" className="form-control" style={inputStyle} value={address} onChange={(e) => setAddress(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} placeholder="House No, Street Name" />
                                </div>

                                <div className="row">
                                    <div className="col-md-6 form-group mb-4">
                                        <label className="fw-bold mb-2 small text-uppercase" style={{ color: '#c5a059', letterSpacing: '1.5px' }}>City</label>
                                        <input type="text" className="form-control" style={inputStyle} value={city} onChange={(e) => setCity(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
                                    </div>
                                    <div className="col-md-6 form-group mb-4">
                                        <label className="fw-bold mb-2 small text-uppercase" style={{ color: '#c5a059', letterSpacing: '1.5px' }}>State</label>
                                        <input type="text" className="form-control" style={inputStyle} value={state} onChange={(e) => setState(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 form-group mb-4">
                                        <label className="fw-bold mb-2 small text-uppercase" style={{ color: '#c5a059', letterSpacing: '1.5px' }}>Phone Number</label>
                                        <input type="number" className="form-control" style={inputStyle} value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
                                    </div>
                                    <div className="col-md-6 form-group mb-4">
                                        <label className="fw-bold mb-2 small text-uppercase" style={{ color: '#c5a059', letterSpacing: '1.5px' }}>Postal Code</label>
                                        <input type="number" className="form-control" style={inputStyle} value={postalCode} onChange={(e) => setPostalCode(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} />
                                    </div>
                                </div>

                                <div className="form-group mb-5" style={{ position: 'relative' }}>
                                    <label className="fw-bold mb-2 small text-uppercase" style={{ color: '#c5a059', letterSpacing: '1.5px' }}>Country</label>
                                    <div onClick={() => setIsOpen(!isOpen)} style={{ ...inputStyle, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isOpen ? '1px solid #c5a059' : '1px solid rgba(197, 160, 89, 0.3)' }}>
                                        <span>{country}</span>
                                        <motion.i animate={{ rotate: isOpen ? 180 : 0 }} className="fa fa-chevron-down" style={{ color: '#c5a059', fontSize: '0.8rem' }} />
                                    </div>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="custom-dropdown-list shadow-lg" style={{ position: 'absolute', top: '100%', left: 0, width: '100%', maxHeight: '250px', overflowY: 'auto', background: '#fff', zIndex: 100, border: '1px solid #c5a059', borderTop: 'none', borderRadius: '0 0 15px 15px' }}>
                                                <div className="custom-dropdown-item" onClick={() => { setCountry("India"); setIsOpen(false); }} style={{ padding: '12px 15px', cursor: 'pointer', borderBottom: '1px solid #eee', transition: '0.2s', color: '#0f420f', fontWeight: 'bold' }}>India</div>
                                                {countriesList.map((c, i) => (
                                                    <div key={i} className="custom-dropdown-item" onClick={() => { setCountry(c.name); setIsOpen(false); }} style={{ padding: '10px 15px', cursor: 'pointer', borderBottom: '1px solid #eee', transition: '0.2s', color: '#333' }}>{c.name}</div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <motion.button whileHover={{ scale: 1.01, boxShadow: '0 10px 20px rgba(197, 160, 89, 0.2)' }} whileTap={{ scale: 0.99 }} type="submit" className="btn w-100 py-3" style={{ background: 'linear-gradient(135deg, #d4af37 0%, #c5a059 100%)', color: '#0f420f', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '3px', borderRadius: '5px', border: 'none', fontSize: '0.85rem', boxShadow: '0 4px 10px rgba(197, 160, 89, 0.2)', marginTop: '10px' }}>
                                    Proceed to Confirm
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}