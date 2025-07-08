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


  const styles = {
  page: {
    background: 'linear-gradient(135deg, #a8edea, #fed6e3)',
    minHeight: '100vh',
    padding: '20rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
    padding: '1rem',
    width: '100%',
    maxWidth: '1000px',
    overflow: 'hidden',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  editBtn: {
    marginRight: '10px',
    color: '#3498db',
    fontSize: '1.1rem',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    color: '#e74c3c',
    fontSize: '1.1rem',
    cursor: 'pointer',
  },
};


  return (
    <><br/><br/><br/>
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>User List</h2>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>DOB</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Company</th>
                  <th>Language</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, index) => (
                  <tr key={u._id}>
                    <td>{index + 1}</td>
                    <td>{u.firstName} {u.lastName}</td>
                    <td>{u.email}</td>
                    <td>{u.gender}</td>
                    <td>{u.dateOfBirth?.substring(0, 10)}</td>
                    <td>{u.phoneNumber}</td>
                    <td>{u.address}</td>
                    <td>{u.companyName}</td>
                    <td>{u.preferredLanguage}</td>
                    <td>
                      <Link to={`/edit-user/${u._id}`} style={styles.editBtn}>✏️</Link>
                      <button onClick={() => handleDelete(u._id)} style={styles.deleteBtn}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div></>
    
  );
};



export default ViewUser;
