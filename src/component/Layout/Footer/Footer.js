import React from 'react'
import playStore from "../../../images/playstore.png"
import appStore from "../../../images/Appstore.png"
import "./Footer.css"
const Footer = () => {
    return (
        <footer id="footer">

            <div className="leftFooter">
                <h4>Download our App</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt="playStore" />
                <img src={appStore} alt="appStore" />
            </div>

            <div className="midFooter">
                <h1>ECOMMERCE</h1>
                <p>High Quality is our first priority</p>
                <p>Copyrights 2023 &copy; Ankit Nishad</p>
            </div>

            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="https://www.facebook.com/">FaceBook</a>
                <a href="https://www.instagram.com/">Instagram</a>
                <a href="https://www.linkedin.com/">LinkedIn</a>
            </div>

        </footer>
    )
}

export default Footer