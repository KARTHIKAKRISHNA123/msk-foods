import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeItemFromCart } from "../../slices/cartSlice";
import MetaData from "../layouts/MetaData";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const { items: cartItems } = useSelector((state) => state.cartState);
  const { isAuthenticated } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- THEME VARIABLES (Consistent with Login.jsx) ---
  const fontRoyal = "'Playfair Display', serif";
  const fontModern = "'Montserrat', sans-serif";
  const colorGreen = '#0f420f';
  const colorDarkGreen = '#0a2e0a';
  const colorGold = '#c5a059';
  const colorCream = '#fdfbf7';

  const increaseQty = (item) => {
    if (item.quantity >= item.stock) return;
    dispatch(addToCart(item.product, item.quantity + 1));
  };

  const decreaseQty = (item) => {
    if (item.quantity <= 1) return;
    dispatch(addToCart(item.product, item.quantity - 1));
  };

  const removeItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const checkoutHandler = () => {
    if (isAuthenticated) {
      navigate("/shipping");
    } else {
      navigate("/login?redirect=shipping");
    }
  };

  // --- ANIMATION VARIANTS (Synced with Login.jsx logic) ---
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
  };

  // Reusable Green Card Style
  const greenCardStyle = {
      background: `linear-gradient(145deg, ${colorGreen} 0%, ${colorDarkGreen} 100%)`, 
      borderRadius: '20px', 
      border: `1px solid rgba(197, 160, 89, 0.4)`,
      boxShadow: '0 25px 50px rgba(15, 66, 15, 0.3)',
      position: 'relative',
      overflow: 'hidden'
  };

  const innerFrame = (
      <div style={{
          position: 'absolute', top: '12px', left: '12px', right: '12px', bottom: '12px',
          border: `1px dashed rgba(197, 160, 89, 0.25)`, borderRadius: '15px', pointerEvents: 'none', zIndex: 0 
      }} />
  );

  return (
    <Fragment>
      <MetaData title={"Your Royal Cart"} />

      {/* ✨ MASTER BACKGROUND */}
      <div style={{ 
          minHeight: '100vh', 
          backgroundColor: colorCream,
          backgroundImage: `
              radial-gradient(circle at 0% 0%, rgba(197, 160, 89, 0.15) 0%, transparent 40%),
              radial-gradient(circle at 100% 100%, rgba(15, 66, 15, 0.12) 0%, transparent 40%),
              url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E")
          `,
          backgroundAttachment: 'fixed',
          paddingBottom: '60px'
      }}>
        {cartItems.length === 0 ? (
          
          /* --- EMPTY CART STATE --- */
          <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "85vh" }}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8 }} className="col-12 col-md-8 col-lg-6">
                <div className="shadow-lg p-5 text-center" style={greenCardStyle}>
                    {innerFrame}
                    <i className="fa fa-shopping-basket position-absolute" style={{ fontSize: '18rem', color: 'rgba(197, 160, 89, 0.03)', top: '-20px', right: '-20px', transform: 'rotate(15deg)', zIndex: 0 }}></i>
                    
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <motion.i 
                          initial={{ y: -10 }} 
                          animate={{ y: 0 }} 
                          transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }} 
                          className="fa fa-shopping-basket mb-4" 
                          style={{ fontSize: "5rem", color: colorGold }}
                        />
                        <h2 className="display-5 fw-bold mb-3" style={{ color: colorGold, fontFamily: fontRoyal }}>Your Cart is Empty</h2>
                        <p className="mb-5" style={{ fontFamily: fontModern, color: 'rgba(253, 251, 247, 0.8)', fontSize: '1.1rem', letterSpacing: '0.5px' }}>
                            The Gold Standard of nutrition is missing from your cart.
                        </p>
                        
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/" className="btn w-100 py-3 shadow" style={{ 
                                background: 'linear-gradient(135deg, #d4af37 0%, #c5a059 100%)', color: colorDarkGreen, border: 'none', 
                                borderRadius: '8px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: fontModern
                            }}>
                                Acquire Health Mix
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
          </div>

        ) : (
          
          /* --- FILLED CART STATE --- */
          <div className="container-fluid px-4 px-md-5 py-5">
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-5 text-center">
                <h2 className="display-4 fw-bold" style={{ color: colorGreen, fontFamily: fontRoyal, margin: 0 }}>Your Selection</h2>
                <div style={{ width: '60px', height: '3px', background: colorGold, margin: '15px auto' }}></div>
                <span className="d-block" style={{ fontSize: "0.9rem", fontFamily: fontModern, color: colorGold, letterSpacing: "3px", textTransform: "uppercase", fontWeight: '700' }}>
                    {cartItems.length} Premium Item{cartItems.length > 1 ? 's' : ''}
                </span>
            </motion.div>

            <div className="row justify-content-center g-4">
              
              {/* --- LEFT: CART ITEMS LIST --- */}
              <motion.div className="col-12 col-xl-8 col-lg-8 mb-5 mb-lg-0" variants={containerVariants} initial="hidden" animate="show">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    
                    <motion.div key={item.product} variants={itemVariants} exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }} layout className="shadow-sm mb-4" style={{...greenCardStyle, width: '100%'}}>
                      
                      {innerFrame}

                      {/* ✨ ADJUSTED: The row layout now gives the image 4 columns instead of 2 so it fits perfectly without squashing */}
                      <div className="row g-0 align-items-center p-3 p-md-4" style={{ position: 'relative', zIndex: 1 }}>
                        
                        {/* Image - Now given more space (col-md-4 instead of col-md-2) */}
                        <div className="col-12 col-md-4 text-center text-md-start mb-3 mb-md-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="img-fluid rounded shadow-sm" 
                            style={{ 
                                objectFit: "cover", 
                                width: '300px',  /* ✨ EXACT DIMENSIONS REQUESTED */
                                height: '175px', /* ✨ EXACT DIMENSIONS REQUESTED */
                                border: `2px solid ${colorGold}` 
                            }} 
                          />
                        </div>

                        {/* Details - Shifted to col-md-3 to accommodate larger image */}
                        <div className="col-12 col-md-3 text-center text-md-start ps-md-4 mb-3 mb-md-0">
                          <Link to={`/product/${item.product}`} className="text-decoration-none d-block mb-1" style={{ color: colorGold, fontFamily: fontRoyal, fontWeight: "800", fontSize: '1.4rem' }}>
                            {item.name}
                          </Link>
                          <small className="text-uppercase d-block mb-2" style={{ fontSize: "0.75rem", letterSpacing: "1.5px", color: 'rgba(253, 251, 247, 0.6)', fontWeight: '600', fontFamily: fontModern }}>Premium Pack</small>
                          <p className="mb-0 fw-bold" style={{ color: colorGold, fontSize: "1.3rem", fontFamily: fontModern }}>₹{item.price}</p>
                        </div>

                        {/* Quantity Controls - Shifted to col-md-3 */}
                        <div className="col-8 col-md-3 d-flex justify-content-center">
                          <div className="d-flex align-items-center shadow-sm" style={{ border: `1px solid rgba(197, 160, 89, 0.4)`, borderRadius: "8px", background: 'rgba(253, 251, 247, 0.05)', overflow: 'hidden' }}>
                            <motion.button whileTap={{ scale: 0.9, backgroundColor: 'rgba(197, 160, 89, 0.2)' }} className="btn px-3 py-2" onClick={() => decreaseQty(item)} style={{ color: colorGold, border: "none", borderRadius: 0, borderRight: `1px solid rgba(197, 160, 89, 0.2)` }}>
                              <i className="fa fa-minus" style={{ fontSize: '0.8rem' }}></i>
                            </motion.button>

                            <input type="number" className="text-center" value={item.quantity} readOnly style={{ width: "50px", fontWeight: "700", background: "transparent", color: colorCream, border: 'none', outline: 'none', fontFamily: fontModern }} />

                            <motion.button whileTap={{ scale: 0.9, backgroundColor: 'rgba(197, 160, 89, 0.2)' }} className="btn px-3 py-2" onClick={() => increaseQty(item)} style={{ color: colorGold, border: "none", borderRadius: 0, borderLeft: `1px solid rgba(197, 160, 89, 0.2)` }}>
                              <i className="fa fa-plus" style={{ fontSize: '0.8rem' }}></i>
                            </motion.button>
                          </div>
                        </div>

                        {/* Delete Button - Shifted to col-md-2 */}
                        <div className="col-4 col-md-2 text-end pe-md-4">
                          <motion.button whileHover={{ scale: 1.1, color: colorCream }} whileTap={{ scale: 0.9 }} onClick={() => removeItemHandler(item.product)} className="btn p-2" style={{ color: colorGold, border: "none", transition: 'all 0.3s ease' }}>
                            <i className="fa fa-trash-o fa-lg"></i>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* --- RIGHT: ORDER SUMMARY (Dark Green Card) --- */}
              <motion.div className="col-12 col-xl-3 col-lg-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <div className="p-4 p-md-5 shadow-lg" style={{ ...greenCardStyle, position: "sticky", top: "100px", width: '100%' }}>
                  {innerFrame}
                  
                  <div style={{ position: 'relative', zIndex: 1 }}>
                      <h4 className="mb-4 pb-3 text-center" style={{ fontFamily: fontRoyal, color: colorGold, fontWeight: '700', borderBottom: `1px solid rgba(197, 160, 89, 0.2)` }}>
                        Order Ledger
                      </h4>

                      <div className="d-flex justify-content-between mb-3" style={{ fontFamily: fontModern, color: colorCream, fontSize: '0.95rem' }}>
                        <span style={{ opacity: 0.8, letterSpacing: '1px' }}>Subtotal (Units)</span>
                        <span className="fw-bold" style={{ color: colorGold }}>
                          {cartItems.reduce((acc, item) => acc + Number(item.quantity), 0)}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between mb-5" style={{ fontFamily: fontModern, color: colorCream }}>
                        <span style={{ opacity: 0.8, letterSpacing: '1px', fontSize: '0.95rem' }}>Estimated Total</span>
                        <span className="h4 fw-bold" style={{ color: colorGold, margin: 0 }}>
                          ₹{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
                        </span>
                      </div>

                      <motion.button whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(197, 160, 89, 0.2)' }} whileTap={{ scale: 0.98 }} onClick={checkoutHandler} className="btn w-100 py-3 shadow" style={{ 
                          background: 'linear-gradient(135deg, #d4af37 0%, #c5a059 100%)', color: colorDarkGreen, border: 'none', borderRadius: '8px', 
                          fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: fontModern 
                      }}>
                        Secure Checkout
                      </motion.button>

                      <div className="mt-4 text-center">
                        <small style={{ fontFamily: fontModern, fontSize: "0.75rem", color: 'rgba(197, 160, 89, 0.8)', letterSpacing: '1px' }}>
                          <i className="fa fa-lock me-2"></i> Encrypted Transaction
                        </small>
                      </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}