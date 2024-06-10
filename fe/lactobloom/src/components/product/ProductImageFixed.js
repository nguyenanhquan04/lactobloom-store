import PropTypes from "prop-types";
import React from "react";

const ProductImageFixed = ({ product }) => {

  const defaultImage = "/assets/img/no-image.png";
  const productImage = product.images && product.images.length > 0 ? product.images[0].imageUrl : defaultImage;

  return (


    <div className="product-large-image-wrapper">
      {product.discount || product.new ? (
        <div className="product-img-badges">
          {product.discount ? (
            <span className="pink">-{product.discount}%</span>
          ) : (
            ""
          )}
          {product.new ? <span className="purple">New</span> : ""}
        </div>
      ) : (
        ""
      )}

      <div className="product-fixed-image">
        {/* {product.image ? ( */}
          <img
            src={process.env.PUBLIC_URL + productImage}
            alt=""
            className="img-fluid"
          />
        {/* ) : (
          ""
        )} */}
      </div>
    </div>
  );
};

ProductImageFixed.propTypes = {
  product: PropTypes.object
};

export default ProductImageFixed;
