import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDiscountPrice } from "../../../helpers/product";
import { deleteFromCart } from "../../../store/slices/cart-slice";
import { getImagesByProductId } from "../../../utils/ImageService";

const MenuCart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [cartItemsWithImages, setCartItemsWithImages] = useState([]);
  const defaultImage = "/assets/img/no-image.png"; // Default image URL
  let cartTotalPrice = 0;

  useEffect(() => {
    const fetchImagesForCartItems = async () => {
      const updatedCartItems = await Promise.all(
        cartItems.map(async (item) => {
          try {
            const response = await getImagesByProductId(item.productId);
            const images = response.data.map((img) => img.imageUrl);
            return {
              ...item,
              image: images.length > 0 ? images : [defaultImage]
            };
          } catch (error) {
            console.error("Error fetching images:", error);
            return {
              ...item,
              image: [defaultImage]
            };
          }
        })
      );
      setCartItemsWithImages(updatedCartItems);
    };

    if (cartItems.length > 0) {
      fetchImagesForCartItems();
    } else {
      setCartItemsWithImages([]);
    }
  }, [cartItems]);

  return (
    <div className="shopping-cart-content">
      {cartItemsWithImages && cartItemsWithImages.length > 0 ? (
        <Fragment>
          <ul>
            {cartItemsWithImages.map((item) => {
              const discountedPrice = getDiscountPrice(item.price, item.discount);
              const finalProductPrice = (item.price * 1);
              const finalDiscountedPrice = (discountedPrice * 1);

              discountedPrice != null
                ? (cartTotalPrice += finalDiscountedPrice * item.quantity)
                : (cartTotalPrice += finalProductPrice * item.quantity);

              return (
                <li className="single-shopping-cart" key={item.cartItemId}>
                  <div className="shopping-cart-img">
                    <Link to={process.env.PUBLIC_URL + "/product/" + item.productId}>
                      <img
                        alt=""
                        src={item.image[0] || defaultImage}
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link to={process.env.PUBLIC_URL + "/product/" + item.productId}>
                        {item.productName}
                      </Link>
                    </h4>
                    <h6>Qty: {item.quantity}</h6>
                    <span>
                      {discountedPrice !== null
                        ? finalDiscountedPrice.toLocaleString("vi-VN") + " VND"
                        : finalProductPrice.toLocaleString("vi-VN") + " VND"}
                    </span>
                  </div>
                  <div className="shopping-cart-delete">
                    <button onClick={() => dispatch(deleteFromCart(item.cartItemId))}>
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Total :{" "}
              <span className="shop-total">
                {cartTotalPrice.toLocaleString("vi-VN") + " VND"}
              </span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>
              View Cart
            </Link>
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/checkout"}>
              Checkout
            </Link>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">No items added to cart</p>
      )}
    </div>
  );
};

export default MenuCart;

