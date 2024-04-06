// import AuthUser from "./AuthUser";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import AddProduct from "./AddProduct";
// import { useState } from "react";
// import ProductCard from "./ProductCard";
// import ProductsPage from "./ProductsPage";

export default function Dashboard() {
  const [products, setProductCount] = useState("");
  const navigate = useNavigate();

  const updateProductCount = () => {
    axios.get("http://127.0.0.1:8080/products").then((res) => {
      console.log(res.data.length);
      setProductCount(res.data.length);
    });
  };

  updateProductCount();

  const addProductPage = () => {
    navigate("/add-product");
  };

  const getAllProducts = () => {
    console.log("Get all products");
    navigate("/get-all-products");
  };

  const getAllOrders = () => {
    console.log("Get all Orders");
    navigate("/get-all-orders");
  };

  return (
    <div className="m-5">
      <h4 className="mt-3">Number of products in the store: {products}</h4>

      <button
        className="mt-3 btn btn-primary"
        type="submit"
        onClick={addProductPage}
      >
        Add a new product
      </button>

      <button
        className="mt-3 btn btn-primary ms-2"
        type="submit"
        onClick={getAllProducts}
      >
        Get all products
      </button>

      <button
        className="mt-3 btn btn-primary ms-2"
        type="submit"
        onClick={getAllOrders}
      >
        Get all orders
      </button>

      {/* <AddProduct updateProductCount={updateProductCount} /> */}
    </div>
  );
}
