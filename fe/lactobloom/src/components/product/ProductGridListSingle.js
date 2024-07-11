import PropTypes from "prop-types";
import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { getDiscountPrice } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";
import { getImagesByProductId } from "../../utils/ImageService";

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
<<<<<<< Updated upstream
=======
  const [averageRating, setAverageRating] = useState(0);
  const [wishlistData, setWishlistData] = useState([]);
  const [authToken, setAuthToken] = useState(null);
>>>>>>> Stashed changes

  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price * 1);
  const finalDiscountedPrice = +(
    discountedPrice * 1
  );
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

<<<<<<< Updated upstream
    fetchProductImages();
  }, [product.productId]);
=======
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
>>>>>>> Stashed changes

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
                className={wishlistItem !== undefined ? "active" : ""}
                disabled={wishlistItem !== undefined}
                title={
                  wishlistItem !== undefined
                    ? "Added to wishlist"
                    : "Add to wishlist"
                }
                onClick={() => dispatch(addToWishlist(product))}
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
                    cartItem !== undefined ? "Added to cart" : "Add to cart"
                  }
                >
                  {" "}
                  <i className="pe-7s-cart"></i>{" "}
                  {cartItem !== undefined && cartItem.quantity > 0
                    ? "Added"
                    : "Add to cart"}
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
                    cartItem !== undefined ? "Added to cart" : "Pre Order"
                  }
                >
                  {" "}
                  <i className="pe-7s-cart"></i>{" "}
                  {cartItem !== undefined && cartItem.quantity > 0
                    ? "Added"
                    : "Pre Order"}
                </button>
              ) : (
                <button disabled className="active">
                  Out of Stock
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
<<<<<<< Updated upstream
          </h3>
          {product.rating && product.rating > 0 ? (
=======
          </h3>}
          {averageRating && averageRating > 0 ? (
>>>>>>> Stashed changes
            <div className="product-rating">
              <Rating ratingValue={product.rating} />
            </div>
          ) : (
            ""
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
<<<<<<< Updated upstream
              <div className="product-list-price">
                {discountedPrice !== null ? (
                  <Fragment>
                    <span>
                      {finalDiscountedPrice.toLocaleString("vi-VN") + " VND"}
                    </span>{" "}
                    <span className="old">
                      {finalProductPrice.toLocaleString("vi-VN") + " VND"}
                    </span>
                  </Fragment>
                ) : (
                  <span>{finalProductPrice.toLocaleString("vi-VN") + " VND"} </span>
                )}
              </div>
              {product.rating && product.rating > 0 ? (
                <div className="rating-review">
                  <div className="product-list-rating">
                    <Rating ratingValue={product.rating} />
                  </div>
                </div>
              ) : (
                ""
              )}
              {product.description ? (
                <p>{product.description}</p>
=======
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
>>>>>>> Stashed changes
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
                    <Link
                      to={`${process.env.PUBLIC_URL}/product/${product.productId}`}
                    >
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
                      disabled={
                        cartItem !== undefined && cartItem.quantity > 0
                      }
                      title={
                        cartItem !== undefined
                          ? "Added to cart"
                          : "Add to cart"
                      }
                    >
                      {" "}
                      <i className="pe-7s-cart"></i>{" "}
                      {cartItem !== undefined && cartItem.quantity > 0
                        ? "Added"
                        : "Add to cart"}
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
                      Out of Stock
                    </button>
                  )}
                </div>
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
                <div className="shop-list-wishlist ml-10">
                  <button
                    className={wishlistItem !== undefined ? "active" : ""}
                    disabled={wishlistItem !== undefined}
                    title={
                      wishlistItem !== undefined
                        ? "Added to wishlist"
                        : "Add to wishlist"
                    }
                    onClick={() => dispatch(addToWishlist(product))}
                  >
                    <i className="pe-7s-like" />
                  </button>
                </div>
                <div className="shop-list-compare ml-10">
<<<<<<< Updated upstream
                  <button
                    className={compareItem !== undefined ? "active" : ""}
                    disabled={compareItem !== undefined}
                    title={
                      compareItem !== undefined
                        ? "Added to compare"
                        : "Add to compare"
                    }
                    onClick={() => dispatch(addToCompare(product))}
                  >
                    <i className="pe-7s-shuffle" />
=======
                  <button
                    className={compareItem !== undefined ? "active" : ""}
                    disabled={compareItem !== undefined}
                    title={
                      compareItem !== undefined
                        ? "Added to compare"
                        : "Add to compare"
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
>>>>>>> Stashed changes
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
        currency={currency}
<<<<<<< Updated upstream
        discountedPrice={discountedPrice}
        finalProductPrice={finalProductPrice}
        finalDiscountedPrice={finalDiscountedPrice}
        wishlistItem={wishlistItem}
        compareItem={compareItem}
=======
        discountedprice={finalDiscountedPrice}
        finalproductprice={finalProductPrice}
        finaldiscountedprice={finalDiscountedPrice}
>>>>>>> Stashed changes
      />
    </Fragment>
  );
};

ProductGridListSingle.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  product: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.shape({})
};

export default ProductGridListSingle;
