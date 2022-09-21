import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { updateUserInfo } from '../features/user/userSlice';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading, errorUpdate, userInfo, success } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (!userInfo) {
      navigate(`/login`);
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [navigate, userInfo, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else if (password.length <= 6) {
      setMessage('Password cannot be less than 6 characters');
      setPassword('');
      setConfirmPassword('');
    } else if (name.trim().length === 0) {
      setMessage('Name field is empty');
      setName('');
    } else {
      setMessage(null);
      dispatch(updateUserInfo({ id: userInfo._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {success && (
          <Message variant='success'>Your profile is updated</Message>
        )}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label className='mb-1'>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type='name'
              placeholder='Enter name'
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email' className='mt-3'>
            <Form.Label className='mb-1'>Email Address</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              placeholder='Enter email'
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password' className='mt-3'>
            <Form.Label className='mb-1'>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='Enter password'
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirm password' className='mt-3'>
            <Form.Label className='mb-1'>Confirm Password</Form.Label>
            <Form.Control
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type='password'
              placeholder='Confirm password'
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='secondary' className='my-3'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h3>My Orders</h3>
      </Col>
    </Row>
  );
};

export default ProfilePage;
