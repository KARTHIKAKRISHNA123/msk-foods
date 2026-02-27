import React from 'react';
import { Link } from 'react-router-dom';

export default function CheckoutSteps({ shipping, confirmOrder, payment }) {
    const darkGold = "#b38b40"; 
    const lightGold = "rgba(179, 139, 64, 0.15)";
    const creamBackground = "#fdfbf7";

    return (
        <div className="checkout-progress d-flex justify-content-center pt-5 pb-3">
            
            {/* Step 1: Shipping */}
            {confirmOrder ? ( 
                <Link to="/shipping" className="step text-center text-decoration-none">
                    <div className="step-icon shadow-sm" style={{ background: creamBackground, color: darkGold, border: `2px solid ${darkGold}` }}>
                        <i className="fa fa-check"></i>
                    </div>
                    <div className="step-text fw-bold mt-2" style={{ color: darkGold, letterSpacing: '1px', fontSize: '0.75rem' }}>SHIPPING</div>
                </Link>
            ) : (
                <div className="step text-center">
                    <div className="step-icon shadow" style={{ background: creamBackground, color: darkGold, border: `3px solid ${darkGold}`, transform: 'scale(1.1)' }}>
                        {/* ✨ BUG FIXED: Changed fa-shipping-fast to fa-truck */}
                        <i className="fa fa-truck"></i>
                    </div>
                    <div className="step-text fw-bold mt-2" style={{ color: darkGold, letterSpacing: '1px' }}>SHIPPING</div>
                </div>
            )}

            <div className="step-line" style={{ background: confirmOrder ? darkGold : lightGold, flex: '0 0 80px', height: '2px', alignSelf: 'start', marginTop: '25px', margin: '25px 10px 0' }}></div>

            {/* Step 2: Confirm Order */}
            {payment ? ( 
                 <Link to="/order/confirm" className="step text-center text-decoration-none">
                    <div className="step-icon shadow-sm" style={{ background: creamBackground, color: darkGold, border: `2px solid ${darkGold}` }}>
                        <i className="fa fa-check"></i>
                    </div>
                    <div className="step-text fw-bold mt-2" style={{ color: darkGold, letterSpacing: '1px', fontSize: '0.75rem' }}>CONFIRM</div>
                </Link>
            ) : confirmOrder ? ( 
                <div className="step text-center">
                    <div className="step-icon shadow" style={{ background: creamBackground, color: darkGold, border: `3px solid ${darkGold}`, transform: 'scale(1.1)' }}>
                        <i className="fa fa-check-square"></i>
                    </div>
                    <div className="step-text fw-bold mt-2" style={{ color: darkGold, letterSpacing: '1px' }}>CONFIRM</div>
                </div>
            ) : (
                <div className="step text-center opacity-50">
                    <div className="step-icon" style={{ background: lightGold, color: darkGold, border: `1px solid ${darkGold}` }}>
                        <i className="fa fa-check-square"></i>
                    </div>
                    <div className="step-text mt-2" style={{ color: darkGold, fontSize: '0.75rem' }}>CONFIRM</div>
                </div>
            )}

            <div className="step-line" style={{ background: payment ? darkGold : lightGold, flex: '0 0 80px', height: '2px', alignSelf: 'start', marginTop: '25px', margin: '25px 10px 0' }}></div>

            {/* Step 3: Payment */}
            <div className={`step text-center ${!payment && 'opacity-50'}`}>
                <div className="step-icon" style={{ 
                    background: payment ? creamBackground : lightGold, 
                    color: darkGold, 
                    border: payment ? `3px solid ${darkGold}` : `1px solid ${darkGold}`,
                    transform: payment ? 'scale(1.1)' : 'none'
                }}>
                    <i className="fa fa-credit-card"></i>
                </div>
                <div className="step-text mt-2" style={{ color: darkGold, fontSize: '0.75rem', fontWeight: payment ? 'bold' : 'normal' }}>PAYMENT</div>
            </div>
            
            <style>{`
                .step-icon { width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-size: 1.1rem; transition: all 0.4s ease; z-index: 2; position: relative; }
                .step-text { text-transform: uppercase; font-family: 'Montserrat', sans-serif; letter-spacing: 1px; }
            `}</style>
        </div>
    )
}