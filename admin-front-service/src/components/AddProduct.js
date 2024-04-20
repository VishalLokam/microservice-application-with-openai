import AuthUser from "./AuthUser";
import axios from "axios";
import { useState } from "react";
import Navigation from "./Navigation";

export default function AddProduct() {
  const { user, http } = AuthUser();
  const [productDescription, setProductDescription] = useState("");
  const [productName, setProductName] = useState("");
  const [productTags, setProductTags] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [generateIndicator, setGenerateIndicator] = useState(
    "Generate Description"
  );

  const submitAddProductForm = (e) => {
    e.preventDefault();
    if (
      productName === "" ||
      productTags === "" ||
      productDescription === "" ||
      productPrice === "" ||
      imageUrl === ""
    ) {
      window.alert("Please fill all the product details");
    } else {
      const product = {
        name: productName,
        tags: productTags,
        description: productDescription,
        price: productPrice,
        created_by: user.email,
        img_url: imageUrl,
      };

      http
        .post("http://product-service:8080/product/create", product)
        .then((res) => {
          console.log("New product added");
          console.log(res);
        });

      // setProducts("");
      setProductDescription("");
      setProductName("");
      setProductTags("");
      setProductPrice("");
      setImageUrl("");

      window.alert("New Product Added");
    }
  };

  const generateDescription = (e) => {
    e.preventDefault();
    setGenerateIndicator("Generating...");
    console.log("Generate description");
    axios
      .post("http://ai-service:5000/generate/description", {
        product_name: productName,
        product_tags: productTags,
      })
      .then((res) => {
        setProductDescription(res.data.description);
        setGenerateIndicator("Generate description");
      });
  };

  return (
    <div>
      <Navigation />
      <div className="m-5">
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
              required
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
              required
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
              required
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
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="imgUrl" className="form-label">
              Product image url(externally hosted image)
            </label>
            <input
              type="text"
              className="form-control"
              id="imgUrl"
              aria-describedby="imgUrl"
              onChange={(e) => setImageUrl(e.target.value)}
              value={imageUrl}
              required
            />
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
    </div>
  );
}
