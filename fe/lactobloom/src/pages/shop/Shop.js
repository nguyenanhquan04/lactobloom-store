import { Fragment, useState, useEffect, useCallback } from "react";
import axios from "axios";
import Paginator from "react-hooks-paginator";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProducts";
import ShopSearch from "../../components/product/ShopSearch";
import ShopCategoryAndBrand from "../../components/product/ShopCategoryAndBrand";

const ShopGridStandard = () => {
  const [layout, setLayout] = useState("grid three-column");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageLimit = 15;

  let { pathname, search } = useLocation();

  const fetchProducts = useCallback(async (searchQuery) => {
    try {
      const params = {
        productName: searchQuery || "",
        categoryId: selectedCategory?.toString() || "",
        brandId: selectedBrand?.toString() || ""
      };

      const response = await axios.get("http://localhost:8080/product/search", { params });
      setProducts(response.data);
    } catch (error) {
      console.error("There was an error fetching the products: ", error);
    }
  }, [selectedCategory, selectedBrand]);

  useEffect(() => {
    fetchProducts(searchTerm);
  }, [searchTerm, selectedCategory, selectedBrand, fetchProducts]);

  useEffect(() => {
    const slicedProducts = products.slice(offset, offset + pageLimit);
    setCurrentData(slicedProducts);
  }, [offset, products]);

  return (
    <Fragment>
      <SEO titleTemplate="Shop" description="Lactobloom Shop Page." />

      <LayoutOne headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Trang Chủ", path: process.env.PUBLIC_URL + "/" },
            { label: "Cửa Hàng", path: process.env.PUBLIC_URL + pathname },
          ]}
        />

        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 order-2 order-lg-1">
                <ShopSearch
                  searchTerm={searchTerm}
                  handleSearchChange={(e) => setSearchTerm(e.target.value)}
                  handleSubmit={(e) => {
                    e.preventDefault();
                    fetchProducts(searchTerm);
                  }}
                />
                <ShopCategoryAndBrand
                  onCategorySelect={setSelectedCategory}
                  onBrandSelect={setSelectedBrand}
                />
              </div>
              <div className="col-lg-9 order-1 order-lg-2">
                <ShopTopbar
                  getLayout={setLayout}
                  productCount={products.length}
                  sortedProductCount={currentData.length}
                />

                <ShopProducts layout={layout} products={currentData} />

                <div className="pro-pagination-style text-center mt-30">
                  <Paginator
                    totalRecords={products.length}
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
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default ShopGridStandard;
