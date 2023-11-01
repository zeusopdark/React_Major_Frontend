import React from 'react'
import { Rating } from "@mui/material"
import profilePng from "../../images/Profile.png"
const ReviewCard = ({ review }) => {

    const options = {
        readOnly: true,
        value: review.rating,
        precision: 0.5
    };

    return (
        <div className="reviewCard">
            <img src={profilePng} alt="user" />
            <p>{review.name}</p>
            <Rating {...options} />
            <span>{review.comment}</span>
        </div>
    )
}

export default ReviewCard