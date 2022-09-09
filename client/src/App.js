import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Header />
      <main className='py-4'>
        <Container>
          <h1 className='fs-3'>WELCOME TO PLANT THE SEEDS</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
