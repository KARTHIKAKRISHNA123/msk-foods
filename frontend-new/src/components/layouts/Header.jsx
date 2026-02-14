import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";

export default function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { items: cartItems } = useSelector((state) => state.cartState);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
  };

  // ✨ FIX: Calculate total quantity instead of array length
  // This takes the accumulator (acc) and adds the current item's quantity to it, starting at 0.
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
            <img
              width="150px"
              src="/images/favicon.png"
              alt="MSK Stores Logo"
            />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-4 mt-md-0 d-flex justify-content-center align-items-center">
        <h1 className="brand-center-text m-0 pb-3">MSK FOODS</h1>
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center nav-actions">
        {isAuthenticated ? (
          <Dropdown className="d-inline">
            <Dropdown.Toggle variant="default pr-5" id="dropdown-basic">
              <figure className="avatar avatar-nav">
                <Image
                  width="50px"
                  src={user.avatar || "/images/default_avatar.png"}
                  onError={(e) => {
                    e.target.src = "/images/default_avatar.png";
                  }}
                  roundedCircle
                />
              </figure>
              <span>{user.name}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => { navigate("/myprofile"); }}>
                Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={() => { navigate("/orders"); }}>
                Orders
              </Dropdown.Item>
              <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Link to="/login" className="btn" id="login_btn">
            Login
          </Link>
        )}

        <Link to="/cart" id="cart">
          <span id="cart" className="ml-3">
            Cart
          </span>
          <span className="ml-1" id="cart_count">
            {/* ✨ FIX: Use the calculated total quantity */}
            {cartCount}
          </span>
        </Link>
      </div>
    </nav>
  );
}