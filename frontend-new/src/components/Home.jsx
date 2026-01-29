import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions'; 
import MetaData from './layouts/MetaData';
import Loader from './layouts/Loader';
import Product from './product/Product'; 
import Hero from './home/Hero'; 
import { toast } from 'react-toastify';

export default function Home() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.productsState);

    // ✨ EFFECT 1: Fetch Products (Runs ONLY ONCE on mount)
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    // ✨ EFFECT 2: Handle Errors (Runs ONLY when error changes)
    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        }
    }, [error]); // 👈 This effect strictly watches for errors

    const product = products && products[0]; 

    return (
        <Fragment>
            <MetaData title={'Best Health Mix'} />

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