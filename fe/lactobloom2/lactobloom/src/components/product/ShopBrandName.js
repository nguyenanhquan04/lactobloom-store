import PropTypes from "prop-types";
import React from "react";
import { setActiveSort } from "../../helpers/product";

const ShopBrandName = ({ brandNames, getSortParams }) => {
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Brand </h4>
      <div className="sidebar-widget-list mt-25">
        {brandNames ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={e => {
                    getSortParams("brandName", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> All Brands{" "}
                </button>
              </div>
            </li>
            {brandNames.map((brandName, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                  <button
                    onClick={e => {
                      getSortParams("brandName", brandName);
                      setActiveSort(e);
                    }}
                  >
                    <span className="checkmark" /> {brandName}{" "}
                  </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No brand found"
        )}
      </div>
    </div>
  );
};

ShopBrandName.propTypes = {
  getSortParams: PropTypes.func,
  brandNames: PropTypes.array
};

export default ShopBrandName;
