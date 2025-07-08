import React from "react";

const ProjectDetails = () => {
  return (
    <div style={{ backgroundColor: "#F3FFE2" }}>
     
<section
  id="or-breadcrumbs"
  className="or-breadcrumbs-section position-relative"
  style={{
    backgroundImage: "url('https://wallpapers.com/images/high/best-food-background-1xtslxzb0843vwi3.webp')"
  }}
>
  <div className="background_overlay"></div>
  <div className="container"><br/><br/><br/><br/>
    <div className="or-breadcrumbs-content text-center">
      <div className="page-title headline">
        <h1>Project</h1>
      </div>
      <div className="or-breadcrumbs-items ul-li">
        <ul>
          <li>
            <a href="#" style={{ textDecoration: "none", color:"white" }}>Home <span style={{color:"green"}}>{">>"}</span> Project</a>
          </li>
          
        </ul>
      </div>
    </div>
  </div>
</section>



      
     <section id="or-project-details" className="or-project-details-section">
  <div className="container">
    <div className="or-project-overview">
      <div className="row">
        <div className="col-lg-8">
          <div className="or-project-details-img">
            <img src="assets/img/portfolio/prd1.jpg" alt="" />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="or-portfolio-overview-text headline">
            <div className="project-title-overview text-center">
              <h3>Project details</h3>
            </div>
            <div className="or-portfolio-overview-list-value">
              <div className="or-portfolio-overview-list ul-li-block">
                <ul>
                  <li>
                    Name: <span>Rob’s house</span>
                  </li>
                  <li>
                    Date: <span>24th March 2020</span>
                  </li>
                  <li>
                    Author: <span>Marilin De Aragon</span>
                  </li>
                  <li>
                    Tag: <span>Cleaning, Plumbing</span>
                  </li>
                </ul>
              </div>
              <div className="or-project-value ul-li">
                <span>Value: $125</span>
                <ul>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                  <li>
                    <i className="fas fa-star"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="or-project-overview-text-wrapper headline pera-content">
      <h3>Tong Garden farm</h3>
      <p>
        Purchasing from select family farmers who farm organically because they believe in it and so we do. We are conscious of air miles and our carbon footprint so a lot of our produce comes from Egypt. Lorem ipsum is simply free text used by copytyping refreshing.
      </p>
      <div className="or-project-overview-comment-list">
        <div className="row">
          <div className="col-lg-5">
            <div className="or-project-overview-list-item ul-li-block">
              <ul>
                <li>The housekeepers we hired are professionals who take pride in doing excellent work and in exceeding expectations.</li>
                <li>We carefully screen all of our cleaners you can rest assured that your home would receive the absolute highest quality of service providing.</li>
                <li>Your time is precious, and we understand that cleaning is really just one more item on your to-do list.</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="or-project-overview-comment">
              <div className="or-project-overview-comment-wrapper d-flex align-items-center position-relative">
                <span className="project-qoute-icon position-absolute">
                  <i className="fas fa-quote-right"></i>
                </span>
                <div className="or-project-overview-comment-img">
                  <img src="assets/img/portfolio/pa.jpg" alt="" />
                </div>
                <div className="or-project-overview-comment-text headline">
                  ‘’Tempor incididunt ut labore et dolore magna alias
                  quat enim veniam quis nostru exercitation ullamco laboris nis aliquip.’’
                  <h4>Rob Hunter</h4>
                  <span>Managing Director</span>
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

export default ProjectDetails;
