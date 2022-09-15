import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { addToCart } from '../features/cart/cartSlice';
import { useParams, useLocation } from 'react-router-dom';

const CartPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const qty = new URLSearchParams(location.search).get('qty');

  const dispatch = useDispatch();

  const { cartItems } = useSelector((store) => store.cart);
  console.log(cartItems);
  useEffect(() => {
    if (id) {
      dispatch(addToCart({ id, qty }));
    }
  }, [dispatch, id, qty]);

  return <div>CartItems</div>;
};

export default CartPage;
