import AuthUser from "./AuthUser";
import axios from "axios";
import { useState } from "react";

export default function AddProduct() {
  const { user, http } = AuthUser();
  //   const [products, setProducts] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productName, setProductName] = useState("");
  const [productTags, setProductTags] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [generateIndicator, setGenerateIndicator] = useState(
    "Generate Description"
  );

  const submitAddProductForm = (e) => {
    e.preventDefault();
    const product = {
      name: productName,
      tags: productTags,
      description: productDescription,
      price: productPrice,
      created_by: user.email,
    };

    http.post("http://127.0.0.1:8080/product/create", product).then((res) => {
      console.log(res);
    });

    // setProducts("");
    setProductDescription("");
    setProductName("");
    setProductTags("");
    setProductPrice("");

    // axios.get("http://127.0.0.1:8080/products").then((res) => {
    //   console.log(res.data.length);
    //   setProducts(res.data.length);
    // });
    // updateProductCount();
    window.alert("New Product Added");
  };

  const generateDescription = (e) => {
    e.preventDefault();
    setGenerateIndicator("Generating...");
    console.log("Generate description");
    axios
      .post("http://127.0.0.1:5000/generate/description", {
        product_name: productName,
        product_tags: productTags,
      })
      .then((res) => {
        setProductDescription(res.data.description);
        setGenerateIndicator("Generate description");
      });
  };

  //   axios.get("http://127.0.0.1:8080/products").then((res) => {
  //     console.log(res.data.length);
  //     setProducts(res.data.length);
  // });

  return (
    <div className="mt-5">
      {/* <h4>Number of products in the store: {products}</h4> */}

      <form>
        <div className="mb-3">
          <label htmlFor="productname" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="productname"
            aria-describedby="emailHelp"
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="producttags" className="form-label">
            Product Tags
          </label>
          <input
            type="text"
            className="form-control"
            id="producttags"
            onChange={(e) => setProductTags(e.target.value)}
            value={productTags}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="productdescription" className="form-label">
            Product Description
          </label>
          <button
            type="button"
            className="btn btn-primary btn-sm mb-2 ms-2"
            onClick={generateDescription}
          >
            {generateIndicator}
          </button>
          <textarea
            className="form-control"
            aria-label="With textarea"
            id="productdescription"
            onChange={(e) => setProductDescription(e.target.value)}
            value={productDescription}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="productprice" className="form-label">
            Product Price
          </label>
          <div className="input-group ">
            <span className="input-group-text">₹</span>
            <input
              type="number"
              className="form-control"
              id="productprice"
              onChange={(e) => setProductPrice(e.target.value)}
              value={productPrice}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg"
          onClick={submitAddProductForm}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
