import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Routes } from "react-router-dom";
import {
  selectUser,
  selectLoading,
  selectError,
} from "../../features/authadminSlice";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";

const UserDashboard = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [storedUser, setStoredUser] = useState(null);

  useEffect(() => {
    const userFromSession = JSON.parse(sessionStorage.getItem("user"));
    const tokenFromSession = sessionStorage.getItem("token");

    if (user || (userFromSession && tokenFromSession)) {
      setStoredUser(user?.user || userFromSession);
    } else {
      navigate("/userlogin");
    }
  }, [user, navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {/* Header */}
      <div className="fixed-top w-100" style={{ backgroundColor: '#34495e', zIndex: 100 }}>
        <Header />
      </div>

      {/* Layout */}
      <div className="container-fluid mt-5">
        <div className="row">
          {/* Sidebar */}
          <div className="col-2" style={{ position: 'fixed', top: '60px', height: '100vh' }}>
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="col-10 offset-2" style={{ marginTop: '60px' }}>
            {storedUser && (
              <div className="row" style={{ marginLeft: '160px' }}>
                <div className="col-12">
                  <h1>User Panel</h1>
                  <h2>Welcome, {storedUser.firstName}</h2>
                  <p>Email: {storedUser.email}</p>
                  <p>User ID: {storedUser._id}</p>
                </div>
              </div>
            )}

            {/* Route Content */}
            <div className="row">
              <Routes>
                {/* Define internal routes here if needed */}
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
