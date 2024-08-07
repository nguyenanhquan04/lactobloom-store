// import { Fragment, useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import clsx from "clsx";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import Rating from "./sub-components/ProductRating";
// import { getDiscountPrice } from "../../helpers/product";
// import ProductModal from "./ProductModal";
// import { addToCart } from "../../store/slices/cart-slice";
// import { addToWishlist } from "../../store/slices/wishlist-slice";
// import { getImagesByProductId } from "../../utils/ImageService";

// const ProductGridSingle = ({
//   product,
//   currency,
//   cartItem,
//   wishlistItem,
//   compareItem,
//   spaceBottomClass
// }) => {
//   const [modalShow, setModalShow] = useState(false);
//   const [productImages, setProductImages] = useState("/assets/img/no-image.png");

//   const discountedPrice = getDiscountPrice(product.price, product.discount);
//   const finalProductPrice = +(product.price * 1);
//   const finalDiscountedPrice = +(
//     discountedPrice * 1
//   );
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchProductImages = async () => {
//       try {
//         const response = await getImagesByProductId(product.productId);
//         // console.log(response.data[0].imageUrl);
//         setProductImages(response.data[0].imageUrl);
//       } catch (error) {
//         console.error("Error fetching images:", error);
//       }
//     };

//     fetchProductImages();
//   }, [product.productId]);

//   return (
//     <Fragment>
//       <div className={clsx("product-wrap", spaceBottomClass)}>
//         <div className="product-img">
//           <Link to={process.env.PUBLIC_URL + "/product/" + product.productId}>
//             <img
//               className="default-img"
//               src={process.env.PUBLIC_URL + productImages}
//               alt=""
//             />           
//           </Link>
//           {product.discount || product.new ? (
//             <div className="product-img-badges">
//               {product.discount ? (
//                 <span className="pink">-{product.discount}%</span>
//               ) : (
//                 ""
//               )}
//               {product.new ? <span className="purple">New</span> : ""}
//             </div>
//           ) : (
//             ""
//           )}

//           <div className="product-action">
//             <div className="pro-same-action pro-wishlist">
//               <button
//                 className={wishlistItem !== undefined ? "active" : ""}
//                 disabled={wishlistItem !== undefined}
//                 title={
//                   wishlistItem !== undefined
//                     ? "Đã thêm vào yêu thích"
//                     : "Thêm vào yêu thích"
//                 }
//                 onClick={() => dispatch(addToWishlist(product))}
//               >
//                 <i className="pe-7s-like" />
//               </button>
//             </div>
//             <div className="pro-same-action pro-cart">
//               {product.affiliateLink ? (
//                 <a
//                   href={product.affiliateLink}
//                   rel="noopener noreferrer"
//                   target="_blank"
//                 >
//                   {" "}
//                   Buy now{" "}
//                 </a>
//               ) : product.variation && product.variation.length >= 1 ? (
//                 <Link to={`${process.env.PUBLIC_URL}/product/${product.productId}`}>
//                   Select Option
//                 </Link>
//               ) : product.stock && product.stock > 0 ? (
//                 <button
//                   onClick={() => dispatch(addToCart(product))}
//                   className={
//                     cartItem !== undefined && cartItem.quantity > 0
//                       ? "active"
//                       : ""
//                   }
//                   disabled={cartItem !== undefined && cartItem.quantity > 0}
//                   title={
//                     cartItem !== undefined ? "Đã thêm" : "Thêm vào giỏ"
//                   }
//                 >
//                   {" "}
//                   <i className="pe-7s-cart"></i>{" "}
//                   {cartItem !== undefined && cartItem.quantity > 0
//                     ? "Đã thêm"
//                     : "Thêm vào giỏ"}
//                 </button>
//               ) : (
//                 <button disabled className="active">
//                   Hết hàng
//                 </button>
//               )}
//             </div>
//             <div className="pro-same-action pro-quickview">
//               <button title="Quick View" onClick={() => setModalShow(true)}>
//                 <i className="pe-7s-look" />
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="product-content text-center">
//           <h3>
//             <Link to={process.env.PUBLIC_URL + "/product/" + product.productId}>
//               {product.productName}
//             </Link>
//           </h3>
//           {product.rating && product.rating > 0 ? (
//             <div className="product-rating">
//               <Rating ratingValue={product.rating} />
//             </div>
//           ) : (
//             ""
//           )}
//           <div className="product-price">
//             {discountedPrice !== null ? (
//               <Fragment>
//                 <span>{finalDiscountedPrice.toLocaleString("vi-VN") + " VND"}</span>{" "}
//                 <span className="old">
//                   {finalProductPrice.toLocaleString("vi-VN") + " VND"}
//                 </span>
//               </Fragment>
//             ) : (
//               <span>{finalProductPrice.toLocaleString("vi-VN") + " VND"} </span>
//             )}
//           </div>
//         </div>
//       </div>
//       {/* product modal */}
//       <ProductModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//         product={product}
//         currency={currency}
//         discountedPrice={discountedPrice}
//         finalProductPrice={finalProductPrice}
//         finalDiscountedPrice={finalDiscountedPrice}
//         wishlistItem={wishlistItem}
//         compareItem={compareItem}
//       />
//     </Fragment>
//   );
// };

// ProductGridSingle.propTypes = {
//   cartItem: PropTypes.shape({}),
//   compareItem: PropTypes.shape({}),
//   wishlistItem: PropTypes.shape({}),
//   currency: PropTypes.shape({}),
//   product: PropTypes.shape({}),
//   sliderClassName: PropTypes.string,
//   spaceBottomClass: PropTypes.string,
// };

// export default ProductGridSingle;


import { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Rating from "./sub-components/ProductRating";
import { getDiscountPrice } from "../../helpers/product";
import ProductModal from "./ProductModal";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist, addToWishlistFormAPI } from "../../store/slices/wishlist-slice";
import { getImagesByProductId } from "../../utils/ImageService";

import Cookies from "js-cookie";
import { myWishlist, saveWishlist } from "../../utils/WishlistService";

const ProductGridSingle = ({
  product,
  currency,
  cartItem,
  wishlistItem,
  compareItem,
  spaceBottomClass
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [productImages, setProductImages] = useState("/assets/img/no-image.png");
  const [isProductInWishlist, setIsProductInWishlist] = useState(false);
  const [authToken, setAuthToken] = useState(null);

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

    const fetchWishlistData = async () => {
      try {
        const token = Cookies.get("authToken");
        setAuthToken(token);
        if (token) {
          const response = await myWishlist(token);
          const wishlistData = response.data;
          setIsProductInWishlist(wishlistData.some(item => item.productId === product.productId));
        }
      } catch (error) {
        console.error("Error fetching wishlist data:", error);
      }
    };

    fetchProductImages();
    fetchWishlistData();
  }, [product.productId]);

  const handleWishlistClick = async () => {
    if (authToken) {
      try {
        await saveWishlist(authToken, product.productId);
        dispatch(addToWishlist(product));
        setIsProductInWishlist(true);
      } catch (error) {
        console.error("Error saving to wishlist:", error);
      }
    } else {
      dispatch(addToWishlist(product));
      setIsProductInWishlist(true);
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
                onClick={handleWishlistClick}
              >
                <i className="pe-7s-like" />
              </button>
            </div>
            <div className="pro-same-action pro-cart">
              {product.preOrder === false && product.stock && product.stock > 0 ? (
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className={
                    cartItem !== undefined && cartItem.quantity > 0
                      ? "active"
                      : ""
                  }
                  disabled={cartItem !== undefined && cartItem.quantity > 0}
                  title={
                    cartItem !== undefined ? "Đã thêm vào giỏ hàng" : "Thêm vào giỏ"
                  }
                >
                  {" "}
                  <i className="pe-7s-cart"></i>{" "}
                  {cartItem !== undefined && cartItem.quantity > 0
                    ? "Đã thêm"
                    : "Thêm vào giỏ"}
                </button>
              ) : product.stock > 0 && product.preOrder && authToken ? (
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className={
                    cartItem !== undefined && cartItem.quantity > 0
                      ? "active"
                      : ""
                  }
                  disabled={cartItem !== undefined && cartItem.quantity > 0}
                  title={
                    cartItem !== undefined ? "Đã thêm vào giỏ hàng" : "Đặt trước"
                  }
                >
                  {" "}
                  <i className="pe-7s-cart"></i>{" "}
                  {cartItem !== undefined && cartItem.quantity > 0
                    ? "Đã thêm"
                    : "Đặt trước"}
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
          {product.rating && product.rating > 0 ? (
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

ProductGridSingle.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  product: PropTypes.shape({}),
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductGridSingle;
