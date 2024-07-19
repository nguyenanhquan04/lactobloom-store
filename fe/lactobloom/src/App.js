import { Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MessengerButton from "./components/messenger-button/MessengerButton";

// home pages
const Home = lazy(() => import("./pages/home/Home"));

// shop pages
const Shop = lazy(() => import("./pages/shop/Shop"));

// product pages
const Product = lazy(() => import("./pages/shop-product/Product"));

// blog pages
const Blog = lazy(() => import("./pages/blog/Blog"));
const BlogDetails = lazy(() => import("./pages/blog/BlogDetails"));

// other pages
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const Login = lazy(() => import("./pages/other/Login"));
const Register = lazy(() => import("./pages/other/Register"));
const Voucher = lazy(() => import("./pages/other/Voucher"));
const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));
const OrderHistory = lazy(() => import("./pages/other/OrderHistory"));
const CheckoutResult = lazy(() => import("./pages/other/CheckoutResult"));
const ForgotPassword = lazy(() => import("./pages/other/ForgotPassword"));
const Admin = lazy(() => import("./pages/admin/Admin"));

const NotFound = lazy(() => import("./pages/other/NotFound"));

const App = () => {
  return (
      <Router>
        <ScrollToTop>
          <Suspense
            fallback={
              <div className="lactobloom-preloader-wrapper">
                <div className="lactobloom-preloader">
                  <span></span>
                  <span></span>
                </div>
              </div>
            }
          >
            <Routes>
              <Route
                path={process.env.PUBLIC_URL + "/"}
                element={<Home/>}
              />
              
              {/* Shop pages */}
              <Route
                path={process.env.PUBLIC_URL + "/shop"}
                element={<Shop/>}
              />

              {/* Shop product pages */}
              <Route
                path={process.env.PUBLIC_URL + "/product/:id"}
                element={<Product />}
              />

              {/* Blog pages */}
              <Route
                path={process.env.PUBLIC_URL + "/blog"}
                element={<Blog/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/blog-details/:blogId"}
                element={<BlogDetails/>}
              /> 

              {/* Other pages */}
              <Route
                path={process.env.PUBLIC_URL + "/my-account"}
                element={<MyAccount/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/login"}
                element={<Login/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/register"}
                element={<Register/>}
              />

              <Route
                path={process.env.PUBLIC_URL + "/cart"}
                element={<Cart/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/wishlist"}
                element={<Wishlist/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/compare"}
                element={<Compare/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/checkout"}
                element={<Checkout/>}
              />
              <Route
                path={process.env.PUBLIC_URL + "/voucher"}
                element={<Voucher/>}
              /> 
              <Route
                path={process.env.PUBLIC_URL + "/order-history"}
                element={<OrderHistory/>}
              />
               <Route
                path={process.env.PUBLIC_URL + "/checkout-result"}
                element={<CheckoutResult/>}
              /> 
              <Route
                path={process.env.PUBLIC_URL + "/forgot-password"}
                element={<ForgotPassword/>}
              /> 
              <Route
                path={process.env.PUBLIC_URL + "/admin"}
                element={<Admin/>}
              /> 

              <Route path="*" element={<NotFound/>} />
            </Routes>
            <MessengerButton />
          </Suspense>
        </ScrollToTop>
      </Router>
  );
};

export default App;