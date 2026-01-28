import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions'; 
import MetaData from './layouts/MetaData';
import Loader from './layouts/Loader';
import Product from './product/Product'; 
import Hero from './home/Hero'; // 👈 Import the new Hero

export default function Home() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.productsState);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    // Extract the single product
    const product = products && products[0]; 

    return (
        <Fragment>
            <MetaData title={'Best Health Mix'} />

            {loading ? (
                <Loader />
            ) : error ? (
                <div className="alert alert-danger text-center mt-5">{error}</div>
            ) : (
                product && (
                    <Fragment>
                        {/* SECTION 1: Cinematic Entrance (Full Screen) */}
                        <Hero product={product} />

                        {/* SECTION 2: Product Details (The design you liked) */}
                        <div id="product-details" style={{ background: '#fff' }}> {/* ID for scrolling */}
                            <Product product={product} />
                        </div>
                    </Fragment>
                )
            )}
        </Fragment>
    );
}