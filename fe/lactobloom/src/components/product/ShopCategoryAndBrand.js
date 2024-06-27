import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../utils/CategoryService";
import { getAllBrands } from "../../utils/BrandService";
import { getAllProducts } from "../../utils/ProductService";
import { setActiveSort } from "../../helpers/product";

const ShopCategoryAndBrand = ({
  getSortParams,
  onCategorySelect,
  onBrandSelect,
}) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);
  const [errorBrands, setErrorBrands] = useState(null);
  const [errorProducts, setErrorProducts] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data);
      } catch (error) {
        setErrorCategories(error.message);
      } finally {
        setLoadingCategories(false);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await getAllBrands();
        setBrands(response.data);
      } catch (error) {
        setErrorBrands(error.message);
      } finally {
        setLoadingBrands(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        setErrorProducts(error.message);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchCategories();
    fetchBrands();
    fetchProducts();
  }, []);

  const handleCategorySelect = (categoryId) => {
    if (categoryId === null) {
      // Selecting "All Categories"
      setSelectedCategories([]);
      onCategorySelect([]);
      getSortParams("categoryName", []);
    } else {
      // Selecting a specific category
      setSelectedCategories([categoryId]);
      onCategorySelect([categoryId]);
      getSortParams("categoryName", [categoryId]);
    }
  };

  const handleBrandSelect = (brandId) => {
    if (brandId === null) {
      // Selecting "All Brands"
      setSelectedBrands([]);
      onBrandSelect([]);
      getSortParams("brand", []);
    } else {
      // Selecting a specific brand
      setSelectedBrands([brandId]);
      onBrandSelect([brandId]);
      getSortParams("brand", [brandId]);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategories =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.categoryId);
    const matchesBrands =
      selectedBrands.length === 0 || selectedBrands.includes(product.brandId);

    return matchesCategories && matchesBrands;
  });

  return (
    <div>
      <div className="sidebar-widget">
        <h4 className="pro-sidebar-title">Categories </h4>
        <div className="sidebar-widget-list mt-30">
          {loadingCategories ? (
            "Loading categories..."
          ) : errorCategories ? (
            `Error: ${errorCategories}`
          ) : categories && categories.length > 0 ? (
            <ul>
              <li>
                <div className="sidebar-widget-list-left">
                  <button
                    onClick={(e) => {
                      handleCategorySelect(null);
                      setActiveSort(e);
                    }}
                    className={selectedCategories.length === 0 ? "active" : ""}
                  >
                    <span className="checkmark" /> All Categories
                  </button>
                </div>
              </li>
              {categories.map((category) => (
                <li key={category.categoryId}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={(e) => handleCategorySelect(category.categoryId)}
                      className={
                        selectedCategories.includes(category.categoryId)
                          ? "active"
                          : ""
                      }
                    >
                      <span className="checkmark" /> {category.categoryName}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            "No category found"
          )}
        </div>
      </div>

      <div className="sidebar-widget mt-50">
        <h4 className="pro-sidebar-title">Brand </h4>
        <div className="sidebar-widget-list mt-25">
          {loadingBrands ? (
            "Loading brands..."
          ) : errorBrands ? (
            `Error: ${errorBrands}`
          ) : brands && brands.length > 0 ? (
            <ul>
              <li>
                <div className="sidebar-widget-list-left">
                  <button
                    onClick={(e) => {
                      handleBrandSelect(null);
                      setActiveSort(e);
                    }}
                    className={selectedBrands.length === 0 ? "active" : ""}
                  >
                    <span className="checkmark" /> All Brands{" "}
                  </button>
                </div>
              </li>
              {brands.map((brand) => (
                <li key={brand.brandId}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={(e) => handleBrandSelect(brand.brandId)}
                      className={
                        selectedBrands.includes(brand.brandId) ? "active" : ""
                      }
                    >
                      <span className="checkmark" /> {brand.brandName}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            "No brand found"
          )}
        </div>
      </div>
    </div>
  );
};

ShopCategoryAndBrand.propTypes = {
  getSortParams: PropTypes.func.isRequired,
  onCategorySelect: PropTypes.func.isRequired,
  onBrandSelect: PropTypes.func.isRequired,
};

export default ShopCategoryAndBrand;
