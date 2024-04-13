import React, { useState } from "react";
import axios from "axios";
import { useNewProductMutation } from "./redux/api/api";

const Test = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const [newProduct] = useNewProductMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("stock", stock);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("price", price);
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    try {
      await newProduct(formData);
      setSuccessMessage("Product created successfully");
    } catch (err) {
      setErrorMessage("Failed to create product");
    }
  };

  return (
    <div>
      <h2>Create a New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>stock:</label>
          <input
            type="text"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div>
          <label>category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Images:</label>
          <input type="file" multiple onChange={handleImageChange} />
        </div>
        <button type="submit">Create Product</button>
        {successMessage && <div>{successMessage}</div>}
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </div>
  );
};

export default Test;
