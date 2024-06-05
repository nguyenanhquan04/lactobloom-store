// get products
export const getProducts = (products2, category, type, limit) => {
  const finalProducts = category
    ? products2.filter(
        product => product.category.categoryName.filter(single => single === category)[0]
      )
    : products2;

  // if (type && type === "new") {
  //   const newProducts = finalProducts.filter(single => single.new);
  //   return newProducts.slice(0, limit ? limit : newProducts.length);
  // }
  // if (type && type === "bestSeller") {
  //   return finalProducts
  //     .sort((a, b) => {
  //       return b.saleCount - a.saleCount;
  //     })
  //     .slice(0, limit ? limit : finalProducts.length);
  // }
  if (type && type === "saleItems") {
    const saleItems = finalProducts.filter(
      single => single.discount && single.discount > 0
    );
    return saleItems.slice(0, limit ? limit : saleItems.length);
  }
  return finalProducts.slice(0, limit ? limit : finalProducts.length);
};

// get product discount price
export const getDiscountPrice = (price, discount) => {
  return discount && discount > 0 ? price - price * (discount / 100) : null;
};

// get product cart quantity
export const getProductCartQuantity = (cartItems, product) => {
  let productInCart = cartItems.filter(
    single =>
      single.productId === product.productId 
  )[0];
  if (cartItems.length >= 1 && productInCart) {
    if (product.variation) {
      return cartItems.filter(
        single =>
          single.productId === product.productId 
      )[0].quantity;
    } else {
      return cartItems.filter(single => product.productId === single.productId)[0].quantity;
    }
  } else {
    return 0;
  }
};

//get products based on category
export const getSortedProducts = (products2, sortType, sortValue) => {
  if (products2 && sortType && sortValue) {
    if (sortType === "category") {
      return products2.filter(
        product => product.category.categoryName.filter(single => single === sortValue)[0]
      );
    }
    if (sortType === "brand") {
      return products2.filter(
        product => product.brand.brandName.filter(single => single === sortValue)[0]
      );
    }
    if (sortType === "filterSort") {
      let sortProducts = [...products2];
      if (sortValue === "default") {
        return sortProducts;
      }
      if (sortValue === "priceHighToLow") {
        return sortProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sortValue === "priceLowToHigh") {
        return sortProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }
    }
  }
  return products2;
};

// get individual element
const getIndividualItemArray = array => {
  let individualItemArray = array.filter(function(v, i, self) {
    return i === self.indexOf(v);
  });
  return individualItemArray;
};

// get individual categories
export const getIndividualCategories = products2 => {
  let productCategories = [];
  products2 &&
    products2.map(product => {
      return (
        product.category.categoryName &&
        product.category.categoryName.map(single => {
          return productCategories.push(single);
        })
      );
    });
  const individualProductCategories = getIndividualItemArray(productCategories);
  return individualProductCategories;
};

// get individual tags
export const getIndividualBrand = products2 => {
  let productBrands = [];
  products2 &&
    products2.map(product => {
      return (
        product.brand.brandName &&
        product.brand.brandName.map(single => {
          return productBrands.push(single);
        })
      );
    });
  const individualProductTags = getIndividualItemArray(productBrands);
  return individualProductTags;
};

export const setActiveSort = e => {
  const filterButtons = document.querySelectorAll(
    ".sidebar-widget-list-left button, .sidebar-widget-tag button, .product-filter button"
  );
  filterButtons.forEach(item => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const setActiveLayout = e => {
  const gridSwitchBtn = document.querySelectorAll(".shop-tab button");
  gridSwitchBtn.forEach(item => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const toggleShopTopFilter = e => {
  const shopTopFilterWrapper = document.querySelector(
    "#product-filter-wrapper"
  );
  shopTopFilterWrapper.classList.toggle("active");
  if (shopTopFilterWrapper.style.height) {
    shopTopFilterWrapper.style.height = null;
  } else {
    shopTopFilterWrapper.style.height =
      shopTopFilterWrapper.scrollHeight + "px";
  }
  e.currentTarget.classList.toggle("active");
};
