import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MetaData from '../layouts/MetaData';
import Loader from '../layouts/Loader';

export default function Profile() {
    const { user, loading } = useSelector(state => state.authState);

    if (loading) return <Loader />;

    return (
        <div style={{ backgroundColor: '#fdfbf7', minHeight: '80vh', padding: '40px 0' }}>
            <MetaData title={'My Profile'} />

            <div className="container">
                <div className="row justify-content-center">
                    
                    {/* LEFT SIDE - AVATAR CARD */}
                    <div className="col-12 col-md-4 mb-5">
                        <div className="card shadow-lg" style={{ border: 'none', borderTop: '5px solid #c5a059' }}>
                            <div className="card-body text-center p-5">
                                <figure className='avatar avatar-profile mb-4'>
                                    <img 
                                        className="rounded-circle img-fluid" 
                                        src={user.avatar || '/images/default_avatar.png'} 
                                        onError={(e) => {e.target.src = '/images/default_avatar.png'}}
                                        alt={user.name}
                                        style={{ 
                                            width: '180px', 
                                            height: '180px', 
                                            objectFit: 'cover', 
                                            border: '4px solid #c5a059', 
                                            padding: '4px' 
                                        }}
                                    />
                                </figure>
                                
                                <Link 
                                    to="/myprofile/update" 
                                    className="btn btn-block my-3 w-100"
                                    style={{ 
                                        backgroundColor: '#c5a059', 
                                        color: '#fff', 
                                        fontWeight: 'bold', 
                                        border: 'none',
                                        padding: '12px',
                                        boxShadow: '0 4px 6px rgba(197, 160, 89, 0.3)' // Added subtle shadow for depth
                                    }}
                                >
                                    Edit Profile
                                </Link>
                            </div>
                        </div>
                    </div>
            
                    {/* RIGHT SIDE - DETAILS */}
                    <div className="col-12 col-md-6">
                        <div className="p-4" style={{ backgroundColor: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', borderLeft: '1px solid #c5a059' }}>
                            
                            <h2 className='mb-4' style={{ color: '#0f420f', fontFamily: 'Playfair Display, serif' }}>
                                My Profile
                            </h2>

                            <div className="mb-4">
                                <h5 style={{ color: '#c5a059', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px', fontWeight: 'bold' }}>
                                    Full Name
                                </h5>
                                <p style={{ fontSize: '1.2rem', color: '#333' }}>{user.name}</p>
                            </div>
            
                            <div className="mb-4">
                                <h5 style={{ color: '#c5a059', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px', fontWeight: 'bold' }}>
                                    Email Address
                                </h5>
                                <p style={{ fontSize: '1.2rem', color: '#333' }}>{user.email}</p>
                            </div>
            
                            <div className="mb-4">
                                <h5 style={{ color: '#c5a059', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px', fontWeight: 'bold' }}>
                                    Joined On
                                </h5>
                                <p style={{ fontSize: '1.2rem', color: '#333' }}>
                                    {String(user.createdAt).substring(0, 10)}
                                </p>
                            </div>

                            {/* BUTTONS AREA */}
                            <div className="mt-5 d-flex gap-3">
                                <Link 
                                    to="/orders" 
                                    className="btn flex-grow-1"
                                    style={{ 
                                        backgroundColor: '#0f420f',  // Dark Green
                                        color: '#fff', 
                                        padding: '12px',
                                        fontWeight: 'bold', // Consistent Bold
                                        border: 'none',     // No Border
                                        boxShadow: '0 4px 6px rgba(15, 66, 15, 0.3)'
                                    }}
                                >
                                    My Orders
                                </Link>

                                <Link 
                                    to="/myprofile/update/password" 
                                    className="btn flex-grow-1"
                                    style={{ 
                                        backgroundColor: '#c5a059', // Gold (Matches Edit Profile)
                                        color: '#fff', 
                                        padding: '12px',
                                        fontWeight: 'bold', // Consistent Bold
                                        border: 'none',     // No Border
                                        boxShadow: '0 4px 6px rgba(197, 160, 89, 0.3)'
                                    }}
                                >
                                    Change Password
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}