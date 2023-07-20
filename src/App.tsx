import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";

// Views
import Home from "./views/Home";
import ProductDetail from "./views/ProductDetail";
import Cart from "./views/Cart";
import NotFound from "./views/NotFound";
import CheckOut from "./views/CheckOut";

// Context
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </CartProvider>
  );
}

export default App;
