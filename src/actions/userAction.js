import {
    LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, CLEAR_ERRORS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS
    , LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGOUT_SUCCESS, LOGOUT_FAIL,
    UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL
} from "../constants/userConstant"
import axios from "axios"

const url = "https://myprojectapi-60w2.onrender.com"
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            `${url}/api/v1/login`,
            { email, password },
            config,
            {
                withCredentials: true,
            },
        );

        // Store the token in localStorage
        localStorage.setItem("token", data.token);
        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (err) {
        dispatch({ type: LOGIN_FAIL, payload: err.response.data.message });
    }
};

export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post(
            `${url}/api/v1/register`,
            userData,
            config
        );
        localStorage.setItem("token", data.token);
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (err) {
        dispatch({ type: REGISTER_USER_FAIL, payload: err.response.data.message });
    }
};

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        const token = localStorage.getItem("token")
        const config = {
            headers: {
                "Content-type": "applicaction/json",
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.get(
            `${url}/api/v1/me`,
            config
        );
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (err) {
        dispatch({ type: LOAD_USER_FAIL, payload: err.response.data.message });
    }
}
//Logout

export const logout = () => async (dispatch) => {
    try {

        localStorage.removeItem("token")
        await axios.get(`${url}/api/v1/logout`)
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (err) {
        dispatch({ type: LOGOUT_FAIL, payload: err.response.data.message });
    }
}


export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        const token = localStorage.getItem("token")
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        };
        const { data } = await axios.put(
            `${url}/api/v1/me/update`,
            userData,
            config
        );
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (err) {
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: err.response.data.message });
    }
};

//Update password
export const updatePassword = (password) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });
        const token = localStorage.getItem("token")
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };
        const { data } = await axios.put(
            `${url}/api/v1/password/update`,
            password,
            config
        );
        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    } catch (err) {
        dispatch({ type: UPDATE_PASSWORD_FAIL, payload: err.response.data.message });
    }
};
//Forgot Passowrd

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            `${url}/api/v1/password/forgot`,
            email,
            config,
        );
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    } catch (err) {
        dispatch({ type: FORGOT_PASSWORD_FAIL, payload: err.response.data.message });
    }
}

//Reset Password
export const resetPassword = (token, password) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(
            `${url}/api/v1/password/reset/${token}`,
            password,
            config,
        );
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
    } catch (err) {
        dispatch({ type: RESET_PASSWORD_FAIL, payload: err.response.data.message });
    }
}

//get all users
export const getAllUsers = () => async (dispatch) => {
    const token = localStorage.getItem("token")
    try {
        const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
        dispatch({ type: ALL_USERS_REQUEST })
        const { data } = await axios.get(`${url}/api/v1/admin/users`, config)
        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users })
    } catch (err) {
        dispatch({ type: ALL_USERS_FAIL, payload: err.response.data.message })
    }
}

export const getUserDetails = (id) => async (dispatch) => {
    const token = localStorage.getItem("token")
    const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
    try {
        dispatch({ type: USER_DETAILS_REQUEST });
        const { data } = await axios.get(`${url}/api/v1/admin/user/${id}`, config);

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
    }
};


export const updateUser = (id, userData) => async (dispatch) => {
    const token = localStorage.getItem("token")
    const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }

    try {
        dispatch({ type: UPDATE_USER_REQUEST });
        const { data } = await axios.put(
            `${url}/api/v1/admin/user/${id}`,
            userData,
            config
        );

        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const deleteUser = (id) => async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
        const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
        dispatch({ type: DELETE_USER_REQUEST })
        const { data } = await axios.delete(`${url}/api/v1/admin/user/${id}`, config)
        dispatch({ type: DELETE_USER_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: DELETE_USER_FAIL, payload: err.response.data.message })
    }
}


//only for nullyfying the errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}