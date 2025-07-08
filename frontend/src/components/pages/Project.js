import React from 'react'

const Project = () => {
  return (
    <div style={{backgroundColor: "#F8FDFF"}}>
     


    



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
            <a href="#" style={{ textDecoration: "none" }}>Home <span style={{color:"green"}}>{">>"}</span> Project</a>
          </li>
          
        </ul>
      </div>
    </div>
  </div>
</section>


<section id="or-project-feed" className="or-project-feed-section">
  <div className="container">
    <div className="or-project-feed-content">
      <div className="row">
        {[...Array(8)].map((_, index) => (
          <div className="col-lg-3 col-md-6" key={index}>
            <div className="or-portfolio-innerbox position-relative">
              <div className="or-portfolio-img">
                <img
                  src={`assets/img/portfolio/port${index + 1}.jpg`}
                  alt=""
                />
              </div>
              <div className="or-portfolio-text headline">
                <h3>
                  <a href="/project-details" style={{ textDecoration: "none" }}>
                    Organic Grape
                  </a>
                </h3>
                <span>
                  <a href="/project-details" style={{ textDecoration: "none" }}>
                    Farming fruits
                  </a>
                </span>
                <a
                  className="read-more d-flex justify-content-center align-items-center"
                  href="/project-details"
                  style={{ textDecoration: "none" }}
                >
                  <img src="assets/img/icon/arrow2.png" alt="" />
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
</section>




  
    </div>
  )
}

export default Project
