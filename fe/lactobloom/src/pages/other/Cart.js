import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  cartItemStock,
  deleteAllFromCart
} from "../../redux/actions/cartActions";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const Cart = ({
  location,
  cartItems,
  decreaseQuantity,
  addToCart,
  deleteFromCart,
  deleteAllFromCart
}) => {
  const [quantityCount] = useState(1);
  const { addToast } = useToasts();
  const { pathname } = location;
  let cartTotalPrice = 0;

  const defaultImage = "/assets/img/no-image.png";

  return (
    <Fragment>
      <MetaTags>
        <title>LactoBloom Store | Cart</title>
        <meta
          name="description"
          content="Cart page of LactoBloom Store"
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Cart
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Your cart items</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((cartItem, key) => {
                            const discountedPrice = getDiscountPrice(
                              cartItem.price,
                              cartItem.discount
                            );
                            const finalProductPrice = (
                              cartItem.price 
                            );
                            const finalDiscountedPrice = (
                              discountedPrice * 1
                            );

                            const cartItemImage = cartItem.images && cartItem.images.length > 0 ? cartItem.images[0].imageUrl : defaultImage;

                            discountedPrice != null
                              ? (cartTotalPrice +=
                                  finalDiscountedPrice * cartItem.quantity).toLocaleString("vi-VN")
                              : (cartTotalPrice +=
                                  finalProductPrice * cartItem.quantity).toLocaleString("vi-VN");
                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.productId
                                    }
                                  >
                                    <img
                                      className="img-fluid"
                                      src={
                                        process.env.PUBLIC_URL +
                                        cartItemImage
                                      }
                                      alt=""
                                    />
                                  </Link>
                                </td>

                                <td className="product-name">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      cartItem.productId
                                    }
                                  >
                                    {cartItem.productName}
                                  </Link>                             
                                </td>

                                <td className="product-price-cart">
                                  {discountedPrice !== null ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {finalProductPrice.toLocaleString("vi-VN") + " VND"}
                                      </span>
                                      <span className="amount">
                                        {finalDiscountedPrice.toLocaleString("vi-VN") + " VND"}
                                      </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {finalProductPrice.toLocaleString("vi-VN") + " VND"}
                                    </span>
                                  )}
                                </td>

                                <td className="product-quantity">
                                  <div className="cart-plus-minus">
                                    <button
                                      className="dec qtybutton"
                                      onClick={() =>
                                        decreaseQuantity(cartItem, addToast)
                                      }
                                    >
                                      -
                                    </button>
                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={cartItem.quantity}
                                      readOnly
                                    />
                                    <button
                                      className="inc qtybutton"
                                      onClick={() =>
                                        addToCart(
                                          cartItem,
                                          addToast,
                                          quantityCount
                                        )
                                      }
                                      disabled={
                                        cartItem !== undefined &&
                                        cartItem.quantity &&
                                        cartItem.quantity >=
                                          cartItemStock(
                                            cartItem
                                          )
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  {discountedPrice !== null
                                    ? (
                                        finalDiscountedPrice * cartItem.quantity
                                      ).toLocaleString("vi-VN") + " VND"
                                    : (
                                        finalProductPrice * cartItem.quantity
                                      ).toLocaleString("vi-VN") + " VND"}
                                </td>

                                <td className="product-remove">
                                  <button
                                    onClick={() =>
                                      deleteFromCart(cartItem, addToast)
                                    }
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link
                          to={process.env.PUBLIC_URL + "/shop"}
                        >
                          Continue Shopping
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => deleteAllFromCart(addToast)}>
                          Clear Shopping Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                <div className="col-lg-4 col-md-6"></div>                 
                  <div className="col-lg-4 col-md-6">
                    <div className="discount-code-wrapper">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Use Coupon Code
                        </h4>
                      </div>
                      <div className="discount-code">
                        <p>Enter your coupon code if you have one.</p>
                        <form>
                          <input type="text" required name="name" />
                          <button className="cart-btn-2" type="submit">
                            Apply Coupon
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Cart Total
                        </h4>
                      </div>
                      <h5>
                        Total products{" "}
                        <span>
                          {cartTotalPrice.toLocaleString("vi-VN") + " VND"}
                        </span>
                      </h5>

                      <h4 className="grand-totall-title">
                        Grand Total{" "}
                        <span>
                          {cartTotalPrice.toLocaleString("vi-VN") + " VND"}
                        </span>
                      </h4>
                      <Link to={process.env.PUBLIC_URL + "/checkout"}>
                        Proceed to Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart <br />{" "}
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

Cart.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  decreaseQuantity: PropTypes.func,
  location: PropTypes.object,
  deleteAllFromCart: PropTypes.func,
  deleteFromCart: PropTypes.func
};

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    decreaseQuantity: (item, addToast) => {
      dispatch(decreaseQuantity(item, addToast));
    },
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
    deleteAllFromCart: addToast => {
      dispatch(deleteAllFromCart(addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
