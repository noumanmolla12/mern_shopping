import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchAllCategories,
  fetchSingleCategory,
  updateCategory,
} from '../../features/categorySlice';

const EditCategory = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();

  const { loading, error, categories } = useSelector((state) => state.categories);
  const { data: singleCategory } = useSelector((state) => state.categories.singleCategory);

  const [singleCategories, setSingleCategories] = useState({
    parentCategory: '',
    categoryName: '',
    description: '',
    status: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  useEffect(() => {
    const selectedCategory = categories.find((category) => category._id === categoryId);
    if (selectedCategory) {
      setSingleCategories((prev) => ({
        ...prev,
        parentCategory: selectedCategory._id,
      }));
    }
  }, [categories, categoryId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchSingleCategory(categoryId));
        const data = response.payload;
        setSingleCategories({
          parentCategory: data.parentCategory || '',
          categoryName: data.categoryName || '',
          description: data.description || '',
          status: data.status || '',
        });
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };
    if (categoryId) {
      fetchData();
    }
  }, [dispatch, categoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSingleCategories((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateCategory({ categoryId, formData: singleCategories }));
      setSuccessMessage('Category updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '50px auto',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 0 12px rgba(0,0,0,0.1)',
      background: 'linear-gradient(to right, #f8f9fa, #e3f2fd)',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      textAlign: 'center',
      color: 'rgb(40, 167, 69)',
      marginBottom: '20px',
      fontSize: '26px',
    },
    label: {
      display: 'block',
      marginBottom: '6px',
      fontWeight: 'bold',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '16px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '16px',
    },
    select: {
      width: '100%',
      padding: '10px',
      marginBottom: '16px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '16px',
      backgroundColor: '#fff',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#198754',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '18px',
      cursor: 'pointer',
    },
    buttonDisabled: {
      backgroundColor: '#aaa',
      cursor: 'not-allowed',
    },
    successMessage: {
      backgroundColor: '#d1e7dd',
      color: '#0f5132',
      padding: '10px',
      borderRadius: '6px',
      marginBottom: '20px',
      textAlign: 'center',
    },
    errorMessage: {
      color: 'red',
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Edit Category</h2>
      {successMessage && <div style={styles.successMessage}>{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="parentCategory" style={styles.label}>
          Parent Category
        </label>
        <select
          id="parentCategory"
          name="parentCategory"
          value={singleCategories.parentCategory}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="">Select Parent Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.categoryName}
            </option>
          ))}
        </select>

        <label htmlFor="categoryName" style={styles.label}>
          Category Name
        </label>
        <input
          type="text"
          id="categoryName"
          name="categoryName"
          value={singleCategories.categoryName}
          onChange={handleChange}
          style={styles.input}
        />

        <label htmlFor="description" style={styles.label}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={singleCategories.description}
          onChange={handleChange}
          style={{ ...styles.input, height: '100px', resize: 'vertical' }}
        />

        <label htmlFor="status" style={styles.label}>
          Status
        </label>
        <select
          id="status"
          name="status"
          value={singleCategories.status}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="">Select Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button
          type="submit"
          style={{ ...styles.button, ...(loading && styles.buttonDisabled) }}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Update Category'}
        </button>

        {error && <div style={styles.errorMessage}>{error}</div>}
      </form>
    </div>
  );
};

export default EditCategory;
