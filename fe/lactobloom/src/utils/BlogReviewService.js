import request from './axios';

const getBlogReviewByBlogId = (blogId) => {
    return request.get(`blog-review/blog/${blogId}`);
}

const saveBlogReview = (blogId, reviewData, config) => {
    return request.post(`blog-review/save/blog/${blogId}`, reviewData, config);
}

export { getBlogReviewByBlogId, saveBlogReview }