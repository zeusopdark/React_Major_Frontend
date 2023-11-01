import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from "@mui/material"



const ProductCard = ({ product }) => {
    const options = {
        value: product.rating,
        readOnly: true,
        precision: 0.5
    }

    return (
        <Link className="productCard" to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <Rating {...options} /> <span> ({product.numOfReviews} reviews) </span>
            </div>
            <span>{`${"\u20B9"}${product.price}`}</span>
        </Link>
    )
}

export default ProductCard