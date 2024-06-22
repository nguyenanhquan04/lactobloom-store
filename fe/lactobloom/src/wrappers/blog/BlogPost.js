import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const BlogPost = ({ blog }) => {
  if (!blog) return <p>Loading...</p>;

  return (
    <Fragment>
      <div className="blog-details-top">
        <div className="blog-details-img">
          {blog.image && (
            <img
              alt=""
              src={process.env.PUBLIC_URL + blog.image}
            />
          )}
        </div>
        <div className="blog-details-content">
          <div className="blog-meta-2">
            <ul>
              <li>{blog.publishDate && new Date(blog.publishDate).toLocaleDateString()}</li>
              <li>
                <Link>
                  {blog.commentsCount} <i className="fa fa-comments-o" />
                </Link>
              </li>
            </ul>
          </div>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          {blog.blockquote && (
            <blockquote>
              {blog.blockquote}
            </blockquote>
          )}
        </div>
      </div>
      <div className="dec-img-wrapper">
        <div className="row">
          {blog.decImages && blog.decImages.map((image, index) => (
            <div className="col-md-6" key={index}>
              <div className="dec-img mb-50">
                <img
                  alt=""
                  src={process.env.PUBLIC_URL + image}
                />
              </div>
            </div>
          ))}
        </div>
        <p>{blog.additionalContent}</p>
      </div>
      <div className="tag-share">
        <div className="dec-tag">
          <ul>
            {blog.tags && blog.tags.map((tag, index) => (
              <li key={index}>
                <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                  {tag} {index < blog.tags.length - 1 && ','}
                </Link>
              </li>
            ))}
          </ul>
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
      <div className="next-previous-post">
        <Link to={process.env.PUBLIC_URL + "/blog-details"}>
          {" "}
          <i className="fa fa-angle-left" /> prev post
        </Link>
        <Link to={process.env.PUBLIC_URL + "/blog-details"}>
          next post <i className="fa fa-angle-right" />
        </Link>
      </div>
    </Fragment>
  );
};

export default BlogPost;
