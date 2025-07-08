import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories, deleteCategory } from '../../features/categorySlice';
import { Link } from 'react-router-dom';

function ViewCategory() {
  const dispatch = useDispatch();
  const { loading, error, categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Segoe UI, sans-serif',
      background: '#f2f6ff',
      minHeight: '100vh'
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '30px',
        color: 'rgb(40, 167, 69)',
        fontWeight: 'bold'
      }}>
        Category Management
      </h2>

      {loading && <div style={{ textAlign: 'center', fontSize: '18px' }}>Loading...</div>}
      {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
      
      {categories && categories.length > 0 ? (
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: '#fff',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)'
          }}>
            <thead>
              <tr style={{ backgroundColor: 'rgb(40, 167, 69)', color: '#fff' }}>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category._id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                  <td style={tdStyle}>{category.categoryName}</td>
                  <td style={tdStyle}>{category.description}</td>
                  <td style={tdStyle}>
                    <span style={{
                      padding: '5px 10px',
                      borderRadius: '15px',
                      backgroundColor: category.status === 'Active' ? '#d4edda' : '#f8d7da',
                      color: category.status === 'Active' ? '#155724' : '#721c24',
                      fontWeight: 'bold'
                    }}>
                      {category.status}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <Link
                      to={`/admindashboard/edit-category/${category._id}`}
                      style={{
                        padding: '6px 12px',
                        marginRight: '8px',
                        backgroundColor: 'rgb(40, 167, 69)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        fontSize: '14px'
                      }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(category._id)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
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
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '16px' }}>No categories found</div>
      )}
    </div>
  );
}

const thStyle = {
  padding: '12px',
  textAlign: 'left',
  fontSize: '16px'
};

const tdStyle = {
  padding: '12px',
  borderBottom: '1px solid #ddd',
  fontSize: '15px'
};

export default ViewCategory;
