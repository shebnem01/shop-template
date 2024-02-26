import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./shared/components/footer";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Reset from "./pages/auth/reset";
import Header from "./shared/components/header";
import "./index.css";
import Basket from "./pages/basket";
import AllProducts from "./pages/allProducts";
import CatalogSearch from "./pages/catalogSearch";
import ProductDetails from "./pages/productDetails";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product-details/:id" element={<ProductDetails />} />
        <Route path="/all-products" element={<AllProducts/>}/>
        <Route path="/catalogsearch" element={<CatalogSearch/>}/>
        <Route path="/basket" element={<Basket />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
