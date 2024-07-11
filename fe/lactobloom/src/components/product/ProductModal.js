// import { Fragment, useState } from "react";
// import PropTypes from "prop-types";
// import { EffectFade, Thumbs } from 'swiper';
// import { Modal } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import Rating from "./sub-components/ProductRating";
// import Swiper, { SwiperSlide } from "../../components/swiper";
// import { getProductCartQuantity } from "../../helpers/product";
// import { addToCart } from "../../store/slices/cart-slice";
// import { addToWishlist } from "../../store/slices/wishlist-slice";
// import { addToCompare } from "../../store/slices/compare-slice";

// function ProductModal({ product, currency, discountedPrice, finalProductPrice, finalDiscountedPrice, show, onHide, wishlistItem, compareItem }) {
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   const dispatch = useDispatch();
//   const { cartItems } = useSelector((state) => state.cart);

//   const [quantityCount, setQuantityCount] = useState(1);
//   const productCartQty = getProductCartQuantity(cartItems, product);

//   const gallerySwiperParams = {
//     spaceBetween: 10,
//     loop: true,
//     effect: "fade",
//     fadeEffect: {
//       crossFade: true
//     },
//     thumbs: { swiper: thumbsSwiper },
//     modules: [EffectFade, Thumbs],
//   };

//   const thumbnailSwiperParams = {
//     onSwiper: setThumbsSwiper,
//     spaceBetween: 10,
//     slidesPerView: 4,
//     touchRatio: 0.2,
//     freeMode: true,
//     loop: true,
//     slideToClickedSlide: true,
//     navigation: true
//   };

//   const onCloseModal = () => {
//     setThumbsSwiper(null);
//     onHide();
//   };

//   return (
//     <Modal show={show} onHide={onCloseModal} className="product-quickview-modal-wrapper">
//       <Modal.Header closeButton></Modal.Header>

//       <div className="modal-body">
//         <div className="row">
//           <div className="col-md-5 col-sm-12 col-xs-12">
//             <div className="product-large-image-wrapper">
//               <Swiper options={gallerySwiperParams}>
//                 {product.image &&
//                   product.image.map((img, i) => {
//                     return (
//                       <SwiperSlide key={i}>
//                         <div className="single-image">
//                           <img
//                             src={process.env.PUBLIC_URL + img}
//                             className="img-fluid"
//                             alt="Product"
//                           />
//                         </div>
//                       </SwiperSlide>
//                     );
//                   })}
//               </Swiper>
//             </div>
//             <div className="product-small-image-wrapper mt-15">
//               <Swiper options={thumbnailSwiperParams}>
//                 {product.image &&
//                   product.image.map((img, i) => {
//                     return (
//                       <SwiperSlide key={i}>
//                         <div className="single-image">
//                           <img
//                             src={process.env.PUBLIC_URL + img}
//                             className="img-fluid"
//                             alt=""
//                           />
//                         </div>
//                       </SwiperSlide>
//                     );
//                   })}
//               </Swiper>
//             </div>
//           </div>
//           <div className="col-md-7 col-sm-12 col-xs-12">
//             <div className="product-details-content quickview-content">
//               <h2>{product.productName}</h2>
//               <div className="product-details-price">
//                 {discountedPrice !== null ? (
//                   <Fragment>
//                     <span>
//                       {finalDiscountedPrice.toLocaleString("vi-VN") + " VND"}
//                     </span>{" "}
//                     <span className="old">
//                       {finalProductPrice.toLocaleString("vi-VN") + " VND"}
//                     </span>
//                   </Fragment>
//                 ) : (
//                   <span>{finalProductPrice.toLocaleString("vi-VN") + " VND"} </span>
//                 )}
//               </div>
//               {product.rating && product.rating > 0 ? (
//                 <div className="pro-details-rating-wrap">
//                   <div className="pro-details-rating">
//                     <Rating ratingValue={product.rating} />
//                   </div>
//                 </div>
//               ) : (
//                 ""
//               )}
//               <div className="pro-details-list">
//                 <p>{product.description}</p>
//               </div>
//               {product.affiliateLink ? (
//                 <div className="pro-details-quality">
//                   <div className="pro-details-cart btn-hover">
//                     <a
//                       href={product.affiliateLink}
//                       rel="noopener noreferrer"
//                       target="_blank"
//                     >
//                       Buy Now
//                     </a>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="pro-details-quality">
//                   <div className="cart-plus-minus">
//                     <button
//                       onClick={() =>
//                         setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
//                       }
//                       className="dec qtybutton"
//                     >
//                       -
//                     </button>
//                     <input
//                       className="cart-plus-minus-box"
//                       type="text"
//                       value={quantityCount}
//                       readOnly
//                     />
//                     <button
//                       onClick={() =>
//                         setQuantityCount(
//                           quantityCount < product.stock - productCartQty
//                             ? quantityCount + 1
//                             : quantityCount
//                         )
//                       }
//                       className="inc qtybutton"
//                     >
//                       +
//                     </button>
//                   </div>
//                   <div className="pro-details-cart btn-hover">
//                     {product.stock && product.stock > 0 ? (
//                       <button
//                         onClick={() =>
//                           dispatch(addToCart({
//                             ...product,
//                             quantity: quantityCount,
//                           }))
//                         }
//                         disabled={productCartQty >= product.stock}
//                       >
//                         {" "}
//                         Add To Cart{" "}
//                       </button>
//                     ) : (
//                       <button disabled>Out of Stock</button>
//                     )}
//                   </div>
//                   <div className="pro-details-wishlist">
//                     <button
//                       className={wishlistItem !== undefined ? "active" : ""}
//                       disabled={wishlistItem !== undefined}
//                       title={
//                         wishlistItem !== undefined
//                           ? "Added to wishlist"
//                           : "Add to wishlist"
//                       }
//                       onClick={() => dispatch(addToWishlist(product))}
//                     >
//                       <i className="pe-7s-like" />
//                     </button>
//                   </div>
//                   <div className="pro-details-compare">
//                     <button
//                       className={compareItem !== undefined ? "active" : ""}
//                       disabled={compareItem !== undefined}
//                       title={
//                         compareItem !== undefined
//                           ? "Added to compare"
//                           : "Add to compare"
//                       }
//                       onClick={() => dispatch(addToCompare(product))}
//                     >
//                       <i className="pe-7s-shuffle" />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// }

// ProductModal.propTypes = {
//   currency: PropTypes.shape({}),
//   discountedPrice: PropTypes.number,
//   finalDiscountedPrice: PropTypes.number,
//   finalProductPrice: PropTypes.number,
//   onHide: PropTypes.func,
//   product: PropTypes.shape({}),
//   show: PropTypes.bool,
//   wishlistItem: PropTypes.shape({}),
//   compareItem: PropTypes.shape({})
// };

// export default ProductModal;

import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { EffectFade, Thumbs } from 'swiper';
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./sub-components/ProductRating";
import Swiper, { SwiperSlide } from "../../components/swiper";
import { getProductCartQuantity } from "../../helpers/product";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";
import Cookies from "js-cookie";


function ProductModal({ product, currency, discountedPrice, finalProductPrice, finalDiscountedPrice, show, onHide, wishlistItem, compareItem }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const [quantityCount, setQuantityCount] = useState(1);
  const productCartQty = getProductCartQuantity(cartItems, product);

  const gallerySwiperParams = {
    spaceBetween: 10,
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    thumbs: { swiper: thumbsSwiper },
    modules: [EffectFade, Thumbs],
  };

  const thumbnailSwiperParams = {
    onSwiper: setThumbsSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: true
  };

  const onCloseModal = () => {
    setThumbsSwiper(null);
    onHide();
  };

  const authToken = Cookies.get("authToken");

  return (
    <Modal show={show} onHide={onCloseModal} className="product-quickview-modal-wrapper">
      <Modal.Header closeButton></Modal.Header>

      <div className="modal-body">
        <div className="row">
          <div className="col-md-5 col-sm-12 col-xs-12">
            <div className="product-large-image-wrapper">
              <Swiper options={gallerySwiperParams}>
                {product.image &&
                  product.image.map((img, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <div className="single-image">
                          <img
                            src={process.env.PUBLIC_URL + img}
                            className="img-fluid"
                            alt="Product"
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
            <div className="product-small-image-wrapper mt-15">
              <Swiper options={thumbnailSwiperParams}>
                {product.image &&
                  product.image.map((img, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <div className="single-image">
                          <img
                            src={process.env.PUBLIC_URL + img}
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </div>
          <div className="col-md-7 col-sm-12 col-xs-12">
            <div className="product-details-content quickview-content">
              <h2>{product.productName}</h2>
              <div className="product-details-price">
                {discountedPrice !== null ? (
                  <Fragment>
                    <span>
                      {finalDiscountedPrice?.toLocaleString("vi-VN") + " VND"}
                    </span>{" "}
                    <span className="old">
                      {finalProductPrice?.toLocaleString("vi-VN") + " VND"}
                    </span>
                  </Fragment>
                ) : (
                  <span>{finalProductPrice?.toLocaleString("vi-VN") + " VND"} </span>
                )}
              </div>
              {product.rating && product.rating > 0 ? (
                <div className="pro-details-rating-wrap">
                  <div className="pro-details-rating">
                    <Rating ratingValue={product.rating} />
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="pro-details-list">
                <p>{product.description}</p>
              </div>
              {(
                <div className="pro-details-quality">
                  <div className="cart-plus-minus">
                    <button
                      onClick={() =>
                        setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
                      }
                      className="dec qtybutton"
                    >
                      -
                    </button>
                    <input
                      className="cart-plus-minus-box"
                      type="text"
                      value={quantityCount}
                      readOnly
                    />
                    <button
                      onClick={() =>
                        setQuantityCount(
                          quantityCount < product.stock - productCartQty
                            ? quantityCount + 1
                            : quantityCount
                        )
                      }
                      className="inc qtybutton"
                    >
                      +
                    </button>
                  </div>
                  <div className="pro-details-cart btn-hover">
                    {product.stock && product.stock > 0 ? (
                      <button
                        onClick={() =>
                          dispatch(addToCart({
                            ...product,
                            quantity: quantityCount,
                          }))
                        }
                        disabled={productCartQty >= product.stock}
                      >
                        {" "}
                        Add To Cart{" "}
                      </button>
                    ) : (
                      product.stock && product.stock <= 0 && product.preOrder && authToken ? (
                        <button
                          onClick={() =>
                            dispatch(addToCart({
                              ...product,
                              quantity: quantityCount,
                            }))
                          }
                        >
                          {" "}
                          Pre Order{" "}
                        </button>
                      ) : (
                        <button disabled>Out of Stock</button>
                      )
                    )}
                  </div>
                  <div className="pro-details-wishlist">
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
                  <div className="pro-details-compare">
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

ProductModal.propTypes = {
  currency: PropTypes.shape({}),
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  onHide: PropTypes.func,
  product: PropTypes.shape({}),
  show: PropTypes.bool,
  wishlistItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({})
};

export default ProductModal;
