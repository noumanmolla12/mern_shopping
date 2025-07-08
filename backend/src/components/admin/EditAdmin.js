import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAdmin, fetchAdmins } from '../../features/adminSlice';
import { useParams } from 'react-router-dom';

const EditAdmin = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { admins } = useSelector(state => state.admin);
  const admin = admins.find(u => u._id === id);

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });

  useEffect(() => {
    if (!admin) dispatch(fetchAdmins());
    else setForm({ ...admin, password: '' });
  }, [admin, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAdmin({ id, adminData: form }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
      <input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
      <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="New Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditAdmin;
