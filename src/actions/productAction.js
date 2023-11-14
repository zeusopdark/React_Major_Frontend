import axios from "axios"
import { ADMIN_PRODUCT_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_REVIEW_FAIL, ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS, CLEAR_ERRORS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "../constants/productConstants";

const url = "https://myprojectapi-black.vercel.app"

export const getProduct = (keyword = "", currentPage = 1, price = [0, 25000], category, rating = 0) => async (dispatch) => {
    console.log(keyword)
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST })
        let link = `${url}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`;

        if (category) {
            link = `${url}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${rating}`;
        }
        const { data } = await axios.get(link)
        dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data })

    } catch (err) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: err.response.data.message
        })
    }
}
// get all products for admin 
export const getAdminProduct = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCT_REQUEST })
        const token = localStorage.getItem("token")
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.get(`${url}/api/v1/admin/products`, config)
        dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: data.products })

    } catch (err) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: err.response.data.message
        })
    }
}

//only for nullyfying the errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`${url}/api/v1/product/${id}`)
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product })

    } catch (err) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: err.response.data.message
        })
    }
}

export const newReview = (reviewData) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token")
        const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
        dispatch({ type: NEW_REVIEW_REQUEST })
        const { data } = await axios.put(`${url}/api/v1/review`, reviewData, config)
        dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success })

    } catch (err) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: err.response.data.message
        })
    }
}
// admin newProduct creation 
export const createProduct = (productData) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token")
        const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
        dispatch({ type: NEW_PRODUCT_REQUEST })
        const { data } = await axios.post(`${url}/api/v1/admin/products/new`, productData, config)
        dispatch({ type: NEW_PRODUCT_SUCCESS, payload: data })

    } catch (err) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: err.response.data.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token")
        const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
        dispatch({ type: DELETE_PRODUCT_REQUEST });
        const { data } = await axios.delete(`${url}/api/v1/admin/products/${id}`, config)
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success })
    }
    catch (err) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: err.response.data.message
        })
    }
}

export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token")
        const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
        dispatch({ type: UPDATE_PRODUCT_REQUEST });
        const { data } = await axios.put(`${url}/api/v1/admin/products/${id}`, productData, config)
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data.success })
    }
    catch (err) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: err.response.data.message
        })
    }
}
// Get all reviews 
export const getAllReviews = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_REVIEW_REQUEST })
        const { data } = await axios.get(`${url}/api/v1/reviews?id=${id}`)
        dispatch({ type: ALL_REVIEW_SUCCESS, payload: data.reviews })

    } catch (err) {
        dispatch({
            type: ALL_REVIEW_FAIL,
            payload: err.response.data.message
        })
    }
}

//delete review
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
    const token = localStorage.getItem("token")
    const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
    try {
        dispatch({ type: DELETE_REVIEW_REQUEST });

        const { data } = await axios.delete(
            `${url}/api/v1/reviews?id=${reviewId}&productId=${productId}`,
            config
        );

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

