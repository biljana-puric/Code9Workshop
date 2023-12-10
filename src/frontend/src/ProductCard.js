import axios from 'axios';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [addedToCart, setAddedToCart] = useState(false);

  const addToCart = async () => {
    const res = await axios.post(`http://localhost:3008/cart/add-product/${product.id}`, {
      quantity: 1,
    });
    if (res.data) {
      setAddedToCart(true);
    }
  };

  return (
    <div className="card">
      <img src={`${product.imageUrl}`} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">
          price: <b>{product.price} din.</b>
        </p>
        <p className="card-text">
          quantity: <b>{product.quantity}</b>
        </p>
        {!addedToCart && (
          <button className="btn btn-outline-secondary" onClick={addToCart}>
            Add to cart
          </button>
        )}
        {addedToCart && <p className="text-bg-success p-3">Product added to the cart</p>}
      </div>
    </div>
  );
};

export default ProductCard;
