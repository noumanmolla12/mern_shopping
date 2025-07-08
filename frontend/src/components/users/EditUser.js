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
    preferredLanguage: ''
  });

  useEffect(() => {
    if (!user) {
      dispatch(fetchUsers());
    } else {
      setForm({ ...user, password: '' });
    }
  }, [user, dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id, userData: form }));
    navigate('/viewuser');
  };

  if (!user) return <p style={{ textAlign: 'center' }}>Loading user data...</p>;



  const styles = {
  page: {
    background: 'linear-gradient(135deg, #a8edea, #fed6e3)',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '7rem',
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
        <h2 style={styles.title}>Edit User</h2>

        <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required style={styles.input} />
        <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required style={styles.input} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required style={styles.input} />
        <input name="password" type="password" placeholder="New Password (leave blank to keep same)" value={form.password} onChange={handleChange} style={styles.input} />

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

        <button type="submit" style={styles.button}>Update User</button>
      </form>
    </div>
  );
};



export default EditUser;







// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateUser, fetchUsers } from '../../features/userSlice';
// import { useParams, useNavigate } from 'react-router-dom';

// const EditUser = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { users } = useSelector((state) => state.user);
//   const user = users.find((u) => u._id === id);

//   const [form, setForm] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     gender: '',
//     dateOfBirth: '',
//     phoneNumber: '',
//     address: '',
//     companyName: '',
//     preferredLanguage: ''
//   });

//   useEffect(() => {
//     if (!user) {
//       dispatch(fetchUsers());
//     } else {
//       setForm({ ...user, password: '' }); // Don't prefill password
//     }
//   }, [user, dispatch]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateUser({ id, userData: form }));
//     navigate('/viewuser');
//   };

//   if (!user) return <p>Loading user data...</p>;

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg mt-6">
//       <h2 className="text-2xl font-bold mb-4">Edit User</h2><br/><br/><br/><br/><br/><br/>
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
//         <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
//         <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
//         <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
//         <input name="password" type="password" placeholder="New Password (leave blank to keep same)" value={form.password} onChange={handleChange} />

//         <select name="gender" value={form.gender} onChange={handleChange} required>
//           <option value="">Select Gender</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>

//         <input type="date" name="dateOfBirth" value={form.dateOfBirth || ''} onChange={handleChange} />
//         <input name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber || ''} onChange={handleChange} />
//         <input name="address" placeholder="Address" value={form.address || ''} onChange={handleChange} />
//         <input name="companyName" placeholder="Company Name" value={form.companyName || ''} onChange={handleChange} />

//         <select name="preferredLanguage" value={form.preferredLanguage} onChange={handleChange} required>
//           <option value="">Select Language</option>
//           <option value="english">English</option>
//           <option value="hindi">Hindi</option>
//           <option value="french">French</option>
//           <option value="german">German</option>
//         </select>

//         <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
//           Update User
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditUser;










