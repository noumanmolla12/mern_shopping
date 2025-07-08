import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleBlog } from "../../features/blogSlice";
import { selectImagePath } from "../../features/globalSlice";
import PhotoGallery from "../pages/PhotoGallery";
import { useParams, Link } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const imagePath = useSelector((state) => state.global.imagePath); // Get imagePath from the global state
  const { loading, error, singleBlog } = useSelector(
    (state) => state.blogs || {}
  ); // Get singleBlog instead of blogs

  useEffect(() => {
    dispatch(fetchSingleBlog(id)); // Pass the blog ID to fetchSingleBlog
  }, [dispatch, id]); // Add id to the dependency array

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="row">
      <section><br/><br/><br/><br/><br/><br/>
        <div style={{ position: "relative" }}>
          <img
            className="d-block w-100"
            src="https://cdn.pixabay.com/photo/2019/07/23/08/48/potato-field-4357002_1280.jpg"
            alt="Blog"
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
          >
            <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>Blog Details</h1>
            <p style={{ fontSize: "1.5rem" }}>
              Home{" "}
              <span>
                <i className="fas fa-angle-double-right"></i>
              </span>{" "}
              We advocate swapping screen-time for crafting.
            </p>
          </div>
        </div>
      </section>




      <section id="or-blog-details" className="or-blog-details-section">
  <div className="container">
    <div className="or-blog-details-content">
      <div className="row">
        <div className="col-lg-9">
          <div className="or-blog-details-text-inner headline pera-content">
          


               {singleBlog ? (
  <>
    <div className="blog-details-img position-relative text-center mb-4">
      <img
        src={`${imagePath}${singleBlog.blog_images?.[0] || "default.jpg"}`}
        alt={singleBlog.blog_name}
        style={{ height: "500px", width: "100%", objectFit: "cover", borderRadius: "8px" }}
      />
    </div>

    <div className="or-blog-details-item">
      <div className="blog-details-text headline">
        <h2 className="mb-3" style={{color: "rgba(68, 130, 13, 0.8)" }}>{singleBlog.blog_name}</h2>

        <div className="ord-blog-meta-2 position-relative text-capitalize d-flex flex-wrap gap-3 mb-3">
          <a href="#" className="text-muted mr-3" style={{ textDecoration: "none" }}>
            <i className="fas fa-clock mr-1"></i> {formatDate(singleBlog.date)}
          </a>
          <a href="#" className="text-muted mr-3" style={{ textDecoration: "none" }}>
            <i className="far fa-user mr-1"></i> by admin
          </a>
          <a href="#" className="text-muted" style={{ textDecoration: "none" }}>
            <i className="fas fa-tags mr-1"></i> Agriculture
          </a>
        </div>

        <p className="mt-2">{singleBlog.blog_description}</p>
      </div>

            <article>
                  It is a long established fact that a reader will be distracted by the readable...
                </article>
                <article>
                  "Every child has the right to feel safe and protected..."
                </article>
                <h3>Content without backward-compatible data.</h3>
                <article>
                  “There is absolutely no justification for an attack like this..."
                </article>
                <article>
                  Earlier this month, the PSNI launched a hard-hitting advertisement...
                </article>
                <div className="or-blog-details-img-item">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="or-blog-details-img-video">
                        <img src="assets/img/blog/bd-d2.jpg" alt="" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="or-blog-details-img-video">
                        <img src="assets/img/blog/bd-d3.jpg" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <h3>A Kentucky woman who was accused last year.</h3>
                <article>
                  The intruders chased the girl in the house and threatened her...
                </article>
                <article>
                  Like men who are so beguiled & demoralized...
                </article>
                <blockquote>
                  “What sort of men would think it is acceptable to girl...”
                  <span>Neil Borton</span>
                </blockquote>
                <article>
                  The intruders chased the girl in the house and threatened her...
                </article>
                <article>
                  “She came out petrified with her Piggy Bank...”
                </article>
                
    </div>
  </>
) : (
  <div className="text-center py-5 text-danger">No blog found.</div>
)}




              
           
            <div className="or-blog-details-item">
              <div className="blog-details-text headline">
                
          
              </div>
              <div className="or-blog-tag-share clearfix">
                <div className="or-blog-tag float-left">
                  <span>Tags:</span>
                  <a href="#" style={{ textDecoration: "none" }}>Business</a>
                  <a href="#" style={{ textDecoration: "none" }}>Life</a>
                  <a href="#" style={{ textDecoration: "none" }}>Truck</a>
                  <a href="#" style={{ textDecoration: "none" }}>Techniq</a>
                </div>
                <div className="or-blog-share float-right">
                  <a className="fb-social" href="#" style={{ textDecoration: "none" }}><i className="fab fa-facebook-f"></i><span>Like Us</span></a>
                  <a className="tw-social" href="#" style={{ textDecoration: "none" }}><i className="fab fa-twitter"></i><span>Like Us</span></a>
                  <a className="ln-social" href="#" style={{ textDecoration: "none" }}><i className="fab fa-linkedin-in"></i><span>Like Us</span></a>
                  <a className="in-social" href="#" style={{ textDecoration: "none" }}><i className="fab fa-instagram"></i><span>Like Us</span></a>
                </div>
              </div>
            </div>
            <div className="or-blog-next-prev d-flex justify-content-between">
              <div className="or-blog-next-prev-btn">
                <a className="np-text text-uppercase" href="#" style={{ textDecoration: "none",color: "rgba(68, 130, 13, 0.8)" }}><i className="fas fa-angle-double-left"></i> Previous Post</a>
                <div className="or-blog-next-prev-img-text clearfix">
                  <div className="or-blog-np-img float-left">
                    <img src="assets/img/blog/nbp1.jpg" alt="" />
                  </div>
                  <div className="or-blog-np-text headline">
                    <h3><a href="#" style={{ textDecoration: "none",color: "rgba(62, 62, 62, 0.8)" }}>Our 6 of the Best Organic Chocolates to Buy.</a></h3>
                  </div>
                </div>
              </div>
              <div className="or-blog-next-prev-btn np-text-item text-right">
                <a className="np-text text-uppercase" href="#" style={{ textDecoration: "none",color: "rgba(68, 130, 13, 0.8)" }}>Next Post <i className="fas fa-angle-double-right"></i></a>
                <div className="or-blog-next-prev-img-text d-flex clearfix">
                  <div className="or-blog-np-text headline">
                    <h3><a href="#" style={{ textDecoration: "none",color: "rgba(62, 62, 62, 0.8)" }}>Best guide to shopping for organic ingredients.</a></h3>
                  </div>
                  <div className="or-blog-np-img">
                    <img src="assets/img/blog/nbp2.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="or-blog-comment headline">
            <h3 style={{ textDecoration: "none",color: "rgba(68, 130, 13, 0.8)" }}>Comment (2)</h3>
            <div className="or-blog-comment-block-wrapper">
              <div className="or-blog-comment-block">
                <div className="or-blog-comment-img float-left">
                  <img src="assets/img/blog/blg-c1.jpg" alt="" />
                </div>
                <div className="or-blog-comment-text headline pera-content position-relative">
                  <h4><a href="#" style={{ textDecoration: "none",color: "rgba(68, 130, 13, 0.8)" }}>Riva Collins</a></h4>
                  <span>November 19, 2020 at 11:00 am</span>
                  <p>It’s no secret that the digital industry is booming...</p>
                  <a className="prd-reply-btn text-center text-uppercase" href="#" style={{ textDecoration: "none" }}>Reply <i className="fas fa-chevron-right"></i></a>
                </div>
              </div>
              <div className="or-blog-comment-block">
                <div className="or-blog-comment-img float-left">
                  <img src="assets/img/blog/blg-c2.jpg" alt="" />
                </div>
                <div className="or-blog-comment-text headline pera-content position-relative">
                  <h4><a href="#" style={{ textDecoration: "none",color: "rgba(68, 130, 13, 0.8)" }}>Oliva Jonson</a></h4>
                  <span>November 19, 2020 at 11:00 am</span>
                  <p>It’s no secret that the digital industry is booming...</p>
                  <a className="prd-reply-btn text-center text-uppercase" href="#" style={{ textDecoration: "none" }}>Reply <i className="fas fa-chevron-right"></i></a>
                </div>
              </div>
            </div>
            <h3 style={{ textDecoration: "none",color: "rgba(62, 62, 62, 0.8)" }}>Post A Comment</h3>
            <div className="prd-blog-comment-form">
              <form action="#" method="post">
                <div className="prd-comment-form-input">
                  <label>Your email address will not be published *</label>
                  <div className="prd-comment-input-wrap d-flex">
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Mail" />
                    <input type="text" placeholder="Mobile" />
                  </div>
                  <span><input type="checkbox" /> <label>Save my details in this browser for the next time I comment.</label></span>
                  <textarea placeholder="Your Comment here..."></textarea>
                  <button type="submit">Post Comment</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="or-side-bar top-sticky-sidebar">
            <div className="or-side-bar-widget">
              <div className="or-widget-wrap">
                <div className="or-search-widget position-relative">
                  <form action="#">
                    <input type="text" placeholder="Search..." />
                    <button><i className="far fa-search"></i></button>
                  </form>
                </div>
              </div>
              <div className="or-widget-wrap headline ul-li-block">
                <div className="or-cat-widget position-relative">
                  <h3 className="widget-title" style={{color: "rgba(68, 130, 13, 0.8)" }}>Categories</h3>
                  <ul>
                    <li><a href="blog.html" style={{ textDecoration: "none",color: "rgba(68, 130, 13, 0.8)" }}>Envato </a><span>3</span></li>
                    <li><a href="blog.html" style={{ textDecoration: "none",color: "rgba(68, 130, 13, 0.8)" }}>Themeforest </a><span>2</span></li>
                    <li><a href="blog.html" style={{ textDecoration: "none",color: "rgba(68, 130, 13, 0.8)" }}>Graphicriver </a><span>8</span></li>
                  </ul>
                </div>
              </div>
              <div className="or-widget-wrap headline ul-li-block">
                <div className="or-rec-widget position-relative">
                  <h3 className="widget-title" style={{color: "rgba(68, 130, 13, 0.8)" }}>Recent News</h3>
                  <div className="or-recent-blog-img-text clearfix">
                    <div className="or-recent-blog-img float-left">
                      <img src="assets/img/blog/rc1.jpg" alt="" />
                    </div>
                    <div className="or-recent-blog-text headline">
                      <h3><a href="blog-single.html" style={{ textDecoration: "none",color: "rgba(68, 130, 13, 0.8)" }}>Zechs Magnesium flakes especially...</a></h3>
                      <span><i className="far fa-calendar-alt"></i> February 12, 2021</span>
                    </div>
                  </div>
                  <div className="or-recent-blog-img-text clearfix">
                    <div className="or-recent-blog-img float-left">
                      <img src="assets/img/blog/rc2.jpg" alt="" />
                    </div>
                    <div className="or-recent-blog-text headline">
                      <h3><a href="blog-single.html" style={{ textDecoration: "none",color: "rgba(68, 130, 13, 0.8)" }}>Finding a way to separate ‘work’ ...</a></h3>
                      <span><i className="far fa-calendar-alt"></i> February 12, 2021</span>
                    </div>
                  </div>
                  <div className="or-recent-blog-img-text clearfix">
                    <div className="or-recent-blog-img float-left">
                      <img src="assets/img/blog/rc1.jpg" alt="" />
                    </div>
                    <div className="or-recent-blog-text headline">
                      <h3><a href="blog-single.html" style={{ textDecoration: "none",color: "rgba(68, 130, 13, 0.8)" }}>Hunch over desk can cause pain.</a></h3>
                      <span><i className="far fa-calendar-alt"></i> February 12, 2021</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="or-widget-wrap headline ul-li-block">
                <div className="or-cat-widget position-relative">
                  <h3 className="widget-title" style={{ textDecoration: "none",color: "rgba(68, 130, 13, 0.8)" }}>Archives</h3>
                  <ul>
                    <li><a href="blog.html" style={{ textDecoration: "none",color: "rgba(58, 58, 58, 0.8)" }}>November 2019 </a><span>3</span></li>
                    <li><a href="blog.html" style={{ textDecoration: "none",color: "rgba(57, 57, 57, 0.8)" }}>February 2020 </a><span>2</span></li>
                    <li><a href="blog.html" style={{ textDecoration: "none",color: "rgba(64, 64, 64, 0.8)" }}>September 2019 </a><span>8</span></li>
                  </ul>
                </div>
              </div>
              <div className="or-widget-wrap headline ul-li">
                <div className="or-gallery-widget position-relative">
                  <h3 className="widget-title" style={{ textDecoration: "none",color: "rgba(68, 130, 13, 0.8)" }}>Gallery</h3>
                  {/* <ul className="zoom-gallery">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <li key={i}>
                        <a href={`assets/img/gallery/gl${i}.jpg`} data-source={`assets/img/gallery/gl${i}.jpg`}>
                          <img src={`assets/img/gallery/gl${i}.jpg`} alt="" />
                        </a>
                      </li>
                    ))}
                  </ul> */}
                   <PhotoGallery />
                </div>
              </div>
              <div className="or-widget-wrap headline ul-li">
                <div className="or-tag-widget position-relative">
                  <h3 className="widget-title" style={{ textDecoration: "none",color: "rgba(68, 130, 13, 0.8)" }}>Tag</h3>
                  <ul>
                    {['Map', 'Cloud', 'Builder', 'Tower', 'Truck'].map((tag, idx) => (
                      <li key={idx}><a href="blog.html" style={{ textDecoration: "none" }}>{tag}</a></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>






























      
    </div>
  );
};

export default BlogDetails;

