// import React, { Fragment, useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { getDiscountPrice } from "../../helpers/product";
// import SEO from "../../components/seo";
// import LayoutOne from "../../layouts/LayoutOne";
// import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
// import Cookies from "js-cookie";
// import { myVoucher } from "../../utils/VoucherService";
// import { userInfo } from "../../utils/UserService"; // Import the userInfo function from your UserService
// import axios from "axios"; // Import axios for API calls

// const Checkout = () => {
//   let cartTotalPrice = 0;

//   let { pathname } = useLocation();

//   const { cartItems } = useSelector((state) => state.cart);
//   const [vouchers, setVouchers] = useState([]);
//   const [selectedVoucher, setSelectedVoucher] = useState(null); // State to hold selected voucher
//   const authToken = Cookies.get("authToken"); // Get authToken from cookies

//   // State to hold user information
//   const [user, setUser] = useState(null);
//   const [fullName, setFullName] = useState("");
//   const [address, setAddress] = useState("");
//   const [phone, setPhone] = useState("");

//   useEffect(() => {
//     // Fetch user's vouchers from the API
//     const fetchVouchers = async () => {
//       try {
//         const response = await myVoucher({
//           headers: { Authorization: `Bearer ${authToken}` },
//         });
//         setVouchers(response.data);
//       } catch (error) {
//         console.error("Error fetching vouchers:", error);
//       }
//     };

//     fetchVouchers();
//   }, [authToken]);

//   useEffect(() => {
//     // Fetch user info from the API
//     const fetchUserInfo = async () => {
//       try {
//         const response = await userInfo();
//         setUser(response.data);
//         setFullName(response.data.fullName);
//         setAddress(response.data.address);
//         setPhone(response.data.phone);
//       } catch (error) {
//         console.error("Failed to fetch user info:", error);
//       }
//     };

//     fetchUserInfo();
//   }, []);

//   const handleVoucherChange = (event) => {
//     const selectedVoucherId = event.target.value;
//     const selectedVoucher = vouchers.find(
//       (voucher) => voucher.voucherId === parseInt(selectedVoucherId)
//     );
//     setSelectedVoucher(selectedVoucher);
//   };

//   // Calculate discounted price and new total price based on selected voucher
//   if (selectedVoucher) {
//     const discountAmount = (cartTotalPrice * selectedVoucher.discount) / 100;
//     cartTotalPrice -= discountAmount;
//   }

//   const placeOrder = async (amount) => {
//     let finalAmount = amount;
  
//     // If selectedVoucher exists, calculate discounted price
//     if (selectedVoucher) {
//       finalAmount = getDiscountPrice(amount, selectedVoucher.discount);
//     }
  
//     // Call the API to create payment
//     try {
//       const response = await axios.get(
//         `http://localhost:8080/payment/create-payment?amount=${finalAmount}&bankCode=NCB`
//       );
//       const { status, message, url } = response.data;
//       if (status === "OK") {
//         // Redirect to the payment URL
//         window.location.href = url;
//       } else {
//         console.error("Failed to create payment:", message);
//         // Handle error or show appropriate message to the user
//       }
//     } catch (error) {
//       console.error("Error creating payment:", error);
//       // Handle error or show appropriate message to the user
//     }
//   };
  

//   return (
//     <Fragment>
//       <SEO titleTemplate="Checkout" description="Lactobloom Checkout Page." />
//       <LayoutOne headerTop="visible">
//         {/* breadcrumb */}
//         <Breadcrumb
//           pages={[
//             { label: "Home", path: process.env.PUBLIC_URL + "/" },
//             { label: "Checkout", path: process.env.PUBLIC_URL + pathname },
//           ]}
//         />
//         <div className="checkout-area pt-95 pb-100">
//           <div className="container">
//             {cartItems && cartItems.length >= 1 ? (
//               <div className="row">
//                 <div className="col-lg-7">
//                   <div className="billing-info-wrap">
//                     <h3>Order Details</h3>
//                     <div className="row">
//                       <div className="col-lg-12">
//                         <div className="billing-info mb-20">
//                           <label>Full Name</label>
//                           <input
//                             type="text"
//                             value={fullName}
//                             onChange={(e) => setFullName(e.target.value)}
//                           />
//                         </div>
//                       </div>
//                       <div className="col-lg-12">
//                         <div className="billing-info mb-20">
//                           <label>Address</label>
//                           <input
//                             className="billing-address"
//                             placeholder="House number and street name"
//                             type="text"
//                             value={address}
//                             onChange={(e) => setAddress(e.target.value)}
//                           />
//                         </div>
//                       </div>
//                       <div className="col-lg-6 col-md-6">
//                         <div className="billing-info mb-20">
//                           <label>Phone</label>
//                           <input
//                             type="text"
//                             value={phone}
//                             onChange={(e) => setPhone(e.target.value)}
//                           />
//                         </div>
//                       </div>
//                       <div className="col-lg-6 col-md-6">
//                         <div className="billing-info mb-20">
//                           <label>Voucher</label>
//                           <select onChange={handleVoucherChange}>
//                             <option value="">Select a voucher</option>
//                             {vouchers.map((voucher) => (
//                               <option
//                                 key={voucher.voucherId}
//                                 value={voucher.voucherId}
//                               >
//                                 Discount {voucher.discount}%, Expire Date:{" "}
//                                 {voucher.expirationDate}
//                               </option>
//                             ))}
//                           </select>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="additional-info-wrap">
//                       <h4>Additional information</h4>
//                       <div className="additional-info">
//                         <label>Order notes</label>
//                         <textarea
//                           placeholder="Notes about your order, e.g. special notes for delivery. "
//                           name="message"
//                           defaultValue={""}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="col-lg-5">
//                   <div className="your-order-area">
//                     <h3>Your order</h3>
//                     <div className="your-order-wrap gray-bg-4">
//                       <div className="your-order-product-info">
//                         <div className="your-order-top">
//                           <ul>
//                             <li>Product</li>
//                             <li>Total</li>
//                           </ul>
//                         </div>
//                         <div className="your-order-middle">
//                           <ul>
//                             {cartItems.map((cartItem, key) => {
//                               console.log(cartItems);
//                               const discountedPrice = getDiscountPrice(
//                                 cartItem.price,
//                                 cartItem.discount
//                               );
//                               const finalProductPrice = cartItem.price;
//                               const finalDiscountedPrice = discountedPrice * 1;

//                               discountedPrice != null
//                                 ? (cartTotalPrice +=
//                                     finalDiscountedPrice *
//                                     cartItem.quantity).toLocaleString("vi-VN")
//                                 : (cartTotalPrice +=
//                                     finalProductPrice *
//                                     cartItem.quantity).toLocaleString("vi-VN");
//                               return (
//                                 <li key={key}>
//                                   <span className="order-middle-left">
//                                     {cartItem.productName} X {cartItem.quantity}
//                                   </span>{" "}
//                                   <span className="order-price">
//                                     {discountedPrice !== null
//                                       ? (
//                                           finalDiscountedPrice *
//                                           cartItem.quantity
//                                         ).toLocaleString("vi-VN") + " VND"
//                                       : (
//                                           finalProductPrice * cartItem.quantity
//                                         ).toLocaleString("vi-VN") + " VND"}
//                                   </span>
//                                 </li>
//                               );
//                             })}
//                           </ul>
//                         </div>
//                         <div className="your-order-bottom">
//                           <ul>
//                             <li className="your-order-shipping">Shipping</li>
//                             <li>Free shipping</li>
//                           </ul>
//                           {selectedVoucher && (
//                             <div className="your-order-discount">
//                               <ul>
//                                 <li className="order-discount">Discount</li>
//                                 <li>
//                                   {(
//                                     cartTotalPrice -
//                                     getDiscountPrice(
//                                       cartTotalPrice,
//                                       selectedVoucher.discount
//                                     )
//                                   ).toLocaleString("vi-VN") + " VND"}
//                                 </li>
//                               </ul>
//                             </div>
//                           )}
//                         </div>
//                         <div className="your-order-total">
//                           <ul>
//                             <li className="order-total">Total</li>
//                             <li>
//                               {selectedVoucher
//                                 ? getDiscountPrice(
//                                     cartTotalPrice,
//                                     selectedVoucher.discount
//                                   ).toLocaleString("vi-VN") + " VND"
//                                 : cartTotalPrice.toLocaleString("vi-VN") +
//                                   " VND"}
//                             </li>
//                           </ul>
//                         </div>
//                       </div>
//                       <div className="payment-method"></div>
//                     </div>
//                     <div className="place-order mt-25">
//                       <button
//                         className="btn-hover"
//                         onClick={() => placeOrder(cartTotalPrice)}
//                       >
//                         Place Order
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="row">
//                 <div className="col-lg-12">
//                   <div className="item-empty-area text-center">
//                     <div className="item-empty-area__icon mb-30">
//                       <i className="pe-7s-cash"></i>
//                     </div>
//                     <div className="item-empty-area__text">
//                       No items found in cart to checkout <br />{" "}
//                       <Link to={process.env.PUBLIC_URL + "/shop"}>
//                         Shop Now
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </LayoutOne>
//     </Fragment>
//   );
// };

// export default Checkout;

import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import Cookies from "js-cookie";
import { myVoucher } from "../../utils/VoucherService";
import { userInfo } from "../../utils/UserService";
import axios from "axios";

const Checkout = () => {
  let cartTotalPrice = 0;

  let { pathname } = useLocation();
  let navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const authToken = Cookies.get("authToken");

  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orderNotes, setOrderNotes] = useState(""); // Added state for order notes

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await myVoucher({
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setVouchers(response.data);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };

    fetchVouchers();
  }, [authToken]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await userInfo();
        setUser(response.data);
        setFullName(response.data.fullName);
        setAddress(response.data.address);
        setEmail(response.data.email);
        setPhone(response.data.phone);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleVoucherChange = (event) => {
    const selectedVoucherId = event.target.value;
    const selectedVoucher = vouchers.find(
      (voucher) => voucher.voucherId === parseInt(selectedVoucherId)
    );
    setSelectedVoucher(selectedVoucher);
  };

  if (selectedVoucher) {
    const discountAmount = (cartTotalPrice * selectedVoucher.discount) / 100;
    cartTotalPrice -= discountAmount;
  }

  const placeOrder = async (amount) => {
    let finalAmount = amount;
    let discountAmount = 0;
  
    if (selectedVoucher) {
      discountAmount = (amount * selectedVoucher.discount) / 100;
      finalAmount = amount - discountAmount;
    }
  
    const orderInfo = {
      cartItems,
      fullName,
      address,
      email,
      phone,
      totalAmount: finalAmount,
      discountAmount, // Include discount amount
      transactionTime: new Date().toLocaleString(),
      orderNotes,
      selectedVoucher,
    };
  
    // Save order information to localStorage
    localStorage.setItem('orderInfo', JSON.stringify(orderInfo));
  
    try {
      const response = await axios.get(
        `http://localhost:8080/payment/create-payment?amount=${finalAmount}&bankCode=NCB`
      );
      const { status, message, url } = response.data;
      if (status === "OK") {
        window.location.href = url; // Redirect to the payment URL
      } else {
        console.error("Failed to create payment:", message);
      }
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  };
  
  
  return (
    <Fragment>
      <SEO titleTemplate="Checkout" description="Lactobloom Checkout Page." />
      <LayoutOne headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Checkout", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Order Details</h3>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Full Name</label>
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Address</label>
                          <input
                            className="billing-address"
                            placeholder="House number and street name"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Email</label>
                          <input
                            className="billing-address"
                            placeholder="abc@example.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Phone</label>
                          <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Voucher</label>
                          <select onChange={handleVoucherChange}>
                            <option value="">Select a voucher</option>
                            {vouchers.map((voucher) => (
                              <option
                                key={voucher.voucherId}
                                value={voucher.voucherId}
                              >
                                Discount {voucher.discount}%, Expire Date:{" "}
                                {voucher.expirationDate}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="additional-info-wrap">
                      <h4>Additional information</h4>
                      <div className="additional-info">
                        <label>Order notes</label>
                        <textarea
                          placeholder="Notes about your order, e.g. special notes for delivery. "
                          name="message"
                          value={orderNotes}
                          onChange={(e) => setOrderNotes(e.target.value)} // Handle order notes change
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem, key) => {
                              console.log(cartItems);
                              const discountedPrice = getDiscountPrice(
                                cartItem.price,
                                cartItem.discount
                              );
                              const finalProductPrice = cartItem.price;
                              const finalDiscountedPrice = discountedPrice * 1;

                              discountedPrice != null
                                ? (cartTotalPrice +=
                                    finalDiscountedPrice *
                                    cartItem.quantity).toLocaleString("vi-VN")
                                : (cartTotalPrice +=
                                    finalProductPrice *
                                    cartItem.quantity).toLocaleString("vi-VN");
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.productName} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? (
                                          finalDiscountedPrice *
                                          cartItem.quantity
                                        ).toLocaleString("vi-VN") + " VND"
                                      : (
                                          finalProductPrice * cartItem.quantity
                                        ).toLocaleString("vi-VN") + " VND"}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Shipping</li>
                            <li>Free shipping</li>
                          </ul>
                          {selectedVoucher && (
                            <div className="your-order-discount">
                              <ul>
                                <li className="order-discount">Discount</li>
                                <li>
                                  {(
                                    cartTotalPrice -
                                    getDiscountPrice(
                                      cartTotalPrice,
                                      selectedVoucher.discount
                                    )
                                  ).toLocaleString("vi-VN") + " VND"}
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>
                              {selectedVoucher
                                ? getDiscountPrice(
                                    cartTotalPrice,
                                    selectedVoucher.discount
                                  ).toLocaleString("vi-VN") + " VND"
                                : cartTotalPrice.toLocaleString("vi-VN") +
                                  " VND"}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div className="place-order mt-25">
                      <button
                        className="btn-hover"
                        onClick={() => placeOrder(cartTotalPrice)}
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Checkout;
