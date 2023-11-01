import React, { Fragment, useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails, newReview } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import Loader from "../Layout/Loader/Loader"
import MetaData from '../Layout/MetaData';
import { makeStyles } from "@mui/styles"
import { addItemsToCart } from '../../actions/cartAction';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { Rating } from '@mui/material';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
const ProductDetails = () => {
    const useStyles = makeStyles({
        carousel: {
            width: '55%',
            display: "flex",
            flexDirection: "column",
        },
    });

    const dispatch = useDispatch();
    const { id } = useParams();
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const { product, loading, error } = useSelector((state) => state.productDetails);
    const classes = useStyles();

    const { success, error: reviewError } = useSelector(state => state.newReview)

    const options = {
        size: "large",
        value: product.rating,
        readOnly: true,
        precision: 0.5
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(product._id, inputValue));
    }

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true)
    }
    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating)
        myForm.set("comment", comment)
        myForm.set("productId", id);
        dispatch(newReview(myForm));
        setOpen(false);
    }
    // Define a state variable to manage the input value
    const [inputValue, setInputValue] = useState(1);

    // Add an onChange handler to update inputValue
    const increase = () => {
        if (product.Stock <= inputValue) return;
        setInputValue(inputValue + 1);
    };
    const decrease = () => {
        if (inputValue <= 1) return;
        setInputValue(inputValue - 1);
    }

    useEffect(() => {
        if (success) {
            console.log("Review submitted Successfully")
            dispatch({ type: NEW_REVIEW_RESET });
        }
        if (reviewError) {
            console.log("There is an error", reviewError);
        }
        dispatch(getProductDetails(id));
    }, [dispatch, success, reviewError, id]);

    return (
        <Fragment>
            {loading ? <Loader /> :
                error ? error :

                    (<Fragment>
                        <MetaData title={`${product.name}`} />

                        <div className='ProductDetails'>
                            <div className='second'>

                                <Carousel className={classes.carousel}>

                                    {product.images &&
                                        product.images.map((item, i) => (

                                            <img key={i} className="CarouselImage" src={item.url} alt={`${i} Slide`} />

                                        ))
                                    }

                                </Carousel>
                            </div>

                            <div className='first'>
                                <div className="detailsBlock-1">
                                    <h2>{product.name}</h2>
                                    <p>Product # {product._id}</p>
                                </div>
                                <div className="detailsBlock-2">
                                    <Rating {...options} />
                                    <span>({product.numOfReviews} Reviews)</span>
                                </div>
                                <div className="detailsBlock-3">
                                    <h1>{`\u20B9${product.price}`}</h1>
                                    <div className="detailsBlock-3-1">
                                        <div className="detailsBlock-3-1-1">
                                            <button onClick={increase}>+</button>
                                            {/* Use inputValue and handleInputChange */}
                                            <input
                                                type="number"
                                                value={inputValue}
                                                readOnly
                                            />
                                            <button onClick={decrease}>-</button>
                                        </div>
                                        <button onClick={addToCartHandler}>Add to Cart</button>
                                    </div>
                                    <p>
                                        Status:{' '}
                                        <b className={product.Stock < 1 ? 'redColor' : 'greenColor'}>
                                            {product.Stock < 1 ? 'OutOfStock' : 'InStock'}
                                        </b>
                                    </p>
                                </div>
                                <div className="detailsBlock-4">
                                    <p>Description: {product.description}</p>
                                </div>
                                <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
                            </div>

                        </div>
                        <h3 className="reviewsHeading">REVIEWS </h3>

                        <Dialog
                            aria-labelledby="simple-dialog-title"
                            open={open}
                            onClose={submitReviewToggle}>
                            <DialogTitle>Submit Review</DialogTitle>
                            <DialogContent className="submitDialog">
                                <Rating
                                    onChange={e => setRating(e.target.value)}
                                    value={rating}
                                    size="large"
                                />
                                <textarea
                                    className='submitDialogTextArea'
                                    cols="30"
                                    rows="5"
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}>
                                </textarea>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={submitReviewToggle} color='secondary'>Cancel</Button>
                                <Button onClick={reviewSubmitHandler}>Submit</Button>
                            </DialogActions>
                        </Dialog>

                        {product.review && product.review[0] ? (
                            <div className="reviews">
                                {product.review && product.review.map((rev) => <ReviewCard key={rev._id} review={rev} />)}
                            </div>
                        ) : (
                            <p className="noReviews">No Reviews yet</p>
                        )}

                    </Fragment>)}
        </Fragment>

    );
};

export default ProductDetails;
