import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  selectUser,
  selectLoading,
  selectError,
} from "../../features/authadminSlice";

import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import Footer from "../common/Footer";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
      navigate("/");
    }
  }, [user, navigate]);

  if (loading) return <p>Loading...</p>;

  const isDashboardHome = location.pathname === "/admindashboard";

  return (
    <div style={{ backgroundColor: "#ecf0f1", minHeight: "100vh" }}>
      <Header />

      <div className="container-fluid mt-5">
        <div className="row">
          {/* Sidebar */}
          <div
            className="col-2"
            style={{
              position: "fixed",
              top: "60px",
              height: "100vh",
              padding: 0,
              backgroundColor: "#34495e",
              color: "#fff",
            }}
          >
            <Sidebar />
          </div>

          {/* Main Content */}
          <div
            className="col-10 offset-2"
            style={{
              marginTop: "60px",
              paddingBottom: "80px",
              minHeight: "100vh",
              backgroundColor: "#ecf0f1",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: "40px",
            }}
          >
            <div style={{ width: "100%", maxWidth: "900px" }}>
              {/* Welcome Message */}
              {storedUser && isDashboardHome && (
                <>
                  <div
                    style={{
                      backgroundColor: "#fff",
                      padding: "30px",
                      borderRadius: "10px",
                      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                      textAlign: "center",
                    }}
                  >
                    <h1>Admin Panel</h1>
                    <h2>Welcome, {storedUser.firstName}</h2>
                    <p>Email: {storedUser.email}</p>
                    <p>Admin ID: {storedUser._id}</p>
                  </div>

                  {/* Message NOT in card */}
                  <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <strong>Please select an option from sidebar.</strong>
                  </div>
                </>
              )}

              {/* Nested Page Content in Card ONLY when NOT index */}
              {!isDashboardHome && (
                <div
                  style={{
                    backgroundColor: "#fff",
                    padding: "30px",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.05)",
                    marginTop: "30px",
                  }}
                >
                  <Outlet />
                </div>
              )}
            </div>
          </div>
        </div>
      </div><br/><br/><br/>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
