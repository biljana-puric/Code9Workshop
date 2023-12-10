import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderComponent from './HeaderComponent';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const fetchOrders = async () => {
    const res = await axios.get(`http://localhost:3008/order`);
    if (res.data) {
      setOrders(res.data);
    }
  };
  const fetchProducts = async () => {
    const res = await axios.get(`http://localhost:3008/product`);
    if (res.data) {
      setProducts(res.data);
    }
  };
  const findProductNameAndPriceById = (productId) => {
    const product = products.find((product) => product.id === productId);
    return product ? { name: product.name, price: product.price } : {};
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const renderedOrders = Object.values(orders).map((order) => {
    return (
      <div className="row bd-example m-0 border-1 m-2 mb-lg-5">
        <table className="table table-success  table-striped-columns">
          <thead>
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Product Price</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(order.orderedProducts).map((product) => {
              const { name, price } = findProductNameAndPriceById(product.productId);
              return (
                <tr>
                  <td>{name}</td>
                  <td>{price} din.</td>
                  <td>{product.quantity} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  });

  return (
    <div>
      <HeaderComponent title="Order list" description="see all your orders" />
      <div className="container">{renderedOrders}</div>
    </div>
  );
};

export default Orders;
