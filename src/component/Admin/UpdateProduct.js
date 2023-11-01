import React, { useEffect, useState } from 'react'
import { Button } from "@material-ui/core";
import MetaData from "../Layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from './SideBar';
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails, updateProduct } from "../../actions/productAction";
import { useNavigate, useParams } from "react-router-dom"
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import "./NewProduct.css"
const UpdateProduct = () => {
    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const { error, product } = useSelector(state => state.productDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.product)
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    useEffect(() => {
        if (updateError) {
            console.log("there is an error", updateError);
        }
        if (isUpdated) {
            console.log("Product Updated successsfully")
            navigate("/admin/dashboard")
            dispatch({ type: UPDATE_PRODUCT_RESET })
        }
        if (product && product._id !== id) {
            dispatch(getProductDetails(id));
        }
        else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.Stock);
            setOldImages(product.images);
        }
    }, [dispatch, updateError, isUpdated, product, id, navigate])
    console.log(category)
    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(updateProduct(id, myForm));
    }

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(old => [...old, reader.result]);
                    setImages(old => [...old, reader.result]);
                }
            }
            reader.readAsDataURL(file);
        })
    }
    return (
        <>
            <MetaData title={"Update Product"} />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    <form
                        className='createProductForm'
                        encType="multipart/form-data"
                        onSubmit={updateProductSubmitHandler}
                    >
                        <h1>Update Product</h1>
                        <div>
                            <SpellcheckIcon />
                            <input type="text"
                                placeholder='Product Name'
                                required
                                value={name}
                                onChange={e => setName(e.target.value)} />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input type="number"
                                placeholder='Price'
                                required
                                onChange={e => setPrice(e.target.value)}
                                value={price}
                            />
                        </div>
                        <div>
                            <DescriptionIcon />
                            <textarea
                                placeholder='Product Description'
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>
                        <div>
                            <AccountTreeIcon />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <StorageIcon />
                            <input type="number"
                                placeholder='Stock'
                                required
                                onChange={e => setStock(e.target.value)}
                                value={Stock} />
                        </div>
                        <div id="createProductFormFile">
                            <input type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProductImagesChange}
                                multiple
                            />

                        </div>
                        <div id="createProductFormImage">
                            {oldImages &&
                                oldImages.map((image, index) => (
                                    <img key={index} src={image.url} alt="Old Product Preview" />
                                ))}
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateProduct