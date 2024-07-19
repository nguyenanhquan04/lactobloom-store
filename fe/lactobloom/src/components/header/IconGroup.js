// import PropTypes from "prop-types";
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import clsx from "clsx";
// import MenuCart from "./sub-components/MenuCart";
// import Cookies from 'js-cookie'; // Import js-cookie
// import {jwtDecode} from 'jwt-decode'; // Import jwt-decode
// import { logOut } from "../../utils/UserService";
// import { deleteAllFromCart } from "../../store/slices/cart-slice";
// import { deleteAllFromWishlist } from "../../store/slices/wishlist-slice";

// const IconGroup = ({ iconWhiteClass }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleClick = (e) => {
//     e.currentTarget.nextSibling.classList.toggle("active");
//   };

//   const triggerMobileMenu = () => {
//     const offcanvasMobileMenu = document.querySelector(
//       "#offcanvas-mobile-menu"
//     );
//     offcanvasMobileMenu.classList.add("active");
//   };

//   const { compareItems } = useSelector((state) => state.compare);
//   const { wishlistItems } = useSelector((state) => state.wishlist);
//   const { cartItems } = useSelector((state) => state.cart);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [authToken, setAuthToken] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     const token = Cookies.get('authToken');
//     setAuthToken(token);
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         // Assuming the role is stored in decodedToken.role
//         setIsAdmin(decodedToken.role !== 'MEMBER');
//       } catch (error) {
//         console.error('Token decoding failed:', error);
//         setIsAdmin(false);
//       }
//     }
//   }, []);

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (searchTerm) {
//       navigate(`/shop?search=${searchTerm}`);
//     }
//   };

//   const handleLogout = () => {
//     // Display confirmation dialog
//     const confirmLogout = window.confirm("Are you sure you want to log out?");
//     if (confirmLogout) {
//       // Clear token from cookies
//       logOut(Cookies.get('authToken'));
//       Cookies.remove('authToken'); 
//       dispatch(deleteAllFromCart());
//       dispatch(deleteAllFromWishlist());
//     }
//     // If user cancels, do nothing
//   };

//   return (
//     <div className={clsx("header-right-wrap", iconWhiteClass)}>
//       <div className="same-style header-search d-none d-lg-block">
//         <button className="search-active" onClick={(e) => handleClick(e)}>
//           <i className="pe-7s-search" />
//         </button>
//         <div className="search-content">
//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               placeholder="Tìm kiếm"
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
//             <button className="button-search" disabled={!searchTerm}>
//               <i className="pe-7s-search" />
//             </button>
//           </form>
//         </div>
//       </div>
//       <div className="same-style account-setting d-none d-lg-block">
//         <button
//           className="account-setting-active"
//           onClick={(e) => handleClick(e)}
//         >
//           <i className="pe-7s-user-female" />
//         </button>
//         <div className="account-dropdown">
//           <ul>
//             {!authToken ? (
//               <>
//                 <li>
//                   <Link to={process.env.PUBLIC_URL + "/login"}>Đăng Nhập</Link>
//                 </li>
//                 <li>
//                   <Link to={process.env.PUBLIC_URL + "/register"}>
//                     Đăng ký
//                   </Link>
//                 </li>
//               </>
//             ) : (
//               <>
//               {isAdmin && (
//                   <li>
//                     <Link to={process.env.PUBLIC_URL + "/admin"}>
//                       Admin Page
//                     </Link>
//                   </li>
//                 )}
//                 <li>
//                   <Link to={process.env.PUBLIC_URL + "/my-account"}>
//                     Tài khoản
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to={process.env.PUBLIC_URL + "/order-history"}>
//                     Lịch sử mua 
//                   </Link>
//                 </li>
//                 <li>
//                   <Link onClick={handleLogout} to="/login">
//                     Đăng xuất
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//       <div className="same-style header-compare">
//         <Link to={process.env.PUBLIC_URL + "/compare"}>
//           <i className="pe-7s-shuffle" />
//           <span className="count-style">
//             {compareItems && compareItems.length ? compareItems.length : 0}
//           </span>
//         </Link>
//       </div>
//       <div className="same-style header-wishlist">
//         <Link to={process.env.PUBLIC_URL + "/wishlist"}>
//           <i className="pe-7s-like" />
//           <span className="count-style">
//             {wishlistItems && wishlistItems.length ? wishlistItems.length : 0}
//           </span>
//         </Link>
//       </div>
//       <div className="same-style cart-wrap d-none d-lg-block">
//         <button className="icon-cart" onClick={(e) => handleClick(e)}>
//           <i className="pe-7s-shopbag" />
//           <span className="count-style">
//             {cartItems && cartItems.length ? cartItems.length : 0}
//           </span>
//         </button>
//         {/* menu cart */}
//         <MenuCart />
//       </div>
//       <div className="same-style cart-wrap d-block d-lg-none">
//         <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
//           <i className="pe-7s-shopbag" />
//           <span className="count-style">
//             {cartItems && cartItems.length ? cartItems.length : 0}
//           </span>
//         </Link>
//       </div>
//       <div className="same-style mobile-off-canvas d-block d-lg-none">
//         <button
//           className="mobile-aside-button"
//           onClick={() => triggerMobileMenu()}
//         >
//           <i className="pe-7s-menu" />
//         </button>
//       </div>
//     </div>
//   );
// };

// IconGroup.propTypes = {
//   iconWhiteClass: PropTypes.string,
// };

// export default IconGroup;
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import MenuCart from "./sub-components/MenuCart";
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'; // Fixed import syntax
import axios from "axios"; // Đã thêm axios import
import { logOut } from "../../utils/UserService";
import { deleteAllFromCart } from "../../store/slices/cart-slice";
import { deleteAllFromWishlist } from "../../store/slices/wishlist-slice";

const IconGroup = ({ iconWhiteClass }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector("#offcanvas-mobile-menu");
    offcanvasMobileMenu.classList.add("active");
  };

  const { compareItems } = useSelector((state) => state.compare);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);

  const [authToken, setAuthToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const token = Cookies.get('authToken');
    setAuthToken(token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsAdmin(decodedToken.role === 'ADMIN' || decodedToken.role === 'STAFF');
        fetchUserInfo(token); // Fetch user info if token is present
      } catch (error) {
        console.error('Token decoding failed:', error);
        setIsAdmin(false);
      }
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get("http://localhost:8080/user/info", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFullName(response.data.fullName);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (confirmLogout) {
      logOut(Cookies.get('authToken'));
      Cookies.remove('authToken'); 
      dispatch(deleteAllFromCart());
      dispatch(deleteAllFromWishlist());
    }
  };

  return (
    <div className={clsx("header-right-wrap", iconWhiteClass)}>
      {!isAdmin && (
        <>
          <div className="same-style header-compare">
            <Link to={process.env.PUBLIC_URL + "/compare"}>
              <i className="pe-7s-shuffle" />
              <span className="count-style">
                {compareItems && compareItems.length ? compareItems.length : 0}
              </span>
            </Link>
          </div>
          <div className="same-style header-wishlist">
            <Link to={process.env.PUBLIC_URL + "/wishlist"}>
              <i className="pe-7s-like" />
              <span className="count-style">
                {wishlistItems && wishlistItems.length ? wishlistItems.length : 0}
              </span>
            </Link>
          </div>
          <div className="same-style cart-wrap d-none d-lg-block">
            <button className="icon-cart" onClick={(e) => handleClick(e)}>
              <i className="pe-7s-shopbag" />
              <span className="count-style">
                {cartItems && cartItems.length ? cartItems.length : 0}
              </span>
            </button>
            <MenuCart />
          </div>
          <div className="same-style cart-wrap d-block d-lg-none">
            <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
              <i className="pe-7s-shopbag" />
              <span className="count-style">
                {cartItems && cartItems.length ? cartItems.length : 0}
              </span>
            </Link>
          </div>
        </>
      )}
      <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={(e) => handleClick(e)}
        >
          <i className="pe-7s-user-female" />
        </button>
        <div className="account-dropdown">
          <ul>
            {!authToken ? (
              <>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/login"}>Đăng Nhập</Link>
                </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/register"}>
                    Đăng ký
                  </Link>
                </li>
              </>
            ) : (
              <>
              {authToken && (
                <h5>
                  Xin Chào, {fullName}
                </h5>
              )}
                {isAdmin && (
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/admin"}>
                      Trang quản lý
                    </Link>
                  </li>
                )}
                {!isAdmin && (
                  <>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/my-account"}>
                        Tài khoản
                      </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/order-history"}>
                        Lịch sử mua
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <Link onClick={handleLogout} to="/login">
                    Đăng xuất
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};

export default IconGroup;
