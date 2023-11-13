import React, { useState } from 'react'
import "./Header.css"
import { SpeedDial, SpeedDialAction } from "@material-ui/lab"
import PersonIcon from "@material-ui/icons/Person"
import DashboardIcon from "@material-ui/icons/Dashboard"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../actions/userAction'
import { Backdrop } from '@material-ui/core'
const UserOptions = ({ user }) => {
    const { cartItems } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ShoppingCartIcon style={{ color: cartItems.length > 0 ? "tomato" : "unset" }} />, name: "Cart", func: cart },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ]

    if (user && user.role === "admin") {
        options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard }) //shift this in the first index.
    }

    function orders() {
        navigate("/orders")
    }
    function dashboard() {
        navigate("/admin/dashboard")
    }
    function account() {
        navigate("/account")
    }
    function logoutUser() {
        dispatch(logout())
        navigate("/login")
    }
    function cart() {
        navigate("/cart")
    }
    return (
        <>
            {/* what bacdrop do is when we hover over the speedial than it gives a classy look as simple as that just make sure about the zindex the one with greater z index will appear in front  */}
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                className='speedDial'
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction='down'
                style={{ zIndex: "11" }}
                icon={<img className='speedDialIcon' src={user.avatar && user.avatar.url ? user.avatar.url : "./Profile.png"} alt="Profile" />}
            >
                {options.map((item) => (
                    <SpeedDialAction
                        className="speedDialIcon"
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth <= 600 ? true : false} />
                ))}

            </SpeedDial>
        </>
    )
}

export default UserOptions