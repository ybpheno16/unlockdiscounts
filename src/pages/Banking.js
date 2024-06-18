// import React from 'react';
// import BankingCategoryLayout from './BankingCategoryLayout';
// import { ProductProvider } from '../contexts/ProductContext';

// function Banking() {
//   const categories = [
//     {
//       title: "Credit card",
//     },
//     {
//       title: "Zero Savings Account",
//     },
//     {
//       title: "Saving Application",
//     },
//   ];

//   return (
//     <ProductProvider>
//       <BankingCategoryLayout categories={categories} />
//     </ProductProvider>
//   );
// }

// export default Banking;
import React, { Suspense } from 'react';
import { ProductProvider } from '../contexts/ProductContext';

const BankingCategoryLayout = React.lazy(() => import('./BankingCategoryLayout'));

function Banking() {
  const categories = [
    {
      title: "Credit card",
    },
    {
      title: "Zero Savings Account",
    },
    {
      title: "Saving Application",
    },
  ];

  return (
    <ProductProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <BankingCategoryLayout categories={categories} />
      </Suspense>
    </ProductProvider>
  );
}

export default Banking;
