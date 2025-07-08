import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAdmin } from '../../features/adminSlice';

const AddAdmin = () => {
  const [admin, setAdmin] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAdmin(admin));
    setAdmin({ firstName: '', lastName: '', email: '', password: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" placeholder="First Name" value={admin.firstName} onChange={handleChange} required />
      <input name="lastName" placeholder="Last Name" value={admin.lastName} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={admin.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={admin.password} onChange={handleChange} required />
      <button type="submit">Add Admin</button>
    </form>
  );
};

export default AddAdmin;
