// src/components/layouts/MainLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './common/Header';
import Footer from './common/Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <main style={{ minHeight: '80vh', padding: '20px' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
