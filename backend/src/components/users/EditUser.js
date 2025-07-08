import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, fetchUsers } from '../../features/userSlice';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.user);
  const user = users.find((u) => u._id === id);

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
    preferredLanguage: '',
  });

  useEffect(() => {
    if (!user) {
      dispatch(fetchUsers());
    } else {
      setForm({ ...user, password: '' }); // Do not prefill password
    }
  }, [user, dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id, userData: form }));
    navigate('/admindashboard/viewuser');
  };

  if (!user) return <p style={styles.loading}>Loading user data...</p>;

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <h2 style={styles.title}>✏️ Edit User</h2>

        <form onSubmit={handleSubmit} style={styles.grid}>
          <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required style={styles.input} />
          <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required style={styles.input} />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required style={styles.input} />
          <input name="password" type="password" placeholder="New Password (leave blank to keep current)" value={form.password} onChange={handleChange} style={styles.input} />

          <select name="gender" value={form.gender} onChange={handleChange} required style={styles.select}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input type="date" name="dateOfBirth" value={form.dateOfBirth || ''} onChange={handleChange} style={styles.input} />
          <input name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber || ''} onChange={handleChange} style={styles.input} />
          <input name="address" placeholder="Address" value={form.address || ''} onChange={handleChange} style={styles.input} />
          <input name="companyName" placeholder="Company Name" value={form.companyName || ''} onChange={handleChange} style={styles.input} />

          <select name="preferredLanguage" value={form.preferredLanguage} onChange={handleChange} required style={styles.select}>
            <option value="">Select Language</option>
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="french">French</option>
            <option value="german">German</option>
          </select>

          <button type="submit" style={styles.button}>✅ Update User</button>
        </form>
      </div>
    </div>
  );
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
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  title: {
    fontSize: '26px',
    color: '#0d47a1',
    marginBottom: '1.5rem',
    fontWeight: '600',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '16px',
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
    gridColumn: '1 / -1',
    padding: '12px',
    backgroundColor: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  loading: {
    textAlign: 'center',
    marginTop: '2rem',
    fontSize: '18px',
    color: '#333',
  },
};

export default EditUser;
