import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className='py-4'>
          <Container>
            <Routes>
              <Route path='/' element={<HomePage />} index />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/product/:id' element={<ProductPage />} />
              <Route path='/cart'>
                <Route path=':id' element={<CartPage />} />
                <Route path='' element={<CartPage />} />
              </Route>
            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
