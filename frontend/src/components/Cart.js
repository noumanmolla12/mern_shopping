import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateItemQuantity, removeItem } from '../features/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleIncrement = (itemId) => {
    const item = cartItems.find(item => item._id === itemId);
    if (item) dispatch(updateItemQuantity({ id: itemId, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (itemId) => {
    const item = cartItems.find(item => item._id === itemId);
    if (item && item.quantity > 1) dispatch(updateItemQuantity({ id: itemId, quantity: item.quantity - 1 }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  return (
    <>
      <div className="page-title-area" style={{ background: '#f5fffb', padding: '80px 0' }}><br/><br/><br/><br/><br/>
        <div className="container text-center">
          <h2 style={{ color: '#222', fontWeight: 'bold' }}>🛒 Your Shopping Cart</h2>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            <li><a href="/" style={{ color: '#00ff80', textDecoration: 'none' }}>Home</a> / Cart</li>
          </ul>
        </div>
      </div>

      <section className="cart-area py-5" style={{ backgroundColor: '#fffaf0' }}>
        <div className="container">
          <div className="table-responsive">
            <table className="table table-bordered text-center" style={{ background: '#ffffff' }}>
              <thead style={{ backgroundColor: '#ffddcc' }}>
                <tr>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      {item.images.map((image, index) => (
                        <img key={index} src={image} alt="Product" style={{ width: '100px', borderRadius: '10px' }} />
                      ))}
                    </td>
                    <td>{item.productName}</td>
                    <td>${item.price}</td>
                    <td>
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <span className="btn btn-sm btn-outline-danger" onClick={() => handleDecrement(item._id)}>−</span>
                        <input type="text" readOnly value={item.quantity} style={{ width: '40px', textAlign: 'center' }} />
                        <span className="btn btn-sm btn-outline-success" onClick={() => handleIncrement(item._id)}>+</span>
                      </div>
                    </td>
                    <td>${item.price * item.quantity}</td>
                    <td>
                      <button onClick={() => handleRemoveItem(item._id)} className="btn btn-sm btn-danger">
                        🗑 Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="row my-4 align-items-center">
            <div className="col-md-6">
              <Link to="/" className="btn btn-outline-primary w-100 mb-3">← Back to Shop</Link>
            </div>
            <div className="col-md-6">
              <button className="btn btn-warning w-100 mb-3">🔄 Update Cart</button>
            </div>
          </div>

          <div className="cart-totals p-4 rounded" style={{ backgroundColor: '#e0f7fa' }}>
            <h4 className="mb-3 text-dark">🧾 Cart Summary</h4>
            <ul className="list-unstyled">
              <li className="d-flex justify-content-between">
                <strong>Subtotal:</strong> <span>${totalPrice.toFixed(2)}</span>
              </li>
            </ul>
            <Link to="/checkout" className="btn btn-success w-100 mt-3">✅ Proceed to Checkout</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
