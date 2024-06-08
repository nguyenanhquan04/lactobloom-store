import PropTypes from "prop-types";
import React from "react";
import {
  getIndividualBrandNames,
  getIndividualCategoryNames
} from "../../helpers/product";
import ShopSearch from "../../components/product/ShopSearch";
import ShopCategories from "../../components/product/ShopCategories";
import ShopTag from "../../components/product/ShopBrandName";

const ShopSidebar = ({ products, getSortParams, sideSpaceClass }) => {
  const uniqueCategoryNames = getIndividualCategoryNames(products);
  const uniqueBrandNames = getIndividualBrandNames(products);

  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      {/* shop search */}
      <ShopSearch />

      {/* filter by categories */}
      <ShopCategories
        categoryNames={uniqueCategoryNames}
        getSortParams={getSortParams}
      />

      {/* filter by tag */}
      <ShopTag brandNames={uniqueBrandNames} getSortParams={getSortParams} />
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string
};

export default ShopSidebar;
