import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import { FaShoppingBag, FaSearch, FaUserCircle } from 'react-icons/fa';

const content = {
    burgerColorHover: "#eb4034",
    logo,
    navColor1: "white",
    logoWidth: "20vmax",
    logoHoverSize: "10px",
    logoHoverColor: "#eb4034",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "black",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#eb4034",
    link1Margin: "1vmax",
    profileIconUrl: "/login",
    profileIconColor: "black",
    searchIconColor: "black",
    cartIconColor: "black",
    profileIconColorHover: "#eb4034",
    searchIconColorHover: "#eb4034",
    cartIconColorHover: "#eb4034",
    cartIconMargin: "1vmax",
    searchIcon: true,
    SearchIconElement: FaSearch,
    profileIcon: true,
    ProfileIconElement: FaUserCircle,
    cartIcon: true,
    CartIconElement: FaShoppingBag,
}

const Header = () => {
    return <ReactNavbar {...content} />;
};

export default Header;