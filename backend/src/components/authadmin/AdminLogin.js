import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectError, selectLoading, selectUser } from '../../features/authadminSlice';
import { useNavigate } from 'react-router-dom';

const AdminLoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const user = useSelector(selectUser);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const userFromSession = JSON.parse(sessionStorage.getItem('user'));
    const tokenFromSession = sessionStorage.getItem('token');

    if ((userFromSession && tokenFromSession) || user) {
      navigate('/admindashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #4b6cb7, #182848)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h2 style={{ textAlign: 'center', color: '#4b6cb7', marginBottom: '25px' }}>
          Admin Login
        </h2>
        {error && (
          <p
            style={{
              color: 'red',
              textAlign: 'center',
              marginBottom: '20px',
              fontWeight: 'bold',
            }}
          >
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '16px',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '16px',
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: '#4b6cb7',
              color: '#fff',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              width: '100%',
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div
          style={{
            marginTop: '20px',
            textAlign: 'center',
            color: '#777',
            fontSize: '14px',
          }}
        >
          Forgot credentials? Contact the system administrator.
        </div>
      </div>
    </div>
  );
};

export default AdminLoginForm;
