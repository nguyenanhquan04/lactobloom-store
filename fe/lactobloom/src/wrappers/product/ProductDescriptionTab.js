import PropTypes from "prop-types";
import clsx from "clsx";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import StarRating from "../../components/star-rating/StarRating";
import { useState, useEffect } from "react";
import {
  getProductReviewByProductId,
  saveProductReview,
} from "../../utils/ProductReviewService";
import Cookies from "js-cookie";

const ProductDescriptionTab = ({
  spaceBottomClass,
  productFullDesc,
  productId,
}) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ comment: "", rating: 0 });
  const [authToken, setAuthToken] = useState(Cookies.get("authToken")); // State to manage authToken

  useEffect(() => {
    // Fetch the reviews from the API
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

    // Get current date and time in UTC
    const currentDate = new Date();

    // Convert UTC to local time zone
    const localDate = new Date(
      currentDate.getTime() - currentDate.getTimezoneOffset() * 60000
    );

    // Format date as YYYY-MM-DDTHH:mm:ss
    const formattedDate = localDate.toISOString().slice(0, 19);

    const reviewData = {
      rate: newReview.rating,
      comment: newReview.comment,
      reviewDate: formattedDate, // Use formatted date
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
      // Fetch the updated reviews
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

  return (
    <div className={clsx("description-review-area", spaceBottomClass)}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="productDescription">
            <Nav variant="pills" className="description-review-topbar">
              <Nav.Item>
                <Nav.Link eventKey="productDescription">Description</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productReviews">
                  Reviews({reviews.length})
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="productDescription">
                {productFullDesc}
              </Tab.Pane>
              <Tab.Pane eventKey="productReviews">
                <div className="row">
                  <div className="col-lg-7">
                    <div className="review-wrapper">
                      {reviews.length === 0 ? (
                        <h4>This product has no review</h4>
                      ) : (
                        reviews.map((review) => (
                          <div key={review.reviewId} className="single-review">
                            <div className="review-img">
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/assets/img/testimonial/2.jpg"
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
                              </div>
                              <div className="review-bottom">
                                <small>
                                  {new Date(
                                    review.reviewDate
                                  ).toLocaleDateString()}
                                </small>
                                <h5>{review.comment}</h5>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="ratting-form-wrapper pl-50">
                      <h3>Add a Review</h3>
                      {authToken ? ( // Conditionally render based on authToken presence
                        <div className="ratting-form">
                          <form onSubmit={handleSubmit}>
                            <div className="star-box">
                              <span>Your rating:</span>
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
                          You must login to submit a review.
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
