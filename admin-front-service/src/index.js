import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddProduct from "./components/AddProduct";
import ProductsPage from "./components/ProductsPage";
import Login from "./components/Login";
import OrdersPage from "./components/OrdersPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/get-all-products" element={<ProductsPage />} />
      <Route path="//get-all-orders" element={<OrdersPage />} />
    </Routes>
  </BrowserRouter>
);
