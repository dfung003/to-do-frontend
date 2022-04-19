import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Layout from './screens/layout/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
      </Route>
    </Routes>
  </Router>
  ,
  document.getElementById('root')
);