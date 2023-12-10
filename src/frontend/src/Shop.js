import HeaderComponent from './HeaderComponent';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const Shop = () => {
  const [products, setProducts] = useState({});
  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:3008/product');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderedProducts = Object.values(products).map((product) => {
    return (
      <div key={product.id} className="col-sm-4 col-md-4 col-lg-2 mb-4 mb-sm-0 p-3">
        <ProductCard product={product} />
      </div>
    );
  });

  return (
    <div>
      <div>
        <HeaderComponent title="Shop" description="add products to cart"></HeaderComponent>
      </div>
      <div className="container">
        <div className="row">{renderedProducts}</div>
      </div>
    </div>
  );
};

export default Shop;
