import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

export default function Pagination({ activePage, totalItemsCount, itemsCountPerPage, onChange }) {
    const totalPages = Math.ceil(totalItemsCount / itemsCountPerPage);
    
    // Don't show pagination if there's only 1 page
    if (totalPages <= 1) return null;

    let items = [];
    
    // Logic to show a limited range of pages (e.g., current page +/- 2)
    const startPage = Math.max(1, activePage - 2);
    const endPage = Math.min(totalPages, activePage + 2);

    for (let number = startPage; number <= endPage; number++) {
        items.push(
            <BootstrapPagination.Item 
                key={number} 
                active={number === activePage} 
                onClick={() => onChange(number)}
            >
                {number}
            </BootstrapPagination.Item>,
        );
    }

    return (
        <BootstrapPagination className="justify-content-center">
            {/* First & Prev Buttons */}
            {activePage > 1 && (
                <>
                    <BootstrapPagination.First onClick={() => onChange(1)} />
                    <BootstrapPagination.Prev onClick={() => onChange(activePage - 1)} />
                </>
            )}

            {/* Page Numbers */}
            {startPage > 1 && <BootstrapPagination.Ellipsis disabled />}
            {items}
            {endPage < totalPages && <BootstrapPagination.Ellipsis disabled />}

            {/* Next & Last Buttons */}
            {activePage < totalPages && (
                <>
                    <BootstrapPagination.Next onClick={() => onChange(activePage + 1)} />
                    <BootstrapPagination.Last onClick={() => onChange(totalPages)} />
                </>
            )}
        </BootstrapPagination>
    );
}