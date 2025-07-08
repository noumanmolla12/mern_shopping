import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../features/productSlice';
import { fetchAllCategories } from '../../features/categorySlice';

const AddProduct = () => {
  const dispatch = useDispatch();
  const { loading, error, categories } = useSelector((state) => state.categories);

  const [formData, setFormData] = useState({
    category: '',
    productName: '',
    description: '',
    price: '',
    product_image: [],
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    if (e.target.name === 'product_image') {
      const files = Array.from(e.target.files);
      setFormData({ ...formData, product_image: files });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append('category', formData.category);
      productData.append('productName', formData.productName);
      productData.append('description', formData.description);
      productData.append('price', formData.price);

      formData.product_image.forEach((file) => {
        productData.append('product_image', file);
      });

      await dispatch(addProduct(productData));
      setSuccessMessage('Product added successfully!');
      setFormData({
        category: '',
        productName: '',
        description: '',
        price: '',
        product_image: [],
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '30px auto',
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: 'rgb(40, 167, 69)',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: 'bold',
    color: '#333',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: loading ? '#6c757d' : '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: loading ? 'not-allowed' : 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
  };

  const successStyle = {
    color: '#155724',
    backgroundColor: '#d4edda',
    border: '1px solid #c3e6cb',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    textAlign: 'center',
  };

  const errorStyle = {
    color: '#721c24',
    backgroundColor: '#f8d7da',
    border: '1px solid #f5c6cb',
    padding: '10px',
    marginTop: '15px',
    borderRadius: '5px',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Add Product</h2>
      {successMessage && <div style={successStyle}>{successMessage}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="category" style={labelStyle}>Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>{category.categoryName}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="productName" style={labelStyle}>Product Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="description" style={labelStyle}>Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            style={{ ...inputStyle, resize: 'vertical' }}
          ></textarea>
        </div>

        <div>
          <label htmlFor="price" style={labelStyle}>Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="product_image" style={labelStyle}>Images</label>
          <input
            type="file"
            id="product_image"
            name="product_image"
            onChange={handleChange}
            multiple
            style={inputStyle}
          />
        </div>

        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {error && <div style={errorStyle}>{error}</div>}
      </form>
    </div>
  );
};

export default AddProduct;
