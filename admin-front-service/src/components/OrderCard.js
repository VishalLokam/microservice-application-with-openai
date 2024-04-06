// import axios from "axios";
// import { useState, useEffect } from "react";

export default function OrderCard({ resOrderFromAPI }) {
  const { products, total_price, userAddress, userEmail, _id } =
    resOrderFromAPI;

  const productsHTML = products.map((product) => {
    return (
      <tr>
        <td>{product.name}</td>
        <td>{product.price}</td>
      </tr>
    );
  });

  return (
    <div>
      <div
        className="card mt-2 ms-2 me-2 p-3 border-secondary 
      "
      >
        <div className="col-auto">
          <span className="" style={{ fontWeight: "700" }}>
            Order id:
          </span>
          <span className=""> {_id}</span>
        </div>

        <div className="col-auto">
          <span className="" style={{ fontWeight: "700" }}>
            User Email id:
          </span>
          <span className=""> {userEmail}</span>
        </div>

        <div className="col-auto">
          <span className="" style={{ fontWeight: "700" }}>
            User Address:
          </span>
          <span className=""> {userAddress}</span>
        </div>

        <h5 className="mt-4">Item details:-</h5>

        <table className="table table-bordered table-secondary">
          <thead>
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Product Price</th>
            </tr>
          </thead>
          <tbody className="">{productsHTML}</tbody>
        </table>

        <div className="col-auto mt-4   ">
          <span className="" style={{ fontWeight: "700" }}>
            Total: ₹
          </span>
          <span className=""> {total_price}</span>
        </div>
      </div>
    </div>
  );
}
