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



  const styles = {
  page: {
    background: 'linear-gradient(135deg, #a8edea, #fed6e3)',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  form: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '1rem',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    outline: 'none',
  },
  select: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    outline: 'none',
    backgroundColor: '#fff',
  },
  button: {
    padding: '12px',
    background: '#56ab2f',
    color: '#fff',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
};

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Add New User</h2>
        
        <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required style={styles.input} />
        <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required style={styles.input} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required style={styles.input} />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required style={styles.input} />
        
        <select name="gender" value={form.gender} onChange={handleChange} required style={styles.select}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} style={styles.input} />
        <input name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} style={styles.input} />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} style={styles.input} />
        <input name="companyName" placeholder="Company Name" value={form.companyName} onChange={handleChange} style={styles.input} />

        <select name="preferredLanguage" value={form.preferredLanguage} onChange={handleChange} required style={styles.select}>
          <option value="">Select Language</option>
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
          <option value="french">French</option>
          <option value="german">German</option>
        </select>

        <button type="submit" style={styles.button}>Add User</button>
      </form>
    </div>
  );
};



export default AddUser;
