import React from 'react';
import BankingCategoryLayout from './BankingCategoryLayout';
import { ProductProvider } from '../contexts/ProductContext';

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
      <BankingCategoryLayout categories={categories} />
    </ProductProvider>
  );
}

export default Banking;
