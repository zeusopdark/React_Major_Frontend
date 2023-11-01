import React from 'react'
import "./CartItemCard.css"
import { Link } from "react-router-dom"
const CartItemCard = ({ item, deleteItem }) => {
    return (
        <div className="CartItemCard">
            <img src={item.image} alt="something" />
            <div>
                <Link to={`/product/${item.product}`}>{item.name} </Link>
                <span>{`Price: Rs${item.price}`}</span>
                <p onClick={() => deleteItem(item.product)}>Remove</p>
            </div>
        </div>
    )
}

export default CartItemCard