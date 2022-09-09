import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import products from '../products';

const ProductPage = () => {
  const params = useParams();
  const product = products.find((item) => item._id === params.id);
  console.log(product);
  return (
    <>
      <Link className='btn btn-sm btn-light my-2' to='/'>
        Back to List
      </Link>
      <Row className='my-3'>
        <Col md={3}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={6}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3 className='text-dark fw-bold text-uppercase fs-4 pt-3'>
                {product.name}
              </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <small className='text-dark'>{product.description}</small>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={4} className='py-2'>
                  <span className='text-success'>Duration:</span>
                  <small className='text-dark'> {product.duration} days</small>
                </Col>
                <Col md={4} className='py-2'>
                  <span className='text-success'>Available Seeds:</span>
                  <small className='text-dark'> {product.amount} pcs</small>
                </Col>
                <Col md={4} className='py-2'>
                  <span className='text-success'>Yield:</span>
                  <small className='text-dark'> {product.yield}</small>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className='text-dark fs-5'>Price: </span>
              <small className='text-dark fs-5'> ${product.price}</small>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductPage;
