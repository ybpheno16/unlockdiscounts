import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Banner from "./Banner";

const AppRoutes = lazy(() => import('./routes')); 

const App = () => (
  <Router>
    <Header />
    <div className="App">
      <h1>SHOP THE LATEST</h1>
      <Banner />
    </div>
    <Suspense fallback={<div>Loading...</div>}>
      <AppRoutes />
    </Suspense>
    <Footer />
  </Router>
);

export default React.memo(App); 

