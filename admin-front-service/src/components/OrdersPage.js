import OrderCard from "./OrderCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [resOrdersFromAPI, setResOrdersFromAPI] = useState("");

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = () => {
    axios.get("http://127.0.0.1:9090/orders").then((res) => {
      setResOrdersFromAPI(res.data);
      // console.log(res.data);
    });
  };

  function renderProductsList() {
    if (resOrdersFromAPI) {
      let orders = resOrdersFromAPI.map((resOrderFromAPI) => (
        <OrderCard
          resOrderFromAPI={resOrderFromAPI}
          key={resOrderFromAPI._id}
        />
      ));
      return orders;
    } else {
      return <p>Loading ...</p>;
    }
  }

  return <div>{renderProductsList()}</div>;
}
