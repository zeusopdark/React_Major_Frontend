import React, { useEffect } from 'react'
import { DataGrid } from "@material-ui/data-grid"
import "./ProductList.css"
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, deleteProduct, getAdminProduct } from "../../actions/productAction"
import { Link, useNavigate } from "react-router-dom"
import MetaData from "../Layout/MetaData"
import SideBar from "./SideBar"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import Loader from "../../component/Layout/Loader/Loader"
import { Button } from '@material-ui/core'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
const ProductList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { loading, error, products } = useSelector(state => state.products)
    const { isDeleted } = useSelector(state => state.product);
    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };
    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={() =>
                            deleteProductHandler(params.getValue(params.id, "id"))
                        }>
                            <DeleteIcon />
                        </Button>
                    </>
                )
            }
        }
    ]
    const rows = [];
    products && products.forEach(item => {
        rows.push({
            id: item._id,
            stock: item.Stock,
            price: item.price,
            name: item.name
        })
    })

    useEffect(() => {
        if (error) {
            console.log("There is an error", error)
        }
        if (isDeleted) {
            navigate("/admin/dashboard")
            dispatch({ type: DELETE_PRODUCT_RESET })
        }
        dispatch(getAdminProduct())
    }, [dispatch, error, navigate, isDeleted])
    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={`All Products- Admin`} />
                    <div className="dashboard">
                        <SideBar />
                        <div className="productListContainer">
                            <h1 id="producctListHeading">
                                ALL PRODUCTS
                            </h1>
                            <DataGrid columns={columns}
                                rows={rows}
                                autoHeight
                                disableSelectionOnClick
                                className="productListTable"
                                pageSize={10}
                            />
                        </div>
                    </div>
                </>
            )}

        </>
    )
}

export default ProductList