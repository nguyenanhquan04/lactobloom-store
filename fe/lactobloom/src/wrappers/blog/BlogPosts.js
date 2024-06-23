import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { getAllBlogs } from "../../utils/BlogService";
import { getBlogReviewByBlogId } from "../../utils/BlogReviewService";

const BlogPosts = () => {
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState({}); // To store comment counts

  useEffect(() => {
    // Fetch all blogs
    getAllBlogs()
      .then(response => {
        const data = response.data; // Accessing data directly from Axios response
        setBlogs(data);
        // Fetch comments for each blog
        data.forEach(blog => {
          getBlogReviewByBlogId(blog.blogId)
            .then(response => {
              const commentsData = response.data; // Accessing data directly from Axios response
              setComments(prevComments => ({
                ...prevComments,
                [blog.blogId]: commentsData.length
              }));
            })
            .catch(error => console.error('Error fetching comments:', error));
        });
      })
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  return (
    <Fragment>
      {blogs.map(blog => (
        <div className="col-lg-6 col-md-6 col-sm-12" key={blog.blogId}>
          <div className="blog-wrap-2 mb-30">
            <div className="blog-img-2">
              <Link to={`${process.env.PUBLIC_URL}/blog-details/${blog.blogId}`}>
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                />
              </Link>
            </div>
            <div className="blog-content-2">
              <div className="blog-meta-2">
                <ul>
                  <li>{new Date(blog.publishDate).toLocaleDateString()}</li>
                  <li>
                    <Link to={`${process.env.PUBLIC_URL}/blog-details/${blog.blogId}`}>
                      {comments[blog.blogId] || 0} <i className="fa fa-comments-o" />
                    </Link>
                  </li>
                </ul>
              </div>
              <h4>
                <Link to={`${process.env.PUBLIC_URL}/blog-details/${blog.blogId}`}>
                  {blog.title}
                </Link>
              </h4>
              <p>{blog.content}</p>
              <div className="blog-share-comment">
                <div className="blog-btn-2">
                  <Link to={`${process.env.PUBLIC_URL}/blog-details/${blog.blogId}`}>
                    read more
                  </Link>
                </div>
                <div className="blog-share">
                  <span>share :</span>
                  <div className="share-social">
                    <ul>
                      <li>
                        <a className="facebook" href="//facebook.com">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a className="twitter" href="//twitter.com">
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a className="instagram" href="//instagram.com">
                          <i className="fa fa-instagram" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default BlogPosts;
