import React, { useState, useEffect } from "react";
import ProductDataService from "../service/products.service";
import { Button } from "react-bootstrap";

const Table = ({ getProductId, givenData }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try{
      getProducts();
    } catch(e){
      console.error("Run FAST API endpoint")
    }
  }, [givenData]);

  const getProducts = async () => {
    const data = await ProductDataService.getProducts();
    console.log(data.map((doc) => ({ ...doc, id: doc.id })));
    setProducts(data.map((doc) => ({ ...doc, id: doc.id })));
  };
  const deleteHandler = async (id) => {
    await ProductDataService.deleteProduct(id);
    getProducts();
  };

  const [searchStatus, setSearchStatus] = useState("");
  const [searchDescription, setSearchDescription] = useState("");
  const [searchImage, setSearchImage] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchCategoryId, setSearchCategoryId] = useState("");

  const handleSearchStatus = (event) => {
    setSearchStatus(event.target.value);
  };

  const handleSearchDescription = (event) => {
    setSearchDescription(event.target.value);
  };

  const handleSearchImage = (event) => {
    setSearchImage(event.target.value);
  };

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  };

  const handleSearchCategoryId = (event) => {
    setSearchCategoryId(event.target.value);
  };

  const filteredData = products.filter((item) => {
    return (
      String(item.halal_status)
        .toLowerCase()
        .includes(searchStatus.toLowerCase()) &&
      String(item.product_description)
        .toLowerCase()
        .includes(searchDescription.toLowerCase()) &&
      String(item.product_img)
        .toLowerCase()
        .includes(searchImage.toLowerCase()) &&
      String(item.product_name)
        .toLowerCase()
        .includes(searchName.toLowerCase()) &&
      String(item.subcategory_id)
        .toLowerCase()
        .includes(searchCategoryId.toLowerCase())
    );
  });

  return (
    <div>
      <h1>Table</h1>
      <input
        style={{ width: "20%" }}
        type="text"
        value={searchStatus}
        onChange={handleSearchStatus}
        placeholder="Search by status"
      />
      <input
        style={{ width: "20%" }}
        type="text"
        value={searchDescription}
        onChange={handleSearchDescription}
        placeholder="Search by description"
      />
      <input
        style={{ width: "20%" }}
        type="text"
        value={searchImage}
        onChange={handleSearchImage}
        placeholder="Search by image"
      />
      <input
        style={{ width: "20%" }}
        type="text"
        value={searchName}
        onChange={handleSearchName}
        placeholder="Search by name"
      />
      <input
        style={{ width: "20%" }}
        type="text"
        value={searchCategoryId}
        onChange={handleSearchCategoryId}
        placeholder="Search by category ID"
      />
      <div className="table-container">
        <table style={{ tableLayout: "auto", width: "100%" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Description</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.halal_status}</td>
                  <td>{item.product_description}</td>
                  <td>
                    <img
                      style={{ width: "10vw", height: "12vh", padding: "5px" }}
                      src={item.product_img}
                      alt={"no img"}
                    />
                  </td>
                  <td>{item.product_name}</td>
                  <td>{item.subcategory_id}</td>
                  <td>
                    <Button
                      variant="secondary"
                      className="edit"
                      onClick={(e) => getProductId(item.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="delete"
                      onClick={(e) => deleteHandler(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
