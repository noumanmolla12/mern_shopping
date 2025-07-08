import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { emptyCart } from '../features/cartSlice';

const ThankYou = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const orderId = sessionStorage.getItem('orderId');
    document.getElementById('orderId').innerText = orderId;
    sessionStorage.removeItem('orderId');
    dispatch(emptyCart());

    const timeoutId = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, [navigate, dispatch]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', color: '#4CAF50', marginBottom: '1rem' }}>
          🎉 Thank You for Shopping!
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#555' }}>
          Your order has been placed successfully.
        </p>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginTop: '1.5rem' }}>
          Order ID: <span id="orderId" style={{ color: '#FF5722' }}></span>
        </p>
        <p style={{ marginTop: '2rem', fontSize: '1rem', color: '#888' }}>
          You will be redirected to the homepage in 10 seconds...
        </p>
      </div>
    </div>
  );
};

export default ThankYou;










// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { emptyCart } from '../features/cartSlice';

// const ThankYou = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Retrieve order ID from session storage
//     const orderId = sessionStorage.getItem('orderId');
//     // Display the order ID on the page
//     document.getElementById('orderId').innerText = orderId;

//     // Clear session storage to avoid conflicts with future orders
//     sessionStorage.removeItem('orderId');

//     // Clear the cart
//     dispatch(emptyCart());

//     // Redirect to home page after 10 seconds
//     const timeoutId = setTimeout(() => {
//       navigate('/');
//     }, 10000);

//     // Clean up the timeout to avoid memory leaks
//     return () => clearTimeout(timeoutId);
//   }, [navigate, dispatch]);

//   return (
//     <>
//       <section className="checkout-area ptb-100">
//         <div className="container"><br/><br/><br/><br/><br/><br/>
//           <h1>Thank You. Your Order Id is: <span id="orderId"></span></h1>
//         </div>
//       </section>
//     </>
//   );
// }

// export default ThankYou;
