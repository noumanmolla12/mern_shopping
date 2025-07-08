import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, fetchAllCategories } from '../../features/categorySlice';

const AddCategories = () => {
  const dispatch = useDispatch();
  const { loading, error, categories } = useSelector((state) => state.categories);

  const [formData, setFormData] = useState({
    parentCategory: '',
    categoryName: '',
    description: '',
    status: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createCategory(formData));
      setSuccessMessage('✅ Category added successfully!');
      setFormData({
        parentCategory: '',
        categoryName: '',
        description: '',
        status: '',
      });
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem',
        backgroundColor: '#f4f6f8',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            color: 'rgb(40, 167, 69)',
            marginBottom: '25px',
            fontSize: '28px',
          }}
        >
          ➕ Add New Category
        </h2>

        {successMessage && (
          <div
            style={{
              marginBottom: '20px',
              padding: '12px',
              backgroundColor: '#d4edda',
              color: '#155724',
              border: '1px solid #c3e6cb',
              borderRadius: '6px',
              textAlign: 'center',
              fontWeight: '500',
            }}
          >
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Parent Category */}
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Parent Category</label>
            <select
              name="parentCategory"
              value={formData.parentCategory}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select Parent Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Category Name */}
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Category Name</label>
            <input
              type="text"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter category name"
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              style={inputStyle}
              placeholder="Short description..."
            ></textarea>
          </div>

          {/* Status */}
          <div style={{ marginBottom: '30px' }}>
            <label style={labelStyle}>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select Status</option>
              <option value="active">🟢 Active</option>
              <option value="inactive">🔴 Inactive</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: loading ? '#9e9e9e' : 'rgb(40, 167, 69)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease',
            }}
          >
            {loading ? 'Submitting...' : '✅ Submit'}
          </button>

          {/* Error Message */}
          {error && (
            <div
              style={{
                marginTop: '20px',
                color: '#dc3545',
                backgroundColor: '#f8d7da',
                border: '1px solid #f5c6cb',
                borderRadius: '6px',
                padding: '12px',
                fontWeight: '500',
                textAlign: 'center',
              }}
            >
              ❌ {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// Styles
const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontWeight: '600',
  color: '#333',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ced4da',
  backgroundColor: '#ffffff',
  fontSize: '15px',
};

export default AddCategories;
