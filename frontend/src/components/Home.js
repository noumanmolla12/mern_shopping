import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productSlice';
import { fetchAllCategories } from '../features/categorySlice';
import { Link } from 'react-router-dom';
import CountdownTimer from './pages/CountdownTimer';

import { Button } from 'react-bootstrap';

import hwLine from '../assets/img/hw-line.png';
import hwImage from '../assets/img/about/hw1.png';
import sb3 from '../assets/img/shop/sb3.png';
import sbs3 from '../assets/img/shop/sbs3.png';
import sb4 from '../assets/img/shop/sb4.png';




const Home = () => {




  const steps = [
    { icon: 'fas fa-shopping-basket', text: 'Select Product' },
    { icon: 'fas fa-cart-plus', text: 'Add To Cart' },
    { icon: 'fas fa-credit-card', text: 'Check Out' },
    { icon: 'fas fa-truck', text: 'Waiting to Delivery' },
  ];

  

  
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const categories = useSelector(state => state.categories.categories);
  const imagePath = useSelector(state => state.global.imagePath);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter(product => {
    const categoryMatch = !selectedCategory || product.category === selectedCategory;
    const searchMatch = product.productName.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  // Styles
  const containerStyle = {
    background: 'linear-gradient(135deg, #f8f9fa, #e3f2fd)',
    padding: '40px 20px',
    fontFamily: 'Segoe UI, sans-serif',
  };

  const searchStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px',
  };

  const inputStyle = {
    padding: '10px',
    fontSize: '16px',
    width: '300px',
    border: '2px solidrgb(0, 255, 136)',
    borderRadius: '8px',
    outline: 'none',
  };

  const categoryBtnGroup = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '30px',
    gap: '10px',
  };

  const categoryBtn = (isActive) => ({
    padding: '10px 20px',
    fontSize: '14px',
    backgroundColor: isActive ? '#007bff' : '#ffffff',
    color: isActive ? '#ffffff' : '#007bff',
    border: '2px solid #007bff',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: '0.3s',
  });

  const productGrid = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px',
    justifyContent: 'center',
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '320px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    transition: 'transform 0.3s',
  };

  const imgStyle = {
    width: '100%',
    height: '220px',
    objectFit: 'cover',
  };

  const cardBody = {
    padding: '15px',
  };

  const cardTitle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: '10px',
  };

  const cardText = {
    fontSize: '14px',
    color: '#6c757d',
    marginBottom: '15px',
  };

  const buttonGroup = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const linkButton = {
    padding: '6px 12px',
    fontSize: '12px',
    borderRadius: '6px',
    border: '1px solid #007bff',
    color: '#007bff',
    backgroundColor: '#ffffff',
    textDecoration: 'none',
    marginRight: '5px',
  };

  const priceText = {
    fontSize: '14px',
    color: '#28a745',
    fontWeight: 'bold',
  };

  


  return (
    <div style={containerStyle}>






       {/* start Advertisement */}

      <div className="container">
      {/* Top Advertisement Section */}
      <div className="row my-5">
        <div className="col-md-5">
          <img
            src="https://static.vecteezy.com/system/resources/previews/022/984/730/non_2x/vegetable-transparent-free-png.png"
            alt="Vegetables"
            style={{ width: '100%' }}
          />
        </div>
        <div className="col-md-7 d-flex align-items-center">
          <div>
            <h1>Fresh & Healthy</h1>
            <h1>Organic Vegetables</h1>
            <p>
              Our store offers you always fresh vegetables all year round. Buy
              from a wide range of high quality organic vegetables.
            </p>
            <Button href="#" variant="warning" className="me-2">
              Shop Now
            </Button>
            <Button href="#" variant="success">
              Our Service
            </Button>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section id="or-how-it-work" className="or-how-it-work-section my-5">
        <div className="container"><br/><br/><br/>
          <div className="or-how-it-work-content position-relative">
            <span className="or-hw-shape position-absolute">
              <img src={hwLine} alt="how-it-works-line" />
            </span>
            <div className="or-section-title-4 headline-2 text-center pera-content">
              <h2>How it Works</h2>
            </div>
            <div className="row">
              {steps.map((item, index) => (
                <div className="col-lg-3 col-md-6" key={index}>
                  <div className="or-how-it-work-innerbox d-flex align-items-center">
                    <div className="or-how-it-work-icon d-flex justify-content-center align-items-center">
                      <i className={item.icon}></i>
                    </div>
                    <div className="or-how-it-work-text">
                      <span>{item.text}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="or-why-choose-2" className="or-why-choose-section-2 my-5">
        <div className="container">
          <div className="or-why-choose-content-2">
            <div className="row">
              <div className="col-lg-6">
                <div className="or-why-choose-text-wrapper-2">
                  <div className="or-section-title-4 headline-2 pera-content">
                    <h2>Why Choose us?</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                  <div className="or-why-choose-feature-2">
                    {[
                      {
                        icon: 'fas fa-shield-alt',
                        title: '100% Payment Secure',
                      },
                      {
                        icon: 'fas fa-leaf',
                        title: 'Completely 100% Fresh & Organic Food',
                      },
                      {
                        icon: 'fas fa-shipping-fast',
                        title: 'Fast Delivery Just',
                      },
                      {
                        icon: 'fas fa-ban',
                        title: 'Skip or Cancel Anytime',
                      },
                    ].map((feature, i) => (
                      <div
                        key={i}
                        className="or-why-choose-feature-item-2 d-flex align-items-center"
                      >
                        <div className="or-why-choose-feature-icon d-flex align-items-center justify-content-center">
                          <i className={feature.icon}></i>
                        </div>
                        <div className="or-why-choose-feature-text pera-content">
                          <h3>{feature.title}</h3>
                          <p>
                            Dolor sit amet, consectetur adipiscing elit, sed
                            eiusmod tempor incididunt ut labore et.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="or-why-choose-img-2">
                  <img src={hwImage} alt="Why Choose Us" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section id="or-offer" className="or-offer-section position-relative my-5">
        <div className="container">
          <div className="or-section-title-4 headline-2 pera-content text-center">
            <h2>What We Offer for You</h2>
            <p>
              We connect buyers and sellers of natural, organic, environmentally sound products.
              We find the best suppliers and makers of natural and organic products.
            </p>
          </div>
          <div className="or-offer-content">
  <div className="row">
    <div className="col-lg-6">
      <div className="or-shop-banner-innerbox position-relative">
        <div className="or-shop-banner-text headline-2 pera-content">
          <h3>Organic Food</h3>
          <p>
            Shop our selection of organic fresh vegetables in a discounted price.
            10% off on all vegetables.
          </p>
          <div className="or-btn-2">
            <a
              className="d-flex justify-content-center align-items-center"
              href="shop.html"
              style={{ textDecoration: 'none' }}
            >
              Shop Now
            </a>
          </div>
        </div>
        <div className="or-shop-banner-img-wrapper">
          <div className="or-shop-banner-img-1 position-absolute">
            <img src={sb3} alt="Organic Food" />
          </div>
          <div className="or-shop-banner-img-2 position-absolute">
            <img src={sbs3} alt="Organic Food Overlay" />
          </div>
        </div>
      </div>
    </div>

    <div className="col-lg-6">
      <div className="or-shop-banner-innerbox position-relative">
        <div className="or-shop-banner-text headline-2 pera-content">
          <h3>Al Smoothis Al Fun</h3>
          <p>
            Shop our selection of organic fresh vegetables in a discounted price.
            10% off on all vegetables.
          </p>
          <div className="or-btn-2">
            <a
              className="d-flex justify-content-center align-items-center"
              href="shop.html"
              style={{ textDecoration: 'none' }}
            >
              Shop Now
            </a>
          </div>
        </div>
        <div className="or-shop-banner-img-wrapper">
          <div className="or-shop-banner-img-1 position-absolute">
            <img src={sb4} alt="Smoothies" />
          </div>
          <div className="or-shop-banner-img-2 position-absolute">
            <img src={sbs3} alt="Smoothies Overlay" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        </div>
      </section>
    </div>

    {/* end Advertisement */}
      


     <div className="or-section-title-4 headline-2 pera-content text-center">
  <h2>Best Prices &amp; Offers New Items</h2>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua.
  </p>
</div>




      {/* Search */}
      <div style={searchStyle}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          style={inputStyle}
        />
      </div>

      {/* Category Filter */}
     <div
  className="or-best-price-filter-btn ul-li text-center"
  style={{ margin: '20px 0', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
>
  <ul className="filter clearfix" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
    <li
      data-filter="all"
      className={`all ${selectedCategory === '' ? 'active' : ''}`}
      onClick={() => setSelectedCategory('')}
      style={{
        backgroundColor: selectedCategory === '' ? '#28a745' : '#fff',
        color: selectedCategory === '' ? '#fff' : '#000',
        border: '1px solid #28a745',
        padding: '8px 16px',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: '0.3s',
      }}
    >
      All Products
    </li>
    {categories.map((category, index) => (
      <li
        key={category._id}
        data-filter={`cat-${index}`}
        className={`${category.categoryName.toLowerCase().replace(/\s+/g, '-')}${
          selectedCategory === category._id ? ' active' : ''
        }`}
        onClick={() => handleCategoryClick(category._id)}
        style={{
          backgroundColor: selectedCategory === category._id ? '#28a745' : '#fff',
          color: selectedCategory === category._id ? '#fff' : '#000',
          border: '1px solid #28a745',
          padding: '8px 16px',
          borderRadius: '10px',
          cursor: 'pointer',
          transition: '0.3s',
        }}
      >
        {category.categoryName}
      </li>
    ))}
  </ul>
</div>



      {/* Products */}
    <div className="row">
  {filteredProducts.map((product) => (
    <div key={product._id} className="col-md-4 mb-4">
      <div
        className="organio-inner-item"
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fff',
          border: '1px solid #eee',
          borderRadius: '8px',
          padding: '0',
          overflow: 'hidden',
        }}
      >
        <div
          className="or-best-product-innerbox text-center"
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <div
            className="or-best-product-img position-relative"
            style={{ height: '250px', overflow: 'hidden' }}
          >
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
              <img
                src={imagePath + product.product_images[0]}
                alt={product.productName}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Link>
            <div
              className="e-commerce-btn"
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '10px',
              }}
            >
              <a href="#" style={{ textDecoration: 'none', color: '#000' }}>
                <i className="fas fa-shopping-cart"></i>
              </a>
              <a href="#" style={{ textDecoration: 'none', color: '#000' }}>
                <i className="fas fa-heart"></i>
              </a>
              <a href="#" style={{ textDecoration: 'none', color: '#000' }}>
                <i className="fas fa-eye"></i>
              </a>
            </div>
          </div>

          <div
            className="or-best-product-text headline-2"
            style={{
              padding: '15px',
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              justifyContent: 'space-between',
            }}
          >
            <h3 style={{ fontSize: '18px', margin: '10px 0' }}>
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {product.productName}
              </Link>
            </h3>
            <div className="price" style={{ fontWeight: 'bold' }}>
              ${product.price}
            </div>
            <div
              className="or-best-product-ratting ul-li"
              style={{ margin: '10px 0' }}
            >
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {[...Array(5)].map((_, index) => (
                  <li key={index} style={{ margin: '0 2px' }}>
                    <i className="fas fa-star" style={{ color: '#FFD700' }}></i>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="or-btn-2"
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <Link
                to={`/product/${product._id}`}
                style={{
                  textDecoration: 'none',
                  backgroundColor: '#28a745',
                  color: '#fff',
                  padding: '8px',
                  borderRadius: '4px',
                  textAlign: 'center',
                }}
              >
                View Details
              </Link>
              <Link
                to={`/product/${product._id}`}
                style={{
                  textDecoration: 'none',
                  backgroundColor: '#28a745',
                  color: '#fff',
                  padding: '8px',
                  borderRadius: '4px',
                  textAlign: 'center',
                }}
              >
                Add To Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>







<br/>
<br/>

      <div className="or-section-title-4 headline-2 pera-content text-center">
        <h2>Deal of The Week</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>


      {/* <div className="best-deal-countdown text-center ul-li">
        <ul>
          <li className="days">
            <span className="or-count-down-number">-1355</span>
            <span className="count-unit">Days</span>
          </li>

          <li className="hours">
            <span className="or-count-down-number">-19</span>
            <span className="count-unit">Hours</span>
          </li>

          <li className="minutes">
            <span className="or-count-down-number">-3</span>
            <span className="count-unit">Mins</span>
          </li>

          <li className="seconds">
            <span className="or-count-down-number">-36</span>
            <span className="count-unit">Sec</span>
          </li>
        </ul>
      </div> */}


      <CountdownTimer targetDate="2040-06-12T00:00:00" />







      <section id="or-testimonial-3" className="or-testimonial-section-3">
      <div className="container">
        <div className="or-testimonial-content-3">
          <div className="row">
            <div className="col-lg-6">
              <div className="or-testimonial-text-wrapper-3 position-relative">
                <span className="or-testimonial-shape position-absolute">
                  <img src="assets/img/leaf.png" alt="" />
                </span>
                <div className="or-section-title-4 headline-2 pera-content text-center">
                  <span>Testimonials</span>
                  <h2>Whats Customer Saying?</h2>
                  <p>
                    We value the experimentation, the reformation of the message, and the smart incentives. We offer a variety of services and solutions Worldwide. We’ve been lucky to collaborate with a long list of customers, located in and out of the country.
                  </p>
                </div>
                <div className="testimonial-feature-content-4 d-flex">
                  <div className="testimonial-feature-item d-flex align-items-center">
                    <div className="testimonial-feature-icon">
                      <i className="fas fa-link"></i>
                    </div>
                    <div className="testimonial-feature-text headline-2 pera-content">
                      <h3><span className="counter">500</span>+</h3>
                      <p>Clients Feedback</p>
                    </div>
                  </div>
                  <div className="testimonial-feature-item d-flex align-items-center">
                    <div className="testimonial-feature-icon">
                      <i className="fas fa-star"></i>
                    </div>
                    <div className="testimonial-feature-text headline-2 pera-content">
                      <h3><span className="counter">150</span>+</h3>
                      <p>5 Star Reviews</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="testimonial-slider-area-4">
                <div className="testimonial-slider-wrapper-4">
                  <div className="testimonial-slider-4">
                    {[
                      { img: 'tst4.1.jpg', name: 'Sherri Horton' },
                      { img: 'tst4.2.jpg', name: 'John Emei' },
                      { img: 'tst4.3.jpg', name: 'Dan Hopper' },
                      { img: 'tst4.2.jpg', name: 'Marken Dem' },
                      { img: 'tst4.1.jpg', name: 'Sherri Horton' },
                      { img: 'tst4.1.jpg', name: 'Sherri Horton' },
                    ].map((testimonial, index) => (
                      <div key={index} className="testimonial-slider-item-4 d-flex position-relative">
                        <div className="testimonial-slider-img-4">
                          <img src={`assets/img/testimonial/${testimonial.img}`} alt="" />
                        </div>
                        <div className="testimonial-slider-text-4 pera-content headline position-relative">
                          <p>This is one of the BEST THEMES I have ever worked with. The extra bells and whistles added to it are amazing. Elementor features add extra flavor.</p>
                          <h3>{testimonial.name}</h3>
                          <div className="testimonial-icon position-absolute">
                            <i className="fas fa-quote-right"></i>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>



<div className="container-fluid">
    



    <div className="row">
      <div
  style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: "30vh", // Full viewport height to center vertically
  }}
>
  <h1>Our Latest News</h1>
  <p>
    Follow our latest news and thoughts which focus exclusively on design, art,
    vintage, and also work updates.
  </p>
</div>

     <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
  </div>

  <div className="carousel-inner">
    {[0, 1].map((slideIndex) => (
      <div className={`carousel-item ${slideIndex === 0 ? 'active' : ''}`} key={slideIndex}>
        <div className="row g-4 justify-content-center">
          {[1, 2].map((cardIndex) => (
            <div className="col-md-6" key={cardIndex}>
              <div className="card shadow-sm" style={{ borderRadius: '12px', height: '100%' }}>
                <a href="/blogs" rel="noopener noreferrer">
                  <img
                    src={
                      cardIndex === 1
                        ? "https://edit.org/img/blog/vaq-greengrocer-fruits-vegetables-supermarket-templates-designs-posters.jpg"
                        : "https://contenthandler.azureedge.net/cont/136/1/1600/0/farm-banner-box-lx.jpg"
                    }
                    className="card-img-top"
                    alt={`Blog Image ${cardIndex}`}
                    style={{ height: '300px', objectFit: 'cover', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
                  />
                </a>
                <div className="card-body d-flex flex-column justify-content-between">
                  <h4 className="card-title" style={{ fontSize: '1.25rem', marginBottom: '10px' }}>
                    <a
                      href="/blogs"
                      style={{ textDecoration: 'none', color: '#222' }}
                    >
                      {cardIndex === 1
                        ? "My Trifles Grows in World Delivering Impact on Woman Health"
                        : "Wrapping Up a Successful Month of Orientation Senegal Beyond Market"}
                    </a>
                  </h4>
                  <p className="card-text" style={{ fontSize: '0.95rem', color: '#555' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <div className="text-center mt-3">
                    <a
                      href="/blogs"
                      style={{
                        backgroundColor: 'orange',
                        color: 'white',
                        padding: '10px 20px',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        display: 'inline-block',
                        fontWeight: 'bold'
                      }}
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>

  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

    </div>
  </div>


      
    </div>
  );
};

export default Home;
