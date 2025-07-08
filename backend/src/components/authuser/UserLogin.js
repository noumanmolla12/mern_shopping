import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectError, selectLoading } from '../../features/authuserSlice';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginUser(formData)).unwrap();

      // Optional: store user/token if not already handled in loginUser thunk
      sessionStorage.setItem('user', JSON.stringify(resultAction));
      sessionStorage.setItem('token', 'dummy-token'); // Replace with actual token if available

      navigate('/userdashboard'); // Redirect immediately after successful login
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="container">
      <section className="section">
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
              <div className="card card-primary" style={{ backgroundColor: '#73c6b6' }}>
                <div className="card-header">
                  <h4>User Login</h4>
                </div>
                <div className="card-body">
                  {error && <p className="text-danger">{error}</p>}
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mt-3">
                      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="mt-5 text-muted text-center">
                Don't have an account? <a href="/adduser">Create One</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserLogin;
