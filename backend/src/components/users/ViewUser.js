import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../../features/userSlice';
import { Link } from 'react-router-dom';

const ViewUser = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };


  // Styles
const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f4f6f8',
    minHeight: '100vh',
  },
  title: {
    fontSize: '26px',
    color: 'rgb(40, 167, 69)',
    marginBottom: '20px',
    fontWeight: '600',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  tableHeaderRow: {
    backgroundColor: 'rgb(40, 167, 69)',
    color: '#fff',
  },
  th: {
    padding: '12px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '15px',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #e0e0e0',
    fontSize: '14px',
    color: '#333',
  },
  tableRowEven: {
    backgroundColor: '#fafafa',
  },
  tableRowOdd: {
    backgroundColor: '#fff',
  },
  editBtn: {
    marginRight: '10px',
    textDecoration: 'none',
    color: '#1976d2',
    fontSize: '18px',
  },
  deleteBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    color: '#d32f2f',
  },
  info: {
    textAlign: 'center',
    color: '#555',
    fontSize: '16px',
  },
  error: {
    color: '#d32f2f',
    backgroundColor: '#fddede',
    padding: '12px',
    textAlign: 'center',
    borderRadius: '6px',
    fontWeight: '500',
  },}

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👥 User List</h2>

      {loading && <p style={styles.info}>Loading...</p>}
      {error && <p style={styles.error}>❌ {error}</p>}

      {users.length === 0 ? (
        <p style={styles.info}>No users found.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Gender</th>
                <th style={styles.th}>DOB</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Company</th>
                <th style={styles.th}>Language</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={u._id} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{u.firstName} {u.lastName}</td>
                  <td style={styles.td}>{u.email}</td>
                  <td style={styles.td}>{u.gender}</td>
                  <td style={styles.td}>{u.dateOfBirth?.substring(0, 10)}</td>
                  <td style={styles.td}>{u.phoneNumber}</td>
                  <td style={styles.td}>{u.companyName}</td>
                  <td style={styles.td}>{u.preferredLanguage}</td>
                  <td style={styles.td}>
                    <Link to={`/admindashboard/edituser/${u._id}`} style={styles.editBtn}>✏️</Link>
                    <button onClick={() => handleDelete(u._id)} style={styles.deleteBtn}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};



export default ViewUser;
