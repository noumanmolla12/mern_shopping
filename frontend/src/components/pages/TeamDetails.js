import React from "react";

const TeamDetails = () => {
  return (
    <div style={{ backgroundColor: "#FFF8ED " }}>
      <section
  id="or-breadcrumbs"
  className="or-breadcrumbs-section position-relative"
  style={{
    backgroundImage: "url('https://img.freepik.com/premium-photo/diverse-group-professional-farmers-checking-plants-development-hydroponic-enviroment-organic-farm-greenhouse-workers-working-hard-doing-quality-inspection-green-vegetables-crop_482257-46509.jpg')"
  }}
>
  <div className="background_overlay"></div>
  <div className="container"><br/><br/><br/><br/>
    <div className="or-breadcrumbs-content text-center">
      <div className="page-title headline">
        <h1>Team Details</h1>
      </div>
      <div className="or-breadcrumbs-items ul-li">
        <ul>
          <li>
            <a href="#" style={{ textDecoration: "none", color:"white" }}>Home <span style={{color:"green"}}>{">>"}</span> Team Details</a>
          </li>
          
        </ul>
      </div>
    </div>
  </div>
</section>
      <section id="or-team-details" className="or-team-details-section">
      <div className="container">
        <div className="ord-team-details-content">
          <div className="row">
            <div className="col-lg-3">
              <div className="ord-team-details-sidebar">
                <div className="ord-team-details-sidebar-item">
                  <div className="ord-team-member-inner-item">
                    <div className="ord-team-member-img text-center position-relative">
                      <img src="assets/img/team/tmd.jpg" alt="Stephen Louis" />
                    </div>
                    <div className="ord-team-member-text headline text-center pera-content">
                      <h3>
                        <a href="team-single.html" style={{ textDecoration: "none", color: "black" }}>
                          Stephen Louis
                        </a>
                      </h3>
                      <span>Business Consultant</span>
                    </div>
                    <div className="ord-team-member-contact ul-li-block">
                      <ul>
                        <li>
                          <i className="fas fa-phone"></i> +91 7581 458 21
                        </li>
                        <li>
                          <i className="fas fa-envelope"></i> Support@gmail.com
                        </li>
                        <li>
                          <i className="fas fa-map-marker-alt"></i> 13 Street Road, NY, USA
                        </li>
                      </ul>
                    </div>
                    <div className="ord-team-member-social">
                      <span>Follow Me:</span>
                      <div className="social-item">
                        <a href="#" className="fb-icon" style={{ textDecoration: "none", color:"rgba(112, 113, 111, 0.8)" }}>
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="tw-icon" style={{ textDecoration: "none", color:"rgba(112, 113, 111, 0.8)"  }}>
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="dri-icon" style={{ textDecoration: "none", color:"rgba(112, 113, 111, 0.8)"  }}>
                          <i className="fas fa-basketball-ball"></i>
                        </a>
                        <a href="#" className="bh-icon" style={{ textDecoration: "none", color:"rgba(112, 113, 111, 0.8)"  }}>
                          <i className="fab fa-behance"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-9">
              <div className="ord-team-details-text-wrap headline pera-content">
                <div className="ord-team-details-text-item">
                  <h3>Personal Experience</h3>
                  <p>
                    Many desktop publishing packages and web page editors now use Lorem Ipsum
                    as their default model. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to using ‘Content
                    here, content here’, making it look like readable English.
                  </p>
                </div>

                <div className="ord-team-details-text-item ul-li-block">
                  <h3>Activities</h3>
                  <p>
                    Who has trouble understanding people or has trouble putting words together
                    to express thoughts might have a language disorder condition.
                  </p>
                  <div className="activity-list-progress d-flex">
                    <div className="ord-team-details-activity">
                      <ul className="activity-list">
                        <li>Experienced Attorneys Professional.</li>
                        <li>Experienced Attorneys Approach.</li>
                        <li>Independence Makes Difference.</li>
                        <li>Committed To Helping Our Clients.</li>
                      </ul>
                    </div>
                    <div className="ord-team-details-progress">
                      <div className="skill-progress-bar">
                        <div className="skill-set-percent headline">
                          <h4>Consultency</h4>
                          <div className="progress">
                            <div className="progress-bar" data-percent="92"></div>
                          </div>
                        </div>
                        <div className="skill-set-percent headline">
                          <h4>Finance</h4>
                          <div className="progress">
                            <div className="progress-bar" data-percent="85"></div>
                          </div>
                        </div>
                        <div className="skill-set-percent headline">
                          <h4>Corporate Business</h4>
                          <div className="progress">
                            <div className="progress-bar" data-percent="75"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ord-team-details-text-item">
                  <h3>Qualification</h3>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                    doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                    veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                    ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                    consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                  </p>
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

export default TeamDetails;
