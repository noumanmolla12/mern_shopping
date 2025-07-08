import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, deleteProduct } from '../../features/productSlice';
import { Link } from 'react-router-dom';
import { selectImagePath } from '../../features/globalpaths';

const ProductView = () => {
  const dispatch = useDispatch();
  const imagePath = useSelector(selectImagePath);
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      dispatch(deleteProduct(productId));
    }
  };

  const containerStyle = {
    maxWidth: '100%',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f4f8',
    minHeight: '100vh',
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
    fontSize: '28px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    overflowX: 'auto',
  };

  const thStyle = {
    backgroundColor: 'rgb(40, 167, 69)',
    color: '#fff',
    padding: '12px',
    textAlign: 'left',
    fontSize: '16px',
  };

  const tdStyle = {
    padding: '12px',
    borderBottom: '1px solid #ddd',
    verticalAlign: 'top',
    fontSize: '15px',
    color: '#333',
  };

  const imageStyle = {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '5px',
    marginRight: '5px',
  };

  const buttonStyle = {
    padding: '6px 12px',
    fontSize: '14px',
    margin: '2px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const editBtnStyle = {
    ...buttonStyle,
    backgroundColor: '#28a745',
    color: '#fff',
  };

  const deleteBtnStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    color: '#fff',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Product List</h2>

      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {products && products.length > 0 ? (
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Product Name</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Images</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td style={tdStyle}>{product.category}</td>
                  <td style={tdStyle}>{product.productName}</td>
                  <td style={tdStyle}>{product.description}</td>
                  <td style={tdStyle}>₹{product.price}</td>
                  <td style={tdStyle}>
                    {product.product_images.map((image, index) => (
                      <img
                        key={index}
                        src={imagePath + image}
                        alt={`Product ${index + 1}`}
                        style={imageStyle}
                      />
                    ))}
                  </td>
                  <td style={tdStyle}>
                    <Link to={`/admindashboard/edit-product/${product._id}`}>
                      <button style={editBtnStyle}>Edit</button>
                    </Link>
                    <button
                      style={deleteBtnStyle}
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No products found</div>
      )}
    </div>
  );
};

export default ProductView;
