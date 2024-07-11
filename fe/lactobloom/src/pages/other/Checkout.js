<<<<<<< Updated upstream
import { Fragment } from "react";
=======
import React, { Fragment, useState, useEffect } from "react";
>>>>>>> Stashed changes
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const Checkout = () => {
  let cartTotalPrice = 0;

  let { pathname } = useLocation();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);

<<<<<<< Updated upstream
=======
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
    localStorage.setItem("orderInfo", JSON.stringify(orderInfo));

    try {
      const response = await createPayment(finalAmount);
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

>>>>>>> Stashed changes
  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="Lactobloom Checkout Page."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Checkout", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Billing Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>First Name</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Last Name</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Company Name</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-select mb-20">
                          <label>Country</label>
                          <select>
                            <option>Select a country</option>
                            <option>Azerbaijan</option>
                            <option>Bahamas</option>
                            <option>Bahrain</option>
                            <option>Bangladesh</option>
                            <option>Barbados</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Street Address</label>
                          <input
                            className="billing-address"
                            placeholder="House number and street name"
                            type="text"
                          />
                          <input
                            placeholder="Apartment, suite, unit etc."
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Town / City</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>State / County</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Postcode / ZIP</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Phone</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Email Address</label>
                          <input type="text" />
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
                          defaultValue={""}
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
                              const discountedPrice = getDiscountPrice(
                                cartItem.price,
                                cartItem.discount
                              );
                              const finalProductPrice = (
                                cartItem.price * 1
                              );
                              const finalDiscountedPrice = (
                                discountedPrice * 1
                              );

                              discountedPrice != null
                                ? (cartTotalPrice +=
                                    finalDiscountedPrice * cartItem.quantity)
                                : (cartTotalPrice +=
                                    finalProductPrice * cartItem.quantity);
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.preOrder &&
                                    cartItem.stock <= 0 &&
                                    authToken ? (
                                      <>
                                        {cartItem.productName}{" "}{"(Pre Order)"} X{" "}
                                        {cartItem.quantity} 
                                      </>
                                    ) : (
                                      <>
                                        {cartItem.productName} X{" "}
                                        {cartItem.quantity}
                                      </>
                                    )}
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
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>
                              {cartTotalPrice.toLocaleString("vi-VN") + " VND"}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div className="place-order mt-25">
                      <button className="btn-hover">Place Order</button>
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
                      <Link to={process.env.PUBLIC_URL + "/shop"}>
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
