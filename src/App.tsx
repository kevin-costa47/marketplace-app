import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Suspense } from "react";

import Header from "./components/Header";
import Home from "./routes/Home";

import "./utils/variables.scss";

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Loading...</div>} />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/cart" element={< Cart />} /> */}

        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
