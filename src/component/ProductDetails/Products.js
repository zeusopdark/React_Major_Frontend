import React, { useEffect, useState } from 'react'
import "./Products.css"
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../Layout/Loader/Loader'
import { clearErrors, getProduct } from '../../actions/productAction'
import ProductCard from '../Home/ProductCard'
import { useParams } from 'react-router-dom'
import Pagination from "react-js-pagination"
import { Slider } from "@material-ui/core/"
import { Typography } from '@material-ui/core'
import MetaData from "../Layout/MetaData"
const categories = [
    "Kurta",
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
    "Jeans"
]

const Products = () => {
    const dispatch = useDispatch()
    const { products, loading, error, filteredProductsCount, productsCount, resultPerPage } = useSelector(state => state.products)
    const [category, setCategory] = useState("");
    const { keyword } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [ratings, setRatings] = useState(0);
    useEffect(() => {
        console.log(category)
        dispatch(getProduct(keyword, currentPage, price, category, ratings));
    }, [dispatch, keyword, currentPage, price, ratings, category])

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
    }

    let count = filteredProductsCount

    return (

        <>
            {loading ? <Loader /> : error ? error : (
                <>
                    <MetaData title="Products" />
                    <h2 className="productsHeading">
                        Products
                    </h2>
                    <div className="products">
                        {products && products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>

                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={25000} />

                        <Typography>  Categories</Typography>
                        <ul className="categoryBox">
                            {categories.map((category) => (
                                <li className="category-link" key={category} onClick={() => setCategory(category)}>
                                    {category}
                                </li>
                            ))}
                        </ul>
                        <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider
                                value={ratings}
                                onChange={(e, newRating) => {
                                    setRatings(newRating);
                                }}
                                aria-labelledby="continuous-slider"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </div>

                    {resultPerPage < count && (
                        <div className='paginationBox'>
                            <Pagination activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />

                        </div>
                    )}
                </>
            )
            }
        </>
    )
}

export default Products;