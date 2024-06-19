
import React, { useContext, useMemo } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import './blog.css'; 
const Blogs = () => {
  const { state } = useContext(ProductContext);
  const { products, loading, error } = state;

  // Memoize the filtered blog products
  const blogs = useMemo(() => {
    return products.filter(product => product.category === 'blog');
  }, [products]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="blogs-container">
      <h1 className="blogs-title">Blogs</h1>
      <p className="blogs-description">
        Explore our latest blogs and stay updated with the latest trends and insights.
      </p>
      {Array.isArray(blogs) && blogs.map((blog, index) => (
        <div key={index} className={`blog-card ${index % 2 === 0 ? 'even' : 'odd'}`}>
          <div className="blog-details">
            <h2 className="blog-title">{blog.title}</h2>
            <p className="blog-text">{blog.description}</p>
            {blog.affiliateLink && (
              <a href={blog.affiliateLink} target='_blank' rel="noopener noreferrer" className="read-more-button">Read More</a>
            )}
          </div>
          {blog.image && (
            <div className="blog-image">
              <img
                src={blog.image}
                alt={blog.title}
                loading="lazy"
                className="lazy-load"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Blogs;

