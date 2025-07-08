import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const linkStyle = { textDecoration: 'none' };

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const isLoggedIn = !!user;

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <header id="organio-header" className="organio-header-section header-style-four">
      {/* Top Bar */}
      <div className="header-top">
        <div className="container">
          <div className="header-top-content d-flex justify-content-between align-items-center">
            <div className="or-header-slug ul-li">
              <ul>
                <li>Welcome to our shop!</li>
                <li><i className="fas fa-phone-alt"></i> +91 9733116221</li>
                <li><i className="fas fa-map-marker-alt"></i> Nalhati, West Bengal, INDIA</li>
              </ul>
            </div>
            <div className="or-btn-2">
              <Link style={linkStyle} className="d-flex justify-content-center align-items-center" to="/contact">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="organio-main-header-wrapper">
        <div className="container-fluid">
          <div className="or-header-main-menu-content d-flex justify-content-between align-items-center">
            {/* Logo */}
            <div className="site-logo">
              <Link to="/" style={linkStyle}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Eo_circle_light-blue_letter-n.svg"
                  alt="Logo"
                  style={{ width: '50px', height: '50px' }}
                />
              </Link>
            </div>

            {/* Navigation */}
            <div className="or-header-main-navigation-btn d-flex">
              <nav className="main-navigation-area clearfix ul-li">
                <ul className="menu-navigation">
                  <li><Link to="/" style={linkStyle}>Home</Link></li>
                  <li><Link to="/about" style={linkStyle}>About</Link></li>
                  <li><Link to="/shop" style={linkStyle}>Shop Page</Link></li>
                  <li><Link to="/services" style={linkStyle}>Services</Link></li>
                  <li><Link to="/team" style={linkStyle}>Team</Link></li>
                  <li><Link to="/blogs" style={linkStyle}>News</Link></li>
                  <li><Link to="/project" style={linkStyle}>Projects</Link></li>
                  <li><Link to="/contact" style={linkStyle}>Contact</Link></li>
                </ul>
              </nav>

              {/* Right Buttons */}
              <div className="or-header-right-btn" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '0 10px',
              }}>

                {/* Conditional Login/Logout */}
                {!isLoggedIn ? (
                  <div style={{ position: 'relative' }}>
                    <a
                      href="/userlogin"
                      style={{
                        backgroundColor: 'rgb(40 157 240)',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '8px 8px 0 0',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={(e) => e.currentTarget.nextSibling.style.display = 'block'}
                      onMouseLeave={(e) => e.currentTarget.nextSibling.style.display = 'none'}
                    >
                      <img
                        src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"
                        alt="Profile Icon"
                        width="25px"
                        height="25px"
                      />
                      Login ▼
                    </a>

                    <div
                      style={{
                        display: 'none',
                        position: 'absolute',
                        top: '100%',
                        backgroundColor: 'white',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        width: '200px',
                        borderRadius: '0 0 8px 8px',
                        padding: '10px',
                        zIndex: 10,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.display = 'block')}
                      onMouseLeave={(e) => (e.currentTarget.style.display = 'none')}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '10px 0',
                        borderBottom: '1px solid #eee',
                      }}>
                        <span>New customer?</span>
                        <a
                          href="/adduser"
                          style={{
                            color: '#2874f0',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                          }}
                        >
                          Sign Up
                        </a>
                      </div>
                      <a href="/viewuser" style={menuItemStyle}>👤 My Profile</a>
                      <a href="/userlogin" style={menuItemStyle}>📦 Orders</a>
                      <a href="#" style={menuItemStyle}>🧡 Wishlist</a>
                      <a href="#" style={menuItemStyle}>🏆 Rewards</a>
                      <a href="#" style={menuItemStyle}>🎁 Gift Cards</a>
                    </div>
                  </div>
                ) : (
                  <div style={{ position: 'relative' }}>
                    <div
                      style={{
                        backgroundColor: 'rgb(163 204 233)',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '8px 8px 0 0',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontFamily: 'Arial, sans-serif',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.nextSibling.style.display = 'block')}
                      onMouseLeave={(e) => (e.currentTarget.nextSibling.style.display = 'none')}
                    >
                      <img
                        src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"
                        alt="Profile Icon"
                        width="25px"
                        height="25px"
                      />
                      Account <span style={{ marginLeft: 'auto' }}>▾</span>
                    </div>

                    <div
                      style={{
                        display: 'none',
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        width: '250px',
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        fontFamily: 'Arial, sans-serif',
                        zIndex: 1000,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.display = 'block')}
                      onMouseLeave={(e) => (e.currentTarget.style.display = 'none')}
                    >
                      <div style={{
                        padding: '12px 16px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        borderBottom: '1px solid #eee',
                      }}>
                        <img
                          src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"
                          alt="Profile Icon"
                          width="25px"
                          height="25px"
                        />
                        Account
                      </div>
                      <a href="/userprofile" style={menuItemStyle}>👤 My Profile</a>
                      <a href="#" style={menuItemStyle}>⚡ SuperCoin Zone</a>
                      <a href="#" style={menuItemStyle}>✴️ Flipkart Plus Zone</a>
                      <a href="/orderhistory" style={menuItemStyle}>📦 Orders</a>
                      <a href="#" style={menuItemStyle}>🤍 Wishlist</a>
                      <a href="#" style={menuItemStyle}>🏷️ Coupons</a>
                      <a href="#" style={menuItemStyle}>💳 Gift Cards</a>
                      <a href="#" style={menuItemStyle}>🔔 Notifications</a>
                      <a onClick={handleLogout} style={{ ...menuItemStyle, borderTop: '1px solid #eee' }}>↩️ Logout</a>
                    </div>
                  </div>
                )}

                {/* Cart Button */}
                <a href="/cart" style={{ textDecoration: 'none' }}>
                  <button
                    className="or-canvas-cart-trigger"
                    style={{
                      position: 'relative',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '5px',
                    }}
                  >
                    <i className="fas fa-shopping-cart" style={{ fontSize: '24px', color: '#333' }}></i>
                    <span
                      style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-5px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        borderRadius: '50%',
                        padding: '2px 6px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        lineHeight: 1,
                        minWidth: '20px',
                        textAlign: 'center',
                      }}
                    >
                      {totalCount}
                    </span>
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="mobile_menu position-relative">
            <div className="mobile_menu_button open_mobile_menu">
              <i className="fas fa-bars"></i>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const menuItemStyle = {
  padding: '10px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
  color: 'inherit',
  textDecoration: 'none',
};

export default Header;
