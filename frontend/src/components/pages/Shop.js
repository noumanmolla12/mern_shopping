import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/productSlice";
import { Link } from "react-router-dom";

const Shop = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <section
        id="or-breadcrumbs"
        className="or-breadcrumbs-section position-relative"
        style={{
          backgroundImage:
            "url('https://wallpapers.com/images/high/best-food-background-1xtslxzb0843vwi3.webp')",
        }}
      >
        <div className="background_overlay"></div>
        <div className="container">
          <br />
          <br />
          <br />
          <br />
          <div className="or-breadcrumbs-content text-center">
            <div className="page-title headline">
              <h1>Shop</h1>
            </div>
            <div className="or-breadcrumbs-items ul-li">
              <ul>
                <li>
                  <a
                    href="#"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Home <span style={{ color: "green" }}>{">>"}</span> Shop
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="or-shop-product" className="or-shop-product-section">
        <div className="container">
          <div className="or-section-title headline pera-content text-center middle-align">
            <span className="sub-title">Products</span>
            <h2>All of our products are organic &amp; fresh.</h2>
          </div>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-danger">Error: {error}</p>
          ) : (
            <div className="or-product-shop-content">
              <div className="container">
                <div className="row">
                  {products.map((product, idx) => (
                    <div className="col-lg-3 col-md-6" key={idx}>
                      <div className="or-product-innerbox-item type-1 text-center position-relative">
                        <div className="e-commerce-btn d-flex justify-content-center gap-2 mb-2">
                          <a
                            href="#"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <i className="fas fa-shopping-cart" />
                          </a>
                          <a
                            href="#"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <i className="fas fa-heart" />
                          </a>
                          <Link
                            to={`/product/${product._id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <i className="fas fa-eye" />
                          </Link>
                        </div>

                        <div className="or-product-inner-img">
                          <img
                            src={
                              product.product_images &&
                              product.product_images.length > 0
                                ? `http://localhost:8080/uploads/${product.product_images[0]}`
                                : "https://via.placeholder.com/200x200?text=No+Image"
                            }
                            alt={product.productName}
                            style={{
                              height: "200px",
                              width: "100%",
                              objectFit: "cover",
                              borderRadius: "10px",
                            }}
                          />
                        </div>

                        <div className="or-product-inner-text headline">
                          <h3>
                            <Link
                              to={`/product/${product._id}`}
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              {product.productName}
                            </Link>
                          </h3>
                          <span className="price">${product.price.toFixed(2)}</span>
                          <div className="or-product-rate ul-li">
                            <ul>
                              {[...Array(5)].map((_, i) => (
                                <li key={i}>
                                  <i className="fas fa-star" />
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="or-product-btn text-center">
                          <a
                            className="d-flex justify-content-center align-items-center"
                            href="#"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            Add To Cart
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="or-pagination text-center ul-li">
                  <ul>
                    <li>
                      <a className="active" href="#" style={{ textDecoration: "none" }}>
                        1
                      </a>
                    </li>
                    <li>
                      <a href="#" style={{ textDecoration: "none" }}>
                        2
                      </a>
                    </li>
                    <li>
                      <a href="#" style={{ textDecoration: "none" }}>
                        3
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Shop;
