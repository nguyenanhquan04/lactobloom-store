import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogReviewByBlogId, saveBlogReview } from "../../utils/BlogReviewService";
import Cookies from "js-cookie";

const BlogComment = () => {
  const { blogId } = useParams();
  const [comments, setComments] = useState([]);
  const [newReview, setNewReview] = useState({ comment: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getBlogReviewByBlogId(blogId)
      .then((response) => {
        const data = response.data; // Accessing data directly from Axios response
        setComments(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [blogId]);

  if (loading) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
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
      comment: newReview.comment,
      reviewDate: formattedDate, // Use formatted date
    };

    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get("authToken")}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await saveBlogReview(blogId, reviewData, config);
      console.log("Review submitted:", response.data);
      // Directly update the comments state
      setComments([...comments, response.data]);
      setNewReview({ comment: "" }); // Reset newReview state
    } catch (error) {
      console.error("Error submitting the review:", error);
    }
  };

  return (
    <Fragment>
      <div className="blog-comment-wrapper mt-55">
        <h4 className="blog-dec-title">comments : {comments.length}</h4>
        {comments.map((comment) => (
          <div key={comment.reviewId} className="single-comment-wrapper mt-35">
            <div className="blog-comment-img">
              <img
                src={process.env.PUBLIC_URL + "/assets/img/user.jpg"}
                alt=""
              />
            </div>
            <div className="blog-comment-content">
              <h4>{comment.email}</h4>
              <span>{new Date(comment.reviewDate).toLocaleDateString()}</span>
              <p>{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="blog-reply-wrapper mt-50">
        <h4 className="blog-dec-title">post a comment</h4>
        {Cookies.get("authToken") ? (
          <form className="blog-form" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-12">
                <div className="text-leave">
                  <textarea
                    placeholder="Message"
                    name="comment"
                    value={newReview.comment}
                    onChange={handleInputChange}
                  />
                  <input type="submit" value="Submit" />
                </div>
              </div>
            </div>
          </form>
        ) : (
          <p className="login-required">
            You must login to submit a comment.
          </p>
        )}
      </div>
    </Fragment>
  );
};

export default BlogComment;
