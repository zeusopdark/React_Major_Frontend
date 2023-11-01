import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Search.css"
import MetaData from '../Layout/MetaData';
const Search = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`)
        } else {
            navigate("/products")
        }
    }
    return (
        <>
            <MetaData title="Search A Product" />

            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input type="text" placeholder='Search a Product...' onChange={(e) => setKeyword(e.target.value)} />
                <input type="submit" value="Search" />
            </form>
        </>
    )
}

export default Search