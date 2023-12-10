import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Shop';
import CartList from './Cart';
import Orders from './Orders';

const App = () => {
  return (
    <div>
      <div className="container">
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link active" href="/">
              Shop
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/cart">
              Cart
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/orders">
              My Orders
            </a>
          </li>
        </ul>
      </div>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/cart" element={<CartList />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
