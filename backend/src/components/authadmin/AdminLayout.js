// components/authadmin/AdminLayout.js
import React from 'react';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.bodyWrapper}>
        <div style={styles.sidebarWrapper}>
          <Sidebar />
        </div>
        <div style={styles.contentWrapper}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#f5f7fa",
    minHeight: "100vh",
  },
  bodyWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  sidebarWrapper: {
  width: "250px",
  backgroundColor: "#ffffff",
  boxShadow: "2px 0 5px rgba(0,0,0,0.05)",
  minHeight: "100vh",  // already present
  height: "100vh",     // ensure it fills viewport height
  overflowY: "auto",
},

  contentWrapper: {
    flex: 1,
    padding: "40px 30px",
  },
};

export default AdminLayout;
