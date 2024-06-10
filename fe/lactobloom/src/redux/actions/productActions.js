// export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";

// const fetchProductsSuccess = products => ({
//   type: FETCH_PRODUCTS_SUCCESS,
//   payload: products
// });

// // fetch products
// export const fetchProducts = products => {
//   return dispatch => {
//     dispatch(fetchProductsSuccess(products));
//   };
// };

import axios from 'axios';
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";

const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products
});

// fetch products from API
export const fetchProducts = () => {
  return dispatch => {
    axios.get('http://localhost:8080/product/all')
      .then(response => {
        dispatch(fetchProductsSuccess(response.data));
        // Thông báo cho người dùng biết rằng dữ liệu đã được lấy thành công
        alert('Lấy dữ liệu sản phẩm thành công!');
      })
      .catch(error => {
        // Bạn có thể xử lý lỗi ở đây
        console.error('Lỗi khi lấy dữ liệu:', error);
        // Ví dụ: dispatch một action để thông báo lỗi
        // Thông báo cho người dùng biết rằng dữ liệu đã được lấy thất bại
        alert('Lấy dữ liệu sản phẩm thất bại!');
      });
  };
};
