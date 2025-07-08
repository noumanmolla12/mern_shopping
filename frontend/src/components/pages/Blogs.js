import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../features/blogSlice";
import { selectImagePath } from "../../features/globalSlice";
import PhotoGallery from "../pages/PhotoGallery";
import { Link } from 'react-router-dom';

const Blogs = () => {
  const dispatch = useDispatch();
  const imagePath = useSelector(selectImagePath);

  const { loading, error, blogs } = useSelector((state) => state.blogs || {});

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="row">
      <section><br/><br/>
        <div style={{ position: "relative" }}>
          <img
            className="d-block w-100"
            src="https://cdn.pixabay.com/photo/2019/07/23/08/48/potato-field-4357002_1280.jpg"
            alt="Blog header"
            style={{ width: "100%", height: "300px" }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "white",
              textShadow: "1px 1px 3px rgba(0,0,0,0.8)",
            }}
          ><br/>
            <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>Blog</h1>
            <p style={{ fontSize: "1.5rem" }}>
              Home{" "}
              <span>
                <i className="bx bx-chevrons-right"></i>
              </span>{" "}
              Blog
            </p>
          </div>
        </div>
      </section>

         <section id="or-blog-feed" className="or-blog-feed-section py-5">
      <div className="container">
        <div className="or-section-title headline pera-content text-center middle-align mb-5">
          <span className="sub-title d-block text-success">~From our blog~</span>
          <h2>On a quest to bring together and closer to you all things Organic.</h2>
        </div>

        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="text-danger text-center">{error}</div>}

        <div className="or-blog-feed-content">
          <div className="row">
            {blogs &&
              blogs.map((blog) => (
                <div className="col-lg-4 col-md-6 mb-4" key={blog._id}>
                  <div className="or-blog-innerbox card h-100 shadow-sm">
                    <div className="or-blog-img position-relative">
                     <Link to={`/blog-detail/${blog._id}`}>
  <img
    src={`${imagePath}${blog.blog_images[0]}`}
    alt={blog.blog_name}
    className="card-img-top"
    style={{ height: "300px", objectFit: "cover", width: "100%" }}
  />
</Link>
                    </div>
                    <div className="or-blog-text headline position-relative card-body d-flex flex-column">
                      <div className="blog-meta d-flex justify-content-between mb-2">
                        <a href={`/blog-detail/${blog._id}`} style={{ textDecoration: "none", color: "#555" }}>
                          <i className="fas fa-calendar-alt"></i> {formatDate(blog.date)}
                        </a>
                        <a href={`/blog-detail/${blog._id}`} style={{ textDecoration: "none", color: "#555" }}>
                          <i className="fas fa-user"></i> Admin
                        </a>
                      </div>
                      <h5 className="card-title mb-2">
                        <a
                          href={`/blog-detail/${blog._id}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          {blog.blog_name}
                        </a>
                      </h5>
                      <p className="card-text mt-1">{blog.blog_description}</p>
                      <div className="blog-more-comment d-flex justify-content-between align-items-center mt-auto pt-3">
                        <a
                          className="read-more btn btn-warning"
                          href={`/blog-detail/${blog._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          Read more <i className="far fa-chevron-right"></i>
                        </a>
                        <a href="#" className="comment" style={{ textDecoration: "none", color: "#666" }}>
                          <i className="fas fa-comment"></i> 04
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Blogs;
