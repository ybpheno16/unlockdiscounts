import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Latestshop from './pages/Latestshop';

const AppRoutes = lazy(() => import('./routes')); 

const App = () => (
  <Router>
    <Header />
    <Latestshop />
    <Suspense fallback={<div>Loading...</div>}>
      <AppRoutes />
    </Suspense>
    <Footer />
  </Router>
);

export default React.memo(App); 

