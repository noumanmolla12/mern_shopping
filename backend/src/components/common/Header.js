import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser, logoutAuthAdmin } from '../../features/authadminSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [storedUser, setStoredUser] = useState(null);

  const handleLogout = () => {
    dispatch(logoutAuthAdmin());
    sessionStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    const userFromSession = JSON.parse(sessionStorage.getItem('user'));
    const tokenFromSession = sessionStorage.getItem('token');

    if (user || userFromSession || tokenFromSession) {
      setStoredUser(user || userFromSession);
    } else {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <header className="text-white p-3 shadow-sm" style={{
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backgroundColor:"rgb(52, 73, 94)",
    width: "100vw",          // full width
    marginLeft: "calc(-50vw + 50%)", // fixes margin from container
  }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Eo_circle_light-blue_letter-n.svg"
            alt="Logo"
            width="40"
            className="me-3"
          />
          <h3 className="m-0">Admin Dashboard</h3>
        </div>

        {storedUser && (
          <div className="d-flex align-items-center">
            <div className="me-4 text-end">
              <h6 className="m-0">Welcome, {storedUser.firstName}</h6>
              <small>{storedUser.email}</small>
            </div>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;




















// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { selectUser, logoutUser } from '../../features/userSlice';

// const Header = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector(selectUser);
//   const [storedUser, setStoredUser] = useState(null);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     sessionStorage.removeItem('user');
//     sessionStorage.removeItem('token');
//     navigate('/');
//   };

//   useEffect(() => {
//     const userFromSession = JSON.parse(sessionStorage.getItem('user'));
//     const tokenFromSession = sessionStorage.getItem('token');
//     if (user || userFromSession || tokenFromSession) {
//       setStoredUser(user || userFromSession);
//     } else {
//       navigate('/');
//     }
//   }, [user, navigate]);

//   return (
//     <header style={{
//       backgroundColor: '#2c3e50',
//       padding: '15px 30px',
//       color: 'white',
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center'
//     }}>
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         <img
//           src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Eo_circle_light-blue_letter-n.svg"
//           alt="Logo"
//           style={{ height: '40px', marginRight: '15px' }}
//         />
//         <h2 style={{ margin: 0 }}>Admin Dashboard</h2>
//       </div>
//       {storedUser && (
//         <div style={{ textAlign: 'right' }}>
//           <p style={{ margin: 0 }}>Welcome, {storedUser.firstName}</p>
//           <p style={{ margin: 0, fontSize: '14px' }}>{storedUser.email}</p>
//           <button
//             onClick={handleLogout}
//             style={{
//               marginTop: '8px',
//               padding: '6px 12px',
//               backgroundColor: '#e74c3c',
//               border: 'none',
//               color: 'white',
//               borderRadius: '4px',
//               cursor: 'pointer'
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;
