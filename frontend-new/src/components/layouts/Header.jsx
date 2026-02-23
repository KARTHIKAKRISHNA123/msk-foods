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
  <nav className="navbar" style={{ 
    display: 'flex', 
    flexWrap: 'nowrap', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: '0.5rem 1.5rem' 
  }}>
    {/* LEFT: Logo */}
    <div className="navbar-brand" style={{ flexShrink: 0 }}>
      <Link to="/">
        <img height="50px" src="/images/favicon.png" alt="MSK Stores Logo" />
      </Link>
    </div>

    {/* CENTER: Brand Name */}
    <h1 className="brand-center-text m-0">MSK FOODS</h1>

    {/* RIGHT: Avatar + Cart */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexShrink: 0 }}>
      {isAuthenticated ? (
        <Dropdown>
          <Dropdown.Toggle variant="default" id="dropdown-basic">
            <figure className="avatar avatar-nav" style={{ margin: 0 }}>
              <Image
                width="40px"
                src={user.avatar || "/images/default_avatar.png"}
                onError={(e) => { e.target.src = "/images/default_avatar.png"; }}
                roundedCircle
              />
            </figure>
            <span className="d-none d-md-inline ms-2">{user.name}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => { navigate("/myprofile"); }}>Profile</Dropdown.Item>
            <Dropdown.Item onClick={() => { navigate("/orders"); }}>Orders</Dropdown.Item>
            <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Link to="/login" className="btn" id="login_btn">Login</Link>
      )}

      <Link to="/cart" id="cart" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span>Cart</span>
        <span id="cart_count">{cartCount}</span>
      </Link>
    </div>
  </nav>
);
  
}