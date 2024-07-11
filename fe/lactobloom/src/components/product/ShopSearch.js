import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShopSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/shop?search=${searchTerm}`);
  };

  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Tìm Kiếm</h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <form className="pro-sidebar-search-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={handleSearchChange}  
          />
          <button>
            <i className="pe-7s-search" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShopSearch;
