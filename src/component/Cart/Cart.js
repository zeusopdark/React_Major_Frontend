import React from 'react'
import "./Cart.css"
import CartItemCard from "./CartItemCard"
import { useSelector, useDispatch } from "react-redux"
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction"
import { Link } from 'react-router-dom'
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart"
import { Typography } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import MetaData from '../Layout/MetaData'
const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newquantity = quantity + 1;
        if (quantity >= stock) return;
        dispatch(addItemsToCart(id, newquantity))
    }
    const decreaseQuantity = (id, quantity) => {
        const newquantity = quantity - 1;
        if (quantity <= 1) return;
        dispatch(addItemsToCart(id, newquantity))
    }
    const deleteItem = (id) => {
        dispatch(removeItemsFromCart(id));
    }
    const checkOutHandler = () => {
        navigate("/login?redirect=shipping");
    }

    return (
        <>
            <MetaData title={"Cart"} />
            {cartItems.length === 0 ? (
                <div className="emptyCart">
                    <RemoveShoppingCartIcon />
                    <Typography>No product in your Cart</Typography>
                    <Link to="/products">View Products</Link>
                </div>
            ) :
                (
                    <>
                        <div className="cartPage">
                            <div className="cartHeader">
                                <p>Product</p>
                                <p>Quantity</p>
                                <p>Subtotal</p>
                            </div>
                            {cartItems && cartItems.map((item) => (
                                <div key={item.product} className="cartContainer">
                                    <CartItemCard item={item} deleteItem={deleteItem} />
                                    <div className="cartInput">
                                        <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                                        <input type="number" value={item.quantity} readOnly />
                                        <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                                    </div>
                                    <p className="cartSubtotal">{`Rs ${item.price * item.quantity}`}</p>
                                </div>
                            ))}

                            <div className="cartGrossProfit">
                                <div></div>
                                <div className="cartGrossProfitBox">
                                    <p>Gross Total</p>
                                    <p>{`Rs${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}`}</p>
                                </div>
                                <div></div>
                                <div className="checkOutBtn">
                                    <button onClick={checkOutHandler}>Check Out</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Cart