import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserProfile } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';

const EditUserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: userData, loading } = useSelector((state) => state.user.userProfile);
  const [form, setForm] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem('user'));
    const userId = stored?.user?._id;
    if (userId) {
      dispatch(fetchUserProfile(userId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (userData && !loading) {
      setForm({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        password: '',
        gender: userData.gender || '',
        dateOfBirth: userData.dateOfBirth?.substring(0, 10) || '',
        phoneNumber: userData.phoneNumber || '',
        address: userData.address || '',
        companyName: userData.companyName || '',
        preferredLanguage: userData.preferredLanguage || ''
      });
    }
  }, [userData, loading]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stored = JSON.parse(sessionStorage.getItem('user'));
    const userId = stored?.user?._id;

    const updatedData = { ...form };
    if (!updatedData.password) {
      delete updatedData.password;
    }

    dispatch(updateUserProfile({ userId, updatedData })).then(() => {
      navigate('/userprofile');
    });
  };

  if (loading || !form) return <p style={styles.centerText}>Loading profile...</p>;

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Edit Profile</h2>

        <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required style={styles.input} />
        <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required style={styles.input} />
        <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required style={styles.input} />
        <input name="password" placeholder="New Password (optional)" type="password" value={form.password} onChange={handleChange} style={styles.input} />

        <select name="gender" value={form.gender} onChange={handleChange} required style={styles.select}>
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} style={styles.input} />
        <input name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} style={styles.input} />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} style={styles.input} />
        <input name="companyName" placeholder="Company Name" value={form.companyName} onChange={handleChange} style={styles.input} />

        <select name="preferredLanguage" value={form.preferredLanguage} onChange={handleChange} style={styles.select}>
          <option value="" disabled>Select Language</option>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="ar">Arabic</option>
          <option value="german">German</option>
        </select>

        <button type="submit" style={styles.button}>Update Profile</button>
      </form>
    </div>
  );
};

const styles = {
  page: {
    background: 'linear-gradient(135deg, #a8edea, #fed6e3)',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '10rem',
  },
  form: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
    width: '100%',
    maxWidth: '600px',
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
    fontWeight: 'bold',
  },
  centerText: {
    textAlign: 'center',
    marginTop: '2rem',
    fontSize: '1.1rem',
  },
};

export default EditUserProfile;
