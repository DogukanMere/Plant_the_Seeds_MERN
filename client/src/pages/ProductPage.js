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
          <Image
            src={product.image}
            alt={product.name}
            fluid
            className='mb-2'
          />
        </Col>
        <Col md={6}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3 className='text-main fw-bold text-uppercase fs-4'>
                {product.name}
              </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <small className='text-dark fs-6'>{product.description}</small>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={4} className='py-2'>
                  <span className='text-main fw-bold fs-6'>Duration:</span>
                  <small className='text-dark fs-6'>
                    {' '}
                    {product.duration} days
                  </small>
                </Col>
                <Col md={4} className='py-2'>
                  <span className='text-main fw-bold fs-6'>
                    Available Seeds:
                  </span>
                  <small className='text-dark fs-6'>
                    {' '}
                    {product.amount} pcs
                  </small>
                </Col>
                <Col md={4} className='py-2'>
                  <span className='text-main fw-bold fs-6'>Yield:</span>
                  <small className='text-dark fs-6'> {product.yield}</small>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className='text-main fw-bold fs-6'>Price: </span>
              <small className='text-muted fw-bold fs-5'>
                {' '}
                ${product.price}
              </small>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3} className='mt-2'>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item className='py-3'>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <span>
                      {product.amount > 0 ? 'In stock' : 'Out of stock'}
                    </span>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className='py-3'>
                <Row>
                  <Col>Price</Col>
                  <Col>
                    <span className='fw-bold'>${product.price}</span>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className='py-2'>
                <Button
                  className='btn btn-dark col-12'
                  type='button'
                  disabled={product.amount === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductPage;
