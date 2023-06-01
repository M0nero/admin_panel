import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AddProduct from "./components/addProduct";
import "./App.css";
import EditProduct from "./components/editProduct";
import Table from "./components/listProducts";

function App() {
  const [productId, setProductId] = useState("");
  const [products, setProducts] = useState([]);
  const getProductIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setProductId(id);
  };

  const getProductsHandler = (products) => {
    console.log("The ID of document to be edited: ", products);
    setProducts(products);
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <AddProduct getProducts={getProductsHandler} />
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <EditProduct id={productId} getProducts={getProductsHandler} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            {/* <ProductList
              getProductId={getProductIdHandler}
              style={{ height: "400px", width: "600px" }}
            /> */}

            <Table
              getProductId={getProductIdHandler}
              givenData={products}
              style={{ height: "400px", width: "600px" }}
            ></Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
