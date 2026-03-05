import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar"; 
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../slices/productsSlice";

export default function Dashboard() {
  // --- THEME VARIABLES ---
  const fontRoyal = "'Playfair Display', serif";
  const fontModern = "'Montserrat', sans-serif";
  const colorGreen = "#0f420f";
  const colorGold = "#c5a059";

  // --- REDUX STATE & FETCHING ---
  const { products = [] } = useSelector((state) => state.productsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  // --- DYNAMIC TRACKING LOGIC ---
  // ✨ FIX: This dynamically counts out-of-stock items based on your database!
  let outOfStockCount = 0;
  products.forEach((product) => {
    if (product.stock === 0) {
      outOfStockCount += 1;
    }
  });

  // --- PLACEHOLDER DATA (Orders & Revenue) ---
  const totalAmount = 125500; // Example Revenue
  const ordersCount = 42; // Total orders

  // --- ANIMATIONS ---
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  return (
    <Fragment>
      <MetaData title="Executive Overview" />

      <div
        className="row m-0"
        style={{ minHeight: "100vh", background: "#fdfbf7" }}
      >
        {/* SIDEBAR AREA (Col-2) */}
        <div
          className="col-12 col-md-2 p-0"
          style={{ borderRight: `1px solid rgba(197, 160, 89, 0.2)` }}
        >
          <Sidebar />
        </div>

        {/* MAIN DASHBOARD CONTENT (Col-10) */}
        <div
          className="col-12 col-md-10 py-5 px-4 px-md-5"
          style={{
            backgroundImage: `radial-gradient(circle at 80% 10%, rgba(197, 160, 89, 0.05) 0%, transparent 40%)`,
          }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-5"
          >
            <h1
              style={{
                fontFamily: fontRoyal,
                color: colorGreen,
                fontWeight: "700",
                fontSize: "2.5rem",
              }}
            >
              Executive Overview
            </h1>
            <div
              style={{
                width: "60px",
                height: "3px",
                background: colorGold,
                marginTop: "10px",
              }}
            ></div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {/* REVENUE CARD (Full Width) */}
            <div className="row mb-4">
              <motion.div variants={fadeUp} className="col-xl-12 col-sm-12">
                <div
                  className="p-4 p-md-5 shadow-sm"
                  style={{
                    background: colorGreen,
                    borderRadius: "15px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Decorative background element */}
                  <i
                    className="fa fa-rupee position-absolute"
                    style={{
                      fontSize: "10rem",
                      color: "rgba(253, 251, 247, 0.05)",
                      right: "-20px",
                      bottom: "-20px",
                      transform: "rotate(-15deg)",
                    }}
                  ></i>

                  <div style={{ position: "relative", zIndex: 1 }}>
                    <p
                      className="text-uppercase mb-1"
                      style={{
                        fontFamily: fontModern,
                        color: colorGold,
                        letterSpacing: "2px",
                        fontWeight: "600",
                        fontSize: "0.9rem",
                      }}
                    >
                      Total Honored Revenue
                    </p>
                    <h2
                      className="mb-0"
                      style={{
                        fontFamily: fontRoyal,
                        color: "#fdfbf7",
                        fontSize: "3rem",
                        fontWeight: "bold",
                      }}
                    >
                      ₹{totalAmount.toLocaleString("en-IN")}
                    </h2>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* METRIC CARDS (3 Columns) */}
            <div className="row g-4">
              {/* Products Card */}
              <motion.div variants={fadeUp} className="col-xl-4 col-sm-6">
                <div
                  className="p-4 h-100 shadow-sm d-flex flex-column justify-content-between"
                  style={{
                    background: "#fff",
                    borderRadius: "15px",
                    border: `1px solid rgba(197, 160, 89, 0.2)`,
                    borderTop: `5px solid ${colorGold}`,
                  }}
                >
                  <div>
                    <p
                      className="text-uppercase mb-2"
                      style={{
                        fontFamily: fontModern,
                        color: "rgba(15, 66, 15, 0.7)",
                        letterSpacing: "1px",
                        fontWeight: "600",
                        fontSize: "0.85rem",
                      }}
                    >
                      Products in Inventory
                    </p>
                    <h3
                      style={{
                        fontFamily: fontRoyal,
                        color: colorGreen,
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      {/* ✨ FIX: Shows actual total products dynamically */}
                      {products.length}
                    </h3>
                  </div>
                  <Link
                    to="/admin/products"
                    className="text-decoration-none mt-4"
                    style={{
                      fontFamily: fontModern,
                      color: colorGold,
                      fontWeight: "700",
                      fontSize: "0.9rem",
                    }}
                  >
                    View Inventory <i className="fa fa-arrow-right ms-1"></i>
                  </Link>
                </div>
              </motion.div>

              {/* Orders Card */}
              <motion.div variants={fadeUp} className="col-xl-4 col-sm-6">
                <div
                  className="p-4 h-100 shadow-sm d-flex flex-column justify-content-between"
                  style={{
                    background: "#fff",
                    borderRadius: "15px",
                    border: `1px solid rgba(197, 160, 89, 0.2)`,
                    borderTop: `5px solid ${colorGold}`,
                  }}
                >
                  <div>
                    <p
                      className="text-uppercase mb-2"
                      style={{
                        fontFamily: fontModern,
                        color: "rgba(15, 66, 15, 0.7)",
                        letterSpacing: "1px",
                        fontWeight: "600",
                        fontSize: "0.85rem",
                      }}
                    >
                      Total Orders
                    </p>
                    <h3
                      style={{
                        fontFamily: fontRoyal,
                        color: colorGreen,
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      {ordersCount}
                    </h3>
                  </div>
                  <Link
                    to="/admin/orders"
                    className="text-decoration-none mt-4"
                    style={{
                      fontFamily: fontModern,
                      color: colorGold,
                      fontWeight: "700",
                      fontSize: "0.9rem",
                    }}
                  >
                    Manage Orders <i className="fa fa-arrow-right ms-1"></i>
                  </Link>
                </div>
              </motion.div>

              {/* Out of Stock Card */}
              <motion.div variants={fadeUp} className="col-xl-4 col-sm-6">
                <div
                  className="p-4 h-100 shadow-sm d-flex flex-column justify-content-between"
                  style={{
                    background: "#fff",
                    borderRadius: "15px",
                    border: `1px solid rgba(197, 160, 89, 0.2)`,
                    borderTop: `5px solid ${outOfStockCount > 0 ? "#d9534f" : colorGold}`,
                  }}
                >
                  <div>
                    <p
                      className="text-uppercase mb-2"
                      style={{
                        fontFamily: fontModern,
                        color: "rgba(15, 66, 15, 0.7)",
                        letterSpacing: "1px",
                        fontWeight: "600",
                        fontSize: "0.85rem",
                      }}
                    >
                      Out of Stock Alerts
                    </p>
                    <h3
                      style={{
                        fontFamily: fontRoyal,
                        color: outOfStockCount > 0 ? "#d9534f" : colorGreen,
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      {outOfStockCount}
                    </h3>
                  </div>
                  {/* Status Indicator */}
                  <div
                    className="mt-4"
                    style={{
                      fontFamily: fontModern,
                      color: outOfStockCount > 0 ? "#d9534f" : colorGold,
                      fontWeight: "600",
                      fontSize: "0.85rem",
                    }}
                  >
                    {outOfStockCount > 0
                      ? "Action Required"
                      : "Inventory Healthy"}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </Fragment>
  );
}