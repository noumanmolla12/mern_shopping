import React, { useState, useEffect } from "react";
const teamMembers = [
  {
    img: 'assets/img/team/tm1.jpg',
    name: 'Alisa Lisa',
    role: 'Customer Care Officer',
  },
  {
    img: 'assets/img/team/tm2.jpg',
    name: 'Robert Leo',
    role: 'Farmer',
  },
  {
    img: 'assets/img/team/tm3.jpg',
    name: 'Nora Bell',
    role: 'Sales Executive',
  },
  {
    img: 'assets/img/team/tm1.jpg',
    name: 'John Doe',
    role: 'Marketing Manager',
  },
  {
    img: 'assets/img/team/tm2.jpg',
    name: 'Emma Watson',
    role: 'Product Designer',
  },
  {
    img: 'assets/img/team/tm3.jpg',
    name: 'Michael Scott',
    role: 'Sales Manager',
  },
  {
    img: 'assets/img/team/tm1.jpg',
    name: 'Dwight Schrute',
    role: 'Assistant to the Regional Manager',
  },
  {
    img: 'assets/img/team/tm2.jpg',
    name: 'Pam Beesly',
    role: 'Receptionist',
  },
  {
    img: 'assets/img/team/tm3.jpg',
    name: 'Jim Halpert',
    role: 'Sales Representative',
  },
  {
    img: 'assets/img/team/tm1.jpg',
    name: 'Angela Martin',
    role: 'Accountant',
  },
  {
    img: 'assets/img/team/tm2.jpg',
    name: 'Stanley Hudson',
    role: 'Salesman',
  },
  {
    img: 'assets/img/team/tm3.jpg',
    name: 'Kevin Malone',
    role: 'Accountant',
  },
];

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const About = () => {
 

   const teamSlides = chunkArray(teamMembers, 3); 

  return (
    <>

    <section
  id="or-breadcrumbs"
  className="or-breadcrumbs-section position-relative"
  style={{
    backgroundImage: "url('https://wallpaperaccess.com/full/3239480.jpg')"
  }}
>
  <div className="background_overlay"></div>
  <div className="container"><br/><br/><br/><br/>
    <div className="or-breadcrumbs-content text-center">
      <div className="page-title headline">
        <h1>About</h1>
      </div>
      <div className="or-breadcrumbs-items ul-li">
        <ul>
          <li>
            <a href="#" style={{ textDecoration: "none", color:"white" }}>Home <span style={{color:"green"}}>{">>"}</span> About</a>
          </li>
          
        </ul>
      </div>
    </div>
  </div>
</section>



      <section id="or-why-choose" class="or-why-choose-section">
		<div class="container">
			<div class="or-why-choose-content">
				<div class="row">
					<div class="col-lg-6">
						<div class="or-why-choose-feature position-relative">
							<div class="row">
								<div class="col-md-6">
									<div class="or-why-choose-feature-innerbox headline pera-content text-center">
										<div
											class="or-why-choose-feature-icon position-relative d-flex align-items-center justify-content-center">
											<i class="flaticon-return"></i>
										</div>
										<div class="or-why-choose-feature-text">
											<h3>Return Policy</h3>
											<p>Purchasing from select family farmers who farm organically.</p>
										</div>
									</div>
								</div>
								<div class="col-md-6">
									<div class="or-why-choose-feature-innerbox headline pera-content text-center">
										<div
											class="or-why-choose-feature-icon position-relative d-flex align-items-center justify-content-center">
											<i class="flaticon-leaf"></i>
										</div>
										<div class="or-why-choose-feature-text">
											<h3>100% Fresh</h3>
											<p>Purchasing from select family farmers who farm organically.</p>
										</div>
									</div>
								</div>
								<div class="col-md-6">
									<div class="or-why-choose-feature-innerbox headline pera-content text-center">
										<div
											class="or-why-choose-feature-icon position-relative d-flex align-items-center justify-content-center">
											<i class="flaticon-headphones"></i>
										</div>
										<div class="or-why-choose-feature-text">
											<h3>Support 24/7</h3>
											<p>Purchasing from select family farmers who farm organically.</p>
										</div>
									</div>
								</div>
								<div class="col-md-6">
									<div class="or-why-choose-feature-innerbox headline pera-content text-center">
										<div
											class="or-why-choose-feature-icon position-relative d-flex align-items-center justify-content-center">
											<i class="flaticon-credit-card"></i>
										</div>
										<div class="or-why-choose-feature-text">
											<h3>Secured Payment</h3>
											<p>Purchasing from select family farmers who farm organically.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-6">
						<div class="or-why-choose-text-wrapper">
							<div class="or-section-title headline pera-content">
								<span class="sub-title">Why Choose us?</span>
								<h2 class="case-animate-time">We do not buy from the open market &amp; traders.</h2>
								<p>Purchasing from select family farmers who farm organically because they believe in it
									and so we do. We are conscious of air miles and our carbon footprint so a lot of our
									produce comes from Egypt.</p>
								<p>Organic Foods and Café is a family run company that runs organic super markets and
									cafés selling fresh organic and biodynamic food, supplers, skincare, cosmetics, baby
									items and household cleaning products. We have 5 shops in Dubai – on Sheikh Zayed
									Road.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>



    <section
      id="or-funfact"
      className="or-funfact-section position-relative"
      style={{ backgroundImage: "url('assets/img/bg/fn-bg.png')" }}
    >
      <div className="container">
        <div className="or-funfact-content">
          <div className="row">
            {[
              {
                icon: "fa-smile",
                count: "1542",
                label: "Satisfied Clients",
              },
              {
                icon: "fa-users",
                count: "182",
                label: "Expert Team",
              },
              {
                icon: "fa-box",
                count: "285",
                label: "Activate Products",
              },
              {
                icon: "fa-trophy",
                count: "27",
                label: "Award Winning",
              },
            ].map((item, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <div className="or-funfact-innerbox position-relative d-flex align-items-center">
                  <div className="or-funfact-icon">
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div className="or-funfact-text headline pera-content">
                    <h3>
                      <span className="counter">{item.count}</span>
                      <sup>+</sup>
                    </h3>
                    <p>{item.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>



<section id="our-team" className="or-team-section">
      <div className="container">
        <div className="or-section-title headline pera-content text-center middle-align">
          <span className="sub-title">Team member</span>
          <h2 className="case-animate-time">We have awesome team member to support.</h2>
        </div>

        {/* Carousel Start */}
        <div id="teamCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {teamSlides.map((group, slideIndex) => (
              <div className={`carousel-item ${slideIndex === 0 ? 'active' : ''}`} key={slideIndex}>
                <div className="row justify-content-center">
                  {group.map((member, index) => (
                    <div className="col-md-4" key={index}>
                      <div className="organio-inner-item">
                        <div className="or-team-innerbox">
                          <div className="or-team-img position-relative">
                            <img src={member.img} alt={member.name} className="img-fluid" />
                          </div>
                          <div className="or-taam-item-holder">
                            <div className="or-team-meta text-center headline position-relative">
                              <h3><a href="team-single.html" style={{ textDecoration: "none", color:"white"}}>{member.name}</a></h3>
                              <span>{member.role}</span>
                              <div className="team-item-side-img">
                                <img className="side-img" src="assets/img/icon/t-icon2.png" alt="" />
                                <img className="side-img" src="assets/img/icon/t-icon1.png" alt="" />
                              </div>
                            </div>
                            <div className="or-team-text-social pera-content text-center">
                              <p>Lisa focuses on providing customers with Organic and Fair Trade Food.</p>
                              <div className="or-team-social">
                                <a href="#"><i className="fab fa-facebook-f"></i></a>
                                <a href="#"><i className="fab fa-twitter"></i></a>
                                <a href="#"><i className="fab fa-dribbble"></i></a>
                                <a href="#"><i className="fab fa-behance"></i></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <button className="carousel-control-prev" type="button" data-bs-target="#teamCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#teamCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        {/* Carousel End */}
      </div>
    </section>


    
     



       <section id="or-about-1" className="or-about-section-1">
      <div className="container">
        <div className="or-about-content-1 position-relative">
          <div className="or-about-img-1 position-absolute">
           <img src="assets/img/about/ab1.jpg" alt="About" style={{ width: "600px", height:"auto" }} />

          </div>
          <div className="or-about-text-area d-flex justify-content-end">
            <div className="or-about-img-text-wrapper-1">
              <div className="or-section-title headline pera-content">
                <span className="sub-title" style={{ textDecoration: "none" }}>About us</span>
                <h2 className="case-animate-time" style={{ textDecoration: "none" }}>
                  We believe in working with accredited farmers
                </h2>
                <span className="sub-text" style={{ textDecoration: "none" }}>
                  Organic Foods and Café is a family run company founded in
                  2004 that runs organic supermarkets
                </span>
                <p style={{ textDecoration: "none" }}>
                  Organic means growing our food, which is to nourish us,
                  without chemical aids during the growing process such as
                  fertilisers, pesticides, fungicides, herbicides, larvicides etc.
                </p>
              </div>

              <div className="or-about-feature-wrapper d-flex">
                <div className="or-about-feature-innebox headline pera-content d-flex">
                  <div className="or-about-feature-icon" style={{ fontSize: "30px", marginRight: "15px" }}>
                    <i className="fas fa-leaf"></i>
                  </div>
                  <div className="or-about-feature-text">
                    <h3 style={{ textDecoration: "none" }}>Why Organic?</h3>
                    <p style={{ textDecoration: "none" }}>
                      We're making room for self care today with plan.
                    </p>
                  </div>
                </div>

                <div className="or-about-feature-innebox headline pera-content d-flex">
                  <div className="or-about-feature-icon" style={{ fontSize: "30px", marginRight: "15px" }}>
                    <i className="fas fa-seedling"></i>
                  </div>
                  <div className="or-about-feature-text">
                    <h3 style={{ textDecoration: "none" }}>Speciality Produce</h3>
                    <p style={{ textDecoration: "none" }}>
                      New range coming in on a weekly basis veg section.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default About;
