import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  // Update all paths to be relative to /dashboard
  const links = [
    { to: '/admindashboard/addcategories', text: 'Add Category' },
    { to: '/admindashboard/viewcategories', text: 'View Categories' },
    { to: '/admindashboard/addproducts', text: 'Add Products' },
    { to: '/admindashboard/viewproducts', text: 'View Products' },
    { to: '/admindashboard/addblogs', text: 'Add Blog' },
    { to: '/admindashboard/viewblogs', text: 'View Blogs' },
    { to: '/admindashboard/adduser', text: 'Add User' },
    { to: '/admindashboard/viewuser', text: 'View User' },
  ];

  return (
    <div style={{
      width: '240px',
      backgroundColor: '#34495e',
      color: 'white',
      padding: '20px',
      minHeight: '100vh',
    }}>
      <nav style={{ display: 'flex', flexDirection: 'column' }}>
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            style={{
              padding: '12px 20px',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              marginBottom: '8px',
              backgroundColor: '#2c3e50',
              transition: 'background 0.3s ease',
              userSelect: 'none',
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#1abc9c'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#2c3e50'}
          >
            {link.text}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
