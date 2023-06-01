import React, { useState, useEffect } from "react";
import ProductDataService from "../service/products.service";

const EditProduct = ({ id, getProducts }) => {
  const [newStatus, setNewStatus] = useState(null);
  const [newDescription, setNewDescription] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState(null);
  const [message, setMessage] = useState("");

  const handleButton = async () => {
    const newProduct = {
      halal_status: newStatus,
      product_description: newDescription,
      product_img: newImg,
      product_name: newName,
      subcategory_id: newCategory,
    };
    console.log(newProduct);

    try {
      await ProductDataService.updateProduct(id, newProduct);
      setMessage({ error: false, msg: "Updated successfully!" });
      const data = await ProductDataService.getProducts();
      getProducts(data.map((doc) => ({ ...doc, id: doc.id })));
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await ProductDataService.getProduct(id);
      console.log("the record is :", docSnap);
      setNewStatus(docSnap.halal_status);
      setNewDescription(docSnap.product_description);
      setNewImg(docSnap.product_img);
      setNewName(docSnap.product_name);
      setNewCategory(docSnap.subcategory_id);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
      <div className="p-4 box">
        <h1>Update Product</h1>
        <h5>id: {id}</h5>
        <input
          type="number"
          value={newStatus}
          placeholder="status"
          onChange={(e) => setNewStatus(Number(e.target.value))}
        ></input>
        <input
          type="string"
          value={newDescription}
          placeholder="description"
          onChange={(e) => setNewDescription(String(e.target.value))}
        ></input>
        <input
          type="string"
          value={newImg}
          placeholder="img"
          onChange={(e) => setNewImg(String(e.target.value))}
        ></input>
        <input
          type="string"
          placeholder="name"
          value={newName}
          onChange={(e) => setNewName(String(e.target.value))}
        ></input>
        <input
          type="number"
          placeholder="category"
          value={newCategory}
          onChange={(e) => setNewCategory(Number(e.target.value))}
        ></input>
        <button onClick={() => handleButton()}>Update</button>
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

export default EditProduct;
