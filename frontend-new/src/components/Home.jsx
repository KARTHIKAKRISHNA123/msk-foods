import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../slices/productsSlice';
import MetaData from './layouts/MetaData';
import Loader from './layouts/Loader';
import Product from './product/Product';
import Hero from './home/Hero';
import { toast } from 'react-toastify';

export default function Home() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(
        (state) => state.productsState
    );

    // Fetch product (single product architecture)
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    // Handle errors
    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'colored',
            });
        }
    }, [error]);

    // Single product
    const product = products && products[0];

    return (
        <Fragment>
            <MetaData title="Best Health Mix" />

            {loading ? (
                <Loader />
            ) : (
                product && (
                    <Fragment>
                        <Hero product={product} />
                        <div id="product-details" style={{ background: '#fff' }}>
                            <Product product={product} />
                        </div>
                    </Fragment>
                )
            )}
        </Fragment>
    );
}
