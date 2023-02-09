import React from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from 'react-dom';
import App from './App.jsx';
// import './public/styles.css';
import { BrowserRouter } from 'react-router-dom';

render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
