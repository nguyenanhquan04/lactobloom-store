import PropTypes from "prop-types";
import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";
import axios from "axios";
import { getDiscountPrice } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist, addToWishlistFormAPI } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";
import { getImagesByProductId } from "../../utils/ImageService";
import { getProductReviewByProductId } from "../../utils/ProductReviewService";
import Cookies from "js-cookie";

const ProductGridListSingle = ({
  product,
  currency,
  cartItem,
  wishlistItem,
  compareItem,
  spaceBottomClass
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [productImages, setProductImages] = useState("/assets/img/no-image.png");
  const [averageRating, setAverageRating] = useState(0);
  const [wishlistData, setWishlistData] = useState([]);
  const [authToken, setAuthToken] = useState(null);

  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price * 1);
  const finalDiscountedPrice = +(discountedPrice * 1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        const response = await getImagesByProductId(product.productId);
        setProductImages(response.data[0].imageUrl);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    const fetchProductReviews = async () => {
      try {
        const response = await getProductReviewByProductId(product.productId);
        const reviews = response.data;
        const totalRating = reviews.reduce((acc, review) => acc + review.rate, 0);
        const avgRating = reviews.length ? totalRating / reviews.length : 0;
        setAverageRating(avgRating);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    const fetchWishlistData = async () => {
      try {
        const token = Cookies.get("authToken");
        setAuthToken(token);
        const response = await axios.get("http://localhost:8080/wishlist/myWishlist", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setWishlistData(response.data);
        response.data.forEach((item) => {
          if (item.productId === product.productId) {
            dispatch(addToWishlistFormAPI(product));
          }
        });
      } catch (error) {
        console.error("Error fetching wishlist data:", error);
      }
    };

    fetchProductImages();
    fetchProductReviews();
    fetchWishlistData();
  }, [product.productId, dispatch, product]);

  const isProductInWishlist = wishlistData.some(
    (wishlistItem) => wishlistItem.productId === product.productId
  );

  const handleWishlistClick = async (product) => {
    if (authToken) {
      try {
        await axios.post(`http://localhost:8080/wishlist/save/product/${product.productId}`, {}, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        dispatch(addToWishlist(product));
      } catch (error) {
        console.error("Error saving to wishlist:", error);
      }
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <Fragment>
      <div className={clsx("product-wrap", spaceBottomClass)}>
        <div className="product-img">
          <Link to={process.env.PUBLIC_URL + "/product/" + product.productId}>
            <img
              className="default-img"
              src={process.env.PUBLIC_URL + productImages}
              alt={product.productName}
            />
          </Link>
          {product.discount || product.new ? (
            <div className="product-img-badges">
              {product.discount ? (
                <span className="pink">-{product.discount}%</span>
              ) : (
                ""
              )}
              {product.new ? <span className="purple">New</span> : ""}
            </div>
          ) : (
            ""
          )}

          <div className="product-action">
            <div className="pro-same-action pro-wishlist">
              <button
                className={isProductInWishlist ? "active" : ""}
                disabled={isProductInWishlist}
                title={
                  isProductInWishlist
                    ? "Đã thêm vào yêu thích"
                    : "Thêm vào yêu thích"
                }
                onClick={() => handleWishlistClick(product)}
              >
                <i className="pe-7s-like" />
              </button>
            </div>
            <div className="pro-same-action pro-cart">
              {product.affiliateLink ? (
                <a
                  href={product.affiliateLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {" "}
                  Buy now{" "}
                </a>
              ) : product.variation && product.variation.length >= 1 ? (
                <Link to={`${process.env.PUBLIC_URL}/product/${product.productId}`}>
                  Select Option
                </Link>
              ) : product.stock && product.stock > 0 ? (
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className={
                    cartItem !== undefined && cartItem.quantity > 0
                      ? "active"
                      : ""
                  }
                  disabled={cartItem !== undefined && cartItem.quantity > 0}
                  title={
                    cartItem !== undefined ? "Đã thêm" : "Thêm vào giỏ"
                  }
                >
                  {" "}
                  <i className="pe-7s-cart"></i>{" "}
                  {cartItem !== undefined && cartItem.quantity > 0
                    ? "Đã thêm"
                    : "Thêm vào giỏ"}
                </button>
              ) : product.stock <= 0 && product.preOrder && authToken ? (
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className={
                    cartItem !== undefined && cartItem.quantity > 0
                      ? "active"
                      : ""
                  }
                  disabled={cartItem !== undefined && cartItem.quantity > 0}
                  title={
                    cartItem !== undefined ? "Đã thêm vào giỏ hàng" : "Pre Order"
                  }
                >
                  {" "}
                  <i className="pe-7s-cart"></i>{" "}
                  {cartItem !== undefined && cartItem.quantity > 0
                    ? "Đã thêm"
                    : "Pre Order"}
                </button>
              ) : (
                <button disabled className="active">
                  Hết hàng
                </button>
              )}
            </div>
            <div className="pro-same-action pro-quickview">
              <button onClick={() => setModalShow(true)} title="Quick View">
                <i className="pe-7s-look" />
              </button>
            </div>
          </div>
        </div>
        <div className="product-content text-center">
          {(product.stock <= 0 && product.preOrder && authToken) ?
          <h3>
            <Link to={process.env.PUBLIC_URL + "/product/" + product.productId}>
              {product.productName}{" "}(Pre Order)
            </Link> 
          </h3>
          :
          <h3>
            <Link to={process.env.PUBLIC_URL + "/product/" + product.productId}>
              {product.productName}
            </Link>
          </h3>}
          {averageRating && averageRating > 0 ? (
            <div className="product-rating">
              <Rating ratingValue={averageRating} />
              <span>({averageRating.toFixed(1)} out of 5)</span>
            </div>
          ) : (
            <div className="product-rating">
              <Rating ratingValue={0} />
              <span>(0 out of 5)</span>
            </div>
          )}
          <div className="product-price">
            {discountedPrice !== null ? (
              <Fragment>
                <span>{finalDiscountedPrice.toLocaleString("vi-VN") + " VND"}</span>{" "}
                <span className="old">
                  {finalProductPrice.toLocaleString("vi-VN") + " VND"}
                </span>
              </Fragment>
            ) : (
              <span>{finalProductPrice.toLocaleString("vi-VN") + " VND"} </span>
            )}
          </div>
        </div>
      </div>
      <div className="shop-list-wrap mb-30">
        <div className="row">
          <div className="col-xl-4 col-md-5 col-sm-6">
            <div className="product-list-image-wrap">
              <div className="product-img">
                <Link to={process.env.PUBLIC_URL + "/product/" + product.productId}>
                  <img
                    className="default-img img-fluid"
                    src={process.env.PUBLIC_URL + productImages}
                    alt={product.productName}
                  />
                </Link>
                {product.discount || product.new ? (
                  <div className="product-img-badges">
                    {product.discount ? (
                      <span className="pink">-{product.discount}%</span>
                    ) : (
                      ""
                    )}
                    {product.new ? <span className="purple">New</span> : ""}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-md-7 col-sm-6">
            <div className="shop-list-content">
              <h3>
                <Link to={process.env.PUBLIC_URL + "/product/" + product.productId}>
                  {product.productName}
                </Link>
              </h3>
              {averageRating && averageRating > 0 ? (
                <div className="product-list-rating">
                  <Rating ratingValue={averageRating} />
                  <span>({averageRating.toFixed(1)} out of 5)</span>
                </div>
              ) : (
                <div className="product-list-rating">
                  <Rating ratingValue={0} />
                  <span>(0 out of 5)</span>
                </div>
              )}
              {discountedPrice !== null ? (
                <div className="product-list-price">
                  <span>
                    {finalDiscountedPrice.toLocaleString("vi-VN") + " VND"}
                  </span>{" "}
                  <span className="old">
                    {finalProductPrice.toLocaleString("vi-VN") + " VND"}
                  </span>
                </div>
              ) : (
                <div className="product-list-price">
                  <span>
                    {finalProductPrice.toLocaleString("vi-VN") + " VND"}
                  </span>
                </div>
              )}
              {product.shortDescription ? (
                <p>{product.shortDescription}</p>
              ) : (
                ""
              )}

              <div className="shop-list-actions d-flex align-items-center">
                <div className="shop-list-btn btn-hover">
                  {product.affiliateLink ? (
                    <a
                      href={product.affiliateLink}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {" "}
                      Buy now{" "}
                    </a>
                  ) : product.variation && product.variation.length >= 1 ? (
                    <Link to={`${process.env.PUBLIC_URL}/product/${product.productId}`}>
                      Select Option
                    </Link>
                  ) : product.stock && product.stock > 0 ? (
                    <button
                      onClick={() => dispatch(addToCart(product))}
                      className={
                        cartItem !== undefined && cartItem.quantity > 0
                          ? "active"
                          : ""
                      }
                      disabled={cartItem !== undefined && cartItem.quantity > 0}
                      title={
                        cartItem !== undefined ? "Đã thêm" : "Thêm vào giỏ"
                      }
                    >
                      {" "}
                      <i className="pe-7s-cart"></i>{" "}
                      {cartItem !== undefined && cartItem.quantity > 0
                        ? "Đã thêm"
                        : "Thêm vào giỏ"}
                    </button>
                  ) : product.stock <= 0 && product.preOrder && authToken ? (
                    <button
                      onClick={() => dispatch(addToCart(product))}
                      className="active"
                      title="Pre Order"
                    >
                      {" "}
                      <i className="pe-7s-cart"></i> Pre Order
                    </button>
                  ) : (
                    <button disabled className="active">
                      Hết hàng
                    </button>
                  )}
                </div>
                <div className="shop-list-wishlist ml-10">
                  <button
                    className={isProductInWishlist ? "active" : ""}
                    disabled={isProductInWishlist}
                    title={
                      isProductInWishlist
                        ? "Đã thêm vào yêu thích"
                        : "Thêm vào yêu thích"
                    }
                    onClick={() => handleWishlistClick(product)}
                  >
                    <i className="pe-7s-like" />
                  </button>
                </div>
                <div className="shop-list-compare ml-10">
                  <button
                    className={compareItem !== undefined ? "active" : ""}
                    disabled={compareItem !== undefined}
                    title={
                      compareItem !== undefined
                        ? "Đã thêm vào so sánh"
                        : "Thêm vào so sánh"
                    }
                    onClick={() => dispatch(addToCompare(product))}
                  >
                    <i className="pe-7s-shuffle" />
                  </button>
                </div>
                <div className="shop-list-quickview ml-10">
                  <button
                    onClick={() => setModalShow(true)}
                    title="Quick View"
                  >
                    <i className="pe-7s-look" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        discountedPrice={discountedPrice}
        finalProductPrice={finalProductPrice}
        finalDiscountedPrice={finalDiscountedPrice}
        wishlistItem={wishlistItem}
        compareItem={compareItem}
      />
    </Fragment>
  );
};

ProductGridListSingle.propTypes = {
  product: PropTypes.object,
  currency: PropTypes.object,
  cartItem: PropTypes.object,
  wishlistItem: PropTypes.object,
  compareItem: PropTypes.object,
  spaceBottomClass: PropTypes.string
};

export default ProductGridListSingle;
