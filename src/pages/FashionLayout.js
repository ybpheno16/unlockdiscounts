// // FashionLayout.js

// import React, { useContext, useEffect } from 'react';
// import { ProductContext } from '../contexts/ProductContext';
// import './productgallery.css';

// const FashionLayout = ({ category, bannerImage }) => {
//   const { state, setPage, hasMore } = useContext(ProductContext);
//   const { products, loading, error } = state;

//   const filteredProducts = products.filter(product => product.category === category);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasMore) {
//         setPage(prevPage => prevPage + 1);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [hasMore, setPage]);

//   if (loading && filteredProducts.length === 0) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="productpage-container">
//       <h1 className="maincategory-title">Fashion</h1>
//       <p className="subdes">Unlock Style: Elevate Your Wardrobe with Trendy Fashion Finds!</p>
//       <div className="common-banner">
//         <img src={bannerImage} alt={`${category} Banner`} className="common-banner-image" />
//       </div>
//       <h2 className="category-title">{category}</h2>
//       <div className="product-cards">
//         {filteredProducts.map((product, index) => (
//           <div key={index} className="product-card">
//             <div className="product-image">
//               <img src={product.image} alt={product.title} />
//             </div>
//             <div className="product-details">
//               <h3 className="product-title">{product.title}</h3>
//               <p className="product-description">{product.description}</p>
//               <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="buy-now-button">BUY NOW</a>
//             </div>
//           </div>
//         ))}
//       </div>
//       {loading && <div>Loading more products...</div>}
//     </div>
//   );
// };

// export default FashionLayout;

import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import './productgallery.css';

const FashionLayout = ({ category, bannerImage }) => {
  const { state, handleLoadMore, hasMore, setPage } = useContext(ProductContext);
  const { products, loading, error } = state;

  const filteredProducts = products.filter(product => product.category === category);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasMore) {
        handleLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, handleLoadMore]);

  if (loading && filteredProducts.length === 0) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="productpage-container">
      <h1 className="maincategory-title">Fashion</h1>
      <p className="subdes">Unlock Style: Elevate Your Wardrobe with Trendy Fashion Finds!</p>
      <div className="common-banner">
        <img src={bannerImage} alt={`${category} Banner`} className="common-banner-image" />
      </div>
      <h2 className="category-title">{category}</h2>
      <div className="product-cards">
        {filteredProducts.map((product, index) => (
          <div key={index} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="product-details">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-description">{product.description}</p>
              <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="buy-now-button">BUY NOW</a>
            </div>
          </div>
        ))}
      </div>
      {loading && <div>Loading more products...</div>}
    </div>
  );
};

export default FashionLayout;
