import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";

// Views
import Home from "./views/Home";
import ProductDetail from "./views/ProductDetail";
import Cart from "./views/Cart";

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
        </Routes>
      </>
    </CartProvider>
  );
}

export default App;
