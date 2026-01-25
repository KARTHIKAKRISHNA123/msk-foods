import React from 'react';

export default function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-1">
            <p className='text-center  mt-1'>
                Online Retail Inventory And Sales Management System for MSK Stores - 2025-{currentYear}, &copy; All Rights Reserved. 
            </p>
        </footer>
    )

}