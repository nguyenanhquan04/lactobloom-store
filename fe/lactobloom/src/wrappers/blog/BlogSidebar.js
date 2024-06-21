import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BlogSidebar = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch latest blogs
    fetch("http://localhost:8080/blog/all")
      .then(response => response.json())
      .then(data => {
        // Sort blogs by publishDate in descending order to get the latest posts
        const sortedBlogs = data.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
        // Get the top 4 latest posts
        setLatestBlogs(sortedBlogs.slice(0, 4));
      })
      .catch(error => console.error('Error fetching latest blogs:', error));

    // Fetch blog categories
    fetch("http://localhost:8080/blog-category/all")
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div className="sidebar-style">
      <div className="sidebar-widget">
        <h4 className="pro-sidebar-title">Search </h4>
        <div className="pro-sidebar-search mb-55 mt-25">
          <form className="pro-sidebar-search-form" action="#">
            <input type="text" placeholder="Search here..." />
            <button>
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
      <div className="sidebar-widget">
        <h4 className="pro-sidebar-title">Recent Projects </h4>
        <div className="sidebar-project-wrap mt-30">
          {latestBlogs.map(blog => (
            <div className="single-sidebar-blog" key={blog.blogId}>
              <div className="sidebar-blog-img">
                <Link to={`${process.env.PUBLIC_URL}/blog-details/${blog.blogId}`}>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/img/blog/blog-${blog.blogId}.jpg`}
                    alt={blog.title}
                  />
                </Link>
              </div>
              <div className="sidebar-blog-content">
                <span>{blog.category}</span>
                <h4>
                  <Link to={`${process.env.PUBLIC_URL}/blog-details/${blog.blogId}`}>
                    {blog.title}
                  </Link>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sidebar-widget mt-35">
        <h4 className="pro-sidebar-title">Categories</h4>
        <div className="sidebar-widget-list sidebar-widget-list--blog mt-20">
          <ul>
            {categories.map(category => (
              <li key={category.blogCategoryId}>
                <div className="sidebar-widget-list-left">
                  <input type="checkbox" defaultValue />{" "}
                  <Link to={`${process.env.PUBLIC_URL}/blog-category/${category.blogCategoryId}`}>
                    {category.blogCategoryName} <span>4</span>{" "}
                  </Link>
                  <span className="checkmark" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
