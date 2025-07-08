import React, { useEffect, useState } from 'react'; // Import useState
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser, logoutUser } from  '../../slices/userSlice';
 
const bar = ({ toggleSidebar, sidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate hook for navigation
  const user = useSelector(selectUser);
  console.log('Header User',user);
  const [storedUser, setStoredUser] = useState(null); // Define storedUser using useState

  const handleLogout = () => {
    dispatch(logoutUser()); // Dispatch the logout action
    // Navigate to login page
    sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
    navigate('/login');
   // console.log('logout',user)
  };

  useEffect(() => {
    // console.log('USERR', user);

    // Check if the user is not logged in
    const userFromSession = JSON.parse(sessionStorage.getItem('user'));
    const tokenFromSession = sessionStorage.getItem('token');
 

    // console.log('UUUUU',userFromSession)
  
    if (user || userFromSession || tokenFromSession) {
      if(user.user!=''){
          setStoredUser(user.user); // Set storedUser state
      }
      else{
        setStoredUser(userFromSession); // Set storedUser state
      }
       
    } else {
      //navigate('/login'); // Navigate to login page
    }
  }, [user, navigate]);




  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light top-menu container-fluid">
      <div className="container-fluid">
        <a className="navbar-brand logo" href="#">
          <img src="https://www.acesoftech.com/wp-content/themes/acesoftech/assets/img/logo-mini/home-new-logo.png" alt="Logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <button
          className="btn btn-primary d-lg-none w-100" // added w-100 class for full width
          onClick={toggleSidebar}
        >
          {sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Link
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
          <div className="dropdown">
           Welcome: {storedUser?.firstName} &nbsp;
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              My Account
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a className="dropdown-item" href="#">My Account</a></li>
              <li> <button onClick={handleLogout}>Logout</button></li>
             
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default bar;
