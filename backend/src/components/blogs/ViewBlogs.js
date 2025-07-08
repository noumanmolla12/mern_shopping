import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBlogs, deleteBlog } from '../../features/blogSlice';
import { Link } from 'react-router-dom';

import { selectImagePath } from '../../features/globalpaths';

const ViewBlogs = () => {
  const dispatch = useDispatch();
  const imagePath = useSelector(selectImagePath);
  const { loading, error, blogs } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  const handleDelete = (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      dispatch(deleteBlog(blogId));
    }
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // Styles
  const containerStyle = {
    maxWidth: '1100px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#f5f8ff',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const headingStyle = {
    color: 'rgb(40, 167, 69)',
    marginBottom: '20px',
    fontSize: '2rem',
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '320px',
  };

  const thStyle = {
    backgroundColor: 'rgb(40, 167, 69)',
    color: 'white',
    padding: '12px 15px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '1rem',
    borderBottom: '3px solid rgb(40, 167, 69)',
  };

  const tdStyle = {
    padding: '12px 15px',
    borderBottom: '1px solid #ddd',
    verticalAlign: 'middle',
    color: '#333',
    fontSize: '0.95rem',
  };

  const imageStyle = {
    width: '80px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '6px',
    marginRight: '6px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  };

  const actionBtnStyle = {
    padding: '6px 12px',
    fontSize: '0.9rem',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const editBtnStyle = {
    ...actionBtnStyle,
    backgroundColor: 'rgb(40, 167, 69)',
    color: 'white',
    marginRight: '8px',
    textDecoration:"none"
  };

  const deleteBtnStyle = {
    ...actionBtnStyle,
    backgroundColor: '#ff4d4d',
    color: 'white',
  };

  const loadingStyle = {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#6c63ff',
  };

  const errorStyle = {
    textAlign: 'center',
    color: '#ff4d4d',
    fontWeight: '600',
  };

  const noBlogsStyle = {
    textAlign: 'center',
    fontSize: '1.1rem',
    color: '#999',
    fontStyle: 'italic',
    marginTop: '40px',
  };

  const tableWrapperStyle = {
    overflowX: 'auto',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Latest Blogs</h2>

      {loading && <div style={loadingStyle}>Loading...</div>}
      {error && <div style={errorStyle}>{error}</div>}

      {blogs && blogs.length > 0 ? (
        <div style={tableWrapperStyle}>
          <table style={tableStyle} aria-label="Blogs Table">
            <thead>
              <tr>
                <th style={thStyle}>Blog Name</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Images</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} style={{ backgroundColor: '#fff' }}>
                  <td style={tdStyle}>{blog.blog_name}</td>
                  <td style={{ ...tdStyle, maxWidth: '300px', whiteSpace: 'normal' }}>
                    {blog.blog_description.length > 150
                      ? blog.blog_description.slice(0, 150) + '...'
                      : blog.blog_description}
                  </td>
                  <td style={tdStyle}>
                    {blog.blog_images.map((image, index) => (
                      <img
                        key={index}
                        src={imagePath + image}
                        alt={`blog ${index + 1}`}
                        style={imageStyle}
                        loading="lazy"
                      />
                    ))}
                  </td>
                  <td style={tdStyle}>{formatDate(blog.date)}</td>
                  <td style={tdStyle}>
                    <Link
                      to={`/admindashboard/edit-blog/${blog._id}`}
                      style={editBtnStyle}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#514bcf')}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#6c63ff')}
                    >
                      Edit
                    </Link>
                    <button
                      style={deleteBtnStyle}
                      onClick={() => handleDelete(blog._id)}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e84343')}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ff4d4d')}
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
        !loading && <div style={noBlogsStyle}>No blogs found</div>
      )}
    </div>
  );
};

export default ViewBlogs;
