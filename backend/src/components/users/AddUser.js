import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, fetchUsers } from '../../features/userSlice';

const AddUser = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    dateOfBirth: '',
    phoneNumber: '',
    address: '',
    companyName: '',
    preferredLanguage: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(form)).then(() => dispatch(fetchUsers()));
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      gender: '',
      dateOfBirth: '',
      phoneNumber: '',
      address: '',
      companyName: '',
      preferredLanguage: ''
    });
  };


  // Styles
const styles = {
  pageContainer: {
    padding: '2rem',
    backgroundColor: '#f4f6f8',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    maxWidth: '800px',
    width: '100%',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  },
  title: {
    textAlign: 'center',
    color: 'rgb(40, 167, 69)',
    marginBottom: '1.5rem',
    fontSize: '26px',
    fontWeight: '600',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '16px',
    marginBottom: '1.5rem',
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
    backgroundColor: '#fff',
    width: '100%',
  },
  select: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
    backgroundColor: '#fff',
    width: '100%',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: 'rgb(40, 167, 69)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};


  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <h2 style={styles.title}>👤 Add New User</h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.grid}>
            <input
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              style={styles.input}
              type="email"
            />
            <input
              name="password"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <input
              name="dateOfBirth"
              type="date"
              value={form.dateOfBirth}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="phoneNumber"
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="companyName"
              placeholder="Company Name"
              value={form.companyName}
              onChange={handleChange}
              style={styles.input}
            />

            <select
              name="preferredLanguage"
              value={form.preferredLanguage}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="">Select Language</option>
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="french">French</option>
              <option value="german">German</option>
            </select>
          </div>

          <button type="submit" style={styles.button}>
            ✅ Add User
          </button>
        </form>
      </div>
    </div>
  );
};



export default AddUser;
