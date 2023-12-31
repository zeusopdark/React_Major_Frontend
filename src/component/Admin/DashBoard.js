import React, { useEffect } from 'react'
import SideBar from './SideBar'
import "./DashBoard.css"
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Doughnut, Line } from "react-chartjs-2"
import { registerables, Chart } from 'chart.js'
import MetaData from '../Layout/MetaData'
import { useSelector, useDispatch } from 'react-redux'
import { getAdminProduct } from '../../actions/productAction'
import { getAllOrders } from '../../actions/orderAction'
import { getAllUsers } from '../../actions/userAction'
const DashBoard = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products)
    const { orders } = useSelector(state => state.allOrders);
    const { users } = useSelector(state => state.allUsers);
    let outOfStock = 0;
    products && products.forEach(item => {
        if (item.Stock === 0) {
            outOfStock += 1
        }
    })
    let totalAmount = 0;
    orders && orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    useEffect(() => {
        dispatch(getAdminProduct())
        dispatch(getAllOrders())
        dispatch(getAllUsers())
    }, [dispatch])
    const orderSize = orders && orders.length;
    Chart.register(...registerables);
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "Total Amount",
                backgroundColor: ["green"],
                hoverBackgroundColor: ["tomato"],
                data: [0, totalAmount]
            }
        ]
    }
    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["#00A684", "#680084"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [outOfStock, products.length - outOfStock]
            }
        ]
    }

    return (
        <>
            <div className="dashboard">
                <MetaData title="Dashboard - Admin Panel" />
                <SideBar />

                <div className="dashboardContainer">
                    <Typography component="h1"> Dashboard</Typography>
                    <div className="dashboardSummary">
                        <div>
                            <p>
                                Total Amount <br /> Rs {totalAmount}
                            </p>
                        </div>
                        <div className="dashboardSummaryBox2">
                            <Link to="/admin/products">
                                <p>Product</p>
                                <p>{products && products.length}</p>
                            </Link>
                            <Link to="/admin/orders">
                                <p>Orders</p>
                                <p>{orderSize}</p>
                            </Link>
                            <Link to="/admin/users">
                                <p>Users</p>
                                <p>{users && users.length}</p>
                            </Link>
                        </div>
                    </div>
                    <div className="lineChart">
                        <Line
                            data={lineState}
                        />
                    </div>
                    <div className="doughnutChart">
                        <Doughnut data={doughnutState} />
                    </div>
                </div>
            </div>

        </>
    )
}

export default DashBoard