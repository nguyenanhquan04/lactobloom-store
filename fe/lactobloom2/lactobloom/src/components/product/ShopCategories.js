import PropTypes from "prop-types";
import React from "react";
import { setActiveSort } from "../../helpers/product";

const ShopCategories = ({ categoryNames, getSortParams }) => {
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories </h4>
      <div className="sidebar-widget-list mt-30">
        {categoryNames ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={e => {
                    getSortParams("categoryName", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All Categories
                </button>
              </div>
            </li>
            {categoryNames.map((category, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={e => {
                        getSortParams("categoryName", category);
                        setActiveSort(e);
                      }}
                    >
                      {" "}
                      <span className="checkmark" /> {category}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No category found"
        )}
      </div>
    </div>
  );
};

ShopCategories.propTypes = {
  categoryNames: PropTypes.array,
  getSortParams: PropTypes.func
};

export default ShopCategories;
