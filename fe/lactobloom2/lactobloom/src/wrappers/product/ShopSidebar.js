import PropTypes from "prop-types";
import React from "react";
import {
  // getIndividualCategories,
  // getIndividualTags,
  // getIndividualColors,
  // getProductsIndividualSizes,
  getIndividualBrandNames,
  getIndividualCategoryNames
} from "../../helpers/product";
import ShopSearch from "../../components/product/ShopSearch";
import ShopCategories from "../../components/product/ShopCategories";
// import ShopColor from "../../components/product/ShopColor";
// import ShopSize from "../../components/product/ShopSize";
import ShopTag from "../../components/product/ShopBrandName";

const ShopSidebar = ({ products, getSortParams, sideSpaceClass }) => {
  const uniqueCategoryNames = getIndividualCategoryNames(products);
  // const uniqueColors = getIndividualColors(products);
  // const uniqueSizes = getProductsIndividualSizes(products);
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

      {/* filter by color */}
      {/* <ShopColor colors={uniqueColors} getSortParams={getSortParams} /> */}

      {/* filter by size */}
      {/* <ShopSize sizes={uniqueSizes} getSortParams={getSortParams} /> */}

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
