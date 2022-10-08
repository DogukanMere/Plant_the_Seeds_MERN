import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Card, Col, ListGroup, Image, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  getOrderDetails,
  setOrderDelivered,
  setOrderPaid,
} from '../features/order/orderSlice';
import { useEffect } from 'react';

function OrderPage() {
  const navigate = useNavigate();
  const { id: orderId } = useParams();
  const dispatch = useDispatch();
  const {
    orderDetails,
    loadingOrder,
    error,
    errorDeliver,
    errorPayment,
    successDeliver,
    successPayment,
    loadingDeliver,
    loadingPayment,
  } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      dispatch(getOrderDetails(orderId));
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo, orderId, successDeliver, successPayment]);

  const deliverHandler = (id) => {
    dispatch(setOrderDelivered(id));
  };

  const paymentHandler = (id) => {
    dispatch(setOrderPaid(id));
  };

  return loadingOrder ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order {orderDetails._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Details</h2>
              <p>
                <strong>Name: </strong> {orderDetails.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${orderDetails.user.email}`}>
                  {orderDetails.user.email}
                </a>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                Address:
                <span>
                  {' '}
                  {orderDetails.shippingAddress.address},{' '}
                  {orderDetails.shippingAddress.city},{' '}
                  {orderDetails.shippingAddress.postalCode},{' '}
                  {orderDetails.shippingAddress.state},{' '}
                  {orderDetails.shippingAddress.country},
                </span>
              </p>
              {orderDetails.isDelivered ? (
                <Message variant='success'>
                  Your order has successfully been sent
                </Message>
              ) : (
                <Message variant='warning'>
                  Order is not ready to be sent
                </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                Method: <span>{orderDetails.paymentMethod}</span>
              </p>
              {orderDetails.isPaid ? (
                <Message variant='success'>
                  Your payment has successfully been taken
                </Message>
              ) : (
                <Message variant='warning'>
                  Your payment has not been received yet
                </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order List</h2>
              {orderDetails.orderComponents.length === 0 ? (
                <Message>Order is empty!</Message>
              ) : (
                <ListGroup variant='flush'>
                  {orderDetails.orderComponents.map((item, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={3}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              rounded
                              className='col-3'
                            />
                          </Col>
                          <Col md={5}>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h3>Order Summary</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${orderDetails.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${orderDetails.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${orderDetails.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className='fw-bold'>
                  <Col>Total</Col>
                  <Col>${orderDetails.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {loadingDeliver && <Loader />}
              {errorDeliver ? (
                <Message variant='warning'>{errorDeliver}</Message>
              ) : (
                userInfo &&
                userInfo.isAdmin &&
                !orderDetails.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-info col-12'
                      onClick={() => deliverHandler(orderDetails._id)}
                    >
                      Mark as Delivered
                    </Button>
                  </ListGroup.Item>
                )
              )}
              {loadingPayment && <Loader />}
              {errorPayment ? (
                <Message variant='warning'>{errorPayment}</Message>
              ) : (
                userInfo &&
                userInfo.isAdmin &&
                !orderDetails.isPaid && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-dark col-12'
                      onClick={() => paymentHandler(orderDetails._id)}
                    >
                      Mark as Paid
                    </Button>
                  </ListGroup.Item>
                )
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default OrderPage;
