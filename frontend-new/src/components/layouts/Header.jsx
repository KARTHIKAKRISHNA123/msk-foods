import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, Image } from 'react-bootstrap';
// REMOVED Redux imports for now to prevent crashes
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../../actions/userActions';

export default function Header() {
    // --- DUMMY STATE FOR UI DESIGN ---
    const isAuthenticated = false; // Change to true to see logged-in view
    const user = { name: "Guest", avatar: null };
    const cartItems = []; // Empty cart for now
    const navigate = useNavigate();

    const logoutHandler = () => {
        // dispatch(logout);
        console.log("Logout clicked");
    }

    return (
        <nav className="navbar row">
            
            {/* LEFT: Logo */}
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                    <Link to="/">
                        <img width="150px" src="/images/logo.png" alt="MSK Stores Logo" />
                    </Link>
                </div>
            </div>

            {/* CENTER: Brand Name (Gold Text) */}
            {/* CENTER: MSK FOODS TEXT */}
<div className="col-12 col-md-6 mt-4 mt-md-0 d-flex justify-content-center align-items-center">
    <h1 className="brand-center-text m-0 pb-3">MSK FOODS</h1>
</div>

            {/* RIGHT: Login & Cart */}
            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center nav-actions">
                
                {isAuthenticated ? (
                    <Dropdown className='d-inline'>
                        <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
                            <figure className='avatar avatar-nav'>
                                <Image width="50px" src={user.avatar ?? './images/default_avatar.png'} />
                            </figure>
                            <span>{user.name}</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { navigate('/myprofile') }} className='text-dark'>Profile</Dropdown.Item>
                            <Dropdown.Item onClick={() => { navigate('/orders') }} className='text-dark'>Orders</Dropdown.Item>
                            <Dropdown.Item onClick={logoutHandler} className='text-danger'>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                ) : (
                    <Link to="/login" className="btn" id="login_btn">Login</Link>
                )}

                <Link to="/cart" id="cart">
                    <span id="cart" className="ml-3">Cart</span>
                    <span className="ml-1" id="cart_count">{cartItems.length}</span>
                </Link>
            </div>
        </nav>
    )
}