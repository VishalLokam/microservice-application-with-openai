import ProductCard from "./ProductCard";
import axios from "axios";
import { useEffect, useState } from "react";
import Navigation from "./Navigation";

export default function ProductsPage() {
  const [resProductsFromAPI, setResProductsFromAPI] = useState("");

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = () => {
    axios.get("http://product-service:8080/products").then((res) => {
      setResProductsFromAPI(res.data);
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
          img_url={resProductFromAPI.img_url}
        />
      ));
      return products;
    } else {
      return <p>Loading ...</p>;
    }
  }

  return (
    <div>
      <Navigation />
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {renderProductsList()}
      </div>
    </div>
  );
}
