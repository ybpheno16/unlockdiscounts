import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';


const AppRoutes = lazy(() => import('./routes')); 

const App = () => (
  <Router>
    <Header />
    <Suspense fallback={<div>Loading...</div>}>
      <AppRoutes />
    </Suspense>
    <Footer />
  </Router>
);

export default React.memo(App); 

