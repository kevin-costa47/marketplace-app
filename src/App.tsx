import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "@/App.css";
import { Suspense } from "react";

import Header from "@/components/Header";
import Home from "@/routes/Home";
import Cart from "@/routes/Cart";
import ErrorPage from "@/routes/ErrorPage";
import "@/utils/variables.scss";
import Footer from "@/components/Footer";
import { t } from "i18next";

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div>{t("loading")}...</div>} />
      <div className="router-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
