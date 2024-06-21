import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogComment = () => {
  const { blogId } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost:8080/blog-review/blog/${blogId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
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

  return (
    <Fragment>
      <div className="blog-comment-wrapper mt-55">
        <h4 className="blog-dec-title">comments : {comments.length}</h4>
        {comments.map((comment) => (
          <div key={comment.reviewId} className="single-comment-wrapper mt-35">
            <div className="blog-comment-img">
              <img
                src={process.env.PUBLIC_URL + "/assets/img/blog/comment-1.jpg"}
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
        <form className="blog-form">
          <div className="row">
            <div className="col-md-12">
              <div className="text-leave">
                <textarea placeholder="Message" defaultValue={""} />
                <input type="submit" defaultValue="SEND MESSAGE" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default BlogComment;
