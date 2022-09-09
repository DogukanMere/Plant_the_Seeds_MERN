import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className='py-4'>
          <Container>
            <Routes>
              <Route path='/' element={<HomePage />} index />
              <Route path='/product/:id' element={<ProductPage />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
