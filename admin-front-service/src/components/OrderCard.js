export default function OrderCard({ resOrderFromAPI }) {
  const { productsForOrderDetails, total_price, userAddress, userEmail, _id } =
    resOrderFromAPI;

  const productsHTML = productsForOrderDetails.map((product) => {
    return (
      <tr>
        <td>{product.name}</td>
        <td>{product.quantity}</td>
        <td>{product.price}</td>
        <td>{product.price * product.quantity}</td>
      </tr>
    );
  });

  return (
    <div>
      <div
        className="card m-2 p-3 border-secondary 
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
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody className="">{productsHTML}</tbody>
        </table>

        <div className="col-auto mt-2">
          <span className="" style={{ fontWeight: "700", fontSize: "20px" }}>
            Grand Total: ₹
          </span>
          <span className="" style={{ fontWeight: "700", fontSize: "20px" }}>
            {" "}
            {total_price}
          </span>
        </div>
      </div>
    </div>
  );
}
