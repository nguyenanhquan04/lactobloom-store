import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { addToCart } from "../../store/slices/cart-slice";
import { deleteFromWishlist, deleteAllFromWishlist } from "../../store/slices/wishlist-slice"
import { getImagesByProductId } from "../../utils/ImageService";

const Wishlist = () => {
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  
  const currency = useSelector((state) => state.currency);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);
  
  const [wishlistImages, setWishlistImages] = useState({});

  useEffect(() => {
    const fetchWishlistImages = async () => {
      const imagesMap = {};
      for (const wishlistItem of wishlistItems) {
        try {
          const response = await getImagesByProductId(wishlistItem.productId);
          imagesMap[wishlistItem.productId] = response.data.length > 0 ? response.data[0].imageUrl : "/assets/img/no-image.png";
        } catch (error) {
          console.error("Error fetching images:", error);
          imagesMap[wishlistItem.productId] = "/assets/img/no-image.png";
        }
      }
      setWishlistImages(imagesMap);
    };

    if (wishlistItems.length > 0) {
      fetchWishlistImages();
    }
  }, [wishlistItems]);

  return (
    <Fragment>
      <SEO
        titleTemplate="Wishlist"
        description="Lactobloom Wishlist Page."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Wishlist", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {wishlistItems && wishlistItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Sản phẩm yêu thích</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
<<<<<<< Updated upstream
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Add To Cart</th>
                            <th>action</th>
=======
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Thêm vào giỏ</th>
                            <th>Xóa</th>
>>>>>>> Stashed changes
                          </tr>
                        </thead>
                        <tbody>
                          {wishlistItems.map((wishlistItem, key) => {
                            const discountedPrice = getDiscountPrice(
                              wishlistItem.price,
                              wishlistItem.discount
                            );
                            const finalProductPrice = (
                              wishlistItem.price * 1
                            );
                            const finalDiscountedPrice = (
                              discountedPrice * 1
                            );
                            const cartItem = cartItems.find(
                              item => item.productId === wishlistItem.productId
                            );
                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      wishlistItem.productId
                                    }
                                  >
                                    <img
                                      className="img-fluid"
                                      src={
                                        process.env.PUBLIC_URL +
                                        (wishlistImages[wishlistItem.productId] || "/assets/img/no-image.png")
                                      }
                                      alt={wishlistItem.productName}
                                    />
                                  </Link>
                                </td>

                                <td className="product-name text-center">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product/" +
                                      wishlistItem.productId
                                    }
                                  >
                                    {wishlistItem.productName}
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

                                <td className="product-wishlist-cart">
                                  {wishlistItem.stock && wishlistItem.stock > 0 ? (
                                    <button
                                      onClick={() =>
                                        dispatch(addToCart(wishlistItem))
                                      }
                                      className={
                                        cartItem !== undefined &&
                                        cartItem.quantity > 0
                                          ? "active"
                                          : ""
                                      }
                                      disabled={
                                        cartItem !== undefined &&
                                        cartItem.quantity > 0
                                      }
                                      title={
                                        wishlistItem !== undefined
                                          ? "Added to cart"
                                          : "Add to cart"
                                      }
                                    >
                                      {cartItem !== undefined &&
                                      cartItem.quantity > 0
                                        ? "Added"
                                        : "Add to cart"}
                                    </button>
                                  ) : wishlistItem.stock && wishlistItem.stock <= 0 && wishlistItem.preOrder && authToken  ? (
                                    <button
                                      onClick={() =>
                                        dispatch(addToCart(wishlistItem))
                                      }
                                      className={
                                        cartItem !== undefined &&
                                        cartItem.quantity > 0
                                          ? "active"
                                          : ""
                                      }
                                      disabled={
                                        cartItem !== undefined &&
                                        cartItem.quantity > 0
                                      }
                                      title={
                                        wishlistItem !== undefined
                                          ? "Added to cart"
                                          : "Pre Order"
                                      }
                                    >
                                      {cartItem !== undefined &&
                                      cartItem.quantity > 0
                                        ? "Added"
                                        : "Pre Order"}
                                    </button>
                                  ) : (
                                    <button disabled className="active">
                                      Hết hàng
                                    </button>
                                  )}
                                </td>

                                <td className="product-remove">
                                  <button
                                    onClick={() =>
                                      dispatch(deleteFromWishlist(wishlistItem.productId))
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
                          Tiếp tục mua hàng
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => dispatch(deleteAllFromWishlist())}>
                          Clear Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-like"></i>
                    </div>
                    <div className="item-empty-area__text">
                      Không có sản phẩm yêu thích <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop"}>
                        Thêm sản phẩm
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

export default Wishlist;
