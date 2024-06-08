import PropTypes from "prop-types";
import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import Paginator from "react-hooks-paginator";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getSortedProducts } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProducts";

const Shop = ({ location, products }) => {
  const [layout, setLayout] = useState("grid three-column");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(true); // Mặc định hiển thị tất cả sản phẩm
  const [sortedProducts, setSortedProducts] = useState([]); // Declare sortedProducts

  const pageLimit = 12;
  const { pathname, search } = location;

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  useEffect(() => {
    // Xử lý khi có kết quả từ tìm kiếm
    if (searchResult.length > 0) {
      const sortedProducts = getSortedProducts(searchResult, sortType, sortValue);
      console.log(sortedProducts);
      const filteredProducts = getSortedProducts(
        sortedProducts,
        filterSortType,
        filterSortValue
      );
      setCurrentData(filteredProducts.slice(offset, offset + pageLimit));
      setShowAllProducts(false);
      setSortedProducts(sortedProducts); // Update sortedProducts state
    } else {
      // Xử lý khi không có kết quả từ tìm kiếm
      const sortedProducts = getSortedProducts(products, sortType, sortValue);
      const filteredProducts = getSortedProducts(
        sortedProducts,
        filterSortType,
        filterSortValue
      );
      setCurrentData(filteredProducts.slice(offset, offset + pageLimit));
      setShowAllProducts(true);
      setSortedProducts(sortedProducts); // Update sortedProducts state
    }
  }, [
    searchResult,
    offset,
    products,
    sortType,
    sortValue,
    filterSortType,
    filterSortValue,
  ]);

  useEffect(() => {
    // Lọc sản phẩm dựa trên từ khóa tìm kiếm nếu có
    const params = new URLSearchParams(search);
    const productName = params.get("search");
    if (productName) {
      axios
        .get(
          `http://localhost:8080/product/search/${encodeURIComponent(
            productName
          )}`
        )
        .then((response) => {
          if (response.data.length === 0) {
            // Nếu không có sản phẩm nào được tìm thấy
            setCurrentData([]); // Xóa dữ liệu hiện tại để không hiển thị sản phẩm
            setShowAllProducts(false); // Không hiển thị tất cả sản phẩm
          } else {
            setSearchResult(response.data);
            setShowAllProducts(false); // Hiển thị kết quả tìm kiếm
          }
        })
        .catch((error) => {
          console.error("There was an error fetching the products: ", error);
        });
    } else {
      setSearchResult([]);
      setShowAllProducts(true); // Hiển thị tất cả sản phẩm nếu không có từ khóa tìm kiếm
    }
  }, [search, products]);

  return (
    <Fragment>
      <MetaTags>
        <title>LactoBloom Store | Shop Page</title>
        <meta name="description" content="Shop page of LactoBloom Store" />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Shop
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 order-2 order-lg-1">
                {/* Shop sidebar */}
                <ShopSidebar
                  products={products}
                  getSortParams={getSortParams}
                  sideSpaceClass="mr-30"
                />
              </div>
              <div className="col-lg-9 order-1 order-lg-2">
                {/* Shop topbar default */}
                <ShopTopbar
                  getLayout={getLayout}
                  getFilterSortParams={getFilterSortParams}
                  productCount={sortedProducts.length}
                  sortedProductCount={currentData.length}
                />

                {/* Shop page content default */}
                <ShopProducts layout={layout} products={currentData} />
                

                {/* Shop product pagination */}
                {showAllProducts && (
                  <div className="pro-pagination-style text-center mt-30">
                    <Paginator
                      totalRecords={sortedProducts.length}
                      pageLimit={pageLimit}
                      pageNeighbours={2}
                      setOffset={setOffset}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      pageContainerClass="mb-0 mt-0"
                      pagePrevText="«"
                      pageNextText="»"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Shop.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    products: state.productData.products,
    productCount: state.productData.products.length,
  };
};

export default connect(mapStateToProps)(Shop);