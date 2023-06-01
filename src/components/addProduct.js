import React, { useState } from "react";
import ProductDataService from "../service/products.service";

const AddProduct = ({ getProducts }) => {
  const [newStatus, setNewStatus] = useState(-1);
  const [newDescription, setNewDescription] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState(-1);
  const [message, setMessage] = useState("");

  const handleButton = async () => {
    const newProduct = {
      halal_status: newStatus,
      product_description: newDescription,
      product_img: newImg,
      product_name: newName,
      subcategory_id: newCategory,
    };
    console.log("create" + newProduct);

    try {
      await ProductDataService.addProduct(newProduct);
      setMessage({ error: false, msg: "New Product added successfully!" });
      const data = await ProductDataService.getProducts();
      getProducts(data.map((doc) => ({ ...doc, id: doc.id })));
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  return (
    <>
      <div className="p-4 box">
        <h1>Create Product</h1>
        <input
          type="number"
          placeholder="status"
          onChange={(e) => setNewStatus(Number(e.target.value))}
        ></input>
        <input
          type="string"
          placeholder="description"
          onChange={(e) => setNewDescription(String(e.target.value))}
        ></input>
        <input
          type="string"
          placeholder="img"
          onChange={(e) => setNewImg(String(e.target.value))}
        ></input>
        <input
          type="string"
          placeholder="name"
          onChange={(e) => setNewName(String(e.target.value))}
        ></input>
        <input
          type="number"
          placeholder="category"
          onChange={(e) => setNewCategory(Number(e.target.value))}
        ></input>
        <button onClick={() => handleButton()}>Create</button>
      </div>
      {message?.msg && (
        <alert
          variant={message?.error ? "danger" : "success"}
          dismissible
          onClose={() => setMessage("")}
        >
          {message?.msg}
        </alert>
      )}
    </>
  );
};

export default AddProduct;
