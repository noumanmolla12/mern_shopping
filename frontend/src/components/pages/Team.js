import React from "react";
import { Link } from 'react-router-dom';



const Team = () => {
  return (
    <div style={{ backgroundColor: "#D4F1E7" }}>
      <section
        id="or-breadcrumbs"
        className="or-breadcrumbs-section position-relative"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/diverse-group-professional-farmers-checking-plants-development-hydroponic-enviroment-organic-farm-greenhouse-workers-working-hard-doing-quality-inspection-green-vegetables-crop_482257-46509.jpg')",
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
              <h1>Team</h1>
            </div>
            <div className="or-breadcrumbs-items ul-li">
              <ul>
                <li>
                  <a href="#" style={{ textDecoration: "none", color: "white" }}>
                    Home <span style={{ color: "green" }}>{">>"}</span> Team
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="or-team-feed" className="or-team-feed-section">
        <div className="container">
          <div className="or-section-title headline pera-content text-center middle-align">
            <span className="sub-title">Team member</span>
            <h2>We have awesome team member to help support.</h2>
          </div>
          <div className="or-team-feed-content">
            <div className="row">
              {[
                {
                  name: "Alisa Lisa",
                  role: "Customer Care Officer",
                  img: "assets/img/team/tm1.jpg",
                },
                {
                  name: "Robert Leo",
                  role: "Farmer",
                  img: "assets/img/team/tm2.jpg",
                },
                {
                  name: "Nora Bell",
                  role: "Sales Executive",
                  img: "assets/img/team/tm3.jpg",
                },
                {
                  name: "Sherri Horton",
                  role: "Customer Care Officer",
                  img: "assets/img/team/tm4.jpg",
                },
                {
                  name: "Sinira Fro",
                  role: "Farmer",
                  img: "assets/img/team/tm5.jpg",
                },
                {
                  name: "Alis Preston",
                  role: "Sales Executive",
                  img: "assets/img/team/tm7.jpg",
                },
              ].map((member, idx) => (
                <div key={idx} className="col-lg-4 col-md-6">
                  <div className="or-team-innerbox">
                    <div className="or-team-img position-relative">
                      <img src={member.img} alt={member.name} />
                    </div>
                    <div className="or-taam-item-holder">
                      <div className="or-team-meta text-center headline position-relative">
                        <h3>
                          <a
                            href="/team-details"
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            {member.name}
                          </a>
                        </h3>
                        <span>{member.role}</span>
                        <div className="team-item-side-img">
  <Link to="/team-details">
    <img className="side-img" src="assets/img/icon/t-icon2.png" alt="" />
  </Link>
  <Link to="/team-details">
    <img className="side-img" src="assets/img/icon/t-icon1.png" alt="" />
  </Link>
</div>
                      </div>
                      <div className="or-team-text-social pera-content text-center">
                        <p>
                          Lisa focuses on providing customers with Organic and Fair Trade Food.
                        </p>
                        <div className="or-team-social">
                          <a href="/team-details" style={{ textDecoration: "none" }}>
                            <i className="fab fa-facebook-f"></i>
                          </a>
                          <a href="/team-details" style={{ textDecoration: "none" }}>
                            <i className="fab fa-twitter"></i>
                          </a>
                          <a href="/team-details" style={{ textDecoration: "none" }}>
                            <i className="fab fa-dribbble"></i>
                          </a>
                          <a href="/team-details" style={{ textDecoration: "none" }}>
                            <i className="fab fa-behance"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="or-pagination text-center ul-li">
              <ul>
                <li>
                  <a className="active" href="/team" style={{ textDecoration: "none" }}>
                    1
                  </a>
                </li>
                <li>
                  <a href="/team" style={{ textDecoration: "none" }}>
                    2
                  </a>
                </li>
                <li>
                  <a href="/team" style={{ textDecoration: "none" }}>
                    3
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
