import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
// import Home from ;
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";

import Loader from "./Components/Loader";

const Home = lazy(() => import("./Pages/Home"));
const NotFound = lazy(() => import("./Components/NotFound"));
const Products = lazy(() => import("./Pages/Products"));
const About = lazy(() => import("./Pages/About"));
const Contact = lazy(() => import("./Pages/Contact"));
const Cart = lazy(() => import("./Pages/Cart"));
const Shipping = lazy(() => import("./Pages/Shipping"));
const Login = lazy(() => import("./Pages/Login"));
const Signup = lazy(() => import("./Pages/Signup"));
const Product = lazy(() => import("./Pages/Product"));
const Profile = lazy(() => import("./Pages/Profile"));
const Coupon = lazy(() => import("./Pages/Admin/apps/Coupon"));
const Dashboard = lazy(() => import("./Pages/Admin/Dashboard"));
const StopWatch = lazy(() => import("./Pages/Admin/apps/StopWatch"));
const Toss = lazy(() => import("./Pages/Admin/apps/Toss"));
const AdminProducts = lazy(() =>
  import("./Pages/Admin/Management/AdminProducts")
);
const Customers = lazy(() => import("./Pages/Admin/Customers"));
const Transactions = lazy(() => import("./Pages/Admin/Transactions"));
const TransactionManagement = lazy(() =>
  import("./Pages/Admin/Management/TransactionManagement")
);
const UserManagement = lazy(() =>
  import("./Pages/Admin/Management/UserManagement")
);
const NewProduct = lazy(() => import("./Pages/Admin/Management/NewProduct"));
const ProductManagement = lazy(() =>
  import("./Pages/Admin/Management/ProductManagement")
);

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product/:id" element={<Product />} />
          <Route>
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/shipping" element={<Shipping />} />
          </Route>
          <Route>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/stopwatch" element={<StopWatch />} />
            <Route path="/admin/toss" element={<Toss />} />
            <Route path="/admin/coupon" element={<Coupon />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/transactions" element={<Transactions />} />
            <Route path="/admin/product/new" element={<NewProduct />} />
            <Route path="/admin/product/:id" element={<ProductManagement />} />
            <Route path="/admin/user/:id" element={<UserManagement />} />
            <Route
              path="/admin/transaction/:id"
              element={<TransactionManagement />}
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </Router>
    </Suspense>
  );
};

export default App;
