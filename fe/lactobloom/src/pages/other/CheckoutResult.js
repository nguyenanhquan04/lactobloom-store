// import React, { Fragment, useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
// import SEO from "../../components/seo";
// import LayoutOne from "../../layouts/LayoutOne";
// import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { deleteAllFromCart } from "../../store/slices/cart-slice";
// import { transactionStatus } from "../../utils/PaymentService";
// import { saveOrder } from "../../utils/OrderService";
// import Cookies from "js-cookie"; // Import js-cookie
// import {jwtDecode} from "jwt-decode";

// const CheckoutResult = () => {
//   const dispatch = useDispatch();
//   const { pathname, search } = useLocation();
//   const navigate = useNavigate();
//   const [countdown, setCountdown] = useState(1000);
//   const [orderInfo, setOrderInfo] = useState(null);
//   const [status, setStatus] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const query = new URLSearchParams(search);
//   const transactionId = query.get("transactionId");
//     // Check for authToken cookie and redirect to homepage if it exists
//     useEffect(() => {
//       const token = Cookies.get("authToken");
//       if (token) {
//         const decodedToken = jwtDecode(token);
//         const userRole = decodedToken.role;
//         if (userRole !== "MEMBER") {
//           navigate("/admin");
//         } 
//       }
//     }, [navigate]);

//   useEffect(() => {
//     if (!transactionId) {
//       setError("Invalid transaction ID.");
//       setLoading(false);
//       return;
//     }

//     const savedOrderInfo = localStorage.getItem("orderInfo");
//     if (savedOrderInfo) {
//       setOrderInfo(JSON.parse(savedOrderInfo));
//     } else {
//       setError("Không tìm thấy thông tin đơn hàng.");
//       setLoading(false);
//       return;
//     }

//     transactionStatus(transactionId)
//       .then((response) => {
//         const data = response.data;
//         setStatus(data.status);
//         setLoading(false);

//         const countdownInterval = setInterval(() => {
//           setCountdown((prevCountdown) => {
//             if (prevCountdown <= 1) {
//               clearInterval(countdownInterval);
//               navigate(process.env.PUBLIC_URL + "/");
//             }
//             return prevCountdown - 1;
//           });
//         }, 1000);

//         if (data.status === true) {
//           const token = Cookies.get("authToken");
//           const orderData = JSON.parse(savedOrderInfo);

//           const saveOrder = (voucherId = null) => {
//             // Create a new Date object and add 7 hours to it
//             const now = new Date();
//             now.setHours(now.getHours() + 7);
//             const orderDate = now.toISOString();
          
//             axios
//               .post(
//                 `http://localhost:8080/order/save${voucherId ? `?voucherId=${voucherId}` : ""}`,
//                 {
//                   fullName: orderData.fullName,
//                   phone: orderData.phone,
//                   address: orderData.address,
//                   email: orderData.email,
//                   note: orderData.orderNotes,
//                   orderDate: orderDate, // Use adjusted orderDate
//                   totalPrice: orderData.totalAmount,
//                 },
//                 {
//                   headers: token ? { Authorization: `Bearer ${token}` } : {},
//                 }
//               )
//               .then((response) => {
//                 console.log(response.data);
//                 console.log("Order saved to database.");
//                 const orderId = response.data.orderId; // Assuming the response contains orderId
//                 axios
//                     .put(
//                       `http://localhost:8080/order/${orderId}/total`,
//                       {
//                         headers: token ? { Authorization: `Bearer ${token}` } : {},
//                       }
//                     )

          
//                 // Save order details for each product
//                 orderData.cartItems.forEach((item) => {
//                   axios
//                     .post(
//                       `http://localhost:8080/order-detail/save/order/${orderId}/product/${item.productId}`,
//                       { 
//                         quantity: item.quantity,
//                         totalPrice: (item.price*(1-item.discount/100)*item.quantity),
//                       },
//                       {
//                         headers: token ? { Authorization: `Bearer ${token}` } : {},
//                       }
//                     )
//                     .then((response) => {
//                       console.log("Order detail saved to database.");
//                     })
//                     .catch((err) => console.error("Error saving order detail to database:", err));
//                 });
                
//               })
//               .catch((err) => console.error("Error saving order to database:", err));
//           };
          
//           if (orderData.selectedVoucher) {
//             saveOrder(orderData.selectedVoucher.voucherId);
//           } else {
//             saveOrder();
//           }
          
//         }
//       })
//       .catch((error) => {
//         setError("An error occurred while fetching the transaction status.");
//         setLoading(false);

//         const countdownInterval = setInterval(() => {
//           setCountdown((prevCountdown) => {
//             if (prevCountdown <= 1) {
//               clearInterval(countdownInterval);
//               navigate(process.env.PUBLIC_URL + "/");
//             }
//             return prevCountdown - 1;
//           });
//         }, 1000);
//       });

//     return () => {
//       localStorage.removeItem("orderInfo");
//       dispatch(deleteAllFromCart());
//     };
//   }, [transactionId, navigate, dispatch]);

//   const getDiscountedPrice = (price, discount) => {
//     if (discount <= 0 || discount >= 100) {
//       return price; // No discount or invalid discount
//     }
//     const discountedPrice = price * (1 - discount / 100);
//     return discountedPrice;
//   };

//   const renderStatusMessage = () => {
//     if (loading) {
//       return <p>Loading...</p>;
//     }

//     if (error) {
//       return <p>{error}</p>;
//     }

//     switch (status) {
//       case true:
//         return (
//           <div className="status-message success">
//             <FontAwesomeIcon className="status-icon" icon={faCheckCircle} size="3x" color="green" />
//             <p>Đơn hàng đã được thanh toán thành công.</p>
//           </div>
//         );
//       case false:
//         return (
//           <div className="status-message failure">
//             <FontAwesomeIcon className="status-icon" icon={faTimesCircle} size="3x" color="red" />
//             <p>Đơn hàng chưa được thanh toán.</p>
//           </div>
//         );
//       case "not found":
//         return (
//           <div className="status-message failure">
//             <FontAwesomeIcon className="status-icon" icon={faTimesCircle} size="3x" color="red" />
//             <p>Đơn hàng không hợp lệ.</p>
//           </div>
//         );
//       default:
//         return (
//           <div className="status-message failure">
//             <FontAwesomeIcon className="status-icon" icon={faTimesCircle} size="3x" color="red" />
//             <p>Trạng thái đơn hàng không xác định.</p>
//           </div>
//         );
//     }
//   };

//   return (
//     <Fragment>
//       <SEO titleTemplate="CheckoutResult" description="Lactobloom Checkout Result Page." />
//       <LayoutOne headerTop="visible">
//         <Breadcrumb
//           pages={[
//             { label: "Trang chủ", path: process.env.PUBLIC_URL + "/" },
//             { label: "Thanh toán", path: process.env.PUBLIC_URL + pathname },
//           ]}
//         />
//         <div className="checkout-result-container">
//           <div className="checkout-result">
//             {renderStatusMessage()}
//             {orderInfo && (
//               <>
//                 <div className="transaction-info">
//                   <p>Mã thanh toán: {transactionId}</p>
//                   <p>Thời gian: {orderInfo.transactionTime}</p>
//                   <p>Tên: {orderInfo.fullName}</p>
//                   <p>Địa chỉ: {orderInfo.address}</p>
//                   <p>Số điện thoại: {orderInfo.phone}</p>
//                 </div>
//                 <div className="order-summary">
//                   <h3>Đơn hàng </h3>
//                   <table>
//                     <thead>
//                       <tr>
//                         <th className="short-column">Tên sản phẩm</th>
//                         <th>Số lượng</th>
//                         <th className="long-column">Tiền (VND)</th>
//                         <th className="long-column">Giảm giá (%)</th>
//                         <th className="long-column">Tổng (VND)</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {orderInfo.cartItems.map((item, index) => (
//                         <tr key={index}>
//                           <td className="short-column">{item.productName}</td>
//                           <td>{item.quantity}</td>
//                           <td>{item.price.toLocaleString("vi-VN")} VND</td>
//                           <td>
//                             {/* {item.discount ? (
//                               <span className="discounted-price">
//                                 {(
//                                   (item.price - getDiscountedPrice(item.price, item.discount)) *
//                                   item.quantity
//                                 ).toLocaleString("vi-VN")}{" "}
//                                 VND
//                               </span>
//                             ) : (
//                               "0 VND"
//                             )} */}
//                             {item.discount}
//                           </td>
//                           <td>
//                             {/* {(item.discount
//                               ? getDiscountedPrice(item.price, item.discount) * item.quantity
//                               : item.price * item.quantity
//                             ).toLocaleString("vi-VN")}{" "} */}
//                             {(item.price*(1-item.discount/100)*item.quantity).toLocaleString("vi-VN")}{" "}
//                             VND
//                           </td>
//                         </tr>
//                       ))}
//                       <tr>
//                         <td colSpan="3"></td>
//                         <th className="long-column">Voucher:</th>
//                         <td>
//                           -{orderInfo.selectedVoucher ? orderInfo.discountAmount.toLocaleString("vi-VN") : "0"}{" "}
//                           VND
//                         </td>
//                       </tr>
//                       <tr>
//                         <td colSpan="3"></td>
//                         <th className="long-column">Tổng tiền:</th>
//                         <td>{orderInfo.totalAmount.toLocaleString("vi-VN")} VND</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </>
//             )}
//             <div className="countdown">
//               <p>Trở về trang chủ sau {countdown} giây...</p>
//             </div>
//           </div>
//         </div>
//       </LayoutOne>
//     </Fragment>
// );
// };

// export default CheckoutResult;


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
import { transactionStatus } from "../../utils/PaymentService";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

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
    const token = Cookies.get("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
      if (userRole !== "MEMBER") {
        navigate("/admin");
      }
    }
  }, [navigate]);

  useEffect(() => {
    const savedOrderInfo = localStorage.getItem("orderInfo");
    if (savedOrderInfo) {
      const orderData = JSON.parse(savedOrderInfo);
      setOrderInfo(orderData);

      if (orderData.cod === true) {
        setStatus(true);
        setLoading(false);
        saveOrder(orderData, true);
        localStorage.removeItem("orderInfo");
        dispatch(deleteAllFromCart());
        startCountdown();
        return;
      }
    } else {
      setError("Không tìm thấy thông tin đơn hàng.");
      setLoading(false);
      return;
    }

    if (!transactionId) {
      setError("Invalid transaction ID.");
      setLoading(false);
      return;
    }

    transactionStatus(transactionId)
      .then((response) => {
        const data = response.data;
        setStatus(data.status);
        setLoading(false);

        if (data.status === true) {
          saveOrder(JSON.parse(savedOrderInfo));
          localStorage.removeItem("orderInfo");
          dispatch(deleteAllFromCart());
        }

        startCountdown();
      })
      .catch((error) => {
        setError("An error occurred while fetching the transaction status.");
        setLoading(false);
        startCountdown();
      });
  }, [transactionId, navigate, dispatch]);

  const startCountdown = () => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(countdownInterval);
          navigate(process.env.PUBLIC_URL + "/");
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  const saveOrder = (orderData, isCOD = false) => {
    const token = Cookies.get("authToken");
    const now = new Date();
    now.setHours(now.getHours() + 7);
    const orderDate = now.toISOString();
  
    axios
      .post(
        `http://localhost:8080/order/save${orderData.selectedVoucher ? `?voucherId=${orderData.selectedVoucher.voucherId}` : ""}`,
        {
          fullName: orderData.fullName,
          phone: orderData.phone,
          address: orderData.address,
          email: orderData.email,
          note: orderData.orderNotes,
          orderDate: orderDate,
          totalPrice: orderData.totalAmount,
          cod: orderData.cod,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      )
      .then((response) => {
        const orderId = response.data.orderId;
  
        const orderDetailPromises = orderData.cartItems.map((item) => {
          return axios.post(
            `http://localhost:8080/order-detail/save/order/${orderId}/product/${item.productId}`,
            {
              quantity: item.quantity,
              totalPrice: item.price * (1 - item.discount / 100) * item.quantity,
            },
            {
              headers: token ? { Authorization: `Bearer ${token}` } : {},
            }
          );
        });
  
        // Wait for all order detail requests to complete
        Promise.all(orderDetailPromises)
          .then(() => {
            console.log("All order details saved to database.");
  
            // Now update the total
            return axios.put(
              `http://localhost:8080/order/${orderId}/total`,
              {}, // You may need to include a payload here if your endpoint requires it
              {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
              }
            );
          })
          .then(() => {
            console.log("Total updated successfully");
          })
          .catch((err) => {
            console.error("Error saving order detail or updating total:", err);
          });
      })
      .catch((err) => {
        console.error("Error saving order to database:", err);
      });
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
            <p>Đơn hàng đã được xác nhận thành công.</p>
          </div>
        );
      case false:
        return (
          <div className="status-message failure">
            <FontAwesomeIcon className="status-icon" icon={faTimesCircle} size="3x" color="red" />
            <p>Đơn hàng chưa được thanh toán.</p>
          </div>
        );
      case "not found":
        return (
          <div className="status-message failure">
            <FontAwesomeIcon className="status-icon" icon={faTimesCircle} size="3x" color="red" />
            <p>Đơn hàng không hợp lệ.</p>
          </div>
        );
      default:
        return (
          <div className="status-message failure">
            <FontAwesomeIcon className="status-icon" icon={faTimesCircle} size="3x" color="red" />
            <p>Trạng thái đơn hàng không xác định.</p>
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
            { label: "Trang chủ", path: process.env.PUBLIC_URL + "/" },
            { label: "Thanh toán", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="checkout-result-container">
          <div className="checkout-result">
            {renderStatusMessage()}
            {orderInfo && (
              <>
                <div className="transaction-info">
                  {orderInfo.cod ? null : <p>Mã thanh toán: {transactionId}</p>}
                  <p>Thời gian: {orderInfo.transactionTime}</p>
                  <p>Tên: {orderInfo.fullName}</p>
                  <p>Địa chỉ: {orderInfo.address}</p>
                  <p>Số điện thoại: {orderInfo.phone}</p>
                </div>
                <div className="order-summary">
                  <h3>Đơn hàng </h3>
                  <table>
                    <thead>
                      <tr>
                        <th className="short-column">Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th className="long-column">Tiền (VND)</th>
                        <th className="long-column">Giảm giá (%)</th>
                        <th className="long-column">Tổng (VND)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderInfo.cartItems.map((item, index) => (
                        <tr key={index}>
                          <td className="short-column">{item.productName}</td>
                          <td>{item.quantity}</td>
                          <td>{item.price.toLocaleString("vi-VN")} VND</td>
                          <td>{item.discount}</td>
                          <td>{(item.price * (1 - item.discount / 100) * item.quantity).toLocaleString("vi-VN")} VND</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan="3"></td>
                        <th className="long-column">Voucher:</th>
                        <td>
                          -{orderInfo.selectedVoucher ? orderInfo.discountAmount.toLocaleString("vi-VN") : "0"} VND
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3"></td>
                        <th className="long-column">Tổng tiền:</th>
                        <td>{orderInfo.totalAmount.toLocaleString("vi-VN")} VND</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
            <div className="countdown">
              <p>Trở về trang chủ sau {countdown} giây...</p>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default CheckoutResult;
