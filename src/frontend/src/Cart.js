import axios from 'axios';
import HeaderComponent from './HeaderComponent';
import { useEffect, useState } from 'react';

const CartList = () => {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState({});

  const getProductPriceAndName = async (id) => {
    const res = await axios.get(`http://localhost:3008/product/${id}`);
    if (res) {
      const product = res.data;
      return { price: product.price, name: product.name, image: product.imageUrl };
    }
    return null;
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (products.length !== 0) {
      fetchProductDetails();
    }
  }, [products]); // Listen for changes to the products state

  const fetchProductDetails = async () => {
    const newProductDetailsAndNames = {};
    if (products.length !== 0) {
      for (const product of products) {
        newProductDetailsAndNames[product.productId] = await getProductPriceAndName(
          product.productId
        );
      }
      setProductDetails(newProductDetailsAndNames);
    }
  };

  const fetchCart = async () => {
    const res = await axios.get(`http://localhost:3008/cart`);
    if (res) {
      setProducts(res.data);
    }
  };

  const totalPrice = () => {
    let totalPrice = 0;
    for (const product of products) {
      const { price } = productDetails[product.productId] || 0;
      totalPrice += price * product.quantity;
    }
    return totalPrice;
  };

  const removeProductFromCart = async (id) => {
    await axios.delete(`http://localhost:3008/cart/remove-product/${id}`);
    fetchCart();
  };

  const order = async () => {
    const res = await axios.post(`http://localhost:3008/order`, {
      orderedProducts: products
    });
    if (res.data) {
      setProducts([]);
    }
  };

  const renderedProducts = Object.values(products).map((product) => {
    const productPrice = productDetails[product.productId]?.price || 0;
    const productImage = productDetails[product.productId]?.image || "";
    return (
      <div className="col-sm-3 mb-4 p-3" key={product.productId}>
        <div className="card">
          <img
            src={`${productImage}`}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{product.productName}</h5>
            <p className="card-text">
              price: <b>{productPrice}din.</b>
            </p>
            <p className="card-text">
              quantity: <b>{product.quantity}</b>
            </p>
            <button
              className="btn btn-danger"
              onClick={() => removeProductFromCart(product.productId)}
            >
              remove
            </button>
          </div>
        </div>
      </div>
    );
  });
  //

  return (
    <div>
      <HeaderComponent title="Cart" description="list of products in the cart" />
      <div className="container">
        <div className="row">{renderedProducts}</div>
        {products.length === 0 && (
          <div className="text-center mt-5">
            <h2>Cart is empty...</h2>
          </div>
        )}
        {products.length !== 0 && (
          <div>
            <div className="shadow-sm p-3 mb-5 bg-body-tertiary rounded">
              <span>Total price: </span>
              <span className="float-end">
                <b>{totalPrice()}</b> din.
              </span>
            </div>
            <button className="btn btn-success" onClick={order}>
              Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartList;
