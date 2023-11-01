import React, { useRef, useEffect } from 'react'
import CheckoutStep from './CheckoutStep'
import { useSelector, useDispatch } from 'react-redux'
import MetaData from '../Layout/MetaData'
import { Typography } from '@material-ui/core'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from 'axios'
import "./Payment.css"
import CreditCardIcon from "@material-ui/icons/CreditCard"
import EventIcon from "@material-ui/icons/Event"
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../../actions/orderAction'

const Payment = () => {
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements()
    const navigate = useNavigate();
    const payBtn = useRef(null);
    const { shippingInfo, cartItems } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.user)
    const { error } = useSelector(state => state.newOrder)
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }
    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;
        try {
            const url = "http://localhost:3500"
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axios.post(`${url}/api/v1/payment/process`, paymentData, config)
            const client_secret = data.client_secret;

            if (!stripe || !elements) {
                return
            }
            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },

            })
            if (result.error) {
                payBtn.current.disabled = false;
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    }
                    dispatch(createOrder(order));
                    navigate("/success")
                }
                else {
                    console.log("There's is some issue in processing the payment")
                }
            }
        } catch (err) {
            payBtn.current.disabled = false;
            console.log(err.response.data.message)
        }
    }
    useEffect(() => {
        if (error) {
            console.log("There is an error", error);
        }
    }, [error])

    return (
        <>
            <MetaData title={"Payment"} />
            <CheckoutStep activeStep={2} />
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCardIcon />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <EventIcon />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <VpnKeyIcon />
                        <CardCvcElement className="paymentInput" />
                    </div>

                    <input
                        type="submit"
                        value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </>
    )
}

export default Payment