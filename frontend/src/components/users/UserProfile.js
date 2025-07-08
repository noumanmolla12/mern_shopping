import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, deleteUserProfile } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';

const styles = {
  page: {
    padding: '60px 10%',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: 'linear-gradient(90deg, #f9f9f9 0%, #fff 100%)',
    color: '#333',
    minHeight: '100vh',
  },
  title: {
    fontSize: '36px',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: '20px',
    fontWeight: '400',
    marginBottom: '40px',
    color: '#7f8c8d',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginBottom: '50px',
  },
  infoItem: {
    fontSize: '16px',
    lineHeight: '1.6',
    background: '#f1f1f1',
    padding: '15px 20px',
    borderRadius: '8px',
  },
  buttons: {
    display: 'flex',
    gap: '20px',
  },
  editBtn: {
    padding: '12px 24px',
    backgroundColor: '#3498db',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  deleteBtn: {
    padding: '12px 24px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  message: {
    textAlign: 'center',
    fontSize: '18px',
    marginTop: '80px',
  },
};

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userProfile, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    const stored = sessionStorage.getItem('user');
    const parsed = stored ? JSON.parse(stored) : null;
    const userId = parsed?.user?._id;
    if (userId) {
      dispatch(fetchUserProfile(userId));
    }
  }, [dispatch]);

  const handleEdit = () => {
    navigate('/edituserprofile');
  };

  const handleDelete = () => {
    const stored = JSON.parse(sessionStorage.getItem('user'));
    const userId = stored?.user?._id;
    if (userId && window.confirm('Are you sure you want to delete your profile?')) {
      dispatch(deleteUserProfile(userId)).then(() => {
        sessionStorage.removeItem('user');
        navigate('/');
      });
    }
  };

  if (loading) return <p style={styles.message}>Loading...</p>;
  if (error) return <p style={{ ...styles.message, color: 'red' }}>{error}</p>;
  if (!userProfile?.data) return <p style={styles.message}>No user data found.</p>;

  const {
    firstName,
    lastName,
    email,
    gender,
    companyName,
    address,
    phoneNumber,
    dateOfBirth,
    preferredLanguage,
    createdAt,
    updatedAt,
  } = userProfile.data;

  return (
    <div style={styles.page}><br /><br /><br /><br />
      <h1 style={styles.title}>Welcome, {firstName}!</h1>
      <h3 style={styles.subtitle}>Your Account Details</h3>

      <div style={styles.infoGrid}>
        <div style={styles.infoItem}><strong>Full Name:</strong> {firstName} {lastName}</div>
        <div style={styles.infoItem}><strong>Email:</strong> {email}</div>
        <div style={styles.infoItem}><strong>Gender:</strong> {gender || 'Not specified'}</div>
        <div style={styles.infoItem}><strong>Company:</strong> {companyName || 'N/A'}</div>
        <div style={styles.infoItem}><strong>Address:</strong> {address || 'N/A'}</div>
        <div style={styles.infoItem}><strong>Phone Number:</strong> {phoneNumber || 'N/A'}</div>
        <div style={styles.infoItem}><strong>Date of Birth:</strong> {dateOfBirth ? new Date(dateOfBirth).toLocaleDateString() : 'Not provided'}</div>
        <div style={styles.infoItem}><strong>Preferred Language:</strong> {preferredLanguage || 'N/A'}</div>
        <div style={styles.infoItem}><strong>Joined On:</strong> {new Date(createdAt).toLocaleString()}</div>
        <div style={styles.infoItem}><strong>Last Updated:</strong> {new Date(updatedAt).toLocaleString()}</div>
      </div>

      <div style={styles.buttons}>
        <button onClick={handleEdit} style={styles.editBtn}>Edit Profile</button>
        <button onClick={handleDelete} style={styles.deleteBtn}>Delete Profile</button>
      </div>
    </div>
  );
};

export default UserProfile;
