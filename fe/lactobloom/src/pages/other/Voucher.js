import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { getAvailableVoucher, exchangeVoucher } from "../../utils/VoucherService";
import Cookies from 'js-cookie';

const Voucher = () => {
  let { pathname } = useLocation();
  let navigate = useNavigate();
  const [vouchers, setVouchers] = useState([]);
  const authToken = Cookies.get('authToken'); // Get authToken from cookies

  useEffect(() => {
    // Fetch vouchers from the API
    const fetchVouchers = async () => {
      try {
        const response = await getAvailableVoucher();
        setVouchers(response.data);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };

    fetchVouchers();
  }, []);

  const handleExchange = async (voucherId) => {
    try {
      const response = await exchangeVoucher(voucherId, { headers: { Authorization: `Bearer ${authToken}` } });
      alert(response.data);
      if (!authToken) {
        navigate('/login');
      }
      window.location.reload(); 
    } catch (error) {
      console.error("Error exchanging voucher:", error);
    }
  };

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
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Voucher", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />

        {/* Voucher List */}
        <div className="voucher-list">
          {vouchers.length > 0 ? (
            vouchers.map((voucher) => (
              <div key={voucher.voucherId} className="voucher">
                <div className="voucher-details">
                  <h3>Discount {voucher.discount}%</h3>
                  <p>Expire Date: {voucher.expirationDate}</p>
                  <p>Point To Exchange: {voucher.point}</p>
                </div>
                <button className="redeem-button" onClick={() => handleExchange(voucher.voucherId)}>Đổi</button>
              </div>
            ))
          ) : (
            <h1>No vouchers available</h1>
          )}
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Voucher;
