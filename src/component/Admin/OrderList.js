import React, { useEffect } from 'react'
import { DataGrid } from "@material-ui/data-grid"
import "./ProductList.css"
import { useSelector, useDispatch } from "react-redux"
import { deleteOrder, getAllOrders } from '../../actions/orderAction'
import { Link, useNavigate } from "react-router-dom"
import MetaData from "../Layout/MetaData"
import SideBar from "./SideBar"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import Loader from "../../component/Layout/Loader/Loader"
import { Button } from '@material-ui/core'
import { DELETE_ORDER_RESET } from '../../constants/orderConstant'
const OrderList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { loading, error, orders } = useSelector(state => state.allOrders)
    const { isDeleted } = useSelector(state => state.order);
    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.4,
        },

        {
            field: "amount",
            headerName: "Amount",
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
                        <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteOrderHandler(params.getValue(params.id, "id"))
                            }
                        >
                            <DeleteIcon />
                        </Button>
                    </>
                );
            },
        },
    ];
    const rows = [];
    orders && orders.forEach(item => {
        rows.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            amount: item.totalPrice,
            status: item.orderStatus,
        })
    })

    useEffect(() => {
        if (error) {
            console.log("There is an error", error)
        }
        if (isDeleted) {
            navigate("/admin/dashboard")
            dispatch({ type: DELETE_ORDER_RESET })
        }
        dispatch(getAllOrders())
    }, [dispatch, error, navigate, isDeleted])
    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={`All Orders- Admin`} />
                    <div className="dashboard">
                        <SideBar />
                        <div className="productListContainer">
                            <h1 id="producctListHeading">
                                ALL ORDERS
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

export default OrderList