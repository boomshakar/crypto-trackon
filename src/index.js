import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'react-alice-carousel/lib/alice-carousel.css';
import CryptoContext from './CryptoContext';
import ModalContext from './context/ModalContext';

ReactDOM.render(
  <>
    <CryptoContext>
      <ModalContext>
        <App />
      </ModalContext>
    </CryptoContext>
  </>,
  document.getElementById('root')
);
