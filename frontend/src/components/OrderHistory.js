import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersByUserId } from '../features/orderlistSlice';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orderlist);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedUser?.user?._id) {
      dispatch(fetchOrdersByUserId(storedUser.user._id));
    }
  }, [dispatch]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!orders || orders.length === 0) return <p>No orders found.</p>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, background: '#f6f7fb' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#8dc63f',
        color: 'white',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '24px' }}>ao</div>
        <div style={{ fontSize: '16px' }}>User</div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div style={{
          width: '250px',
          backgroundColor: 'white',
          padding: '30px 20px',
          boxShadow: '1px 0 5px rgba(0, 0, 0, 0.1)',
          height: '100%'
        }}><br/>
          <a href="#" style={{
            display: 'block',
            padding: '10px 15px',
            marginBottom: '10px',
            borderRadius: '5px',
            backgroundColor: '#e5f0fd',
            color: '#007bff',
            fontWeight: 'bold',
            textDecoration: 'none'
          }}>📦 View orders <span style={{ float: 'right' }}>{orders.length}</span></a>
          {['👤 Personal details', '🔒 Change password', '💳 Payment methods', '🏠 Manage addresses', '👥 Social accounts', '🚪 Log out'].map(text => (
            <a key={text} href="#" style={{
              display: 'block',
              padding: '10px 15px',
              marginBottom: '10px',
              borderRadius: '5px',
              color: '#333',
              textDecoration: 'none'
            }}>{text}</a>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '30px' }}><br/><br/><br/>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>Order History</h2>
          <p>{orders.length} orders</p>

          {orders
            .slice()
            .sort((a, b) => new Date(b.orders?.[0]?.orderDate || 0) - new Date(a.orders?.[0]?.orderDate || 0))
            .map(customer => (
              <div key={customer._id} style={{
                background: 'white',
                borderRadius: '10px',
                padding: '20px',
                marginBottom: '20px'
              }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{customer.billing_firstName} {customer.billing_lastName}</h3>
                <p style={{ fontSize: '14px', color: '#555' }}>Email: {customer.billing_email}</p>
                <p style={{ fontSize: '14px', color: '#555' }}>Phone: {customer.billing_phone}</p>

               {customer.orders.map(order => (
  <div key={order._id} style={{
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
    border: '1px solid #eee',
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: '#f9f9f9',
    width: '100%',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
  }}>
    
    {/* Top row: Order image + meta */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <img
          src={order.orderDetails?.[0]?.images?.[0] || 'https://via.placeholder.com/60'}
          alt={order.orderDetails?.[0]?.productName || 'Product'}
          style={{ width: '100px', height: '100px', borderRadius: '8px' }}
        />
        <div><br/><br/>
          <p style={{ fontWeight: 'bold' }}>Order ID: {order._id}</p>
          <p>Status: {order.status}</p>
          <p>Total Price: ₹{order.totalPrice}</p>
          <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button style={{
          padding: '8px 12px',
          backgroundColor: '#8dc63f',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}>Track order</button>
        <button style={{
          padding: '8px 12px',
          backgroundColor: 'white',
          border: '1px solid #007bff',
          color: '#007bff',
          borderRadius: '5px'
        }}>View order details</button>
        <a href="#" style={{ color: '#007bff', textDecoration: 'underline' }}>Get invoice</a>
        <a href="#" style={{ color: '#007bff', textDecoration: 'underline' }}>Edit order</a>
      </div>
    </div>

    {/* Nested product details */}
    <div style={{paddingLeft:'7rem'}}>
      {order.orderDetails.map(item => (
        <div key={item._id} style={{
          display: 'flex',
          gap: '15px',
          alignItems: 'center',
          // borderTop: '1px solid #ddd',
          paddingTop: '15px',
          marginTop: '15px'
        }}>
          {/* <img
            src={item.images?.[0] || 'https://via.placeholder.com/60'}
            alt={item.productName}
            style={{ width: '60px', height: '60px', borderRadius: '8px' }}
          /> */}
          <div>
            <p style={{ fontWeight: 'bold' }}>{item.productName}</p>
            <p style={{ fontSize: '14px' }}>{item.description}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ₹{item.price}</p>
          </div>
        </div>
      ))}
    </div>

  </div>
))}

              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;


// // src/components/OrderHistory.js
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchOrdersByUserId } from '../features/orderlistSlice';

// const OrderHistory = () => {
//   const dispatch = useDispatch();
//   const { orders, loading, error } = useSelector((state) => state.orderlist);
//   console.log("react page render");
//   console.log("Redux orders:", orders);
  
//   useEffect(() => {
//   const storedUser = JSON.parse(sessionStorage.getItem('user'));
//   console.log("storedUser", storedUser);
//   // if (storedUser?._id) {
//   //   dispatch(fetchOrdersByUserId(storedUser._id));
//   // }
//   if (storedUser?.user?._id) {
//   dispatch(fetchOrdersByUserId(storedUser.user._id));
// }

// }, [dispatch]);


//   if (loading) return <p>Loading orders...</p>;
//   if (error) return <p>Error: {error}</p>;
//   if (!orders || orders.length === 0) return <p>No orders found.</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Order History</h2>
//       {/* {orders.map((customer) => ( */}
//       {orders
//   .slice() // make a shallow copy to avoid mutating Redux state
//   .sort((a, b) => {
//     const dateA = new Date(a.orders?.[0]?.orderDate || 0);
//     const dateB = new Date(b.orders?.[0]?.orderDate || 0);
//     return dateB - dateA; // latest first
//   })
//   .map((customer) => (

//         <div key={customer._id} className="mb-8 border rounded-lg p-4 shadow bg-white">
//           <h3 className="text-xl font-semibold">
//             {customer.billing_firstName} {customer.billing_lastName}
//           </h3>
//           <p className="text-sm text-gray-600">Email: {customer.billing_email}</p>
//           <p className="text-sm text-gray-600 mb-3">Phone: {customer.billing_phone}</p>

//           {customer.orders.length === 0 ? (
//             <p>No orders placed by this customer.</p>
//           ) : (
//             customer.orders.map((order) => (
//               <div key={order._id} className="mt-4 border-t pt-3">
//                 <p className="font-medium">Order ID: {order._id}</p>
//                 <p>Status: {order.status}</p>
//                 <p>Total Price: ₹{order.totalPrice}</p>
//                 <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>

//                 <div className="ml-4 mt-2">
//                   <h4 className="font-semibold mb-2">Order Items:</h4>
//                   {order.orderDetails.map((item) => (
//                     <div
//                       key={item._id}
//                       className="flex space-x-4 items-start border p-2 rounded bg-gray-50 mb-2"
//                     >
//                       <img
//                         src={item.images[0]}
//                         alt={item.productName}
//                         className="w-20 h-20 object-cover border rounded"
//                       />
//                       <div>
//                         <p className="font-semibold">{item.productName}</p>
//                         <p className="text-sm">{item.description}</p>
//                         <p>Quantity: {item.quantity}</p>
//                         <p>Price: ₹{item.price}</p>
//                       </div>
//                       {/* <pre>{JSON.stringify(orders, null, 2)}</pre> */}

//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OrderHistory;
