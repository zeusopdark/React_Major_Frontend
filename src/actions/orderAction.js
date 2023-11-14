import {
    ALL_ORDERS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS,
    MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS,
    ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS
} from "../constants/orderConstant";
import axios from "axios";

export const createOrder = (order) => async (dispatch) => {
    const url = "https://myprojectapi-black.vercel.app"
    const token = localStorage.getItem("token")
    try {
        dispatch({ type: CREATE_ORDER_REQUEST })
        const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
        const { data } = await axios.post(`${url}/api/v1/order/new`, order, config);
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.order })
    } catch (err) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: err.response.data.message
        })
    }
}

export const myOrders = () => async (dispatch) => {
    const url = "https://myprojectapi-black.vercel.app"
    const token = localStorage.getItem("token")
    try {
        dispatch({ type: MY_ORDERS_REQUEST })
        const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
        const { data } = await axios.get(`${url}/api/v1/orders/me`, config);
        dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders })
    } catch (err) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: err.response.data.message
        })
    }
}

export const getOrderDetails = (id) => async (dispatch) => {
    const url = "https://myprojectapi-black.vercel.app"
    const token = localStorage.getItem("token")
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST })
        const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
        const { data } = await axios.get(`${url}/api/v1/order/${id}`, config);
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order })
    } catch (err) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: err.response.data.message
        })
    }
}
//Get all orders admin 
export const getAllOrders = () => async (dispatch) => {
    const url = "https://myprojectapi-black.vercel.app"
    const token = localStorage.getItem("token")
    try {
        dispatch({ type: ALL_ORDERS_REQUEST })
        const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
        const { data } = await axios.get(`${url}/api/v1/admin/orders`, config);
        dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders })
    } catch (err) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: err.response.data.message
        })
    }
}

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {
    const url = "https://myprojectapi-black.vercel.app"

    const token = localStorage.getItem("token")
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        };
        const { data } = await axios.put(
            `${url}/api/v1/admin/order/${id}`,
            order,
            config
        );

        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
    const url = "https://myprojectapi-black.vercel.app"

    const token = localStorage.getItem("token")
    try {
        const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
        dispatch({ type: DELETE_ORDER_REQUEST });

        const { data } = await axios.delete(`${url}/api/v1/admin/order/${id}`, config);

        dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};