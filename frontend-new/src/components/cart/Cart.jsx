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

  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <Fragment>
      <MetaData title={"Your Royal Cart"} />

      <div
        style={{
          backgroundColor: "#F4E7CE",
          minHeight: "90vh",
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
        }}
      >
        {cartItems.length === 0 ? (
          <div
            className="container d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: "60vh" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* ✨ CHANGE 1: Icon color set to Royal Gold */}
              <i
                className="fa fa-shopping-basket mb-4"
                style={{ fontSize: "5rem", color: "#c5a059" }}
              ></i>
              
              <h2
                className="display-4 fw-bold mb-3"
                style={{
                  color: "#0f420f",
                  fontFamily: "Playfair Display, serif",
                }}
              >
                Your Cart is Empty
              </h2>
              
              {/* ✨ CHANGE 2: Updated text for Single Product System */}
              <p className="lead text-muted mb-4">
                The Gold Standard of nutrition is missing from your cart.
              </p>
              
              <Link
                to="/"
                className="btn btn-lg px-5 py-3 shadow-sm"
                style={{
                  backgroundColor: "#0f420f",
                  color: "#c5a059",
                  borderRadius: "0",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  fontWeight: "bold",
                }}
              >
                Order Health Mix
              </Link>
            </motion.div>
          </div>
        ) : (
          <div className="container py-5">
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-5 text-center display-5 fw-bold"
              style={{
                color: "#0f420f",
                fontFamily: "Playfair Display, serif",
              }}
            >
              Your Selection
              <span
                className="d-block mt-2"
                style={{
                  fontSize: "1rem",
                  fontFamily: "sans-serif",
                  color: "#c5a059",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                {cartItems.length} Premium Item(s)
              </span>
            </motion.h2>

            <div className="row g-5">
              {/* --- LEFT: CART ITEMS --- */}
              <motion.div
                className="col-lg-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.product}
                      variants={itemVariants}
                      exit={{
                        opacity: 0,
                        x: -100,
                        transition: { duration: 0.3 },
                      }}
                      layout
                      className="card mb-4 border-0 shadow-sm"
                      style={{
                        borderRadius: "15px",
                        overflow: "hidden",
                        backgroundColor: "#fff",
                      }}
                    >
                      <div className="row g-0 align-items-center p-3">
                        {/* Image */}
                        <div className="col-4 col-md-2 text-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid rounded"
                            style={{ maxHeight: "100px", objectFit: "contain" }}
                          />
                        </div>

                        {/* Details */}
                        <div className="col-8 col-md-4 ps-3">
                          <Link
                            to={`/product/${item.product}`}
                            className="text-decoration-none h5 d-block mb-1"
                            style={{
                              color: "#0f420f",
                              fontFamily: "Playfair Display, serif",
                              fontWeight: "bold",
                            }}
                          >
                            {item.name}
                          </Link>
                          <small
                            className="text-muted text-uppercase"
                            style={{
                              fontSize: "0.75rem",
                              letterSpacing: "1px",
                            }}
                          >
                            Premium Pack
                          </small>
                          <p
                            className="mt-2 mb-0 fw-bold"
                            style={{ color: "#c5a059", fontSize: "1.2rem" }}
                          >
                            ₹{item.price}
                          </p>
                        </div>

                        {/* Quantity */}
                        <div className="col-6 col-md-3 mt-3 mt-md-0 d-flex justify-content-center">
                          <div
                            className="stockCounter d-flex align-items-center"
                            style={{
                              border: "1px solid #c5a059",
                              borderRadius: "30px",
                              padding: "5px 10px",
                              background: "#fcfbf7",
                            }}
                          >
                            <motion.button
                              whileTap={{ scale: 0.8 }}
                              className="btn btn-sm p-0 px-2"
                              onClick={() => decreaseQty(item)}
                              style={{
                                fontSize: "1.2rem",
                                color: "#0f420f",
                                border: "none",
                              }}
                            >
                              −
                            </motion.button>

                            <input
                              type="number"
                              className="form-control count border-0 text-center p-0 mx-1"
                              value={item.quantity}
                              readOnly
                              style={{
                                width: "40px",
                                fontWeight: "bold",
                                background: "transparent",
                                color: "#0f420f",
                              }}
                            />

                            <motion.button
                              whileTap={{ scale: 0.8 }}
                              className="btn btn-sm p-0 px-2"
                              onClick={() => increaseQty(item)}
                              style={{
                                fontSize: "1.2rem",
                                color: "#0f420f",
                                border: "none",
                              }}
                            >
                              +
                            </motion.button>
                          </div>
                        </div>

                        {/* Delete Button */}
                        <div className="col-6 col-md-3 mt-3 mt-md-0 text-end pe-4">
                          <motion.button
                            whileHover={{ scale: 1.1, color: "#dc3545" }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeItemHandler(item.product)}
                            className="btn"
                            style={{ color: "#c5a059", border: "none" }}
                          >
                            <i className="fa fa-trash fa-lg"></i>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* --- RIGHT: ORDER SUMMARY (Dark Green Card) --- */}
              <motion.div
                className="col-lg-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div
                  className="p-4 shadow-lg text-white"
                  style={{
                    backgroundColor: "#0f420f",
                    borderRadius: "15px",
                    position: "sticky",
                    top: "100px",
                  }}
                >
                  <h4
                    className="mb-4 pb-3"
                    style={{
                      fontFamily: "Playfair Display, serif",
                      borderBottom: "1px solid rgba(197, 160, 89, 0.3)",
                    }}
                  >
                    Order Summary
                  </h4>

                  <div className="d-flex justify-content-between mb-3">
                    <span style={{ opacity: 0.8 }}>Subtotal (Units)</span>
                    <span className="fw-bold" style={{ color: "#c5a059" }}>
                      {cartItems.reduce(
                        (acc, item) => acc + Number(item.quantity),
                        0,
                      )}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between mb-4">
                    <span style={{ opacity: 0.8 }}>Estimated Total</span>
                    <span className="h4 fw-bold" style={{ color: "#c5a059" }}>
                      ₹
                      {cartItems
                        .reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0,
                        )
                        .toFixed(2)}
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={checkoutHandler}
                    className="btn btn-block w-100 py-3 shadow"
                    style={{
                      backgroundColor: "#c5a059",
                      color: "#0f420f",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      borderRadius: "0px",
                    }}
                  >
                    Proceed to Checkout
                  </motion.button>

                  <div className="mt-4 text-center">
                    <small style={{ opacity: 0.7, fontSize: "0.7rem", color: "#c5a059" }}>
                      <i className="fa fa-lock me-1"></i> Secure Checkout
                      Guaranteed
                    </small>
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