import { BrowserRouter, Route, Routes } from "react-router-dom";

import { StoreProvider } from "./app/StoreContext.jsx";
import Layout from "./components/Layout.jsx";
import RouteScrollTop from "./components/RouteScrollTop.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import DropsPage from "./pages/DropsPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import PolicyPage from "./pages/PolicyPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import ShopPage from "./pages/ShopPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <RouteScrollTop />
      <StoreProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:categorySlug" element={<ShopPage />} />
            <Route path="/drops" element={<DropsPage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/shipping" element={<PolicyPage policyKey="shipping" />} />
            <Route path="/returns" element={<PolicyPage policyKey="returns" />} />
            <Route path="/privacy" element={<PolicyPage policyKey="privacy" />} />
            <Route path="/terms" element={<PolicyPage policyKey="terms" />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </StoreProvider>
    </BrowserRouter>
  );
}
