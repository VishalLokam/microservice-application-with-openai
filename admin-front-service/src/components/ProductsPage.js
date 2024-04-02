import ProductCard from "./ProductCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [resProductsFromAPI, setResProductsFromAPI] = useState("");

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = () => {
    axios.get("http://127.0.0.1:8080/products").then((res) => {
      setResProductsFromAPI(res.data);
      console.log(res.data);
    });
  };

  function renderProductsList() {
    if (resProductsFromAPI) {
      let products = resProductsFromAPI.map((resProductFromAPI) => (
        <ProductCard
          key={resProductFromAPI._id}
          name={resProductFromAPI.name}
          description={resProductFromAPI.description}
          price={resProductFromAPI.price}
        />
      ));
      return products;
    } else {
      return <p>Loading ...</p>;
    }
  }

  return <div>{renderProductsList()}</div>;
}
