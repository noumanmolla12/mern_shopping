import React from 'react';

const Footer = () => {
  const styles = {
    bottomBar: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      backgroundColor: 'rgb(52, 73, 94)',
      color: '#cccccc',
      fontSize: '14px',
      textAlign: 'center',
      padding: '10px',
      zIndex: 1000,
    },
    brand: {
      color: '#ffcc00',
      fontWeight: 'bold',
      textDecoration: 'none',
    }
  };

  return (
    <div>
      <footer>
        <div style={styles.bottomBar}>
          © 2025: <a style={styles.brand} href="mailto:noumanmolla12@gmail.com">nouman</a>. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
