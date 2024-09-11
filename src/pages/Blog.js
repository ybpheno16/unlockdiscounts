import React from 'react';
import './blog.css'; // Ensure CSS is imported

// Header Component
function Header() {
  return (
    <div className='header_container'>
      <div className='header_text'>Blogs</div>
      <div className='para'>
        Unlock Insights: Explore Our Blog for Inspiration, Tips, and More!
      </div>
    </div>
  );
}

// BlogCard Component: Individual Blog Card
function BlogCard({ title, description, imageSrc, imageAlt }) {
  return (
    <div className='blog_card'>
      <img src={imageSrc} alt={imageAlt} className='blog_image' />
      <div className='blog_content'>
        <h2 className='blog_title'>{title}</h2>
        <p className='blog_description'>{description}</p>
      </div>
    </div>
  );
}

// Main Blog Component
function Blog() {
  const data = {
    blogs: [
      {
        id: 0,
        title: 'Nearwala',
        description: 'Nearwala is a hyperlocal shopping app that helps you discover nearby stores and local deals.',
        imageSrc: '/blog/NW.png',
        imageAlt: 'Nearwala',
      },
      {
        id: 1,
        title: 'Asian Carnival Shoe',
        description: "A description of the best Asian carnival shoes and why they're perfect for every occasion.",
        imageSrc: '/blog/shoe.png',
        imageAlt: 'Asian shoe',
      },
      {
        id: 2,
        title: 'Magicpin',
        description: 'Save and explore with Magicpin: Your shopping and local deals buddy.',
        imageSrc: '/blog/magicpin.png',
        imageAlt: 'Magicpin',
      },
      {
        id: 4,
        title: 'Nearwala',
        description: 'Nearwala is a hyperlocal shopping app that helps you discover nearby stores and local deals.',
        imageSrc: '/blog/NW.png',
        imageAlt: 'Nearwala',
      },
      {
        id: 5,
        title: 'Asian Carnival Shoe',
        description: "A description of the best Asian carnival shoes and why they're perfect for every occasion.",
        imageSrc: '/blog/shoe.png',
        imageAlt: 'Asian shoe',
      },
      {
        id: 6,
        title: 'Magicpin',
        description: 'Save and explore with Magicpin: Your shopping and local deals buddy.',
        imageSrc: '/blog/magicpin.png',
        imageAlt: 'Magicpin',
      },
    ],
  };

  return (
    <div className='blog_page'>
      <Header />
      <div className='blog_container'>
        {data.blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            description={blog.description}
            imageSrc={blog.imageSrc}
            imageAlt={blog.imageAlt}
          />
        ))}
      </div>
    </div>
  );
}

export default Blog;
