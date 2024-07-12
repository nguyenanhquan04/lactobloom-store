import React, { Fragment } from "react"; 
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";

const Product = () => {
  let { pathname } = useLocation();
  let { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const product = products.find(product => String(product.productId) === id);
  

  return (
    // console.log(product.productId),

    <Fragment>
      <SEO
        titleTemplate="Product"
        description="Lactobloom Product Page."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Trang chủ", path: process.env.PUBLIC_URL + "/" },
            {label: "Sản phẩm", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />

          

        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={product}
        />

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={product.longDescription}
          productId={product.productId}
        />

        {/* related product slider */}
        <RelatedProductSlider
          spaceBottomClass="pb-95"
          // category={product.category[0]}
        />
      </LayoutOne>
    </Fragment>
  );
};

export default Product;
