import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  orderDetails as fetchOrderDetails,
  clearOrderError,
} from "../../slices/orderSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";

export default function OrderDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { orderDetails, loading, error } = useSelector(
    (state) => state.orderState,
  );

  const {
    shippingInfo = {},
    user = {},
    paymentInfo = {},
    orderItems = [],
    totalPrice,
    orderStatus,
    createdAt,
  } = orderDetails || {};

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", theme: "colored" });
      dispatch(clearOrderError());
    }
    dispatch(fetchOrderDetails(id));
  }, [dispatch, error, id]);

  // Cleaned up address to avoid 'undefined' if data is missing
  const shippingAddress = [
    shippingInfo.address,
    shippingInfo.city,
    shippingInfo.state,
    shippingInfo.postalCode,
    shippingInfo.country,
  ]
    .filter(Boolean)
    .join(", ");

  const isPaid = paymentInfo && paymentInfo.status === "succeeded";

  // ✨ STRICT UNIFORM THEME (Equal Green & Gold, Only Playfair)
  const fontRoyal = "'Playfair Display', serif";
  const colorGreen = "#0f420f";
  const colorGold = "#c5a059";

  // Elegant, decompressed row styling
  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "20px 0",
    borderBottom: `1px solid rgba(197, 160, 89, 0.2)`,
  };

  const labelStyle = {
    color: colorGold,
    fontSize: "1rem",
    letterSpacing: "1px",
    fontWeight: "600",
    fontFamily: fontRoyal,
  };

  const valueStyle = {
    color: colorGreen,
    fontFamily: fontRoyal,
    fontWeight: "700",
    fontSize: "1.1rem",
    textAlign: "right",
    lineHeight: "1.6",
    maxWidth: "65%",
  };

  // ✨ FRAMER MOTION VARIANTS
  const fadeUp = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const listContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  return (
    <Fragment>
      <MetaData title={`Order Summary`} />

      <div
        className="row wrapper justify-content-center align-items-center m-0"
        style={{
          minHeight: "85vh",
          background: "#fdfbf7",
          backgroundImage: `
                        radial-gradient(circle at 50% 10%, rgba(197, 160, 89, 0.1) 0%, transparent 50%),
                        linear-gradient(180deg, #fdfbf7 0%, #f4ebd0 100%)
                    `,
          padding: "60px 20px",
        }}
      >
        {loading ? (
          <Loader />
        ) : (
          <div className="col-11 col-md-8 col-lg-6 col-xl-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="shadow-lg"
              style={{
                background: "#ffffff",
                borderRadius: "15px",
                borderTop: `6px solid ${colorGold}`,
                boxShadow: "0 30px 60px rgba(15, 66, 15, 0.08)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Ceremonial Inner Frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                style={{
                  position: "absolute",
                  top: "15px",
                  left: "15px",
                  right: "15px",
                  bottom: "15px",
                  border: `1px solid rgba(197, 160, 89, 0.2)`,
                  pointerEvents: "none",
                  zIndex: 0,
                  borderRadius: "15px",
                }}
              />

              <div
                className="p-4 p-md-5"
                style={{ position: "relative", zIndex: 1 }}
              >
                {/* HEADER */}
                <div className="text-center mb-5 position-relative">
                  <Link
                    to="/orders"
                    className="position-absolute start-0 top-0 mt-2"
                    style={{
                      color: colorGold,
                      textDecoration: "none",
                      fontSize: "1.2rem",
                      transition: "0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.color = colorGreen)}
                    onMouseOut={(e) => (e.target.style.color = colorGold)}
                  >
                    <i className="fa fa-arrow-left"></i>
                  </Link>

                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-2"
                    style={{
                      fontFamily: fontRoyal,
                      color: colorGreen,
                      fontWeight: "700",
                      fontSize: "2rem",
                    }}
                  >
                    Order Details
                  </motion.h1>

                  <div
                    style={{
                      width: "50px",
                      height: "2px",
                      background: colorGold,
                      margin: "15px auto",
                      opacity: 0.7,
                    }}
                  ></div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    style={{
                      fontFamily: fontRoyal,
                      color: colorGold,
                      fontSize: "0.85rem",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                    }}
                  >
                    Ref: {orderDetails?._id}
                  </motion.p>
                </div>

                {/* ELEGANT DATA ROWS */}
                <motion.div
                  variants={listContainer}
                  initial="hidden"
                  animate="show"
                  className="mb-5 px-md-3"
                >
                  <motion.div variants={fadeUp} style={rowStyle}>
                    <span style={labelStyle}>Date</span>
                    <span style={valueStyle}>
                      {createdAt
                        ? new Date(createdAt).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : ""}
                    </span>
                  </motion.div>

                  <motion.div variants={fadeUp} style={rowStyle}>
                    <span style={labelStyle}>Status</span>
                    <span style={{ ...valueStyle, color: colorGreen }}>
                      {orderStatus}
                    </span>
                  </motion.div>

                  <motion.div variants={fadeUp} style={rowStyle}>
                    <span style={labelStyle}>Client</span>
                    <span style={valueStyle}>{user?.name}</span>
                  </motion.div>

                  <motion.div variants={fadeUp} style={rowStyle}>
                    <span style={labelStyle}>Destination</span>
                    <span style={valueStyle}>{shippingAddress}</span>
                  </motion.div>

                  <motion.div
                    variants={fadeUp}
                    style={{ ...rowStyle, borderBottom: "none" }}
                  >
                    <span style={labelStyle}>Payment</span>
                    <span
                      style={{
                        ...valueStyle,
                        color: isPaid ? colorGreen : colorGold,
                      }}
                    >
                      {isPaid ? "PAID" : "NOT PAID"}
                    </span>
                  </motion.div>
                </motion.div>

                {/* ROYAL SELECTION (STACKED ITEM CARDS) */}
                <div className="text-center mt-5 mb-4">
                  <h3
                    style={{
                      fontFamily: fontRoyal,
                      color: colorGold,
                      fontWeight: "700",
                      fontSize: "1.4rem",
                    }}
                  >
                    Royal Selection
                  </h3>
                </div>

                <motion.div
                  variants={listContainer}
                  initial="hidden"
                  animate="show"
                  className="px-md-2"
                >
                  {orderItems &&
                    orderItems.map((item) => (
                      <motion.div
                        variants={fadeUp}
                        key={item.product}
                        className="d-flex flex-column align-items-center mb-4 p-4 shadow-sm"
                        style={{
                          background: "rgba(197, 160, 89, 0.05)",
                          borderRadius: "10px",
                          border: `1px solid rgba(197, 160, 89, 0.2)`,
                        }}
                      >
                        {/* ✨ FIX: Image on Top - Beautiful and Uncompressed */}
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "100%",
                            maxWidth: "240px",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            border: `1px solid rgba(197,160,89,0.5)`,
                            marginBottom: "15px",
                            boxShadow: "0 4px 10px rgba(15,66,15,0.1)",
                          }}
                        />

                        {/* ✨ FIX: Details Below - Perfectly Spaced */}
                        <div
                          className="w-100 d-flex justify-content-between align-items-end pt-3"
                          style={{
                            borderTop: "1px dashed rgba(197, 160, 89, 0.3)",
                          }}
                        >
                          <div
                            className="d-flex flex-column pe-2"
                            style={{ minWidth: 0 }}
                          >
                            <Link
                              to={`/product/${item.product}`}
                              style={{
                                textDecoration: "none",
                                color: colorGreen,
                                fontFamily: fontRoyal,
                                fontWeight: "700",
                                fontSize: "1.15rem",
                                wordWrap: "break-word",
                                transition: "0.2s",
                              }}
                              onMouseOver={(e) =>
                                (e.target.style.color = colorGold)
                              }
                              onMouseOut={(e) =>
                                (e.target.style.color = colorGreen)
                              }
                            >
                              {item.name}
                            </Link>
                            <span
                              style={{
                                fontFamily: fontRoyal,
                                color: colorGold,
                                fontSize: "0.95rem",
                                marginTop: "4px",
                              }}
                            >
                              {item.quantity} x ₹{item.price}
                            </span>
                          </div>

                          <div
                            style={{
                              fontFamily: fontRoyal,
                              color: colorGreen,
                              fontWeight: "900",
                              fontSize: "1.3rem",
                              flexShrink: 0,
                            }}
                          >
                            ₹{item.price * item.quantity}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </motion.div>

                {/* GRAND TOTAL */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="d-flex justify-content-between align-items-center mt-4 pt-4 px-md-3"
                  style={{ borderTop: `2px solid ${colorGold}` }}
                >
                  <span
                    style={{
                      fontFamily: fontRoyal,
                      color: colorGreen,
                      fontWeight: "700",
                      fontSize: "1.2rem",
                    }}
                  >
                    Total Amount
                  </span>
                  <span
                    style={{
                      fontFamily: fontRoyal,
                      color: colorGold,
                      fontWeight: "900",
                      fontSize: "1.8rem",
                    }}
                  >
                    ₹{totalPrice}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </Fragment>
  );
}
