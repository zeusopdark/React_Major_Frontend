import React, { useEffect } from 'react'
import { Outlet } from "react-router-dom"
import Header from './Header/Header'
import Footer from './Footer/Footer'
import store from '../../store'
import UserOptions from './Header/UserOptions'
import { loadUser } from '../../actions/userAction'
import { useSelector } from 'react-redux';
const Layout = () => {
    const { isAuthenticated, user } = useSelector(state => state.user);
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <>
            <Header />
            {isAuthenticated === true && <UserOptions user={user} />}
            <Outlet />
            <Footer />
        </>

    )
}

export default Layout