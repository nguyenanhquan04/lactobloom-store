import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderOne from "../../wrappers/hero-slider/HeroSliderOne";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import TabProduct from "../../wrappers/product/TabProduct";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";

const Home = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>LactoBloom Store | Home</title>
        <meta
          name="description"
          content="LactoBloom Store | Home"
        />
      </MetaTags>
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        {/* hero slider */}
        <HeroSliderOne />

        {/* featured icon */}
        <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" />

        {/* tab product */}
        <TabProduct spaceBottomClass="pb-60" category="Milk" />

        {/* blog featured */}
        <BlogFeatured spaceBottomClass="pb-55" />
      </LayoutOne>
    </Fragment>
  );
};

export default Home;
