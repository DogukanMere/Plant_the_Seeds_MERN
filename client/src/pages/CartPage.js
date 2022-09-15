import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  FormSelect,
  Button,
  ListGroupItem,
} from 'react-bootstrap';
import { addToCart, removeFromCart } from '../features/cart/cartSlice';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import Message from '../components/Message';

const CartPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const qty = new URLSearchParams(location.search).get('qty');
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { cartItems } = useSelector((store) => store.cart);

  useEffect(() => {
    if (id) {
      dispatch(addToCart({ id, qty }));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const changeItemQty = (id, qty) => {
    console.log(qty);
    dispatch(addToCart({ id, qty }));
    navigate('/cart');
  };

  return (
    <Row>
      <Col md={8}>
        <h2 className='fs-4'>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <Message>
            Your cart looks empty. <Link to={'/'}>Go to Products</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroupItem key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                    ></Image>
                  </Col>
                  <Col md={3}>
                    <Link
                      to={`/product/${item.product}`}
                      className='text-decoration-none'
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <FormSelect
                      value={item.qty}
                      onChange={(e) =>
                        changeItemQty(item.product, Number(e.target.value))
                      }
                      className='align-self'
                    >
                      {[...Array(item.amountInStock).keys()].map((q) => (
                        <option key={q + 1} value={q + 1}>
                          {q + 1}
                        </option>
                      ))}
                    </FormSelect>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={2}></Col>
      <Col md={2}></Col>
    </Row>
  );
};

export default CartPage;
