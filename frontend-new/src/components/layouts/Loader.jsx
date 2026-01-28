import React from 'react';

export default function Loader() {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <div 
                className="spinner-border" 
                role="status"
                style={{ 
                    width: '4rem', 
                    height: '4rem', 
                    color: '#c5a059', // Royal Gold Color
                    borderWidth: '5px' 
                }}
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}