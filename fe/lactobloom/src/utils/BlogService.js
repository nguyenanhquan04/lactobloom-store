import request from './axios';

const getAllBlogs = () => {
    return request.get(`blog/all`);
};

const getBlogByBlogId = (blogId) => {
    return request.get(`blog/get/${blogId}`);
}

export { getAllBlogs, getBlogByBlogId } 