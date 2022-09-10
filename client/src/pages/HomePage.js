import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('api/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <>
      <h2 className='fs-2 text-dark'>Listed Products</h2>
      <Row>
        {products.map((product) => {
          return (
            <Col
              sm={12}
              md={6}
              lg={4}
              xl={3}
              style={{ width: '17rem' }}
              key={product._id}
            >
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomePage;
