import request from './axios';

const getAllBlogCategories = () => {
    return request.get(`blog-category/all`);
};

export { getAllBlogCategories } 