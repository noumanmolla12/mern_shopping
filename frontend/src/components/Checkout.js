import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateItemQuantity, removeItem } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom'; 
import { submitFormData } from '../features/customerSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [showShipping, setShowShipping] = useState(false);
  const navigate = useNavigate();
  const [orderInfo, setOrderInfo] = useState();

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleQuantityChange = (e, itemId) => {
    const newQuantity = parseInt(e.target.value);
    dispatch(updateItemQuantity({ id: itemId, quantity: newQuantity }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleToggleShipping = () => {
    setShowShipping(!showShipping);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formElement = document.getElementById('checkout_form');
    const customerData = new FormData(formElement);
    const cartData = new FormData();

    const cart = cartItems;
    cartData.append('cartDetails', JSON.stringify(cart));

    const finalData = new FormData();

    Object.entries(Object.fromEntries(customerData)).forEach(([key, value]) => {
      finalData.append(key, value);
    });

    Object.entries(Object.fromEntries(cartData)).forEach(([key, value]) => {
      finalData.append(key, value);
    });



    


    // ✅ [CHANGED BLOCK START]
    const user = JSON.parse(sessionStorage.getItem('user')); // ✅
    const userId = user?.user?._id;                                 // ✅
    if (!userId) {                                            // ✅
      alert('User not logged in');                            // ✅
      return;                                                 // ✅
    }                                                         // ✅
    finalData.append('userId', userId);                       // ✅
    // ✅ [CHANGED BLOCK END]

    try {
      const result = await dispatch(submitFormData(finalData));

      if (result && result.payload && result.payload.order && result.payload.order._id) {
        const orderId = result.payload.order._id;

        sessionStorage.setItem('orderId', orderId);
        sessionStorage.setItem('successMessage', 'Order placed successfully');

        setTimeout(() => {
          navigate('/thank-you');
        }, 3000);
      } else {
        console.error('Error placing order: Invalid payload structure');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <>
    <section class="checkout-area ptb-100">
            <div class="container"><br/><br/><br/><br/><br/><br/><br/>
                <div class="row">
                    <div class="col-lg-12 col-md-12">
                        <div class="user-actions">
                            <i class="las la-external-link-alt"></i>
                           <span>
  Returning customer?{' '}
  <a href="login.html" style={{ textDecoration: 'none', color: 'inherit', color: 'red' }}>
    Click here to login
  </a>
</span>

                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit} id='checkout_form'>
                    <div class="row">
                        <div class="col-lg-6 col-md-12">
                        <div class="billing-details" id="billing-details">
    <h3 class="title">Billing Details</h3>
    <div class="row">
        <div class="col-lg-12 col-md-12">
            <div class="form-group">
                <label for="billing_country">Country 
                    <span class="required">*</span>
                </label>
                <div class="select-box">
                    <select name="billing_country" id="billing_country" class="form-control">
                        <option value="5">United Arab Emirates</option>
                        <option value="1">China</option>
                        <option value="2">United Kingdom</option>
                        <option value="0">Germany</option>
                        <option value="3">France</option>
                        <option value="4">Japan</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="col-lg-6 col-md-6">
            <div class="form-group">
                <label for="billing_firstName">First Name 
                    <span class="required">*</span>
                </label>
                <input type="text" id="billing_firstName" name="billing_firstName" class="form-control" />
            </div>
        </div>
        <div class="col-lg-6 col-md-6">
            <div class="form-group">
                <label for="billing_lastName">Last Name 
                    <span class="required">*</span>
                </label>
                <input type="text" id="billing_lastName" name="billing_lastName" class="form-control" />
            </div>
        </div>
        <div class="col-lg-12 col-md-12">
            <div class="form-group">
                <label for="billing_companyName">Company Name</label>
                <input type="text" id="billing_companyName" name="billing_companyName" class="form-control" />
            </div>
        </div>
        <div class="col-lg-12 col-md-6">
            <div class="form-group">
                <label for="billing_address">Address 
                    <span class="required">*</span>
                </label>
                <input type="text" id="billing_address" name="billing_address" class="form-control" />
            </div>
        </div>
        <div class="col-lg-12 col-md-6">
            <div class="form-group">
                <label for="billing_city">Town / City 
                    <span class="required">*</span>
                </label>
                <input type="text" id="billing_city" name="billing_city" class="form-control" />
            </div>
        </div>
        <div class="col-lg-6 col-md-6">
            <div class="form-group">
                <label for="billing_state">State / County 
                    <span class="required">*</span>
                </label>
                <input type="text" id="billing_state" name="billing_state" class="form-control" />
            </div>
        </div>
        <div class="col-lg-6 col-md-6">
            <div class="form-group">
                <label for="billing_postcode">Postcode / Zip 
                    <span class="required">*</span>
                </label>
                <input type="text" id="billing_postcode" name="billing_postcode" class="form-control" />
            </div>
        </div>
        <div class="col-lg-6 col-md-6">
            <div class="form-group">
                <label for="billing_email">Email Address 
                    <span class="required">*</span>
                </label>
                <input type="email" id="billing_email" name="billing_email" class="form-control" />
            </div>
        </div>
        <div class="col-lg-6 col-md-6">
            <div class="form-group">
                <label for="billing_phone">Phone 
                    <span class="required">*</span>
                </label>
                <input type="text" id="billing_phone" name="billing_phone" class="form-control" />
            </div>
        </div>
        <div class="col-lg-12 col-md-12">
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="create_an_account" />
                <label class="form-check-label" for="create_an_account">Create an account?</label>
            </div>
        </div>
        <div class="col-lg-12 col-md-12">
            <div class="form-check">
            <input type="checkbox" className="form-check-input" id="ship_different_address" onChange={handleToggleShipping} />
                <label class="form-check-label" for="ship_different_address">Ship to a different address?</label>
            </div>
        </div>
        <div class="col-lg-12 col-md-12">
            <div class="form-group">
                <textarea name="billing_notes" id="billing_notes" cols="30" rows="5" placeholder="Order Notes" class="form-control"></textarea>
            </div>
        </div>
    </div>
</div>

<br/><br/><br/>
<div class="billing-details" id="shipping-address" style={{ display: showShipping ? 'block' : 'none' }}>
    <h3 class="title">Shipping Details</h3>
    <div class="row">
        <div class="col-lg-12 col-md-12">
            <div class="form-group">
                <label for="shipping_country">Country 
                    <span class="required">*</span>
                </label>
                <div class="select-box">
                    <select name="shipping_country" id="shipping_country" class="form-control">
                        <option value="5">United Arab Emirates</option>
                        <option value="1">China</option>
                        <option value="2">United Kingdom</option>
                        <option value="0">Germany</option>
                        <option value="3">France</option>
                        <option value="4">Japan</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="col-lg-6 col-md-6">
            <div class="form-group">
                <label for="shipping_firstName">First Name 
                    <span class="required">*</span>
                </label>
                <input type="text" id="shipping_firstName" name="shipping_firstName" class="form-control" />
            </div>
        </div>
        <div class="col-lg-6 col-md-6">
            <div class="form-group">
                <label for="shipping_lastName">Last Name 
                    <span class="required">*</span>
                </label>
                <input type="text" id="shipping_lastName" name="shipping_lastName" class="form-control" />
            </div>
        </div>
        <div class="col-lg-12 col-md-12">
            <div class="form-group">
                <label for="shipping_companyName">Company Name</label>
                <input type="text" id="shipping_companyName" name="shipping_companyName" class="form-control" />
            </div>
        </div>
        <div class="col-lg-12 col-md-6">
            <div class="form-group">
                <label for="shipping_address">Address 
                    <span class="required">*</span>
                </label>
                <input type="text" id="shipping_address" name="shipping_address" class="form-control" />
            </div>
        </div>
        <div class="col-lg-12 col-md-6">
            <div class="form-group">
                <label for="shipping_city">Town / City 
                    <span class="required">*</span>
                </label>
                <input type="text" id="shipping_city" name="shipping_city" class="form-control" />
            </div>
        </div>
     
        <div class="col-lg-6 col-md-6">
            <div class="form-group">
                <label for="shipping_postcode">Postcode / Zip 
                    <span class="required">*</span>
                </label>
                <input type="text" id="shipping_postcode" name="shipping_postcode" class="form-control" />
            </div>
        </div>
        <div class="col-lg-6 col-md-6">
            <div class="form-group">
                <label for="shipping_email">Email Address 
                    <span class="required">*</span>
                </label>
                <input type="email" id="shipping_email" name="shipping_email" class="form-control" />
            </div>
        </div>
        <div class="col-lg-6 col-md-6">
            <div class="form-group">
                <label for="shipping_phone">Phone 
                    <span class="required">*</span>
                </label>
                <input type="text" id="shipping_phone" name="shipping_phone" class="form-control" />
            </div>
        </div>
    </div>
</div>




                        </div>
                        <div class="col-lg-6 col-md-12">
  <div class="order-details">
    <h3 class="title">Your Order</h3>
    <div class="order-table table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Product Name</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td className="product-name">
  <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>{item.productName}</a>
</td>

              <td class="product-total">
                <span class="subtotal-amount">${item.price * item.quantity}</span>
              </td>
            </tr>
          ))}
          <tr>
            <td class="total-price">
              <span>Order Total</span>
            </td>
            <td class="product-subtotal">
              <span class="subtotal-amount">${totalPrice}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="payment-box">
      <div class="payment-method">
        <p>
          <input type="radio" id="direct-bank-transfer" name="radio-group" checked />
          <label for="direct-bank-transfer">Direct Bank Transfer</label>
          Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
        </p>
        <p>
          <input type="radio" id="paypal" name="radio-group" />
          <label for="paypal">PayPal</label>
        </p>
        <p>
          <input type="radio" id="cash-on-delivery" name="radio-group" />
          <label for="cash-on-delivery">Cash on Delivery</label>
        </p>
      </div>
      <button
  type="submit"
  className="btn btn-success"
  style={{
    backgroundColor: '#28a745',
    borderColor: '#28a745',
    fontWeight: 'bold',
    borderRadius: '5px',
  }}
  onMouseOver={(e) => {
    e.target.style.backgroundColor = '#218838';
    e.target.style.borderColor = '#1e7e34';
  }}
  onMouseOut={(e) => {
    e.target.style.backgroundColor = '#28a745';
    e.target.style.borderColor = '#28a745';
  }}
>
  Place Order
</button>

    </div>
  </div>
</div>

                    </div>
                </form>
            </div>
        </section>
      
    </>
  );
};

export default Checkout;






















// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateItemQuantity, removeItem } from '../features/cartSlice';
// import { useNavigate } from 'react-router-dom'; 
// import { submitFormData } from '../features/customerSlice';
// const Checkout = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector(state => state.cart.items);
//   const [showShipping, setShowShipping] = useState(false); // State variable for toggling shipping address section
//   const navigate = useNavigate(); // Initialize useNavigate hook
//   const [orderInfo, setOrderInfo] = useState();

//   // Calculate total price
//   const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

//   // Function to handle quantity change
//   const handleQuantityChange = (e, itemId) => {
//     const newQuantity = parseInt(e.target.value);
//     dispatch(updateItemQuantity({ id: itemId, quantity: newQuantity }));
//   };

//   // Function to handle item removal
//   const handleRemoveItem = (itemId) => {
//     dispatch(removeItem(itemId));
//   };

//   // Function to toggle shipping address section
//   const handleToggleShipping = () => {
//     setShowShipping(!showShipping);
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Get the form element
//     const formElement = document.getElementById('checkout_form');
    
//     // Create FormData objects for customer details and cart details
//     const customerData = new FormData(formElement);
//     const cartData = new FormData();
    
//     // Retrieve cart details from the Redux store
//     const cart = cartItems;
    
//     // Add cart details to the FormData object
//     cartData.append('cartDetails', JSON.stringify(cart));
    
//     // Combine customer and cart data into a single FormData object
//     const finalData = new FormData();
    
//     // Append customer details
//     Object.entries(Object.fromEntries(customerData)).forEach(([key, value]) => {
//       finalData.append(key, value);
//     });
  
//     // Append cart details
//     Object.entries(Object.fromEntries(cartData)).forEach(([key, value]) => {
//       finalData.append(key, value);
//     });
    
  
//     try {
//         // Dispatch action to submit form data
       
//         const result = await dispatch(submitFormData(finalData));
      
//         // Check if the result contains the expected payload structure
//         if (result && result.payload && result.payload.order && result.payload.order._id) {
//           const orderId = result.payload.order._id;
      
//           // Set order ID and success message in session storage
//           sessionStorage.setItem('orderId', orderId);
//           sessionStorage.setItem('successMessage', 'Order placed successfully');
      
//           // Navigate to Thank You page
//           setTimeout(() => {
//             navigate('/thank-you'); // Navigate to Thank You page
//           }, 3000);
//         } else {
//           console.error('Error placing order: Invalid payload structure');
//           // Handle error if payload structure is invalid
//         }
//       } catch (error) {
//         console.error('Error placing order:', error);
//         // Handle error if order submission fails
//       }
    
//   };
  

//   return (
//     <>
//     <section class="checkout-area ptb-100">
//             <div class="container"><br/><br/><br/><br/><br/><br/><br/>
//                 <div class="row">
//                     <div class="col-lg-12 col-md-12">
//                         <div class="user-actions">
//                             <i class="las la-external-link-alt"></i>
//                            <span>
//   Returning customer?{' '}
//   <a href="login.html" style={{ textDecoration: 'none', color: 'inherit', color: 'red' }}>
//     Click here to login
//   </a>
// </span>

//                         </div>
//                     </div>
//                 </div>
//                 <form onSubmit={handleSubmit} id='checkout_form'>
//                     <div class="row">
//                         <div class="col-lg-6 col-md-12">
//                         <div class="billing-details" id="billing-details">
//     <h3 class="title">Billing Details</h3>
//     <div class="row">
//         <div class="col-lg-12 col-md-12">
//             <div class="form-group">
//                 <label for="billing_country">Country 
//                     <span class="required">*</span>
//                 </label>
//                 <div class="select-box">
//                     <select name="billing_country" id="billing_country" class="form-control">
//                         <option value="5">United Arab Emirates</option>
//                         <option value="1">China</option>
//                         <option value="2">United Kingdom</option>
//                         <option value="0">Germany</option>
//                         <option value="3">France</option>
//                         <option value="4">Japan</option>
//                     </select>
//                 </div>
//             </div>
//         </div>
//         <div class="col-lg-6 col-md-6">
//             <div class="form-group">
//                 <label for="billing_firstName">First Name 
//                     <span class="required">*</span>
//                 </label>
//                 <input type="text" id="billing_firstName" name="billing_firstName" class="form-control" />
//             </div>
//         </div>
//         <div class="col-lg-6 col-md-6">
//             <div class="form-group">
//                 <label for="billing_lastName">Last Name 
//                     <span class="required">*</span>
//                 </label>
//                 <input type="text" id="billing_lastName" name="billing_lastName" class="form-control" />
//             </div>
//         </div>
//         <div class="col-lg-12 col-md-12">
//             <div class="form-group">
//                 <label for="billing_companyName">Company Name</label>
//                 <input type="text" id="billing_companyName" name="billing_companyName" class="form-control" />
//             </div>
//         </div>
//         <div class="col-lg-12 col-md-6">
//             <div class="form-group">
//                 <label for="billing_address">Address 
//                     <span class="required">*</span>
//                 </label>
//                 <input type="text" id="billing_address" name="billing_address" class="form-control" />
//             </div>
//         </div>
//         <div class="col-lg-12 col-md-6">
//             <div class="form-group">
//                 <label for="billing_city">Town / City 
//                     <span class="required">*</span>
//                 </label>
//                 <input type="text" id="billing_city" name="billing_city" class="form-control" />
//             </div>
//         </div>
//         <div class="col-lg-6 col-md-6">
//             <div class="form-group">
//                 <label for="billing_state">State / County 
//                     <span class="required">*</span>
//                 </label>
//                 <input type="text" id="billing_state" name="billing_state" class="form-control" />
//             </div>
//         </div>
//         <div class="col-lg-6 col-md-6">
//             <div class="form-group">
//                 <label for="billing_postcode">Postcode / Zip 
//                     <span class="required">*</span>
//                 </label>
//                 <input type="text" id="billing_postcode" name="billing_postcode" class="form-control" />
//             </div>
//         </div>
//         <div class="col-lg-6 col-md-6">
//             <div class="form-group">
//                 <label for="billing_email">Email Address 
//                     <span class="required">*</span>
//                 </label>
//                 <input type="email" id="billing_email" name="billing_email" class="form-control" />
//             </div>
//         </div>
//         <div class="col-lg-6 col-md-6">
//             <div class="form-group">
//                 <label for="billing_phone">Phone 
//                     <span class="required">*</span>
//                 </label>
//                 <input type="text" id="billing_phone" name="billing_phone" class="form-control" />
//             </div>
//         </div>
//         <div class="col-lg-12 col-md-12">
//             <div class="form-check">
//                 <input type="checkbox" class="form-check-input" id="create_an_account" />
//                 <label class="form-check-label" for="create_an_account">Create an account?</label>
//             </div>
//         </div>
//         <div class="col-lg-12 col-md-12">
//             <div class="form-check">
//             <input type="checkbox" className="form-check-input" id="ship_different_address" onChange={handleToggleShipping} />
//                 <label class="form-check-label" for="ship_different_address">Ship to a different address?</label>
//             </div>
//         </div>
//         <div class="col-lg-12 col-md-12">
//             <div class="form-group">
//                 <textarea name="billing_notes" id="billing_notes" cols="30" rows="5" placeholder="Order Notes" class="form-control"></textarea>
//             </div>
//         </div>
//     </div>
// </div>

// <br/><br/><br/>
// <div class="billing-details" id="shipping-address" style={{ display: showShipping ? 'block' : 'none' }}>
//     <h3 class="title">Shipping Details</h3>
//     <div class="row">
//         <div class="col-lg-12 col-md-12">
//             <div class="form-group">
//                 <label for="shipping_country">Country 
//                     <span class="required">*</span>
//                 </label>
//                 <div class="select-box">
//                     <select name="shipping_country" id="shipping_country" class="form-control">
//                         <option value="5">United Arab Emirates</option>
//                         <option value="1">China</option>
//                         <option value="2">United Kingdom</option>
//                         <option value="0">Germany</option>
//                         <option value="3">France</option>
//                         <option value="4">Japan</option>
//                     </select>
//                 </div>
//             </div>
//         </div>
//         <div class="col-lg-6 col-md-6">
//             <div class="form-group">
//                 <label for="shipping_firstName">First Name 
//                     <span class="required">*</span>
//                 </label>
//                 <input type="text" id="shipping_firstName" name="shipping_firstName" class="form-control" />
//             </div>
//         </div>
//         <div class="col-lg-6 col-md-6">
//             <div class="form-group">
//                 <label for="shipping_lastName">Last Name 
//                     <span class="required">*</span>
//                 </label>
//                 <input type="text" id="shipping_lastName" name="shipping_lastName" class="form-control" />
//             </div>
//         </div>
//         <div class="col-lg-12 col-md-12">
//             <div class="form-group">
//                 <label for="shipping_companyName">Company Name</label>
//                 <input type="text" id="shipping_companyName" name="shipping_companyName" class="form-control" />
//             </div>
//         </div>
//         <div class="col-lg-12 col-md-6">
//             <div class="form-group">
//                 <label for="shipping_address">Address 
//                     <span class="required">*</span>
//                 </label>
//                 <input type="text" id="shipping_address" name="shipping_address" class="form-control" />
//             </div>
//         </div>
//         <div class="col-lg-12 col-md-6">
//             <div class="form-group">
//                 <label for="shipping_city">Town / City 
//                     <span class="required">*</span>
//                 </label>
//                 <input type="text" id="shipping_city" name="shipping_city" class="form-control" />
//             </div>
//         </div>
     
//         <div class="col-lg-6 col-md-6">
//             <div class="form-group">
//                 <label for="shipping_postcode">Postcode / Zip 
//                     <span class="required">*</span>
//                 </label>
//                 <input type="text" id="shipping_postcode" name="shipping_postcode" class="form-control" />
//             </div>
//         </div>
//         <div class="col-lg-6 col-md-6">
//             <div class="form-group">
//                 <label for="shipping_email">Email Address 
//                     <span class="required">*</span>
//                 </label>
//                 <input type="email" id="shipping_email" name="shipping_email" class="form-control" />
//             </div>
//         </div>
//         <div class="col-lg-6 col-md-6">
//             <div class="form-group">
//                 <label for="shipping_phone">Phone 
//                     <span class="required">*</span>
//                 </label>
//                 <input type="text" id="shipping_phone" name="shipping_phone" class="form-control" />
//             </div>
//         </div>
//     </div>
// </div>




//                         </div>
//                         <div class="col-lg-6 col-md-12">
//   <div class="order-details">
//     <h3 class="title">Your Order</h3>
//     <div class="order-table table-responsive">
//       <table class="table table-bordered">
//         <thead>
//           <tr>
//             <th scope="col">Product Name</th>
//             <th scope="col">Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cartItems.map(item => (
//             <tr key={item.id}>
//               <td className="product-name">
//   <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>{item.productName}</a>
// </td>

//               <td class="product-total">
//                 <span class="subtotal-amount">${item.price * item.quantity}</span>
//               </td>
//             </tr>
//           ))}
//           <tr>
//             <td class="total-price">
//               <span>Order Total</span>
//             </td>
//             <td class="product-subtotal">
//               <span class="subtotal-amount">${totalPrice}</span>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//     <div class="payment-box">
//       <div class="payment-method">
//         <p>
//           <input type="radio" id="direct-bank-transfer" name="radio-group" checked />
//           <label for="direct-bank-transfer">Direct Bank Transfer</label>
//           Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
//         </p>
//         <p>
//           <input type="radio" id="paypal" name="radio-group" />
//           <label for="paypal">PayPal</label>
//         </p>
//         <p>
//           <input type="radio" id="cash-on-delivery" name="radio-group" />
//           <label for="cash-on-delivery">Cash on Delivery</label>
//         </p>
//       </div>
//       <button
//   type="submit"
//   className="btn btn-success"
//   style={{
//     backgroundColor: '#28a745',
//     borderColor: '#28a745',
//     fontWeight: 'bold',
//     borderRadius: '5px',
//   }}
//   onMouseOver={(e) => {
//     e.target.style.backgroundColor = '#218838';
//     e.target.style.borderColor = '#1e7e34';
//   }}
//   onMouseOut={(e) => {
//     e.target.style.backgroundColor = '#28a745';
//     e.target.style.borderColor = '#28a745';
//   }}
// >
//   Place Order
// </button>

//     </div>
//   </div>
// </div>

//                     </div>
//                 </form>
//             </div>
//         </section>
//     </>
//   );
// }

// export default Checkout;
