import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom"; 
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const Voucher = () => {
  let { pathname } = useLocation();

  return (
    <Fragment>
      <SEO
        titleTemplate="Voucher"
        description="Lactobloom Voucher Exchange."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Voucher", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />
      </LayoutOne>
    </Fragment>
  );
};

export default Voucher;
