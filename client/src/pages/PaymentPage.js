import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentPage = () => {
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    navigate('/placeorder');
  };
  return (
    <Container>
      <CheckoutSteps step1 step2 step3 />

      <Row>
        <Col sm={6} className='justify-content-center m-auto'>
          <h1 className='mb-3'>Payment</h1>
          <Message variant='warning'>
            We only accept payments at the door right now. Both cash and credit
            cards are accepted for payment.
          </Message>
          <Button variant='secondary' onClick={submitHandler}>
            Next
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
