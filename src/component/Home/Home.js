import React, { Fragment, useEffect } from 'react'
import { CgMouse } from "react-icons/cg";
import "./Home.css"
import MetaData from '../Layout/MetaData';
import { getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from "react-redux"
import Loader from '../Layout/Loader/Loader';
import ProductCard from './ProductCard';

const Home = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products)
    // console.log(products);
    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch])

    return (
        <>
            {loading ? <Loader /> : error ? "Error" : (
                <Fragment>
                    <MetaData title="Ecommerce" />
                    <div className="banner">
                        <p>Welcome to Ecommerce</p>
                        <h1>Find Amazing Products Below</h1>

                        <a href="#container">
                            <button>
                                Scroll<CgMouse />
                            </button>
                        </a>
                    </div>

                    <h2 className="homeHeading">Featured Products</h2>

                    <div className="container" id="container">
                        {products && products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </Fragment>)
            }
        </>
    )
}

export default Home