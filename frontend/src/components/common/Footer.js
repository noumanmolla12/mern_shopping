
import React from 'react';
import PhotoGallery from '../pages/PhotoGallery';

const Footer = () => {
  const styles = {
    footerContainer: {
      backgroundColor: '#282c34',
      color: '#ffffff',
      padding: '40px 0',
      fontFamily: 'Arial, sans-serif',
    },
    topBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 10%',
      borderBottom: '1px solid #444',
      flexWrap: 'wrap',
      fontSize: '16px',
    },
    socialIcons: {
      display: 'flex',
      gap: '15px',
      marginTop: '10px',
    },
    icon: {
      color: '#fff',
      fontSize: '18px',
      textDecoration: 'none',
    },
    section: {
      padding: '40px 10%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: '30px',
    },
    column: {
      flex: '1 1 220px',
      minWidth: '200px',
    },
    heading: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#ffcc00',
    },
    link: {
      color: '#ffffff',
      textDecoration: 'none',
      display: 'block',
      marginBottom: '8px',
      fontSize: '15px',
    },
    text: {
      fontSize: '14px',
      lineHeight: '1.7',
    },
    contactInfo: {
      marginBottom: '10px',
      fontSize: '14px',
    },
    bottomBar: {
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  backgroundColor: '#1c1f24',
  color: '#cccccc',
  fontSize: '14px',
  textAlign: 'center',
  padding: '10px',
  zIndex: 1000,
}
,

    
    brand: {
      color: '#ffcc00',
      fontWeight: 'bold',
      textDecoration: 'none',
    }
  };

  return (
    <div style={styles.footerContainer}>
      <footer>
        {/* Top bar with social icons */}
        <div style={styles.topBar}>
          <span>Get connected with us on social networks:</span>
          <div style={styles.socialIcons}>
            <a href="#" style={styles.icon}><i className="fab fa-facebook-f"></i></a>
            <a href="#" style={styles.icon}><i className="fab fa-twitter"></i></a>
            <a href="#" style={styles.icon}><i className="fab fa-google"></i></a>
            <a href="#" style={styles.icon}><i className="fab fa-instagram"></i></a>
            <a href="#" style={styles.icon}><i className="fab fa-linkedin"></i></a>
            <a href="#" style={styles.icon}><i className="fab fa-github"></i></a>
          </div>
        </div>

        {/* Main section */}
        <div style={styles.section}>
          <div style={styles.column}>
            <h6 style={styles.heading}><i className="fas fa-gem me-3"></i>NOUMAN</h6>
            <p style={styles.text}>
              Web Developer</p> 
            <p style={styles.text}>Master’s Degree in Computer Systems</p>   
            <p style={styles.text}>Skills:React, Spring Boot & Laravel</p>

          </div>

          <div style={styles.column}>
            <h6 style={styles.heading}>Links</h6>
            <a href="/" style={styles.link}>Home</a>
            <a href="/services" style={styles.link}>Services</a>
            <a href="/about" style={styles.link}>About Us</a>
            <a href="/shop" style={styles.link}>Shop</a>
            <a href="/blogs" style={styles.link}>News</a>
          </div>

          <div style={styles.column}>
            <h6 style={styles.heading}>Official Info</h6>
            <p style={styles.contactInfo}><i className="fas fa-home me-3"></i> 380 St Kilda Road, Melbourne VIC 3004, Australia</p>
            <p style={styles.contactInfo}><i className="fas fa-envelope me-3"></i> info@envato.com</p>
            <p style={styles.contactInfo}><strong>Open Hours:</strong> Mon - Sat: 8 am - 5 pm, Sunday: CLOSED</p>
          </div>

          <div style={styles.column}>
            <h6 style={styles.heading}>Contact</h6>
            <p style={styles.contactInfo}><i className="fas fa-home me-3"></i> ward no 04, Nalhati, WB-731220, INDIA</p>
            <p style={styles.contactInfo}><i className="fas fa-envelope me-3"></i> info@envato.com</p>
            <p style={styles.contactInfo}><i className="fas fa-phone me-3"></i> + 91 9733116221</p>
            <p style={styles.contactInfo}><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
          </div>

          <div style={styles.column}>
            <h6 style={styles.heading}>Photo Gallery</h6>
            <PhotoGallery />
          </div>
        </div>

        {/* Bottom bar */}
        <div style={styles.bottomBar}>
          © 2025: <a style={styles.brand} href="mailto:noumanmolla12@gmail.com">nouman</a>. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
























