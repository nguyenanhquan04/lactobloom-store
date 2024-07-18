// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import clsx from "clsx";
// import Tab from "react-bootstrap/Tab";
// import Nav from "react-bootstrap/Nav";
// import StarRating from "../../components/star-rating/StarRating";
// import {
//   getProductReviewByProductId,
//   saveProductReview,
// } from "../../utils/ProductReviewService";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faEllipsisV,
//   faEdit,
//   faTrashAlt,
// } from "@fortawesome/free-solid-svg-icons";

// const ProductDescriptionTab = ({
//   spaceBottomClass,
//   productFullDesc,
//   productId,
// }) => {
//   const [reviews, setReviews] = useState([]);
//   const [newReview, setNewReview] = useState({ comment: "", rating: 0 });
//   const [authToken] = useState(Cookies.get("authToken"));
//   const [authEmail, setAuthEmail] = useState(null);
//   const [actionReviewId, setActionReviewId] = useState(null);
//   const [editReviewId, setEditReviewId] = useState(null);
//   const [editedReview, setEditedReview] = useState({ comment: "", rating: 0 });

//   useEffect(() => {
//     if (authToken) {
//       const decodedToken = jwtDecode(authToken);
//       setAuthEmail(decodedToken.sub);
//     }
//   }, [authToken]);

//   useEffect(() => {
//     getProductReviewByProductId(productId)
//       .then((response) => {
//         setReviews(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching the reviews:", error);
//       });
//   }, [productId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewReview({ ...newReview, [name]: value });
//   };

//   const handleRatingChange = (rating) => {
//     setNewReview({ ...newReview, rating });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const currentDate = new Date();
//     const localDate = new Date(
//       currentDate.getTime() - currentDate.getTimezoneOffset() * 60000
//     );
//     const formattedDate = localDate.toISOString().slice(0, 19);

//     const reviewData = {
//       rate: newReview.rating,
//       comment: newReview.comment,
//       reviewDate: formattedDate,
//     };

//     const config = {
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//         "Content-Type": "application/json",
//       },
//     };

//     try {
//       const response = await saveProductReview(productId, reviewData, config);
//       console.log("Review submitted:", response.data);
//       setNewReview({ comment: "", rating: 0 });
//       getProductReviewByProductId(productId)
//         .then((response) => {
//           setReviews(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching the reviews:", error);
//         });
//     } catch (error) {
//       console.error("Error submitting the review:", error);
//     }
//   };

//   const handleActionButtonClick = (reviewId) => {
//     setActionReviewId(actionReviewId === reviewId ? null : reviewId);
//   };

//   const handleEditClick = (reviewId, currentComment, currentRating) => {
//     setEditReviewId(reviewId);
//     setEditedReview({ comment: currentComment, rating: currentRating });
//   };

//   const handleCancelEdit = () => {
//     setEditReviewId(null);
//     setEditedReview({ comment: "", rating: 0 });
//   };

//   const handleUpdateClick = async (reviewId) => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//         "Content-Type": "application/json",
//       },
//     };

//     try {
//       const response = await axios.put(
//         `http://localhost:8080/product-review/update/${reviewId}`,
//         { comment: editedReview.comment, rate: editedReview.rating },
//         config
//       );
//       console.log("Review updated:", response.data);
//       setReviews(
//         reviews.map((review) =>
//           review.reviewId === reviewId ? response.data : review
//         )
//       );
//       setEditReviewId(null);
//       setEditedReview({ comment: "", rating: 0 });
//     } catch (error) {
//       console.error("Error updating the review:", error);
//     }
//   };

//   const handleDeleteClick = async (reviewId) => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//         "Content-Type": "application/json",
//       },
//     };

//     try {
//       await axios.delete(
//         `http://localhost:8080/product-review/deleteMyReview/${reviewId}`,
//         config
//       );
//       console.log(`Deleted review with ID: ${reviewId}`);
//       setReviews(reviews.filter((review) => review.reviewId !== reviewId));
//     } catch (error) {
//       console.error("Error deleting the review:", error);
//     }
//   };

//   return (
//     <div className={clsx("description-review-area", spaceBottomClass)}>
//       <div className="container">
//         <div className="description-review-wrapper">
//           <Tab.Container defaultActiveKey="productDescription">
//             <Nav variant="pills" className="description-review-topbar">
//               <Nav.Item>
//                 <Nav.Link eventKey="productDescription">Mô tả</Nav.Link>
//               </Nav.Item>
//               <Nav.Item>
//                 <Nav.Link eventKey="productReviews">
//                   Bình luận({reviews.length})
//                 </Nav.Link>
//               </Nav.Item>
//             </Nav>
//             <Tab.Content className="description-review-bottom">
//               <Tab.Pane eventKey="productDescription">
//               <div dangerouslySetInnerHTML={{ __html: productFullDesc}} />
//               </Tab.Pane>
//               <Tab.Pane eventKey="productReviews">
//                 <div className="row">
//                   <div className="col-lg-7">
//                     <div className="review-wrapper">
//                       {reviews.length === 0 ? (
//                         <h4>Sản phẩm này không có đánh giá</h4>
//                       ) : (
//                         reviews.map((review) => (
//                           <div key={review.reviewId} className="single-review">
//                             <div className="review-img">
//                               <img
//                                 src={
//                                   process.env.PUBLIC_URL +
//                                   "/assets/img/user.jpg"
//                                 }
//                                 alt="Customer"
//                               />
//                             </div>
//                             <div className="review-content">
//                               <div className="review-top-wrap">
//                                 <div className="review-left">
//                                   <div className="review-name">
//                                     <h4>{review.email}</h4>
//                                   </div>
//                                   <div className="review-rating">
//                                     {Array.from(
//                                       { length: review.rate },
//                                       (_, i) => (
//                                         <i key={i} className="fa fa-star" />
//                                       )
//                                     )}
//                                     {Array.from(
//                                       { length: 5 - review.rate },
//                                       (_, i) => (
//                                         <i key={i} className="fa fa-star-o" />
//                                       )
//                                     )}
//                                   </div>
//                                 </div>
//                                 <FontAwesomeIcon
//                                   icon={faEllipsisV}
//                                   className="more-options-icon"
//                                   onClick={() =>
//                                     handleActionButtonClick(review.reviewId)
//                                   }
//                                 />
//                               </div>
//                               {editReviewId === review.reviewId ? (
//                                 <div className="edit-review">
//                                   <div className="star-box">
//                                     <span>Đánh giá mới của bạn:</span>
//                                     <StarRating
//                                       rating={editedReview.rating}
//                                       onRatingChange={(rating) =>
//                                         setEditedReview({
//                                           ...editedReview,
//                                           rating,
//                                         })
//                                       }
//                                     />
//                                   </div>
//                                   <textarea
//                                     name="comment"
//                                     value={editedReview.comment}
//                                     onChange={(e) =>
//                                       setEditedReview({
//                                         ...editedReview,
//                                         comment: e.target.value,
//                                       })
//                                     }
//                                   />
//                                   <button
//                                     className="cancel-button"
//                                     onClick={handleCancelEdit}
//                                   >
//                                     Hủy
//                                   </button>
//                                   <button
//                                     className="update-button"
//                                     onClick={() =>
//                                       handleUpdateClick(review.reviewId)
//                                     }
//                                   >
//                                     Cập nhật
//                                   </button>
//                                 </div>
//                               ) : (
//                                 <div className="review-bottom">
//                                   <small>
//                                     {new Date(
//                                       review.reviewDate
//                                     ).toLocaleDateString()}
//                                   </small>
//                                   <h5>{review.comment}</h5>
//                                 </div>
//                               )}
//                               {authEmail === review.email &&
//                                 actionReviewId === review.reviewId &&
//                                 editReviewId !== review.reviewId && (
//                                   <div className="action-buttons">
//                                     <button
//                                       onClick={() =>
//                                         handleEditClick(
//                                           review.reviewId,
//                                           review.comment,
//                                           review.rate
//                                         )
//                                       }
//                                     >
//                                       <FontAwesomeIcon icon={faEdit} /> Sửa
//                                     </button>
//                                     <button
//                                       onClick={() =>
//                                         handleDeleteClick(review.reviewId)
//                                       }
//                                     >
//                                       <FontAwesomeIcon icon={faTrashAlt} />{" "}
//                                       Xóa
//                                     </button>
//                                   </div>
//                                 )}
//                             </div>
//                           </div>
//                         ))
//                       )}
//                     </div>
//                   </div>
//                   <div className="col-lg-5">
//                     <div className="ratting-form-wrapper pl-50">
//                       <h3>Thêm mới bình luận</h3>
//                       {authToken ? (
//                         <div className="ratting-form">
//                           <form onSubmit={handleSubmit}>
//                             <div className="star-box">
//                               <span>Đánh giá của bạn:</span>
//                               <StarRating
//                                 rating={newReview.rating}
//                                 onRatingChange={handleRatingChange}
//                               />
//                             </div>
//                             <div className="row">
//                               <div className="col-md-12">
//                                 <div className="rating-form-style form-submit">
//                                   <textarea
//                                     name="comment"
//                                     placeholder="Message"
//                                     value={newReview.comment}
//                                     onChange={handleInputChange}
//                                   />
//                                   <input type="submit" value="Submit" />
//                                 </div>
//                               </div>
//                             </div>
//                           </form>
//                         </div>
//                       ) : (
//                         <p className="login-required">
//                           Phải đăng nhập để đánh giá
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </Tab.Pane>
//             </Tab.Content>
//           </Tab.Container>
//         </div>
//       </div>
//     </div>
//   );
// };

// ProductDescriptionTab.propTypes = {
//   productFullDesc: PropTypes.string,
//   spaceBottomClass: PropTypes.string,
//   productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
// };

// export default ProductDescriptionTab;


import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import StarRating from "../../components/star-rating/StarRating";
import {
  getProductReviewByProductId,
  saveProductReview,
} from "../../utils/ProductReviewService";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const ProductDescriptionTab = ({
  spaceBottomClass,
  productFullDesc,
  productId,
}) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ comment: "", rating: 0 });
  const [authToken] = useState(Cookies.get("authToken"));
  const [authEmail, setAuthEmail] = useState(null);
  const [actionReviewId, setActionReviewId] = useState(null);
  const [editReviewId, setEditReviewId] = useState(null);
  const [editedReview, setEditedReview] = useState({ comment: "", rating: 0 });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (authToken) {
      const decodedToken = jwtDecode(authToken);
      setAuthEmail(decodedToken.sub);
    }
  }, [authToken]);

  useEffect(() => {
    getProductReviewByProductId(productId)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the reviews:", error);
      });
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const localDate = new Date(
      currentDate.getTime() - currentDate.getTimezoneOffset() * 60000
    );
    const formattedDate = localDate.toISOString().slice(0, 19);

    const reviewData = {
      rate: newReview.rating,
      comment: newReview.comment,
      reviewDate: formattedDate,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await saveProductReview(productId, reviewData, config);
      console.log("Review submitted:", response.data);
      setNewReview({ comment: "", rating: 0 });
      getProductReviewByProductId(productId)
        .then((response) => {
          setReviews(response.data);
        })
        .catch((error) => {
          console.error("Error fetching the reviews:", error);
        });
    } catch (error) {
      console.error("Error submitting the review:", error);
    }
  };

  const handleActionButtonClick = (reviewId) => {
    setActionReviewId(actionReviewId === reviewId ? null : reviewId);
  };

  const handleEditClick = (reviewId, currentComment, currentRating) => {
    setEditReviewId(reviewId);
    setEditedReview({ comment: currentComment, rating: currentRating });
  };

  const handleCancelEdit = () => {
    setEditReviewId(null);
    setEditedReview({ comment: "", rating: 0 });
  };

  const handleUpdateClick = async (reviewId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/product-review/update/${reviewId}`,
        { comment: editedReview.comment, rate: editedReview.rating },
        config
      );
      console.log("Review updated:", response.data);
      setReviews(
        reviews.map((review) =>
          review.reviewId === reviewId ? response.data : review
        )
      );
      setEditReviewId(null);
      setEditedReview({ comment: "", rating: 0 });
    } catch (error) {
      console.error("Error updating the review:", error);
    }
  };

  const handleDeleteClick = async (reviewId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(
        `http://localhost:8080/product-review/deleteMyReview/${reviewId}`,
        config
      );
      console.log(`Deleted review with ID: ${reviewId}`);
      setReviews(reviews.filter((review) => review.reviewId !== reviewId));
    } catch (error) {
      console.error("Error deleting the review:", error);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={clsx("description-review-area", spaceBottomClass)}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="productDescription">
            <Nav variant="pills" className="description-review-topbar">
              <Nav.Item>
                <Nav.Link eventKey="productDescription">Mô tả</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productReviews">
                  Bình luận({reviews.length})
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="productDescription">
                <div className="product-description">
                  <div
                    className={clsx("product-full-desc", {
                      expanded: isExpanded,
                    })}
                    dangerouslySetInnerHTML={{ __html: productFullDesc }}
                  />
                  <button className="toggle-button" onClick={toggleExpand}>
                    {isExpanded ? "Ẩn bớt" : "Đọc thêm"}
                  </button>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="productReviews">
                <div className="row">
                  <div className="col-lg-7">
                    <div className="review-wrapper">
                      {reviews.length === 0 ? (
                        <h4>Sản phẩm này không có đánh giá</h4>
                      ) : (
                        reviews.map((review) => (
                          <div key={review.reviewId} className="single-review">
                            <div className="review-img">
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/img/user.jpg"
                                }
                                alt="Customer"
                              />
                            </div>
                            <div className="review-content">
                              <div className="review-top-wrap">
                                <div className="review-left">
                                  <div className="review-name">
                                    <h4>{review.email}</h4>
                                  </div>
                                  <div className="review-rating">
                                    {Array.from(
                                      { length: review.rate },
                                      (_, i) => (
                                        <i key={i} className="fa fa-star" />
                                      )
                                    )}
                                    {Array.from(
                                      { length: 5 - review.rate },
                                      (_, i) => (
                                        <i key={i} className="fa fa-star-o" />
                                      )
                                    )}
                                  </div>
                                </div>
                                <FontAwesomeIcon
                                  icon={faEllipsisV}
                                  className="more-options-icon"
                                  onClick={() =>
                                    handleActionButtonClick(review.reviewId)
                                  }
                                />
                              </div>
                              {editReviewId === review.reviewId ? (
                                <div className="edit-review">
                                  <div className="star-box">
                                    <span>Đánh giá mới của bạn:</span>
                                    <StarRating
                                      rating={editedReview.rating}
                                      onRatingChange={(rating) =>
                                        setEditedReview({
                                          ...editedReview,
                                          rating,
                                        })
                                      }
                                    />
                                  </div>
                                  <textarea
                                    name="comment"
                                    value={editedReview.comment}
                                    onChange={(e) =>
                                      setEditedReview({
                                        ...editedReview,
                                        comment: e.target.value,
                                      })
                                    }
                                  />
                                  <button
                                    className="cancel-button"
                                    onClick={handleCancelEdit}
                                  >
                                    Hủy
                                  </button>
                                  <button
                                    className="update-button"
                                    onClick={() =>
                                      handleUpdateClick(review.reviewId)
                                    }
                                  >
                                    Cập nhật
                                  </button>
                                </div>
                              ) : (
                                <div className="review-bottom">
                                  <small>
                                    {new Date(
                                      review.reviewDate
                                    ).toLocaleDateString()}
                                  </small>
                                  <h5>{review.comment}</h5>
                                </div>
                              )}
                              {authEmail === review.email &&
                                actionReviewId === review.reviewId &&
                                editReviewId !== review.reviewId && (
                                  <div className="action-buttons">
                                    <button
                                      onClick={() =>
                                        handleEditClick(
                                          review.reviewId,
                                          review.comment,
                                          review.rate
                                        )
                                      }
                                    >
                                      <FontAwesomeIcon icon={faEdit} /> Sửa
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleDeleteClick(review.reviewId)
                                      }
                                    >
                                      <FontAwesomeIcon icon={faTrashAlt} />{" "}
                                      Xóa
                                    </button>
                                  </div>
                                )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="ratting-form-wrapper pl-50">
                      <h3>Thêm mới bình luận</h3>
                      {authToken ? (
                        <div className="ratting-form">
                          <form onSubmit={handleSubmit}>
                            <div className="star-box">
                              <span>Đánh giá của bạn:</span>
                              <StarRating
                                rating={newReview.rating}
                                onRatingChange={handleRatingChange}
                              />
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="rating-form-style form-submit">
                                  <textarea
                                    name="comment"
                                    placeholder="Message"
                                    value={newReview.comment}
                                    onChange={handleInputChange}
                                  />
                                  <input type="submit" value="Submit" />
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      ) : (
                        <p className="login-required">
                          Phải đăng nhập để đánh giá
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

ProductDescriptionTab.propTypes = {
  productFullDesc: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ProductDescriptionTab;
