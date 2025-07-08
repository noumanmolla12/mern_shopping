import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectUser,
  selectLoading,
  selectError,
  logoutAuthAdmin,
} from '../../features/authadminSlice';

const AdminMyAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [storedUser, setStoredUser] = useState(null);

  const handleLogout = () => {
    dispatch(logoutAuthAdmin()); // Logout and clear session
    navigate('/login');
  };

  useEffect(() => {
    const userFromSession = JSON.parse(sessionStorage.getItem('user'));
    const tokenFromSession = sessionStorage.getItem('token');

    if (user?.firstName || (userFromSession && tokenFromSession)) {
      setStoredUser(user?.user || userFromSession);
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div className="container mt-5">
      {storedUser ? (
        <div className="card p-4 shadow">
          <h2 className="mb-3">Welcome, {storedUser.firstName || 'Admin'}</h2>
          <p><strong>Email:</strong> {storedUser.email || 'N/A'}</p>
          <p><strong>Admin ID:</strong> {storedUser._id || 'N/A'}</p>
          <button className="btn btn-danger mt-3" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default AdminMyAccount;
