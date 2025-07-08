import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectError, selectLoading } from '../../features/authuserSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
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
      sessionStorage.setItem('user', JSON.stringify(resultAction));
      sessionStorage.setItem('token', 'dummy-token');
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };


  const styles = {
  body: {
    margin: 0,
    background: 'linear-gradient(135deg, #a8e063, #56ab2f)',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    width: '350px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '1rem',
    borderRadius: '6px',
    border: 'none',
    background: '#e6e6e6',
    fontSize: '0.95rem',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  checkbox: {
    marginRight: '8px',
    accentColor: '#8bc34a',
  },
  checkboxLabel: {
    fontSize: '0.9rem',
    color: '#333',
  },
  button: {
    width: '100%',
    background: '#a8e063',
    border: 'none',
    color: 'white',
    fontSize: '1rem',
    padding: '12px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  forgotPassword: {
    textAlign: 'center',
    marginTop: '1rem',
    fontSize: '0.85rem',
    color: '#444',
    textDecoration: 'none',
  },
  error: {
    color: 'red',
    fontSize: '0.9rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  signupText: {
    marginTop: '1rem',
    fontSize: '0.85rem',
    textAlign: 'center',
    color: '#444',
  },
  link: {
    color: '#333',
    textDecoration: 'underline',
  },
};

  return (
    <div style={styles.body}>
      <div style={styles.loginContainer}>
        <h2 style={styles.title}>SIGN IN TO YOUR ACCOUNT</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="uniqueemail@address.com"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="***************"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <div style={styles.checkboxContainer}>
            <input type="checkbox" id="keepLoggedIn" style={styles.checkbox} />
            <label htmlFor="keepLoggedIn" style={styles.checkboxLabel}>
              Keep me logged in
            </label>
          </div>
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Logging in...' : 'SIGN IN'}
          </button>
        </form>
        <a href="#" style={styles.forgotPassword}>Forgot password ?</a>
        <div style={styles.signupText}>
          Don’t have an account? <a href="/adduser" style={styles.link}>Create One</a>
        </div>
      </div>
    </div>
  );
};



export default Login;
