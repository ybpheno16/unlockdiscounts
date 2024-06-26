
// import React, { useContext, useMemo } from 'react';
// import { ProductContext } from '../contexts/ProductContext';
// import './productgallery.css';

// function BankingCategoryLayout({ categories }) {
//   const { state } = useContext(ProductContext);
//   const { products, loading, error } = state;

//   const memoizedCategoryProducts = useMemo(() => {
//     return categories.reduce((acc, category) => {
//       acc[category.title] = products.filter(product => product.category === category.title);
//       return acc;
//     }, {});
//   }, [products, categories]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="productpage-container">
//       <h1 className="maincategory-title">Banking Page</h1>
//       <p className="subdesc">Unlock Financial Freedom: Discover Smart Banking Solutions with Us!</p>
//       <div className="common-banner">
//         <img src="/banking/bankingbanner.jpg" alt="Common Banner" className="common-banner-image" />
//       </div>
//       {categories.map((category, index) => (
//         <div key={index} className="category-section">
//           <h2 className="category-title">{category.title}</h2>
//           <div className="product-cards">
//             {memoizedCategoryProducts[category.title].map((product, index) => (
//               <div key={index} className="product-card">
//                 <div className="product-details">
//                   <div className="product-image">
//                     <img src={product.image} alt={product.title} />
//                   </div>
//                   <h3 className="product-title">{product.title}</h3>
//                   <p className="product-description">{product.description}</p>
//                   <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="buy-now-button">BUY NOW</a>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default BankingCategoryLayout;




import React, { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import './productgallery.css';

function BankingCategoryLayout({ categories }) {
  const { state } = useContext(ProductContext);
  const { products, loading, error } = state;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="productpage-container">
      <h1 className="maincategory-title">Banking Page</h1>
      <p className="subdesc">Unlock Financial Freedom: Discover Smart Banking Solutions with Us!</p>
      <div className="common-banner">
        <img src="/banking/bankingbanner.avif" alt="Common Banner" className="common-banner-image" loading="lazy" />
      </div>
      {categories.map((category, index) => (
        <div key={index} className="category-section">
          <h2 className="category-title">{category.title}</h2>
          <div className="product-cards">
            {products
              .filter(product => product.category === category.title)
              .map((product, idx) => (
                <div key={idx} className="product-card">
                  <div className="product-details">
                    <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-description">{product.description}</p>
                    <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="buy-now-button">BUY NOW</a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BankingCategoryLayout;