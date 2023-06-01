class ProductDataService {
  domain = "http://127.0.0.1:8000"

  addProduct = async (newProduct) => {
    const request = await fetch(`${this.domain}/products`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(newProduct)
    });
    const response = await request.json();
    return response;
  };

  getProducts = async () => {
    const request = await fetch(`${this.domain}/products?limit=100000&page=1`)
    const response = await request.json();
    console.log(response.products, "products")
    return response.products;
  };

  getProduct = async (id) => {
    const request = await fetch(`${this.domain}/products/${id}`)
    const response = await request.json();
    return response;
  };

  updateProduct = async (id, updatedProduct) => {
    const request = await fetch(`${this.domain}/products/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updatedProduct)
    });
    const response = await request.json();
    return response;
  };

  deleteProduct = async (id) => {
    await fetch(`${this.domain}/products/${id}`, { method: 'DELETE', headers: {
      "Content-type": "application/json"
    } })
  };
}

export default new ProductDataService();
