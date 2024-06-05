import React from "react";

const ShopSearch = () => {
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Search </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <form className="pro-sidebar-search-form" action="#">
          <input type="text" placeholder="Search here..." />
          <button>
            <i className="pe-7s-search" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShopSearch;

// import React, { useState, useEffect } from "react";
// import axios from "axios"; // Import axios vào file của bạn

// const ShopSearch = () => {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   useEffect(() => {
//     // Gọi API sử dụng axios khi component được mount
//     axios.get("http://localhost:8080/product/all")
//       .then(response => {
//         setProducts(response.data); // sử dụng response.data để lấy dữ liệu trả về
//       })
//       .catch(error => {
//         console.error("There was an error fetching the products: ", error);
//       });
//   }, []);

//   useEffect(() => {
//     // Lọc sản phẩm dựa trên searchTerm
//     const results = products.filter(product =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredProducts(results);
//   }, [searchTerm, products]);

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   return (
//     <div className="sidebar-widget">
//       <h4 className="pro-sidebar-title">Search </h4>
//       <div className="pro-sidebar-search mb-50 mt-25">
//         <form className="pro-sidebar-search-form" onSubmit={e => e.preventDefault()}>
//           <input
//             type="text"
//             placeholder="Search here..."
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//           <button type="submit">
//             <i className="pe-7s-search" />
//           </button>
//         </form>
//       </div>
//       <div>
//         {filteredProducts.map((product) => (
//           <div key={product.id}>{product.name}</div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ShopSearch;

