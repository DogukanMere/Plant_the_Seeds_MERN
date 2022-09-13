import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/product/productSlice';
import { Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Product from '../components/Product';

const HomePage = () => {
  const dispatch = useDispatch();

  const { products, isLoading, errorProducts } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <h2 className='fs-2 text-dark'>Listed Products</h2>
      {isLoading ? (
        <Loader />
      ) : errorProducts ? (
        <Message variant='danger'>{errorProducts}</Message>
      ) : (
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
      )}
    </>
  );
};

export default HomePage;
