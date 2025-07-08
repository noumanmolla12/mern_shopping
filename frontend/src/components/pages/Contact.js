import React from 'react';

const Contact = () => {
  return (
    <>
      {/* Banner Section */}
      <div style={{ position: 'relative' }}>
        <img
          className="d-block w-100"
          src="https://wallpaperaccess.com/full/1155050.jpg"
          alt="Contact Banner"
          style={{ height: '400px', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'white',
            textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
          }}
        >
          <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Contact</h1>
          <p style={{ fontSize: '1.5rem' }}>
            Home <span><i className="bx bx-chevrons-right"></i></span> Contact
          </p>
        </div>
      </div>

      {/* Contact Info Section */}
      <section id="or-contact-info" className="or-contact-info-section py-5" style={{ backgroundColor: '#effaf3' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="or-contact-innerbox headline or-contact-innerbox-layout1 address h-100">
                <div className="item--inner bg-image text-center p-4">
                  <div className="item--icon icon-psb mb-3">
  <i className="fas fa-map-marker-alt" style={{ fontSize: '2rem', color: 'green' }}></i>
</div>

                  <h4 className="item--title">Address:</h4>
                  <p>30 Commercial Road Fratton,<br />Australia</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="or-contact-innerbox headline or-contact-innerbox-layout1 phone h-100">
                <div className="item--inner bg-image text-center p-4">
                  <div className="item--icon icon-psb mb-3">
  <i className="fas fa-phone-alt" style={{ fontSize: '2rem', color: 'green' }}></i>
</div>

                  <h4 className="item--title">Phone Number:</h4>
                  <p>1-888-452-1505<br />1-888-452-1340</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="or-contact-innerbox headline or-contact-innerbox-layout1 mail h-100">
                <div className="item--inner bg-image text-center p-4">
                  <div className="item--icon icon-psb mb-3">
  <i className="fas fa-envelope" style={{ fontSize: '2rem', color: 'green' }}></i>
</div>

                  <h4 className="item--title">Mail Address:</h4>
                  <p>helo@organico.com<br />helo@envato.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="or-contact-form" className="or-contact-form-section py-5" style={{ backgroundColor: '#effaf3' }}>
        <div className="container">
          <div className="or-contact-form-wrapper">
            <div className="or-section-title headline pera-content text-center mb-5">
              <span className="sub-title" style={{ color: 'green' }}>Contact Us?</span>
              <h2>Feel free to contact with us any time.</h2>
            </div>
            <div className="or-contact-form-content">
              <form action="contact.php" method="post">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="or-contact-input">
                      <label>Full name*</label>
                      <input type="text" name="name" className="form-control" placeholder="John Doe" required />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="or-contact-input">
                      <label>Mail Address*</label>
                      <input type="email" name="Email" className="form-control" placeholder="example@email.com" required />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="or-contact-input">
                      <label>Your Number*</label>
                      <input type="text" name="phone" className="form-control" placeholder="+8595136697058" required />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="or-contact-input">
                      <label>Subject*</label>
                      <input type="text" name="subject" className="form-control" placeholder="Ex: Agriculture, Organico" required />
                    </div>
                  </div>
                  <div className="col-md-12 mb-3">
                    <div className="or-contact-input">
                      <label>Type your message*</label>
                      <textarea name="message" className="form-control" rows="5" placeholder="Message..." required></textarea>
                    </div>
                  </div>
                </div>
                <div className="or-contact-btn text-center mt-4">
                  <button type="submit" className="btn btn-success px-4 py-2">Send your message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
