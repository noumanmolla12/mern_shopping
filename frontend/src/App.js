import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Layout from './components/Layout';
import PrivateRoute from './components/authuser/PrivateRoute';

import Home from './components/Home';
import SingleProduct from './components/SingleProduct';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Blogs from './components/pages/Blogs';
import BlogDetails from './components/pages/BlogDetails';
import Shop from './components/pages/Shop';
import About from './components/pages/About';
import Services from './components/pages/Services';
import ServiceDetails from './components/pages/ServiceDetails';
import Contact from './components/pages/Contact';
import Project from './components/pages/Project';
import ProjectDetails from './components/pages/ProjectDetails';
import Team from './components/pages/Team';
import TeamDetails from './components/pages/TeamDetails';
import NotFound from './components/pages/NotFound';
import AddUser from './components/users/AddUser';
import ViewUser from './components/users/ViewUser';
import EditUser from './components/users/EditUser';
import UserProfile from './components/users/UserProfile';
import EditUserProfile from './components/users/EditUserProfile';
import UserLogin from './components/authuser/UserLogin';
import UserDashboard from './components/authuser/UserDashboard';
import ThankYou from './components/ThankYou';
import OrderHistory from './components/OrderHistory';

function App() {
  const appStyle = {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f8ff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div style={appStyle}>
      <BrowserRouter>
        <Routes>

          {/* Layout with shared Header + Footer */}
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blog-detail/:id" element={<BlogDetails />} />
            <Route path="contact" element={<Contact />} />
            <Route path="shop" element={<Shop />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="service-details" element={<ServiceDetails />} />
            <Route path="project" element={<Project />} />
            <Route path="project-details" element={<ProjectDetails />} />
            <Route path="team" element={<Team />} />
            <Route path="team-details" element={<TeamDetails />} />
            <Route path="adduser" element={<AddUser />} />
            <Route path="viewuser" element={<ViewUser />} />
            <Route path="edit-user/:id" element={<EditUser />} />
            

            {/* Private Routes */}
            <Route path="userprofile" element={
              <PrivateRoute><UserProfile /></PrivateRoute>
            } />
            <Route path="edituserprofile" element={
              <PrivateRoute><EditUserProfile /></PrivateRoute>
            } />
            <Route path="thank-you" element={
              <PrivateRoute><ThankYou /></PrivateRoute>
            } />
            <Route path="orderhistory" element={
              <PrivateRoute><OrderHistory /></PrivateRoute>
            } />

            {/* Optional */}
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Routes outside layout (no Header/Footer) */}
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/userdashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;





















