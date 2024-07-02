// import { Fragment, useState, useEffect } from "react";
// import Paginator from "react-hooks-paginator";
// import { useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import { getSortedProducts } from "../../helpers/product";
// import SEO from "../../components/seo";
// import LayoutOne from "../../layouts/LayoutOne";
// import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
// import ShopSidebar from "../../wrappers/product/ShopSidebar";
// import ShopTopbar from "../../wrappers/product/ShopTopbar";
// import ShopProducts from "../../wrappers/product/ShopProducts";
// import { getProductsByCategoryId, getProductsByBrandId, searchProducts } from "../../utils/ProductService";

// const ShopGridStandard = () => {
//   const [layout, setLayout] = useState("grid three-column");
//   const [sortType, setSortType] = useState("");
//   const [sortValue, setSortValue] = useState("");
//   const [filterSortType, setFilterSortType] = useState("");
//   const [filterSortValue, setFilterSortValue] = useState("");
//   const [offset, setOffset] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [currentData, setCurrentData] = useState([]);
//   const [sortedProducts, setSortedProducts] = useState([]);
//   const [searchResult, setSearchResult] = useState([]);
//   const [categoryProducts, setCategoryProducts] = useState([]);
//   const [brandProducts, setBrandProducts] = useState([]);
//   const [showAllProducts, setShowAllProducts] = useState(true);
//   const { products } = useSelector((state) => state.product);

//   const pageLimit = 15;
//   let { pathname, search } = useLocation();

//   const getLayout = (layout) => {
//     setLayout(layout);
//   };

//   const getSortParams = (sortType, sortValue) => {
//     setSortType(sortType);
//     setSortValue(sortValue);
//   };

//   const getFilterSortParams = (sortType, sortValue) => {
//     setFilterSortType(sortType);
//     setFilterSortValue(sortValue);
//   };

//   const handleCategorySelect = async (categoryId) => {
//     setBrandProducts([]); // Reset brand products when a category is selected
//     if (categoryId === null) {
//       setCategoryProducts([]);
//       setShowAllProducts(true);
//       return;
//     }

//     try {
//       const response = await getProductsByCategoryId(categoryId);
//       setCategoryProducts(response.data);
//       setShowAllProducts(false);
//     } catch (error) {
//       console.error("Error fetching products for category:", error);
//     }
//   };

//   const handleBrandSelect = async (brandId) => {
//     setCategoryProducts([]); // Reset category products when a brand is selected
//     if (brandId === null) {
//       setBrandProducts([]);
//       setShowAllProducts(true);
//       return;
//     }

//     try {
//       const response = await getProductsByBrandId(brandId);
//       console.log(response.data);
//       setBrandProducts(response.data);
//       setShowAllProducts(false);
//     } catch (error) {
//       console.error("Error fetching products for brand:", error);
//     }
//   };

//   useEffect(() => {
//     const productsToSort =
//       searchResult.length > 0
//         ? searchResult
//         : categoryProducts.length > 0
//         ? categoryProducts
//         : brandProducts.length > 0
//         ? brandProducts
//         : showAllProducts
//         ? products
//         : [];

//     const sortedProducts = getSortedProducts(productsToSort, sortType, sortValue);
//     const filteredProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
//     const slicedProducts = filteredProducts.slice(offset, offset + pageLimit);

//     setCurrentData(slicedProducts);  // Update currentData with paginated subset
//     setSortedProducts(sortedProducts); // Update sortedProducts if needed
//   }, [searchResult, categoryProducts, brandProducts, offset, products, sortType, sortValue, filterSortType, filterSortValue, showAllProducts, pageLimit]);

//   useEffect(() => {
//     const params = new URLSearchParams(search);
//     const productName = params.get("search");
//     if (productName) {
//       searchProducts(encodeURIComponent(productName))
//         .then((response) => {
//           if (response.data.length === 0) {
//             setSearchResult([]);
//             setShowAllProducts(false);
//           } else {
//             setSearchResult(response.data);
//             setShowAllProducts(false);
//           }
//         })
//         .catch((error) => {
//           console.error("There was an error fetching the products: ", error);
//           setSearchResult([]);
//           setShowAllProducts(true);
//         });
//     } else {
//       setSearchResult([]);
//       setShowAllProducts(true);
//     }
//   }, [search]);

//   return (
//     <Fragment>
//       <SEO titleTemplate="Shop" description="Lactobloom Shop Page." />

//       <LayoutOne headerTop="visible">
//         {/* breadcrumb */}
//         <Breadcrumb
//           pages={[
//             { label: "Home", path: process.env.PUBLIC_URL + "/" },
//             { label: "Shop", path: process.env.PUBLIC_URL + pathname },
//           ]}
//         />

//         <div className="shop-area pt-95 pb-100">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-3 order-2 order-lg-1">
//                 {/* shop sidebar */}
//                 <ShopSidebar
//                   products={products}
//                   getSortParams={getSortParams}
//                   onCategorySelect={handleCategorySelect}
//                   onBrandSelect={handleBrandSelect}
//                   sideSpaceClass="mr-30"
//                 />
//               </div>
//               <div className="col-lg-9 order-1 order-lg-2">
//                 {/* shop topbar default */}
//                 <ShopTopbar
//                   getLayout={getLayout}
//                   getFilterSortParams={getFilterSortParams}
//                   productCount={sortedProducts.length}
//                   sortedProductCount={currentData.length}
//                 />

//                 {/* shop page content default */}
//                 <ShopProducts
//                   layout={layout}
//                   products={currentData}
//                 />

//                 {/* shop product pagination */}
//                 <div className="pro-pagination-style text-center mt-30">
//                   <Paginator
//                     totalRecords={sortedProducts.length}
//                     pageLimit={pageLimit}
//                     pageNeighbours={2}
//                     setOffset={setOffset}
//                     currentPage={currentPage}
//                     setCurrentPage={setCurrentPage}
//                     pageContainerClass="mb-0 mt-0"
//                     pagePrevText="«"
//                     pageNextText="»"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </LayoutOne>
//     </Fragment>
//   );
// };

// export default ShopGridStandard;


import { Fragment, useState, useEffect } from "react";
import Paginator from "react-hooks-paginator";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSortedProducts } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProducts";
import { getProductsByCategoryId, getProductsByBrandId, searchProducts } from "../../utils/ProductService";

const ShopGridStandard = () => {
  const [layout, setLayout] = useState("grid three-column");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [brandProducts, setBrandProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(true);
  const { products } = useSelector((state) => state.product);

  const pageLimit = 15;
  let { pathname, search } = useLocation();

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

  const handleCategorySelect = async (categoryId) => {
    if (categoryId === null) {
      setCategoryProducts([]);
    } else {
      try {
        const response = await getProductsByCategoryId(categoryId);
        setCategoryProducts(response.data);
      } catch (error) {
        console.error("Error fetching products for category:", error);
      }
    }
  };

  const handleBrandSelect = async (brandId) => {
    if (brandId === null) {
      setBrandProducts([]);
    } else {
      try {
        const response = await getProductsByBrandId(brandId);
        setBrandProducts(response.data);
      } catch (error) {
        console.error("Error fetching products for brand:", error);
      }
    }
  };

  useEffect(() => {
    let combinedProducts = products;

    if (categoryProducts.length > 0 && brandProducts.length > 0) {
      combinedProducts = categoryProducts.filter((catProduct) =>
        brandProducts.some((brandProduct) => brandProduct.productId === catProduct.productId)
      );
    } else if (categoryProducts.length > 0) {
      combinedProducts = categoryProducts;
    } else if (brandProducts.length > 0) {
      combinedProducts = brandProducts;
    }

    setFilteredProducts(combinedProducts);
    setShowAllProducts(categoryProducts.length === 0 && brandProducts.length === 0);
  }, [categoryProducts, brandProducts, products]);

  useEffect(() => {
    const productsToSort =
      searchResult.length > 0
        ? searchResult
        : filteredProducts.length > 0
        ? filteredProducts
        : showAllProducts
        ? products
        : [];

    const sortedProducts = getSortedProducts(productsToSort, sortType, sortValue);
    const filteredSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
    const slicedProducts = filteredSortedProducts.slice(offset, offset + pageLimit);

    setCurrentData(slicedProducts);
    setSortedProducts(sortedProducts);
  }, [searchResult, filteredProducts, offset, products, sortType, sortValue, filterSortType, filterSortValue, showAllProducts, pageLimit]);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const productName = params.get("search");
    if (productName) {
      searchProducts(encodeURIComponent(productName))
        .then((response) => {
          if (response.data.length === 0) {
            setSearchResult([]);
            setShowAllProducts(false);
          } else {
            setSearchResult(response.data);
            setShowAllProducts(false);
          }
        })
        .catch((error) => {
          console.error("There was an error fetching the products: ", error);
          setSearchResult([]);
          setShowAllProducts(true);
        });
    } else {
      setSearchResult([]);
      setShowAllProducts(true);
    }
  }, [search]);

  return (
    <Fragment>
      <SEO titleTemplate="Shop" description="Lactobloom Shop Page." />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Shop", path: process.env.PUBLIC_URL + pathname },
          ]}
        />

        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 order-2 order-lg-1">
                {/* shop sidebar */}
                <ShopSidebar
                  products={products}
                  getSortParams={getSortParams}
                  onCategorySelect={handleCategorySelect}
                  onBrandSelect={handleBrandSelect}
                  sideSpaceClass="mr-30"
                />
              </div>
              <div className="col-lg-9 order-1 order-lg-2">
                {/* shop topbar default */}
                <ShopTopbar
                  getLayout={getLayout}
                  getFilterSortParams={getFilterSortParams}
                  productCount={sortedProducts.length}
                  sortedProductCount={currentData.length}
                />

                {/* shop page content default */}
                <ShopProducts layout={layout} products={currentData} />

                {/* shop product pagination */}
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
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default ShopGridStandard;
