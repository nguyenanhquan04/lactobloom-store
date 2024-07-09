import React, { Fragment, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteAllFromCart } from "../../store/slices/cart-slice";
import Cookies from "js-cookie";
import { transactionStatus } from "../../utils/PaymentService";
import { saveOrder } from "../../utils/OrderService";

const CheckoutResult = () => {
  const dispatch = useDispatch();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(1000);
  const [orderInfo, setOrderInfo] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = new URLSearchParams(search);
  const transactionId = query.get("transactionId");

  useEffect(() => {
    if (!transactionId) {
      setError("Invalid transaction ID.");
      setLoading(false);
      return;
    }

    const savedOrderInfo = localStorage.getItem("orderInfo");
    if (savedOrderInfo) {
      setOrderInfo(JSON.parse(savedOrderInfo));
    } else {
      setError("Order information not found.");
      setLoading(false);
      return;
    }

    transactionStatus(transactionId)
      .then((response) => {
        const data = response.data;
        setStatus(data.status);
        setLoading(false);

        const countdownInterval = setInterval(() => {
          setCountdown((prevCountdown) => {
            if (prevCountdown <= 1) {
              clearInterval(countdownInterval);
              navigate(process.env.PUBLIC_URL + "/");
            }
            return prevCountdown - 1;
          });
        }, 1000);

        if (data.status === true) {
          const token = Cookies.get("authToken");
          const orderData = JSON.parse(savedOrderInfo);

          const saveOrder = (voucherId = null) => {
            // Create a new Date object and add 7 hours to it
            const now = new Date();
            now.setHours(now.getHours() + 7);
            const orderDate = now.toISOString();
          
            axios
              .post(
                `http://localhost:8080/order/save${voucherId ? `?voucherId=${voucherId}` : ""}`,
                {
                  fullName: orderData.fullName,
                  phone: orderData.phone,
                  address: orderData.address,
                  email: orderData.email,
                  note: orderData.orderNotes,
                  orderDate: orderDate, // Use adjusted orderDate
                  totalPrice: orderData.totalAmount,
                },
                {
                  headers: token ? { Authorization: `Bearer ${token}` } : {},
                }
              )
              .then((response) => {
                console.log(response.data);
                console.log("Order saved to database.");
                const orderId = response.data.orderId; // Assuming the response contains orderId
          
                // Save order details for each product
                orderData.cartItems.forEach((item) => {
                  axios
                    .post(
                      `http://localhost:8080/order-detail/save/order/${orderId}/product/${item.productId}`,
                      { 
                        quantity: item.quantity,
                        totalPrice: (item.price*(1-item.discount/100)*item.quantity),
                      },
                      {
                        headers: token ? { Authorization: `Bearer ${token}` } : {},
                      }
                    )
                    .then((response) => {
                      console.log("Order detail saved to database.");
                    })
                    .catch((err) => console.error("Error saving order detail to database:", err));
                });
                
              })
              .catch((err) => console.error("Error saving order to database:", err));
          };
          
          if (orderData.selectedVoucher) {
            saveOrder(orderData.selectedVoucher.voucherId);
          } else {
            saveOrder();
          }
          
        }
      })
      .catch((error) => {
        setError("An error occurred while fetching the transaction status.");
        setLoading(false);

        const countdownInterval = setInterval(() => {
          setCountdown((prevCountdown) => {
            if (prevCountdown <= 1) {
              clearInterval(countdownInterval);
              navigate(process.env.PUBLIC_URL + "/");
            }
            return prevCountdown - 1;
          });
        }, 1000);
      });

    return () => {
      localStorage.removeItem("orderInfo");
      dispatch(deleteAllFromCart());
    };
  }, [transactionId, navigate, dispatch]);

  const getDiscountedPrice = (price, discount) => {
    if (discount <= 0 || discount >= 100) {
      return price; // No discount or invalid discount
    }
    const discountedPrice = price * (1 - discount / 100);
    return discountedPrice;
  };

  const renderStatusMessage = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    switch (status) {
      case true:
        return (
          <div className="status-message success">
            <FontAwesomeIcon className="status-icon" icon={faCheckCircle} size="3x" color="green" />
            <p>The transaction has been successfully completed.</p>
          </div>
        );
      case false:
        return (
          <div className="status-message failure">
            <FontAwesomeIcon className="status-icon" icon={faTimesCircle} size="3x" color="red" />
            <p>The transaction has not been completed yet.</p>
          </div>
        );
      case "not found":
        return (
          <div className="status-message failure">
            <FontAwesomeIcon className="status-icon" icon={faTimesCircle} size="3x" color="red" />
            <p>The transaction is invalid.</p>
          </div>
        );
      default:
        return (
          <div className="status-message failure">
            <FontAwesomeIcon className="status-icon" icon={faTimesCircle} size="3x" color="red" />
            <p>Unknown transaction status.</p>
          </div>
        );
    }
  };

  return (
    <Fragment>
      <SEO titleTemplate="CheckoutResult" description="Lactobloom Checkout Result Page." />
      <LayoutOne headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Checkout", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="checkout-result-container">
          <div className="checkout-result">
            {renderStatusMessage()}
            {orderInfo && (
              <>
                <div className="transaction-info">
                  <p>Transaction ID: {transactionId}</p>
                  <p>Time: {orderInfo.transactionTime}</p>
                  <p>Name: {orderInfo.fullName}</p>
                  <p>Address: {orderInfo.address}</p>
                  <p>Phone: {orderInfo.phone}</p>
                </div>
                <div className="order-summary">
                  <h3>Order Summary</h3>
                  <table>
                    <thead>
                      <tr>
                        <th className="short-column">Product Name</th>
                        <th>Quantity</th>
                        <th className="long-column">Price (VND)</th>
                        <th className="long-column">Discount (%)</th>
                        <th className="long-column">Total (VND)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderInfo.cartItems.map((item, index) => (
                        <tr key={index}>
                          <td className="short-column">{item.productName}</td>
                          <td>{item.quantity}</td>
                          <td>{item.price.toLocaleString("vi-VN")} VND</td>
                          <td>
                            {/* {item.discount ? (
                              <span className="discounted-price">
                                {(
                                  (item.price - getDiscountedPrice(item.price, item.discount)) *
                                  item.quantity
                                ).toLocaleString("vi-VN")}{" "}
                                VND
                              </span>
                            ) : (
                              "0 VND"
                            )} */}
                            {item.discount}
                          </td>
                          <td>
                            {/* {(item.discount
                              ? getDiscountedPrice(item.price, item.discount) * item.quantity
                              : item.price * item.quantity
                            ).toLocaleString("vi-VN")}{" "} */}
                            {(item.price*(1-item.discount/100)*item.quantity).toLocaleString("vi-VN")}{" "}
                            VND
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan="3"></td>
                        <th className="long-column">Voucher:</th>
                        <td>
                          -{orderInfo.selectedVoucher ? orderInfo.discountAmount.toLocaleString("vi-VN") : "0"}{" "}
                          VND
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3"></td>
                        <th className="long-column">Total Price:</th>
                        <td>{orderInfo.totalAmount.toLocaleString("vi-VN")} VND</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
            <div className="countdown">
              <p>Returning to homepage in {countdown} seconds...</p>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
);
};

export default CheckoutResult;