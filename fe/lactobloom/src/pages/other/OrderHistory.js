import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import Cookies from "js-cookie";
import { myOrders } from "../../utils/OrderHistoryService";
import { orderProducts } from "../../utils/OrderDetailService";

const OrderHistory = () => {
  let { pathname } = useLocation();
  let navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      navigate("/login");
    } else {
      myOrders({
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          setOrders(response.data);
          setIsEmpty(response.data.length === 0);
        })
        .catch(error => {
          console.error("There was an error fetching the order data!", error);
        });
    }
  }, [navigate]);

  const fetchOrderDetails = (orderId) => {
    const token = Cookies.get("authToken");
    orderProducts(orderId, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setOrderDetails(prevState => ({
          ...prevState,
          [orderId]: response.data
        }));
      })
      .catch(error => {
        console.error("There was an error fetching the order details!", error);
        setOrderDetails(prevState => ({
          ...prevState,
          [orderId]: null
        }));
      });
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Order History"
        description="Lactobloom Order History."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Order History", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="orderhistory-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ms-auto me-auto col-lg-9">
                <div className="orderhistory-wrapper">
                  {isEmpty ? (
                    <div className="item-empty-area text-center">
                      <div className="item-empty-area__icon mb-30">
                        <i className="pe-7s-cash"></i>
                      </div>
                      <div className="item-empty-area__text">
                        No order history found. <br />
                        <Link to={process.env.PUBLIC_URL + "/shop"}>
                          Start Shopping
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <Accordion>
                      {orders.map((order, index) => (
                        <Accordion.Item
                          eventKey={index.toString()}
                          key={order.orderId}
                          className="single-order-history mb-20"
                          onClick={() => fetchOrderDetails(order.orderId)}
                        >
                          <Accordion.Header className="panel-heading">
                            <div className="order-header">
                              <div className="order-header-item">
                                {index + 1} .
                              </div>
                              <div className="order-header-item">
                                Date:{" "}
                                {new Date(order.orderDate).toLocaleDateString()}
                              </div>
                              <div className="order-header-item">|</div>
                              <div className="order-header-item">
                                Total:{" "}
                                {order.totalPrice.toLocaleString("vi-VN")} VND
                              </div>
                              <div className="order-header-item">|</div>
                              <div className="order-header-item">
                                Status: {order.status ? "Completed" : "Pending"}
                              </div>
                            </div>
                          </Accordion.Header>
                          <Accordion.Body>
                            <div className="orderhistory-info-wrapper">
                              <div className="account-info-wrapper">
                                <h4>Order Details</h4>
                              </div>
                              <div className="row">
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>Full Name</label>
                                    <input
                                      type="text"
                                      value={order.fullName}
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>Email</label>
                                    <input
                                      type="text"
                                      value={order.email}
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>Phone</label>
                                    <input
                                      type="text"
                                      value={order.phone}
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>Address</label>
                                    <input
                                      type="text"
                                      value={order.address}
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <label>Order Notes</label>
                                    <textarea value={order.note} disabled />
                                  </div>
                                </div>
                                {orderDetails[order.orderId] && (
                                  <div className="col-lg-12 col-md-12">
                                    <div className="billing-info">
                                      <label>Products: </label>
                                      <table className="table">
                                        <thead>
                                          <tr>
                                            <th>Product Name</th>
                                            <th>Quantity</th>
                                            <th>Total Price</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {orderDetails[order.orderId].map((item) => (
                                            <tr key={item.orderDetailId}>
                                              <td>{item.productName}</td>
                                              <td>{item.quantity}</td>
                                              <td>{item.totalPrice.toLocaleString("vi-VN")} VND</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default OrderHistory;
