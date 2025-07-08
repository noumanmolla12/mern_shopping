import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdmins, deleteAdmin } from '../../features/adminSlice';
import { Link } from 'react-router-dom';

const ViewAdmin = () => {
  const dispatch = useDispatch();
  const { admins } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch]);

  return (
    <div>
      <h2>Admin List</h2>
      <ul>
        {admins.map((a) => (
          <li key={a._id}>
            {a.firstName} {a.lastName} ({a.email}) 
            <Link to={`/editadmin/${a._id}`}>✏️</Link>
            <button onClick={() => dispatch(deleteAdmin(a._id))}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewAdmin;
